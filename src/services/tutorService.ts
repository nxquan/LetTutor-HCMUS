import {AUTH, TUTOR} from './_constants';
import {get, post, put} from './api';

export const getTutorByPage = (config = {}) => {
  return get(TUTOR.GET_TUTORS, config);
};

export const getTutorInfoById = (config: any = {}) => {
  return get(TUTOR.GET_TUTOR_INFO(config?.params?.tutorId), config);
};
export const getFeedbackByTutorId = (tutorId: string, config: any = {}) => {
  return get(TUTOR.GET_FEEDBACK(tutorId), config);
};

export const searchTutors = (data = {}, config = {}) => {
  return post(TUTOR.SEARCH_TUTORS, data, config);
};

export const addFavoriteTutor = (data = {}, config = {}) => {
  return post(TUTOR.ADD_FAVORITE, data, config);
};

export const becomeTutor = (data = {}, config = {}) => {
  return post(TUTOR.BECOME_TUTOR, data, config);
};
