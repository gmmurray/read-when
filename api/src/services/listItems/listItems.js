import { db } from 'src/lib/db';
import { checkListAccess, lists } from 'src/services/lists/lists';
import { foreignKeyReplacement } from 'src/services/relationWorkaround';

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

export const listItem = async ({ id }) => {
  const item = await db.listItem.findOne({
    where: { id },
  });

  // Throws an error if the related list is unavailable
  await checkListAccess({
    id: item.listId,
    checkOwner: true,
    checkPublic: false,
  });

  return item;
};

export const createListItem = async ({ input }) => {
  // Throws an error if the related list is unavailable
  await checkListAccess({
    id: input.listId,
    checkOwner: true,
    checkPublic: false,
  });

  return db.listItem.create({
    data: foreignKeyReplacement(input),
  });
};

export const updateListItem = async ({ id, input }) => {
  // Check access to old list
  const item = await listItem({ id });
  await checkListAccess({
    id: item.listId,
    checkOwner: true,
    checkPublic: false,
  });

  // Check access to new list
  await checkListAccess({
    id: input.listId,
    checkOwner: true,
    checkPublic: false,
  });

  return db.listItem.update({
    data: foreignKeyReplacement(input),
    where: { id },
  });
};

export const deleteListItem = async ({ id }) => {
  const item = await listItem({ id });
  await checkListAccess({
    id: item.listId,
    checkOwner: true,
    checkPublic: false,
  });
  return db.listItem.delete({
    where: { id },
  });
};

export const ListItem = {
  list: (_obj, { root }) =>
    db.listItem.findOne({ where: { id: root.id } }).list(),
  userListItems: (_obj, { root }) =>
    db.listItem.findOne({ where: { id: root.id } }).userListItems(),
};
