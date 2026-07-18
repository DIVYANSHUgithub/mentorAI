import Lecture from '../models/lecture.model.js';

export const createLecture = (payload) => Lecture.create(payload);

export const findLecturesByCourseId = (courseId) =>
  Lecture.find({ courseId }).lean();

export const findLecturesBySectionId = (sectionId) =>
  Lecture.find({ sectionId }).lean();

export const deleteLecturesByCourseId = (courseId) =>
  Lecture.deleteMany({ courseId });
