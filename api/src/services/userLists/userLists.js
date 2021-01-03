import { db } from 'src/lib/db';
import { foreignKeyReplacement } from 'src/services/relationWorkaround';

export const userLists = () => {
  return db.userList.findMany();
};

export const userList = ({ id }) => {
  return db.userList.findOne({
    where: { id },
  });
};

export const createUserList = ({ input }) => {
  return db.userList.create({
    data: foreignKeyReplacement(input),
  });
};

export const updateUserList = ({ id, input }) => {
  return db.userList.update({
    data: foreignKeyReplacement(input),
    where: { id },
  });
};

export const deleteUserList = ({ id }) => {
  return db.userList.delete({
    where: { id },
  });
};

export const UserList = {
  list: (_obj, { root }) =>
    db.userList.findOne({ where: { id: root.id } }).list(),
};
