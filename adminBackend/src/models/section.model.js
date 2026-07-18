import mongoose from 'mongoose';

const sectionSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  order: {
    type: Number,
  },
});

sectionSchema.index({
  courseId: 1,
});

const Section = mongoose.model('Section', sectionSchema);

export default Section;
