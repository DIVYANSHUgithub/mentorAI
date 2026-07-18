import { Router } from 'express';
import {
  getLectureController,
  uploadLectureController,
} from '../controllers/lecture.controller.js';
import { lectureUpload } from '../middlewares/upload.middleware.js';

const router = Router();

router.post(
  '/:courseId/sections/:sectionId/upload',
  lectureUpload.single('file'),
  uploadLectureController
);
router.get('/:courseId/:lectureId', getLectureController);

export default router;
