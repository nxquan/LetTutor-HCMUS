import {User} from '@/types';
import {ACTION_TYPE} from '.';
import {
  COURSES,
  FEEDBACKS,
  SCHEDULES,
  TUTOR_COURSES,
  TUTOR_DETAILS,
  TUTORS,
} from './mock-data';

export type initStateType = {
  users: User[];
  currentUser: User | null;
  tutors: any[];
  tutorDetails: any[];
  feedbacks: any[];
  tutorCourses: any[];
  courses: any[];
  schedules: any[];
};

export const initState: initStateType = {
  users: [],
  currentUser: null,
  tutors: TUTORS,
  tutorDetails: TUTOR_DETAILS,
  feedbacks: FEEDBACKS,
  tutorCourses: TUTOR_COURSES,
  courses: COURSES,
  schedules: SCHEDULES,
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
    default:
      throw new Error('Invalid action in global reducer');
  }
};

export default reducer;
