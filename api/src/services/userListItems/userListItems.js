import { db } from 'src/lib/db';
import { getCurrentUser, hasRole, requireAuth } from 'src/lib/mockAuth';
import { foreignKeyReplacement } from 'src/services/relationWorkaround';
import { checkListAccess } from 'src/services/lists/lists';
import { userList } from 'src/services/userLists/userLists';
import { validateUserListItem } from '../validation/userListItems';

export const userListItems = () => {
  if (hasRole('admin'))
    return db.userListItem.findMany({
      include: { listItem: true, userList: true },
    });

  requireAuth();
  const user = getCurrentUser();

  return db.userListItem.findMany({
    where: { userIdentifier: user.id },
    include: { listItem: true, userList: true },
  });
};

export const userListItemsWithArgs = args => {
  requireAuth();
  const user = getCurrentUser();

  let where = {};
  if (args.listId) {
    where = { userList: { listId: args.listId } };
  }

  return db.userListItem.findMany({
    where: { userIdentifier: user.id, ...where },
    include: { listItem: true, userList: true },
  });
};

export const userListItem = ({ id }) => {
  if (hasRole('admin')) {
    return db.userListItem.findOne({
      where: { id },
      include: { listItem: true, userList: true },
    });
  }

  requireAuth();
  const user = getCurrentUser();
  return db.userListItem.findOne({
    where: { id, userIdentifier: user.id },
    include: { listItem: true, userList: true },
  });
};

export const createUserListItem = async ({ input }) => {
  requireAuth();
  validateUserListItem(input);

  const uList = await userList({ id: input.userListId });
  await checkListAccess({
    id: uList.listId,
    checkIsOwner: true,
    checkIsPublic: true,
  });
  return db.userListItem.create({
    data: foreignKeyReplacement(input),
  });
};

export const updateUserListItem = async ({ id, input }) => {
  requireAuth();
  validateUserListItem(input);

  const user = getCurrentUser();
  const where = hasRole('admin') ? {} : { userIdentifier: user.id };

  return db.userListItem.update({
    data: foreignKeyReplacement(input),
    where: { id, ...where },
  });
};

export const deleteUserListItem = ({ id }) => {
  requireAuth();
  const user = getCurrentUser();
  const where = hasRole('admin') ? {} : { userIdentifier: user.id };
  return db.userListItem.delete({
    where: { id, ...where },
  });
};

export const deleteUserListItemsForListItem = ({ listItemId }) => {
  return db.userListItem.deleteMany({
    where: {
      listItemId,
    },
  });
};

export const deleteUserListItemsForUserList = ({ userListId }) => {
  return db.userListItem.deleteMany({
    where: {
      userListId,
    },
  });
};

export const deleteUserListItemsForList = ({ listItemIds }) => {
  return db.userListItem.deleteMany({
    where: {
      listItemId: {
        in: listItemIds,
      },
    },
  });
};

export const UserListItem = {
  listItem: (_obj, { root }) =>
    db.userListItem.findOne({ where: { id: root.id } }).listItem(),
};
