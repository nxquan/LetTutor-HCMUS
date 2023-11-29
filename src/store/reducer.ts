import {User} from '@/types';
import {ACTION_TYPE} from '.';
import {
  COURSES,
  FEEDBACKS,
  SCHEDULES,
  TUTOR_COURSES,
  TUTOR_DETAILS,
  TUTORS,
  COURSE_CATEGORIES,
  INFO,
  learningHourTotal,
  BOOKINGS,
} from './mock-data';

export type initStateType = {
  users: User[];
  userInfos: any;
  currentUser: any;
  tutors: any[];
  tutorDetails: any[];
  feedbacks: any[];
  tutorCourses: any[];
  courses: any[];
  courseCategories: any[];
  schedules: any[];
  theme: '';
  applications: any[];
  bookings: any[];
  learningHourTotal: number;
  language: any;
};

export const initState: initStateType = {
  users: [],
  userInfos: INFO,
  currentUser: {
    email: '',
    password: 'Hello@99',
  },
  theme: '',
  tutors: TUTORS,
  tutorDetails: TUTOR_DETAILS,
  feedbacks: FEEDBACKS,
  tutorCourses: TUTOR_COURSES,
  courses: COURSES,
  courseCategories: COURSE_CATEGORIES,
  schedules: SCHEDULES,
  applications: [],
  bookings: BOOKINGS,
  learningHourTotal: learningHourTotal,
  language: 'English',
};

const reducer = (
  state: initStateType,
  action: {payload: any; type: string},
) => {
  switch (action.type) {
    case ACTION_TYPE.LOGIN:
      return {
        ...state,
        currentUser: action.payload,
      };
    case ACTION_TYPE.LOG_OUT:
      return {
        ...state,
        currentUser: null,
      };

    case ACTION_TYPE.RESET_PASSWORD: {
      const users = state.users;
      users.forEach(item => {
        if (item.email === action.payload.email) {
          item.password = action.payload.password;
        }
      });
      return {
        ...state,
        users,
      };
    }
    case ACTION_TYPE.CHANGE_PASSWORD: {
      const currentUser = state.currentUser;
      if (currentUser.password == action.payload.currentPassword) {
        currentUser.password = action.payload.newPassword;
        return {
          ...state,
          currentUser,
        };
      }
    }
    case ACTION_TYPE.CHANGE_LANGUAGE: {
      return {
        ...state,
        language: action.payload?.language,
      };
    }
    case ACTION_TYPE.CHANGE_PROFILE: {
      const userInfos = state.userInfos.filter(
        (item: any) => item.id !== action.payload?.id,
      );

      return {
        ...state,
        userInfos: [...userInfos, action.payload],
      };
    }

    case ACTION_TYPE.TOGGLE_FAVORITE_TUTOR: {
      const tutors = state.tutors;
      const index = tutors.findIndex(
        (item: any) => item.id === action.payload.tutorId,
      );

      if (index !== -1) {
        if (tutors[index].isFavoriteTutor === null) {
          tutors[index].isFavoriteTutor = true;
        } else {
          tutors[index].isFavoriteTutor = null;
        }
      }
      return {
        ...state,
        tutors,
      };
    }

    case ACTION_TYPE.ADD_USER: {
      const users = state.users;
      users.push(action.payload);
      return {
        ...state,
        users,
      };
    }
    case ACTION_TYPE.ADD_COURSE:
      return {
        ...state,
      };

    case ACTION_TYPE.ADD_APPLICATION:
      return {
        ...state,
        applications: [...state.applications, action.payload],
      };
    case ACTION_TYPE.UPDATE_APPLICATION:
      return {
        ...state,
        applications: [
          ...state.applications.filter(
            application => application.id !== action.payload.id,
          ),
          action.payload,
        ],
      };
    case ACTION_TYPE.ADD_BOOKING: {
      const booking = {
        ...action.payload?.general,
        scheduleDetailInfo: {
          ...action.payload?.scheduleDetailInfo,
          scheduleInfo: {
            ...action.payload?.scheduleInfo,
            tutorInfo: action.payload?.tutorInfo,
          },
        },
      };

      const bookingInfo = {
        createdAtTimeStamp: action.payload?.general?.createdAtTimeStamp,
        updatedAtTimeStamp: action.payload?.general?.updatedAtTimeStamp,
        id: 'c009b14d-a5b2-4e2b-bc73-6900eab49202',
        isDeleted: false,
        createdAt: '2023-11-28T10:39:25.281Z',
        scheduleDetailId: action.payload?.scheduleDetailInfo.id,
        updatedAt: '2023-11-28T10:39:25.401Z',
        cancelReasonId: null,
        userId: action.payload?.general?.userId,
      };

      const schedule = state.schedules.find(item => {
        return item.id === action.payload?.scheduleInfo.id;
      });

      const scheduleDetails = schedule.scheduleDetails;
      scheduleDetails[0].bookingInfo = [
        ...scheduleDetails[0].bookingInfo,
        bookingInfo,
      ];

      return {
        ...state,
        schedules: [
          ...state.schedules.filter(item => {
            return item.id !== action.payload?.scheduleInfo.id;
          }),
          schedule,
        ],
        bookings: [...state.bookings, booking],
      };
    }
    case ACTION_TYPE.EDIT_STUDENT_REQUEST: {
      const index = state.bookings.findIndex(
        booking => booking.id === action.payload.id,
      );
      if (index !== -1) {
        state.bookings[index].studentRequest = action.payload.studentRequest;
      }
      return {
        ...state,
      };
    }
    default:
      throw new Error('Invalid action in global reducer');
  }
};

export default reducer;
