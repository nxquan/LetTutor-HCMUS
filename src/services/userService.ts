import {USER} from './_constants';
import {get, put, post} from './api';

export const getUserInfo = async (config = {}) => {
  return get(USER.GET_INFO, config);
};

export const updateUserInfo = async (data = {}, config = {}) => {
  return put(USER.GET_INFO, data, config);
};

export const uploadUserAvatar = async (data = {}, config = {}) => {
  return post(USER.UPLOAD_AVATAR, data, config);
};
