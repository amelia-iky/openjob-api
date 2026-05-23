import { AppError } from '../utils/AppError.js';

const notFound = (req, res, next) => {
  next(new AppError('Routes not found', 404));
};

export default notFound;
