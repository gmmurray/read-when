import { db } from 'src/lib/db';
import { getCurrentUser, hasRole, requireAuth } from 'src/lib/mockAuth';
import { foreignKeyReplacement } from 'src/services/relationWorkaround';
import { checkListAccess } from 'src/services/lists/lists';
import { deleteUserListItemsForUserList } from 'src/services/userListItems/userListItems';
import { validateUserList } from '../validation/userList';

export const userLists = () => {
  if (hasRole('admin')) return db.userList.findMany();

  requireAuth();
  const user = getCurrentUser();

  return db.userList.findMany({
    where: { userIdentifier: user.id },
    include: { list: true, userListItems: true },
  });
};

export const userListsWithArgs = args => {
  requireAuth();
  const user = getCurrentUser();

  let where = {};
  if (args.listId) {
    where = { listId: args.listId };
  }
  return db.userList.findMany({
    where: { userIdentifier: user.id, ...where },
    include: { list: true, userListItems: true },
  });
};

export const userList = ({ id }) => {
  if (hasRole('admin')) {
    return db.userList.findOne({
      where: { id },
      include: { list: true, userListItems: true },
    });
  }

  requireAuth();
  const user = getCurrentUser();
  return db.userList.findOne({
    where: {
      id,
      userIdentifier: user.id,
    },
    include: { list: true, userListItems: true },
  });
};

export const createUserList = async ({ input }) => {
  requireAuth();
  validateUserList(input);

  await checkListAccess({
    id: input.listId,
    checkIsOwner: true,
    checkIsPublic: true,
  });

  return db.userList.create({
    data: foreignKeyReplacement(input),
  });
};

export const updateUserList = async ({ id, input }) => {
  requireAuth();
  validateUserList(input);

  const user = getCurrentUser();
  const where = hasRole('admin') ? {} : { userIdentifier: user.id };
  const uList = await userList({ id });
  let tasks = [];

  // Check access to old and new lists if they changed
  if (uList.listId !== input.listId) {
    tasks.push(
      checkListAccess({
        id: uList.listId,
        checkIsOwner: true,
        checkIsPublic: true,
      }),
    );
  }

  tasks.push(
    checkListAccess({
      id: input.listId,
      checkIsOwner: true,
      checkIsPublic: true,
    }),
  );

  await Promise.all(tasks);

  return db.userList.update({
    data: foreignKeyReplacement(input),
    where: { id, ...where },
  });
};

/**
 * Deletes user list and all associated user list items. Includes access check
 */
export const deleteUserList = async ({ id }) => {
  requireAuth();
  const user = getCurrentUser();
  const where = hasRole('admin') ? {} : { userIdentifier: user.id };

  await deleteUserListItemsForUserList({ userListId: id });
  return db.userList.delete({
    where: { id, ...where },
  });
};

/**
 * Specifically used to delete all user lists associated with given list id, does NOT
 * include access validation
 *
 * @param {object} params - Object containing parameters
 * @param {int} param.listId - list id to be used for deletion
 */
export const deleteUserListsForList = ({ listId }) => {
  return db.userList.deleteMany({
    where: { listId },
  });
};

export const UserList = {
  list: (_obj, { root }) =>
    db.userList.findOne({ where: { id: root.id } }).list(),
};
