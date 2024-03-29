import AppError from '../utils/AppError.js';

const notFoundHandler = function (req, res, next) {
  next(new AppError(404, `Your requested url ${req.originalUrl} was not found on this server!`));
};

const defaultErrorHandler = function (error, req, res, next) {
  error.status = error.status || 'error';
  error.statusCode = error.statusCode || 500;

  res.status(error.statusCode).json({ status: error.status, message: error.message });
};

export { notFoundHandler, defaultErrorHandler };
