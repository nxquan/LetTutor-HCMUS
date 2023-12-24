export const AUTH = {
  REGISTER: '/auth/register',
  LOGIN: '/auth/login',
  VERIFY_ACCOUNT: (token: string) => `/auth/verifyAccount?token=${token}`,
  CHANGE_PASSWORD: '/auth/change-password',
  FORGOT_PASSWORD: '/user/forgotPassword',
};

export const USER = {
  GET_INFO: '/user/info',
  UPLOAD_AVATAR: '/user/uploadAvatar',
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
  PLACE_BOOKING: '/booking',
  CANCEL_BOOKING: '/booking/schedule-detail',
  EDIT_REQUEST: (bookingId: string) => `/booking/student-request/${bookingId}`,
};

export const REPORT = {
  GET_REASON: '/lesson-report/reason',
  POST_REPORT: '/lesson-report/save-report',
};

export const CALL = {
  GET_TOTAL: '/call/total',
};

export const COURSE = {
  GET_COURSES: '/course',
  GET_COURSE_BY_ID: (courseId: string) => `/course/${courseId}`,
  GET_CONTENT_CATEGORY: '/content-category',
  GET_EBOOKS: '/e-book',
};

export const SCHEDULE = {
  GET_SCHEDULES: '/schedule',
};
export const UTILS = {
  GET_TEST_PREPARATION: '/test-preparation',
  GET_LEARN_TOPIC: '/learn-topic',
  REPORT_TUTOR: '/report',
};
