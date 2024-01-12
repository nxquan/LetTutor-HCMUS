import {REPORT} from './_constants';
import {get, put} from './api';

export const getReasons = async (config = {}) => {
  return get(REPORT.GET_REASON, config);
};

export const createReport = async (data = {}, config = {}) => {
  return put(REPORT.POST_REPORT, data, config);
};
