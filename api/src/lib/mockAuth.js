import { AuthenticationError, ForbiddenError } from '@redwoodjs/api';

//const type = 'admin';
const type = 'nonAdmin';
//const type = 'anon';

const adminUser = {
  app_metadata: {
    provider: 'email',
    roles: ['admin'],
  },
  id: '1',
};

const nonAdminUser = {
  app_metadata: {
    provider: 'email',
    roles: [''],
  },
  id: '2',
};

const anonUser = null;

const defaultContext = {
  currentUser: adminUser,
};

const context = userType => {
  if (!userType) return defaultContext;
  let currentUser;
  switch (userType) {
    case 'admin':
      currentUser = adminUser;
      break;
    case 'nonAdmin':
      currentUser = nonAdminUser;
      break;
    case 'anon':
      currentUser = anonUser;
      break;
    default:
      return null;
  }
  return {
    currentUser,
  };
};

export const getCurrentUser = () => {
  return context(type).currentUser;
};

export const requireAuth = (params = undefined) => {
  if (!context(type).currentUser)
    throw new AuthenticationError('User not found');
  if (params && params.role) {
    if (!context(type).currentUser.app_metadata.roles.includes(params.role))
      throw new ForbiddenError(
        'User does not have access or resource does not exist',
      );
  }
};

export const hasRole = role => {
  return (
    context(type).currentUser &&
    context(type).currentUser.app_metadata.roles.includes(role)
  );
};
