import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    subtitle: {
      type: String,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    subcategory: {
      type: String,
      required: true,
    },
    instructor: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    level: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced', 'all levels'],
    },
    shortDescription: {
      type: String,
      required: true,
      trim: true,
    },
    fullDescription: {
      type: String,
      required: true,
      trim: true,
    },
    thumbnailKey: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
    },
    originalPrice: {
      type: Number,
    },
    currency: {
      type: String,
      default: 'INR',
    },
    status: {
      type: String,
      enum: ['draft', 'published'],
      default: 'draft',
    },
    included: {
      type: [String],
      default: [],
    },
    publishDate: {
      type: Date,
      default: Date.now,
    },
    isFree: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Course = mongoose.model('Course', courseSchema);

export default Course;
