import {
  ADD_COURSE,
  ADD_USER,
  CHANGE_PASSWORD,
  CHANGE_PROFILE,
  LOGIN,
  LOG_OUT,
  RESET_PASSWORD,
  TOGGLE_FAVORITE_TUTOR,
  ADD_APPLICATION,
  UPDATE_APPLICATION,
  ADD_BOOKING,
  EDIT_STUDENT_REQUEST,
  CHANGE_LANGUAGE,
} from './constants';

export const login = (payload: any) => {
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

export const changeLanguage = (payload: any) => {
  return {
    payload,
    type: CHANGE_LANGUAGE,
  };
};
