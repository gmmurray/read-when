import { UserInputError } from '@redwoodjs/api';
import { validate } from 'isbn-util';
import {
  INVALID_INPUT,
  REQUIRED_MESSAGE,
} from 'src/services/validation/messages';

export const validateListItem = input => {
  const messages = {};

  if (!input.listId) {
    messages['listId'] = [REQUIRED_MESSAGE];
  }

  if (!input.isbn) {
    messages['isbn'] = [REQUIRED_MESSAGE];
  }
  if (input.isbn && !validate(input.isbn)) {
    messages['isbn'] = [INVALID_INPUT('isbn')];
  }
  if (!input.ordinal) {
    messages['ordinal'] = [REQUIRED_MESSAGE];
  }

  if (Object.keys(messages).length > 0) {
    throw new UserInputError('Cannot create new list item', messages);
  }
};
