import dotenv from 'dotenv';
import mongoose from 'mongoose';
import logger from '../utils/logger.js';

dotenv.config();

const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    logger.info('MongoDB connected successfully');
  } catch (error) {
    logger.error('MongoDB connection failed:', error);
    throw error;
  }
};

export default connectDatabase;
