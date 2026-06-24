import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import { MessageCircle, Send, Trash2, Pencil, X, Check, User } from 'lucide-react';

const CommentSection = ({ postId }) => {
  const { user, isAuthenticated } = useAuth();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editContent, setEditContent] = useState('');
  const [error, setError] = useState('');

  const fetchComments = async () => {
    try {
      const res = await api.get(`/comments?post_id=${postId}`);
      setComments(res.data.comments);
    } catch (err) {
      console.error('Failed to load comments:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setSubmitting(true);
    setError('');
    try {
      await api.post('/comments', { post_id: postId, content: newComment.trim() });
      setNewComment('');
      fetchComments();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add comment');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this comment?')) return;
    try {
      await api.delete(`/comments/${id}`);
      setComments(comments.filter((c) => c.id !== id));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete comment');
    }
  };

  const handleEdit = async (id) => {
    if (!editContent.trim()) return;
    try {
      await api.put(`/comments/${id}`, { content: editContent.trim() });
      setEditingId(null);
      setEditContent('');
      fetchComments();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update comment');
    }
  };

  const startEdit = (comment) => {
    setEditingId(comment.id);
    setEditContent(comment.content);
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="mt-10" id="comment-section">
      <div className="flex items-center gap-3 mb-6">
        <MessageCircle className="w-5 h-5 text-accent-light" />
        <h3 className="text-xl font-semibold text-white">
          Comments ({comments.length})
        </h3>
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* Add Comment Form */}
      {isAuthenticated ? (
        <form onSubmit={handleSubmit} className="mb-8" id="add-comment-form">
          <div className="glass-card p-4">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <User className="w-4 h-4 text-accent-light" />
              </div>
              <div className="flex-1">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Write a comment..."
                  rows={3}
                  className="input-field resize-none text-sm"
                  id="comment-input"
                />
                <div className="flex justify-end mt-3">
                  <button
                    type="submit"
                    disabled={submitting || !newComment.trim()}
                    className="btn-primary !px-5 !py-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    id="submit-comment-btn"
                  >
                    {submitting ? 'Posting...' : 'Post Comment'}
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      ) : (
        <div className="glass-card p-5 mb-8 text-center">
          <p className="text-sm text-zinc-400">
            <a href="/login" className="text-accent-light hover:underline">Sign in</a> to join the conversation
          </p>
        </div>
      )}

      {/* Comments List */}
      {loading ? (
        <div className="flex justify-center py-8">
          <div className="w-6 h-6 border-2 border-accent border-t-transparent rounded-full animate-spin" />
        </div>
      ) : comments.length === 0 ? (
        <div className="text-center py-10">
          <MessageCircle className="w-10 h-10 text-zinc-700 mx-auto mb-3" />
          <p className="text-zinc-500 text-sm">No comments yet. Be the first to share your thoughts!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="glass-card p-4 group" id={`comment-${comment.id}`}>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-dark-600 flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-semibold text-zinc-400">
                    {comment.author_username?.[0]?.toUpperCase()}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium text-white">{comment.author_username}</span>
                    <span className="text-xs text-zinc-600">{formatDate(comment.created_at)}</span>
                  </div>
                  {editingId === comment.id ? (
                    <div className="mt-2">
                      <textarea
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        rows={2}
                        className="input-field text-sm resize-none"
                      />
                      <div className="flex gap-2 mt-2">
                        <button
                          onClick={() => handleEdit(comment.id)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 bg-accent/20 text-accent-light text-xs font-medium rounded-lg hover:bg-accent/30 transition-colors"
                        >
                          <Check className="w-3 h-3" /> Save
                        </button>
                        <button
                          onClick={() => { setEditingId(null); setEditContent(''); }}
                          className="inline-flex items-center gap-1 px-3 py-1.5 bg-white/5 text-zinc-400 text-xs font-medium rounded-lg hover:bg-white/10 transition-colors"
                        >
                          <X className="w-3 h-3" /> Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-zinc-300 leading-relaxed">{comment.content}</p>
                  )}
                </div>
                {/* Actions */}
                {user?.id === comment.author_id && editingId !== comment.id && (
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => startEdit(comment)}
                      className="p-1.5 text-zinc-500 hover:text-accent-light hover:bg-accent/10 rounded-lg transition-all"
                      aria-label="Edit comment"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(comment.id)}
                      className="p-1.5 text-zinc-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                      aria-label="Delete comment"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentSection;
