import {ACTION_TYPE} from '.';

export type initStateType = {
  currentUser: any;
  tokens: any;
  theme: '';
  language: any;
};

export const initState: initStateType = {
  currentUser: {},
  tokens: {},
  theme: '',
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
        tokens: action.payload?.tokens,
        currentUser: action.payload.user,
      };
    case ACTION_TYPE.LOG_OUT:
      return {
        ...state,
        tokens: {},
        currentUser: null,
      };
    case ACTION_TYPE.CHANGE_LANGUAGE: {
      return {
        ...state,
        language: action.payload?.language,
      };
    }
  }
};

export default reducer;
