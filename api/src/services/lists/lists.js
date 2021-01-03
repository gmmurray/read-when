import { ForbiddenError } from '@redwoodjs/api';

import { db } from 'src/lib/db';
import { getCurrentUser, requireAuth, hasRole } from 'src/lib/mockAuth';
import { foreignKeyReplacement } from 'src/services/relationWorkaround';

const requireListAccess = ({ ownerIdentifier, isPublic }) => {
  const user = getCurrentUser();
  if (hasRole('admin')) return;
  if (!isPublic && ownerIdentifier !== user.id) {
    throw new ForbiddenError('User does not have access to this list');
  }
};

export const lists = () => {
  const user = getCurrentUser();
  if (hasRole('admin')) return db.list.findMany();

  requireAuth();
  return db.list.findMany({
    where: {
      OR: [{ ownerIdentifier: user.id }, { isPublic: true }],
    },
  });
};

export const list = async ({ id }) => {
  return checkListAccess({ id, checkOwner: true, checkPublic: true });
};

export const createList = ({ input }) => {
  requireAuth();
  return db.list.create({
    data: foreignKeyReplacement(input),
  });
};

export const updateList = async ({ id, input }) => {
  await checkListAccess({ id, checkOwner: true, checkPublic: false });

  return db.list.update({
    data: foreignKeyReplacement(input),
    where: { id },
  });
};

export const deleteList = async ({ id }) => {
  await checkListAccess({ id, checkOwner: true, checkPublic: false });
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

export const checkListAccess = async ({ id, checkOwner, checkPublic }) => {
  const result = await db.list.findOne({
    where: { id },
  });

  if (!result)
    throw new ForbiddenError(
      'User does not have access or resource does not exist',
    );

  const { ownerIdentifier, isPublic } = result;
  requireListAccess({
    ownerIdentifier: checkOwner ? ownerIdentifier : undefined,
    isPublic: checkPublic ? isPublic : undefined,
  });

  return result;
};
