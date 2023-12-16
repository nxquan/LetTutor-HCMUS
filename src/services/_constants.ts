export const AUTH = {
  REGISTER: '/auth/register',
  LOGIN: '/auth/login',
  VERIFY_ACCOUNT: (token: string) => `/auth/verifyAccount?token=${token}`,
  FORGOT_PASSWORD: '/user/forgotPassword',
};

export const TUTOR = {
  GET_TUTORS: 'tutor/more',
  GET_TUTOR_INFO: (tutorId: string) => `/tutor/${tutorId}`,
  GET_FEEDBACK: (tutorId: string) => `/feedback/v2/${tutorId}`,
  SEARCH_TUTORS: '/tutor/search',
  ADD_FAVORITE: '/user/manageFavoriteTutor',
  BECOME_TUTOR: '/tutor/register',
};

export const BOOKING = {
  GET_BOOKING: '/booking/list/student',
  GET_NEXT_BOOKING: '/booking/next',
  CREATE_FEEDBACK: '/user/feedbackTutor',
};

export const REPORT = {
  GET_REASON: '/lesson-report/reason',
  POST_REPORT: '/lesson-report/save-report',
};

export const CALL = {
  GET_TOTAL: '/call/total',
};
