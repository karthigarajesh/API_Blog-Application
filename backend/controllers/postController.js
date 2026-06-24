const { validationResult } = require('express-validator');
const PostModel = require('../models/postModel');
const { formatValidationErrors } = require('../utils/helpers');

const createPost = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: formatValidationErrors(errors) });
    }

    const { title, content } = req.body;
    const post = await PostModel.create({
      title,
      content,
      author_id: req.user.id,
    });

    res.status(201).json({ message: 'Post created successfully', post });
  } catch (err) {
    console.error('Create post error:', err);
    res.status(500).json({ message: 'Server error while creating post' });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const posts = await PostModel.findAll();
    res.json({ posts });
  } catch (err) {
    console.error('Get posts error:', err);
    res.status(500).json({ message: 'Server error while fetching posts' });
  }
};

const getPostById = async (req, res) => {
  try {
    const post = await PostModel.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json({ post });
  } catch (err) {
    console.error('Get post error:', err);
    res.status(500).json({ message: 'Server error while fetching post' });
  }
};

const updatePost = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: formatValidationErrors(errors) });
    }

    const post = await PostModel.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check ownership
    if (post.author_id !== req.user.id) {
      return res.status(403).json({ message: 'You can only edit your own posts' });
    }

    const { title, content } = req.body;
    const updatedPost = await PostModel.update(req.params.id, { title, content });

    res.json({ message: 'Post updated successfully', post: updatedPost });
  } catch (err) {
    console.error('Update post error:', err);
    res.status(500).json({ message: 'Server error while updating post' });
  }
};

const deletePost = async (req, res) => {
  try {
    const post = await PostModel.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check ownership
    if (post.author_id !== req.user.id) {
      return res.status(403).json({ message: 'You can only delete your own posts' });
    }

    await PostModel.delete(req.params.id);
    res.json({ message: 'Post deleted successfully' });
  } catch (err) {
    console.error('Delete post error:', err);
    res.status(500).json({ message: 'Server error while deleting post' });
  }
};

const getMyPosts = async (req, res) => {
  try {
    const posts = await PostModel.findByAuthor(req.user.id);
    res.json({ posts });
  } catch (err) {
    console.error('Get my posts error:', err);
    res.status(500).json({ message: 'Server error while fetching your posts' });
  }
};

module.exports = { createPost, getAllPosts, getPostById, updatePost, deletePost, getMyPosts };
