import {CALL, UTILS} from './_constants';
import {get, post, put} from './api';

export const getMinuteTotal = async (config = {}) => {
  return get(CALL.GET_TOTAL, config);
};

export const getTestPreparations = async (config = {}) => {
  return get(UTILS.GET_TEST_PREPARATION, config);
};

export const getLearnTopics = async (config = {}) => {
  return get(UTILS.GET_LEARN_TOPIC, config);
};

export const reportTutor = async (data = {}, config = {}) => {
  return post(UTILS.REPORT_TUTOR, data, config);
};
