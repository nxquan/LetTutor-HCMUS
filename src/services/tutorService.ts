import {AUTH, TUTOR} from './_constants';
import {get, post, put} from './api';

// export const getTutorByPage = (config = {}) => {
//   return get(TUTOR.GET_TUTORS, config);
// };

export const searchTutors = (data = {}, config = {}) => {
  return post(TUTOR.SEARCH_TUTORS, data, config);
};

export const addFavoriteTutor = (data = {}, config = {}) => {
  return post(TUTOR.ADD_FAVORITE, data, config);
};

export const becomeTutor = (data = {}, config = {}) => {
  return put(TUTOR.BECOME_TUTOR, data, config);
};
