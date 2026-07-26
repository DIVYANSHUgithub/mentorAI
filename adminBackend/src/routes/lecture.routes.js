import { Router } from 'express';
import {
  getLectureController,
  uploadLectureController,
} from '../controllers/lecture.controller.js';
import { lectureUpload } from '../middlewares/upload.middleware.js';
import { ensureAuthenticated } from '../middlewares/Auth.js';
import { isEnrolled } from '../middlewares/isEnrolled.js';

const router = Router();

router.post(
  '/:courseId/sections/:sectionId/upload',
  lectureUpload.single('file'),
  uploadLectureController
);
router.get('/:courseId/:lectureId',ensureAuthenticated, isEnrolled, getLectureController);

export default router;
