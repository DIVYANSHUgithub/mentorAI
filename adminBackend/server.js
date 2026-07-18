import dotenv from 'dotenv';
import app from './src/app.js';
import connectDatabase from './src/config/database.js';
import logger from './src/utils/logger.js';

dotenv.config();

const PORT = process.env.PORT || 9000;

const startServer = async () => {
  try {
    await connectDatabase();

    app.listen(PORT, () => {
      logger.info(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    logger.error('Server startup failed:', error);
    process.exit(1);
  }
};

startServer();
