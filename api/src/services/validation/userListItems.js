import { UserInputError } from '@redwoodjs/api';
import { statusOptions } from 'src/shared/constants/userListItemStatus';
import {
  INVALID_INPUT,
  REQUIRED_MESSAGE,
} from 'src/services/validation/messages';

export const validateUserListItem = input => {
  const messages = {};

  if (!input.userIdentifier) {
    messages['userIdentifier'] = [REQUIRED_MESSAGE];
  }

  if (!input.listItemId) {
    messages['listItemId'] = [REQUIRED_MESSAGE];
  }

  if (!input.userListId) {
    messages['userListId'] = [REQUIRED_MESSAGE];
  }

  if (!input.status) {
    messages['status'] = [REQUIRED_MESSAGE];
  }

  if (
    input.status &&
    !Object.keys(statusOptions).some(option => statusOptions[option].value)
  ) {
    messages['status'] = [INVALID_INPUT('status')];
  }

  if (input.owned === null || input.owned === undefined) {
    messages['owned'] = [REQUIRED_MESSAGE];
  }

  if (Object.keys(messages).length > 0) {
    throw new UserInputError('Cannot create new user list item', messages);
  }
};
