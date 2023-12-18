import {AUTH} from './_constants';
import {get, post} from './api';

export const register = (data = {}) => {
  return post(AUTH.REGISTER, data);
};

export const login = (data = {}) => {
  return post(AUTH.LOGIN, data);
};

export const changePassword = (data = {}) => {
  return post(AUTH.CHANGE_PASSWORD, data);
};

export const verifyAccount = (params: any = {}) => {
  return get(AUTH.VERIFY_ACCOUNT(params.token));
};
