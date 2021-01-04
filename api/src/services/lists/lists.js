import { ForbiddenError } from '@redwoodjs/api';
import { sql, empty } from '@prisma/client';
import { db } from 'src/lib/db';
import { getCurrentUser, requireAuth, hasRole } from 'src/lib/mockAuth';
import { foreignKeyReplacement } from 'src/services/relationWorkaround';
import { deleteListOwnersForList } from 'src/services/listOwners/listOwners';
import { deleteListItemsForList, listItemIds } from '../listItems/listItems';
import { deleteUserListsForList } from '../userLists/userLists';
import { deleteUserListItemsForList } from '../userListItems/userListItems';

export const lists = () => {
  if (hasRole('admin')) return db.list.findMany();

  requireAuth();
  const user = getCurrentUser();

  return db.$queryRaw(
    `SELECT l.*
     FROM "public"."List" l
      INNER JOIN "public"."ListOwner" lo ON (lo."listId" = l.id)
     WHERE
      lo."ownerIdentifier" = $1
      OR l."isPublic";`,
    user.id,
  );
};

export const list = async ({ id }) => {
  await checkListAccess({ id, checkIsOwner: true, checkIsPublic: true });
  return db.list.findOne({ where: { id } });
};

export const createList = ({ input }) => {
  requireAuth();
  const user = getCurrentUser();

  return db.list.create({
    data: {
      ...foreignKeyReplacement(input),
      listOwner: {
        create: {
          ownerIdentifier: user.id,
        },
      },
    },
  });
};

export const updateList = async ({ id, input }) => {
  await checkListAccess({ id, checkIsOwner: true, checkIsPublic: false });

  return db.list.update({
    data: foreignKeyReplacement(input),
    where: { id },
  });
};

export const deleteList = async ({ id }) => {
  await checkListAccess({ id, checkIsOwner: true, checkIsPublic: false });

  // delete related fields
  // retrieve list item ids for user list item deletion
  const lItemIds = await listItemIds({ listId: id });

  let ownerTask = deleteListOwnersForList({ listId: id });
  let itemTask = deleteListItemsForList({ listId: id });
  let userListTask = deleteUserListsForList({ listId: id });
  let userListItemTask = deleteUserListItemsForList({ lItemIds });

  await Promise.all([ownerTask, itemTask, userListItemTask, userListTask]);
  return db.list.delete({
    where: { id },
  });
};

export const List = {
  userLists: (_obj, { root }) =>
    db.list.findOne({ where: { id: root.id } }).userLists(),
  listItems: (_obj, { root }) =>
    db.list.findOne({ where: { id: root.id } }).listItems(),
};

// deleting userlistitem: just delete it

/**
 * Throws an error if the user does not have access to the provided list.
 *
 * @param {object} options - Access options
 * @param {int} options.id - ID of the list
 * @param {boolean} options.checkIsOwner - whether to check if current user is the owner
 * @param {boolean} options.checkIsPublic - whether to check if the list is public
 *
 * @throws {ForbiddenError}
 */
export const checkListAccess = async ({ id, checkIsOwner, checkIsPublic }) => {
  // Admin users can do whatever they want
  if (hasRole('admin')) return;

  requireAuth();
  const user = getCurrentUser();

  // Returns the where clause depending on which options were passed
  const getFilter = () => {
    if (checkIsOwner === undefined || checkIsPublic === undefined)
      throw new ForbiddenError(
        'User does not have access or resource does not exist',
      );
    if (checkIsOwner && checkIsPublic) {
      return sql`and (lo."ownerIdentifier" = ${user.id} or l."isPublic")`;
    } else if (checkIsOwner) {
      return sql`or lo."ownerIdentifier" = ${user.id}`;
    } else if (checkIsPublic) {
      return sql`or l."isPublic"`;
    } else {
      return empty;
    }
  };

  const result = await db.$queryRaw`
    select exists(
      select 1 from "public"."List" l
        ${
          checkIsOwner
            ? sql`inner join "public"."ListOwner" lo on (lo."listId" = l.id)`
            : empty
        }
      where
        l.id = ${id}
        ${getFilter()}
    );`;

  if (!result) {
    throw new ForbiddenError(
      'User does not have access or resource does not exist',
    );
  }
};
