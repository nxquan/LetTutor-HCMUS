export const AUTH = {
  REGISTER: '/auth/register',
  LOGIN: '/auth/login',
  VERIFY_ACCOUNT: (token: string) => `/auth/verifyAccount?token=${token}`,
  FORGOT_PASSWORD: '/user/forgotPassword',
};

export const TUTOR = {
  GET_TUTORS: 'tutor/more',
  GET_TUTOR_INFO: (tutorId: string) => `tutor/${tutorId}`,
  GET_FEEDBACK: (tutorId: string) => `feedback/v2/${tutorId}`,
  SEARCH_TUTORS: 'tutor/search',
  ADD_FAVORITE: 'user/manageFavoriteTutor',
  BECOME_TUTOR: 'tutor/register',
};
