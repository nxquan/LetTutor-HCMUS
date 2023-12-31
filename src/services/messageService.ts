import {MESSAGE} from './_constants';
import {get} from './api';

export const getAllRecipients = async (config = {}) => {
  return get(MESSAGE.GET_RECIPIENTS, config);
};

export const getMessageByFilter = async (recipientId: string, config = {}) => {
  return get(MESSAGE.GET_MESSAGES(recipientId), config);
};
