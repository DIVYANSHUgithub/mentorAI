import { Router } from 'express';
import {
  createCourseController,
  deleteCourseController,
  getCourseByIdController,
  getCoursesController,
  publishCourseController,
  updateCoursePriceController,
} from '../controllers/course.controller.js';
import { thumbnailUpload } from '../middlewares/upload.middleware.js';

const router = Router();

router.post('/', thumbnailUpload.single('thumbnail'), createCourseController);
router.delete('/:courseId', deleteCourseController);
router.get('/', getCoursesController);
router.get('/:courseId', getCourseByIdController);
router.post('/:courseId/price', updateCoursePriceController);
router.post('/:courseId/publish', publishCourseController);

export default router;
