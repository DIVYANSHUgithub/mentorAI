import Course from '../models/course.model.js';

export const createCourse = (payload) => Course.create(payload);

export const findCourseById = (courseId) => Course.findById(courseId).lean();

export const findAllCourses = () => Course.find().lean();

export const findAllCoursesSorted = () =>
  Course.find().sort({ createdAt: -1 }).lean();

export const updateCourseById = (courseId, payload) =>
  Course.findByIdAndUpdate(courseId, payload, {
    returnDocument: 'after',
  }).lean();

export const deleteCourseById = (courseId) =>
  Course.findByIdAndDelete(courseId);
