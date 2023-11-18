import {User} from '@/types';
import {ACTION_TYPE} from '.';
import {feedbacks, tutorDetails, tutors} from './mock-data';

export type initStateType = {
  users: User[];
  currentUser: User | null;
  tutors: any[];
  tutorDetails: any[];
  feedbacks: any[];
};

export const initState: initStateType = {
  users: [],
  currentUser: null,
  tutors: tutors.rows,
  tutorDetails: tutorDetails,
  feedbacks: feedbacks,
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
      console.log('TOGGLE_FAVORITE_TUTOR');
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
