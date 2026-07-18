import mongoose from 'mongoose';

const enrollmentSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ['FREE', 'PAID', 'PENDING', 'FAILED'],
      default: 'FREE',
    },
  },
  {
    timestamps: true,
  }
);

const Enrollment = mongoose.model('Enrollment', enrollmentSchema);

export default Enrollment;
