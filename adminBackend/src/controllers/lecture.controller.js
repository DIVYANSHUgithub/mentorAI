import asyncHandler from '../utils/asyncHandler.js';
import {
  getCourseLectureView,
  uploadLecture,
} from '../services/lecture.service.js';

export const uploadLectureController = asyncHandler(async (req, res) => {
  const lecture = await uploadLecture(
    req.params.courseId,
    req.params.sectionId,
    req.body,
    req.file
  );

  res.status(201).json({
    success: true,
    message: 'Lecture uploaded successfully',
    lecture,
  });
});

export const getLectureController = asyncHandler(async (req, res) => {
  const course = await getCourseLectureView(
    req.params.courseId,
    req.params.lectureId
  );

  res.json({
    course,
  });
});
