const express = require('express');
const router = express.Router();
const {
  createComment,
  getCommentsByPost,
  getCommentById,
  updateComment,
  deleteComment,
} = require('../controllers/commentController');
const { commentRules, commentUpdateRules } = require('../middleware/validate');
const { authenticate } = require('../middleware/auth');

// GET /api/comments?post_id= — public
router.get('/', getCommentsByPost);

// GET /api/comments/:id — public
router.get('/:id', getCommentById);

// POST /api/comments — authenticated
router.post('/', authenticate, commentRules, createComment);

// PUT /api/comments/:id — authenticated + owner
router.put('/:id', authenticate, commentUpdateRules, updateComment);

// DELETE /api/comments/:id — authenticated + owner
router.delete('/:id', authenticate, deleteComment);

module.exports = router;
