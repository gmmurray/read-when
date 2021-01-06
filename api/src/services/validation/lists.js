import { UserInputError } from '@redwoodjs/api';
import { REQUIRED_MESSAGE } from 'src/services/validation/messages';

export const validateList = input => {
  const messages = {};

  if (input.isPublic === null || input.isPublic === undefined) {
    messages['isPublic'] = [REQUIRED_MESSAGE];
  }

  if (!input.title) {
    messages['title'] = [REQUIRED_MESSAGE];
  }

  if (!input.description) {
    messages['description'] = [REQUIRED_MESSAGE];
  }

  if (!input.category) {
    messages['category'] = [REQUIRED_MESSAGE];
  }

  if (Object.keys(messages).length > 0) {
    throw new UserInputError('Cannot create new list item', messages);
  }
};
