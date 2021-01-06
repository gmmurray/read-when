import { UserInputError } from '@redwoodjs/api';
import { REQUIRED_MESSAGE } from 'src/services/validation/messages';

export const validateUserList = input => {
  const messages = {};

  if (!input.listId) {
    messages['listId'] = [REQUIRED_MESSAGE];
  }

  if (!input.userIdentifier) {
    messages['userIdentifier'] = [REQUIRED_MESSAGE];
  }

  if (Object.keys(messages).length > 0) {
    throw new UserInputError('Cannot create new list item', messages);
  }
};
