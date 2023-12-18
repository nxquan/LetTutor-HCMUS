import {USER} from './_constants';
import {get, put} from './api';

export const getUserInfo = async (config = {}) => {
  return get(USER.GET_INFO, config);
};
