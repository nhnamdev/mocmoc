const AppError = require("../utils/AppError");
const config = require("../config/env");

function notFoundHandler(req, _res, next) {
  next(new AppError(`Route ${req.method} ${req.originalUrl} not found`, 404));
}

function errorHandler(error, _req, res, _next) {
  const statusCode = error.statusCode || 500;
  const payload = {
    success: false,
    message: statusCode === 500 ? "Internal server error" : error.message,
  };

  if (error.details) {
    payload.details = error.details;
  }

  if (config.nodeEnv !== "production" && statusCode === 500) {
    payload.error = error.message;
  }

  res.status(statusCode).json(payload);
}

module.exports = {
  notFoundHandler,
  errorHandler,
};
