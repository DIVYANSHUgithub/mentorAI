import { createCourseSection, deleteCourseSection } from './course.service.js';

export const createSectionForCourse = (courseId, payload) =>
  createCourseSection(courseId, payload);

export const removeSectionFromCourse = (courseId, sectionId) =>
  deleteCourseSection(courseId, sectionId);
