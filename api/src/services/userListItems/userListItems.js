import { db } from 'src/lib/db';
import { foreignKeyReplacement } from 'src/services/relationWorkaround';

export const userListItems = () => {
  return db.userListItem.findMany();
};

export const userListItem = ({ id }) => {
  return db.userListItem.findOne({
    where: { id },
  });
};

export const createUserListItem = ({ input }) => {
  return db.userListItem.create({
    data: foreignKeyReplacement(input),
  });
};

export const updateUserListItem = ({ id, input }) => {
  return db.userListItem.update({
    data: foreignKeyReplacement(input),
    where: { id },
  });
};

export const deleteUserListItem = ({ id }) => {
  return db.userListItem.delete({
    where: { id },
  });
};

export const UserListItem = {
  listItem: (_obj, { root }) =>
    db.userListItem.findOne({ where: { id: root.id } }).listItem(),
};
