const CourseModel = require('../Models/Course');

const getAllCourses = async (req, res) => {
  try {
    const { status, category, search } = req.query;
    const filter = {};

    if (status) filter.status = status;
    if (category) filter.category = category;
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { instructor: { $regex: search, $options: 'i' } },
        { shortDescription: { $regex: search, $options: 'i' } },
      ];
    }

    const courses = await CourseModel.find(filter).sort({ createdAt: -1 });
    res.status(200).json(courses);
  } catch (error) {
    console.error('getAllCourses error:', error);
    res.status(500).json({ message: 'Failed to fetch courses' });
  }
};

const getCourseStats = async (req, res) => {
  try {
    const [total, published, draft, archived] = await Promise.all([
      CourseModel.countDocuments(),
      CourseModel.countDocuments({ status: 'published' }),
      CourseModel.countDocuments({ status: 'draft' }),
      CourseModel.countDocuments({ status: 'archived' }),
    ]);

    res.status(200).json({ total, published, draft, archived });
  } catch (error) {
    console.error('getCourseStats error:', error);
    res.status(500).json({ message: 'Failed to fetch course stats' });
  }
};

const getCourseById = async (req, res) => {
  try {
    const course = await CourseModel.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.status(200).json(course);
  } catch (error) {
    console.error('getCourseById error:', error);
    res.status(500).json({ message: 'Failed to fetch course' });
  }
};

const createCourse = async (req, res) => {
  try {
    const { title } = req.body;
    if (!title || !title.trim()) {
      return res.status(400).json({ message: 'Course title is required' });
    }

    const course = await CourseModel.create(req.body);
    res.status(201).json(course);
  } catch (error) {
    console.error('createCourse error:', error);
    res.status(500).json({ message: 'Failed to create course' });
  }
};

const updateCourse = async (req, res) => {
  try {
    const course = await CourseModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.status(200).json(course);
  } catch (error) {
    console.error('updateCourse error:', error);
    res.status(500).json({ message: 'Failed to update course' });
  }
};

const deleteCourse = async (req, res) => {
  try {
    const course = await CourseModel.findByIdAndDelete(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.status(200).json({ message: 'Course deleted successfully' });
  } catch (error) {
    console.error('deleteCourse error:', error);
    res.status(500).json({ message: 'Failed to delete course' });
  }
};

const addSection = async (req, res) => {
  try {
    const course = await CourseModel.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    course.sections.push(req.body);
    await course.save();
    res.status(201).json(course);
  } catch (error) {
    console.error('addSection error:', error);
    res.status(500).json({ message: 'Failed to add section' });
  }
};

const updateSection = async (req, res) => {
  try {
    const course = await CourseModel.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    const section = course.sections.id(req.params.sectionId);
    if (!section) {
      return res.status(404).json({ message: 'Section not found' });
    }

    Object.assign(section, req.body);
    await course.save();
    res.status(200).json(course);
  } catch (error) {
    console.error('updateSection error:', error);
    res.status(500).json({ message: 'Failed to update section' });
  }
};

const deleteSection = async (req, res) => {
  try {
    const course = await CourseModel.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    const section = course.sections.id(req.params.sectionId);
    if (!section) {
      return res.status(404).json({ message: 'Section not found' });
    }

    section.deleteOne();
    await course.save();
    res.status(200).json(course);
  } catch (error) {
    console.error('deleteSection error:', error);
    res.status(500).json({ message: 'Failed to delete section' });
  }
};

const addLecture = async (req, res) => {
  try {
    const course = await CourseModel.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    const section = course.sections.id(req.params.sectionId);
    if (!section) {
      return res.status(404).json({ message: 'Section not found' });
    }

    section.lectures.push(req.body);
    await course.save();
    res.status(201).json(course);
  } catch (error) {
    console.error('addLecture error:', error);
    res.status(500).json({ message: 'Failed to add lecture content' });
  }
};

module.exports = {
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
};
