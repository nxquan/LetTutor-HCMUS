import {AUTH, TUTOR} from './_constants';
import {get, post} from './api';

export const getTutorByPage = (config = {}) => {
  return get(TUTOR.GET_TUTORS, config);
};
