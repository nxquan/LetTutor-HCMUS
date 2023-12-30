import {ACTION_TYPE} from '.';
import EncryptedStorage from 'react-native-encrypted-storage';

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
    case ACTION_TYPE.LOGIN: {
      const {payload} = action;
      EncryptedStorage.setItem(
        'user_session',
        JSON.stringify({
          user: payload.user,
          accessToken: payload.tokens.access.token,
          accessExpires: payload.tokens.access.expires,
          refreshToken: payload.tokens.refresh.token,
          refreshExpires: payload.tokens.refresh.expires,
        }),
      );
      return {
        ...state,
        tokens: action.payload?.tokens,
        currentUser: action.payload.user,
      };
    }
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
