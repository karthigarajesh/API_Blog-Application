const { body, query } = require('express-validator');

const registerRules = [
  body('username')
    .trim()
    .isLength({ min: 3, max: 50 })
    .withMessage('Username must be 3–50 characters'),
  body('email')
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
];

const loginRules = [
  body('email')
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
];

const postRules = [
  body('title')
    .trim()
    .isLength({ min: 1, max: 255 })
    .withMessage('Title is required and must be under 255 characters'),
  body('content')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Content is required'),
];

const commentRules = [
  body('post_id')
    .isInt({ min: 1 })
    .withMessage('Valid post_id is required'),
  body('content')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Comment content is required'),
];

const commentUpdateRules = [
  body('content')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Comment content is required'),
];

module.exports = {
  registerRules,
  loginRules,
  postRules,
  commentRules,
  commentUpdateRules,
};
