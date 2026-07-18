import asyncHandler from '../utils/asyncHandler.js';
import {
  createSectionForCourse,
  removeSectionFromCourse,
} from '../services/section.service.js';

export const createSectionController = asyncHandler(async (req, res) => {
  const course = await createSectionForCourse(req.params.courseId, req.body);

  res.status(201).json({
    success: true,
    message: 'Section created successfully',
    course,
  });
});

export const deleteSectionController = asyncHandler(async (req, res) => {
  const course = await removeSectionFromCourse(
    req.params.courseId,
    req.params.sectionId
  );

  res.send({
    course,
  });
});
