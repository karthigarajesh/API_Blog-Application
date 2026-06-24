const pool = require('../config/db');

const CommentModel = {
  async findByPostId(postId) {
    const [rows] = await pool.execute(
      `SELECT c.*, u.username AS author_username
       FROM comments c
       JOIN users u ON c.author_id = u.id
       WHERE c.post_id = ?
       ORDER BY c.created_at ASC`,
      [postId]
    );
    return rows;
  },

  async findById(id) {
    const [rows] = await pool.execute(
      `SELECT c.*, u.username AS author_username
       FROM comments c
       JOIN users u ON c.author_id = u.id
       WHERE c.id = ?`,
      [id]
    );
    return rows[0] || null;
  },

  async create({ post_id, content, author_id }) {
    const [result] = await pool.execute(
      'INSERT INTO comments (post_id, content, author_id) VALUES (?, ?, ?)',
      [post_id, content, author_id]
    );
    return this.findById(result.insertId);
  },

  async update(id, { content }) {
    await pool.execute('UPDATE comments SET content = ? WHERE id = ?', [content, id]);
    return this.findById(id);
  },

  async delete(id) {
    const [result] = await pool.execute('DELETE FROM comments WHERE id = ?', [id]);
    return result.affectedRows > 0;
  },
};

module.exports = CommentModel;
