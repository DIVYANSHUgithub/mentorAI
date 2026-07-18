import COURSE_STATUS from '../constants/courseStatus.js';
import ApiError from '../utils/ApiError.js';
import {
  createCourse as createCourseRecord,
  deleteCourseById,
  findAllCourses,
  findAllCoursesSorted,
  findCourseById,
  updateCourseById,
} from '../repositories/course.repository.js';
import {
  createLecture,
  deleteLecturesByCourseId,
  findLecturesByCourseId,
  findLecturesBySectionId,
} from '../repositories/lecture.repository.js';
import {
  createSection,
  deleteSectionById,
  deleteSectionsByCourseId,
  findSectionsByCourseId,
} from '../repositories/section.repository.js';
import {
  deleteFileByKey,
  getSignedFileUrl,
  uploadFileBuffer,
} from './s3.service.js';
import {
  normalizePricingPayload,
  parseIncludedField,
} from '../validators/course.validator.js';

export const createCourse = async (payload, file) => {
  if (!file) {
    throw new ApiError(400, 'Thumbnail image is required');
  }

  const fileKey = `course-thumbnails/${Date.now()}-${file.originalname}`;

  await uploadFileBuffer({
    key: fileKey,
    buffer: file.buffer,
    contentType: file.mimetype,
  });

  const included = parseIncludedField(payload.included);

  const course = await createCourseRecord({
    title: payload.title,
    subtitle: payload.subtitle,
    category: payload.category,
    subcategory: payload.subcategory,
    instructor: payload.instructor,
    language: payload.language,
    level: payload.level,
    shortDescription: payload.shortDescription,
    fullDescription: payload.fullDescription,
    thumbnailKey: fileKey,
    included,
    publishDate: payload.publishDate,
    status: payload.status || COURSE_STATUS.DRAFT,
  });

  return course;
};

export const getCourses = async () => {
  const courses = await findAllCoursesSorted();

  return Promise.all(
    courses.map(async (course) => ({
      ...course,
      thumbnailUrl: await getSignedFileUrl(course.thumbnailKey),
    }))
  );
};

export const getCourseById = async (courseId) => {
  const course = await findCourseById(courseId);

  if (!course) {
    throw new ApiError(404, 'Course not found');
  }

  const sections = await findSectionsByCourseId(courseId);

  const sectionsWithLectures = await Promise.all(
    sections.map(async (section) => ({
      ...section,
      lectures: await findLecturesBySectionId(section._id),
    }))
  );

  return {
    ...course,
    sections: sectionsWithLectures,
    thumbnailUrl: await getSignedFileUrl(course.thumbnailKey),
  };
};

export const createCourseSection = async (courseId, payload) => {
  await createSection({
    courseId,
    title: payload.title,
    description: payload.description,
    order: payload.order,
  });

  const course = await findCourseById(courseId);
  const sections = await findSectionsByCourseId(courseId);

  return {
    ...course,
    sections,
  };
};

export const deleteCourse = async (courseId) => {
  const course = await findCourseById(courseId);

  if (!course) {
    throw new ApiError(404, 'course not found');
  }

  const lectures = await findLecturesByCourseId(courseId);

  for (const lecture of lectures) {
    await deleteFileByKey(lecture.fileUrl || lecture.fileKey);
  }

  await deleteLecturesByCourseId(courseId);
  await deleteSectionsByCourseId(courseId);
  await deleteFileByKey(course.thumbnailKey);
  await deleteCourseById(courseId);

  return findAllCourses();
};

export const deleteCourseSection = async (courseId, sectionId) => {
  const course = await findCourseById(courseId);

  if (!course) {
    throw new ApiError(404, 'Course not found');
  }

  await deleteSectionById(sectionId);

  return {
    ...course,
    sections: await findSectionsByCourseId(courseId),
  };
};

export const updateCoursePricing = async (courseId, payload) => {
  const course = await findCourseById(courseId);

  if (!course) {
    throw new ApiError(404, 'Course not found');
  }

  return updateCourseById(courseId, normalizePricingPayload(payload));
};

export const publishCourse = async (courseId) => {
  const course = await findCourseById(courseId);

  if (!course) {
    throw new ApiError(404, 'course not found');
  }

  return updateCourseById(courseId, {
    status: COURSE_STATUS.PUBLISHED,
  });
};
