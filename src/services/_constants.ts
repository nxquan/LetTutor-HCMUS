export const AUTH = {
  REGISTER: '/auth/register',
  LOGIN: '/auth/login',
  VERIFY_ACCOUNT: (token: string) => `/auth/verifyAccount?token=${token}`,
  FORGOT_PASSWORD: '/user/forgotPassword',
};

export const TUTOR = {
  GET_TUTORS: 'tutor/more',
};
