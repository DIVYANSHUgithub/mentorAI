const mongoose = require('mongoose');

const lectureSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    contentType: {
      type: String,
      enum: ['video', 'document', 'presentation', 'audio', 'other'],
      default: 'video',
    },
    description: { type: String, default: '' },
    duration: { type: String, default: '' },
    isPreview: { type: Boolean, default: false },
    fileName: { type: String, default: '' },
    fileSize: { type: String, default: '' },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const sectionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: '' },
    order: { type: Number, default: 1 },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },
    lectures: [lectureSchema],
  },
  { timestamps: true }
);

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    subtitle: { type: String, default: '' },
    shortDescription: { type: String, default: '' },
    fullDescription: { type: String, default: '' },
    category: { type: String, default: '' },
    subcategory: { type: String, default: '' },
    instructor: { type: String, default: 'Admin User' },
    language: { type: String, default: 'English' },
    level: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced', 'all'],
      default: 'beginner',
    },
    status: {
      type: String,
      enum: ['draft', 'published', 'archived'],
      default: 'draft',
    },
    publishDate: { type: Date, default: null },
    thumbnail: { type: String, default: '' },
    price: { type: Number, default: 0 },
    originalPrice: { type: Number, default: 0 },
    isFree: { type: Boolean, default: false },
    included: [{ type: String }],
    requirements: [{ type: String }],
    outcomes: [{ type: String }],
    sections: [sectionSchema],
    studentCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const CourseModel = mongoose.model('courses', courseSchema);
module.exports = CourseModel;
