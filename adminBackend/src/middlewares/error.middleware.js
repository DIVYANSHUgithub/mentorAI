import ApiError from '../utils/ApiError.js';
import logger from '../utils/logger.js';

export const notFoundHandler = (req, res, next) => {
  next(new ApiError(404, `Cannot ${req.method} ${req.originalUrl}`));
};

export const errorHandler = (error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  const message = error.message || 'Internal Server Error';

  logger.error(message, error);

  res.status(statusCode).json({
    success: false,
    message,
    error: error.errors?.length ? error.errors : error.message,
  });
};
