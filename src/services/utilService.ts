import {CALL} from './_constants';
import {get, put} from './api';

export const getMinuteTotal = async (config = {}) => {
  return get(CALL.GET_TOTAL, config);
};
