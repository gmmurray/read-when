import { db } from 'src/lib/db';
import { foreignKeyReplacement } from 'src/services/relationWorkaround';

export const listOwners = () => {
  return db.listOwner.findMany();
};

export const listOwner = ({ listId, ownerIdentifier }) => {
  return db.listOwner.findOne({
    where: { listId, ownerIdentifier },
  });
};

export const createlistOwner = ({ input }) => {
  return db.listOwner.create({
    data: foreignKeyReplacement(input),
  });
};

export const updatelistOwner = ({ listId, input }) => {
  return db.listOwner.update({
    data: foreignKeyReplacement(input),
    where: { listId },
  });
};

export const deleteListOwner = ({ listId, ownerIdentifier }) => {
  return db.listOwner.delete({
    where: { listId, ownerIdentifier },
  });
};

export const deleteListOwnersForList = ({ listId }) => {
  return db.listOwner.deleteMany({
    where: { listId },
  });
};

export const ListOwner = {
  list: (_obj, { root }) =>
    db.listOwner.findOne({ where: { id: root.id } }).list(),
};
