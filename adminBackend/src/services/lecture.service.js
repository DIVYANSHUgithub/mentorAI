import ApiError from '../utils/ApiError.js';
import { findCourseById } from '../repositories/course.repository.js';
import {
  createLecture as createLectureRecord,
  findLecturesBySectionId,
} from '../repositories/lecture.repository.js';
import { findSectionsByCourseId } from '../repositories/section.repository.js';
import { normalizeLecturePayload } from '../validators/lecture.validator.js';
import { getSignedFileUrl, uploadFileBuffer } from './s3.service.js';

export const uploadLecture = async (courseId, sectionId, payload, file) => {
  if (!file) {
    throw new ApiError(400, 'No file uploaded');
  }

  const normalizedPayload = normalizeLecturePayload(payload);
  const fileKey =
    `course-video/${courseId}-section-${sectionId}` +
    `-lectureVideo-${Date.now()}-${file.originalname}`;

  await uploadFileBuffer({
    key: fileKey,
    buffer: file.buffer,
    contentType: file.mimetype,
  });

  return createLectureRecord({
    courseId,
    sectionId,
    ...normalizedPayload,
    fileUrl: fileKey,
  });
};

export const getCourseLectureView = async (courseId, lectureId) => {
  const course = await findCourseById(courseId);

  if (!course) {
    throw new ApiError(404, 'Course not found');
  }

  const sections = await findSectionsByCourseId(courseId);

  const sectionsWithLectures = await Promise.all(
    sections.map(async (section) => {
      const lectures = await findLecturesBySectionId(section._id);

      const lecturesWithUrls = await Promise.all(
        lectures.map(async (lecture) => ({
          ...lecture,
          videoUrl: await getSignedFileUrl(lecture.fileUrl),
        }))
      );

      return {
        ...section,
        lectures: lecturesWithUrls,
      };
    })
  );

  const lectureExists = sectionsWithLectures.some((section) =>
    section.lectures.some((lecture) => lecture._id.toString() === lectureId)
  );

  if (!lectureExists) {
    throw new ApiError(404, 'Lecture not found in this course');
  }

  return {
    ...course,
    sections: sectionsWithLectures,
  };
};
