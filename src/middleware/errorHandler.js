import { AppError } from '../utils/AppError.js';

const errorHandler = (err, req, res, next) => {
  console.error(err);

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }

  if (err.code === '23505') {
    return res.status(400).json({
      status: 'failed',
      message: 'Email already exists',
    });
  }

  if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
    return res.status(401).json({
      status: 'failed',
      message: 'Invalid or expired token',
    });
  }

  res.status(500).json({
    status: 'error',
    message: 'Something went wrong',
  });
};

export default errorHandler;
