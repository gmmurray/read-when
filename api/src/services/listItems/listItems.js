import { db } from 'src/lib/db';
import { checkListAccess, lists } from 'src/services/lists/lists';
import { foreignKeyReplacement } from 'src/services/relationWorkaround';
import { deleteUserListItemsForListItem } from '../userListItems/userListItems';

export const listItems = async () => {
  const availableLists = await lists();

  return db.listItem.findMany({
    where: {
      listId: {
        in: availableLists.map(l => l.id),
      },
    },
  });
};

export const listItemIds = ({ listId }) => {
  return db.listItem.findMany({
    select: {
      id: true,
    },
    where: { listId },
  });
};

export const listItem = async ({ id }) => {
  const item = await db.listItem.findOne({
    where: { id },
  });

  // Throws an error if the related list is unavailable
  await checkListAccess({
    id: item.listId,
    checkIsOwner: true,
    checkIsPublic: true,
  });

  return item;
};

export const createListItem = async ({ input }) => {
  // Throws an error if the related list is unavailable
  await checkListAccess({
    id: input.listId,
    checkIsOwner: true,
    checkIsPublic: false,
  });

  return db.listItem.create({
    data: foreignKeyReplacement(input),
  });
};

export const updateListItem = async ({ id, input }) => {
  const item = await listItem({ id });
  let tasks = [];

  // Check access to old and new lists if they changed
  if (item.listId !== input.listId) {
    tasks.push(
      checkListAccess({
        id: item.listId,
        checkIsOwner: true,
        checkIsPublic: false,
      }),
    );
  }

  tasks.push(
    checkListAccess({
      id: input.listId,
      checkIsOwner: true,
      checkIsPublic: false,
    }),
  );

  await Promise.all(tasks);

  return db.listItem.update({
    data: foreignKeyReplacement(input),
    where: { id },
  });
};
/**
 * Deletes list item and all associated user list items. Includes access check
 */
export const deleteListItem = async ({ id }) => {
  const item = await listItem({ id });
  await checkListAccess({
    id: item.listId,
    checkIsOwner: true,
    checkIsPublic: false,
  });

  // Delete all associated user list items
  await deleteUserListItemsForListItem({ listItemId: item.id });

  return db.listItem.delete({
    where: { id },
  });
};

/**
 * Specifically used to delete all list items associated with given list id, does NOT
 * include access validation
 *
 * @param {object} params - Object containing parameters
 * @param {int} param.listId - list id to be used for deletion
 */
export const deleteListItemsForList = ({ listId }) => {
  return db.listItem.deleteMany({
    where: { listId },
  });
};

export const ListItem = {
  list: (_obj, { root }) =>
    db.listItem.findOne({ where: { id: root.id } }).list(),
  userListItems: (_obj, { root }) =>
    db.listItem.findOne({ where: { id: root.id } }).userListItems(),
};
