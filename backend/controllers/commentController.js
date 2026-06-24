const { validationResult } = require('express-validator');
const CommentModel = require('../models/commentModel');
const PostModel = require('../models/postModel');
const { formatValidationErrors } = require('../utils/helpers');

const createComment = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: formatValidationErrors(errors) });
    }

    const { post_id, content } = req.body;

    // Verify post exists
    const post = await PostModel.findById(post_id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const comment = await CommentModel.create({
      post_id,
      content,
      author_id: req.user.id,
    });

    res.status(201).json({ message: 'Comment added successfully', comment });
  } catch (err) {
    console.error('Create comment error:', err);
    res.status(500).json({ message: 'Server error while creating comment' });
  }
};

const getCommentsByPost = async (req, res) => {
  try {
    const postId = req.query.post_id;
    if (!postId) {
      return res.status(400).json({ message: 'post_id query parameter is required' });
    }

    const comments = await CommentModel.findByPostId(postId);
    res.json({ comments });
  } catch (err) {
    console.error('Get comments error:', err);
    res.status(500).json({ message: 'Server error while fetching comments' });
  }
};

const getCommentById = async (req, res) => {
  try {
    const comment = await CommentModel.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    res.json({ comment });
  } catch (err) {
    console.error('Get comment error:', err);
    res.status(500).json({ message: 'Server error while fetching comment' });
  }
};

const updateComment = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: formatValidationErrors(errors) });
    }

    const comment = await CommentModel.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    // Check ownership
    if (comment.author_id !== req.user.id) {
      return res.status(403).json({ message: 'You can only edit your own comments' });
    }

    const { content } = req.body;
    const updatedComment = await CommentModel.update(req.params.id, { content });

    res.json({ message: 'Comment updated successfully', comment: updatedComment });
  } catch (err) {
    console.error('Update comment error:', err);
    res.status(500).json({ message: 'Server error while updating comment' });
  }
};

const deleteComment = async (req, res) => {
  try {
    const comment = await CommentModel.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    // Check ownership
    if (comment.author_id !== req.user.id) {
      return res.status(403).json({ message: 'You can only delete your own comments' });
    }

    await CommentModel.delete(req.params.id);
    res.json({ message: 'Comment deleted successfully' });
  } catch (err) {
    console.error('Delete comment error:', err);
    res.status(500).json({ message: 'Server error while deleting comment' });
  }
};

module.exports = { createComment, getCommentsByPost, getCommentById, updateComment, deleteComment };
