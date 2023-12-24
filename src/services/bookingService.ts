import {BOOKING} from './_constants';
import {deleteRequest, get, post, put} from './api';

export const getHistoryOfBooking = (config = {}) => {
  return get(BOOKING.GET_BOOKING, config);
};

export const getNextBookings = (config = {}) => {
  return get(BOOKING.GET_NEXT_BOOKING, config);
};

export const placeBooking = (data = {}, config = {}) => {
  return post(BOOKING.PLACE_BOOKING, data, config);
};
export const cancelBooking = (config = {}) => {
  return deleteRequest(BOOKING.CANCEL_BOOKING, config);
};

export const addFeedback = (data = {}, config = {}) => {
  return post(BOOKING.CREATE_FEEDBACK, data, config);
};

export const editFeedback = (data = {}, config = {}) => {
  return put(BOOKING.CREATE_FEEDBACK, data, config);
};

export const editRequest = (bookingId: string, data = {}, config = {}) => {
  return post(BOOKING.EDIT_REQUEST(bookingId), data, config);
};
