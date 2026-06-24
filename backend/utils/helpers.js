const jwt = require('jsonwebtoken');

const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
};

const formatValidationErrors = (errors) => {
  return errors.array().map((err) => ({
    field: err.path,
    message: err.msg,
  }));
};

module.exports = { generateToken, formatValidationErrors };
