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
export const changePassword = (payload: any) => {
  return {
    payload,
    type: CHANGE_PASSWORD,
  };
};
export const changeProfile = (payload: any) => {
  return {
    payload,
    type: CHANGE_PROFILE,
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

export const addApplication = (payload: any) => {
  return {
    payload,
    type: ADD_APPLICATION,
  };
};
export const addBooking = (payload: any) => {
  return {
    payload,
    type: ADD_BOOKING,
  };
};

export const editStudentRequest = (payload: any) => {
  return {
    payload,
    type: EDIT_STUDENT_REQUEST,
  };
};
