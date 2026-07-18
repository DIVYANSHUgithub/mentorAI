import { Router } from 'express';
import {
  createSectionController,
  deleteSectionController,
} from '../controllers/section.controller.js';

const router = Router({ mergeParams: true });

router.post('/', createSectionController);
router.delete('/:sectionId', deleteSectionController);

export default router;
