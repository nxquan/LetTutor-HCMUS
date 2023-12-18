import {COURSE} from './_constants';
import {get} from './api';

export const getCourses = async (config = {}) => {
  return get(COURSE.GET_COURSES, config);
};
export const getCourseById = async (courseId: string, config = {}) => {
  return get(COURSE.GET_COURSE_BY_ID(courseId), config);
};

export const getContentCategories = async (config = {}) => {
  return get(COURSE.GET_CONTENT_CATEGORY, config);
};
