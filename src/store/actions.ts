import {
  ADD_COURSE,
  ADD_USER,
  LOGIN,
  LOG_OUT,
  RESET_PASSWORD,
  TOGGLE_FAVORITE_TUTOR,
} from './constants';

export const login = (payload: {email: string; password: string}) => {
  return {
    payload,
    type: LOGIN,
  };
};

export const logout = () => {
  return {
    type: LOG_OUT,
  };
};

export const resetPassword = (payload: {email: string; password: string}) => {
  return {
    payload,
    type: RESET_PASSWORD,
  };
};

export const toggleFavoriteTutor = (payload: {tutorId: string}) => {
  return {
    payload,
    type: TOGGLE_FAVORITE_TUTOR,
  };
};

export const addUser = (payload: {email: string; password: string}) => {
  return {
    payload,
    type: ADD_USER,
  };
};

export const addCourse = (payload: any) => {
  return {
    payload,
    type: ADD_COURSE,
  };
};
