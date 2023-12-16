import {BOOKING} from './_constants';
import {get, post, put} from './api';

export const getHistoryOfBooking = (config = {}) => {
  return get(BOOKING.GET_BOOKING, config);
};

export const addFeedback = (data = {}, config = {}) => {
  return post(BOOKING.CREATE_FEEDBACK, data, config);
};

export const editFeedback = (data = {}, config = {}) => {
  return put(BOOKING.CREATE_FEEDBACK, data, config);
};