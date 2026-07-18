import asyncHandler from '../utils/asyncHandler.js';
import {
  createCourse,
  deleteCourse,
  getCourseById,
  getCourses,
  publishCourse,
  updateCoursePricing,
} from '../services/course.service.js';

export const createCourseController = asyncHandler(async (req, res) => {
  const course = await createCourse(req.body, req.file);

  res.status(201).json({
    success: true,
    message: 'Course created successfully',
    course,
    courseId: course._id,
  });
});

export const deleteCourseController = asyncHandler(async (req, res) => {
  const courses = await deleteCourse(req.params.courseId);

  res.send({
    message: 'course deleted successfully',
    course: courses,
  });
});

export const getCoursesController = asyncHandler(async (req, res) => {
  const courses = await getCourses();

  res.status(200).json({
    success: true,
    count: courses.length,
    courses,
  });
});

export const getCourseByIdController = asyncHandler(async (req, res) => {
  const course = await getCourseById(req.params.courseId);

  res.send({
    course,
  });
});

export const updateCoursePriceController = asyncHandler(async (req, res) => {
  const course = await updateCoursePricing(req.params.courseId, req.body);

  res.send({
    course,
  });
});

export const publishCourseController = asyncHandler(async (req, res) => {
  const course = await publishCourse(req.params.courseId);

  res.send({
    course,
  });
});
