const pool = require('../config/db');

const PostModel = {
  async findAll() {
    const [rows] = await pool.execute(
      `SELECT p.*, u.username AS author_username
       FROM posts p
       JOIN users u ON p.author_id = u.id
       ORDER BY p.created_at DESC`
    );
    return rows;
  },

  async findById(id) {
    const [rows] = await pool.execute(
      `SELECT p.*, u.username AS author_username
       FROM posts p
       JOIN users u ON p.author_id = u.id
       WHERE p.id = ?`,
      [id]
    );
    return rows[0] || null;
  },

  async findByAuthor(authorId) {
    const [rows] = await pool.execute(
      `SELECT p.*, u.username AS author_username
       FROM posts p
       JOIN users u ON p.author_id = u.id
       WHERE p.author_id = ?
       ORDER BY p.created_at DESC`,
      [authorId]
    );
    return rows;
  },

  async create({ title, content, author_id }) {
    const [result] = await pool.execute(
      'INSERT INTO posts (title, content, author_id) VALUES (?, ?, ?)',
      [title, content, author_id]
    );
    return { id: result.insertId, title, content, author_id };
  },

  async update(id, { title, content }) {
    await pool.execute(
      'UPDATE posts SET title = ?, content = ? WHERE id = ?',
      [title, content, id]
    );
    return this.findById(id);
  },

  async delete(id) {
    const [result] = await pool.execute('DELETE FROM posts WHERE id = ?', [id]);
    return result.affectedRows > 0;
  },
};

module.exports = PostModel;
