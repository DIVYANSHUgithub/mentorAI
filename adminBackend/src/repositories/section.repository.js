import Section from '../models/section.model.js';

export const createSection = (payload) => Section.create(payload);

export const findSectionsByCourseId = (courseId) =>
  Section.find({ courseId }).lean();

export const deleteSectionsByCourseId = (courseId) =>
  Section.deleteMany({ courseId });

export const deleteSectionById = (sectionId) => Section.findByIdAndDelete(sectionId);
