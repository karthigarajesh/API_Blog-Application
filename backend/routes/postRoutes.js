const express = require('express');
const router = express.Router();
const {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
  getMyPosts,
} = require('../controllers/postController');
const { postRules } = require('../middleware/validate');
const { authenticate } = require('../middleware/auth');

// GET /api/posts — public
router.get('/', getAllPosts);

// GET /api/posts/mine — authenticated user's posts
router.get('/mine', authenticate, getMyPosts);

// GET /api/posts/:id — public
router.get('/:id', getPostById);

// POST /api/posts — authenticated
router.post('/', authenticate, postRules, createPost);

// PUT /api/posts/:id — authenticated + owner
router.put('/:id', authenticate, postRules, updatePost);

// DELETE /api/posts/:id — authenticated + owner
router.delete('/:id', authenticate, deletePost);

module.exports = router;
