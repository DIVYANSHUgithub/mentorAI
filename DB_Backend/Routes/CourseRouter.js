const router = require('express').Router();
const {
  getAllCourses,
  getCourseStats,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
  addSection,
  updateSection,
  deleteSection,
  addLecture,
} = require('../Controllers/CourseController');

router.get('/stats', getCourseStats);
router.get('/', getAllCourses);
router.get('/:id', getCourseById);
router.post('/', createCourse);
router.put('/:id', updateCourse);
router.delete('/:id', deleteCourse);

router.post('/:id/sections', addSection);
router.put('/:id/sections/:sectionId', updateSection);
router.delete('/:id/sections/:sectionId', deleteSection);
router.post('/:id/sections/:sectionId/lectures', addLecture);

module.exports = router;
