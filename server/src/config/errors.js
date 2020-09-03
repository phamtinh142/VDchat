const httpStatus = require('http-status');
const APIError = require('../utils/APIError');

const { env } = require('./vars');

const handler = (err, req, res, next) => {
  const response = {
    code: err.status,
    message: err.message || httpStatus[err.status],
    errors: err.errors,
    stack: err.stack,
  };

  // if (env !== 'development') {
  //   delete response.stack;
  // }

  delete response.stack;

  res.status(err.status);
  res.json(response);
};

exports.converter = (err, req, res, next) => {
  let convertedError = err;

  if (err.status === 400 && err.data && Array.isArray(err.data)) {
    convertedError = new APIError({
      message: 'Validation Error',
      status: err.status,
      errors: err.data,
      stack: err.stack,
    });
  } else if (!(err instanceof APIError)) {
    convertedError = new APIError({
      message: err.message,
      status: err.status,
      stack: err.stack,
    });
  }
  return handler(convertedError, req, res);
};

exports.notFound = (req, res, next) => {
  const err = new APIError({
    message: 'Not Found',
    status: httpStatus.NOT_FOUND,
  });
  return handler(err, req, res);
};

exports.handler = handler;
