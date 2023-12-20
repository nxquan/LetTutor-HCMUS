import {SCHEDULE} from './_constants';
import {get} from './api';

export const getSchedules = async (config = {}) => {
  return get(SCHEDULE.GET_SCHEDULES, config);
};
