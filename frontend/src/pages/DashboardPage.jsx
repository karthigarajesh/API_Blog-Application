import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import ScrollAnimator from '../components/ScrollAnimator';
import { Plus, Pencil, Trash2, FileText, Send, X } from 'lucide-react';

const DashboardPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', content: '' });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const fetchMyPosts = async () => {
    try {
      const res = await api.get('/posts/mine');
      setPosts(res.data.posts || []);
    } catch (err) {
      console.error('Failed to load posts:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyPosts();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.content.trim()) return;
    setSubmitting(true);
    setError('');
    try {
      await api.post('/posts', form);
      setForm({ title: '', content: '' });
      setShowForm(false);
      fetchMyPosts();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create post');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    try {
      await api.delete(`/posts/${id}`);
      setPosts(posts.filter((p) => p.id !== id));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete post');
    }
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="pt-28 pb-20 min-h-screen">
      <div className="section-container">
        {/* Header */}
        <ScrollAnimator>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-1">
                Dashboard
              </h1>
              <p className="text-zinc-400">
                Welcome back, <span className="text-accent-light font-medium">{user?.username}</span>
              </p>
            </div>
            <button
              onClick={() => setShowForm(!showForm)}
              className={showForm ? 'btn-secondary text-sm' : 'btn-primary text-sm'}
              id="toggle-create-post-btn"
            >
              {showForm ? (
                <>
                  <X className="w-4 h-4" /> Cancel
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" /> New Post
                </>
              )}
            </button>
          </div>
        </ScrollAnimator>

        {error && (
          <div className="mb-6 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
            {error}
          </div>
        )}

        {/* Create Post Form */}
        {showForm && (
          <ScrollAnimator>
            <div className="glass-card p-6 mb-8">
              <h2 className="text-lg font-semibold text-white mb-5">Create New Post</h2>
              <form onSubmit={handleCreate} className="space-y-4" id="create-post-form">
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-1.5">Title</label>
                  <input
                    type="text"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="input-field"
                    placeholder="Give your post a great title"
                    required
                    id="create-post-title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-1.5">Content</label>
                  <textarea
                    value={form.content}
                    onChange={(e) => setForm({ ...form, content: e.target.value })}
                    className="input-field resize-none"
                    rows={8}
                    placeholder="Write your post content here..."
                    required
                    id="create-post-content"
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-primary text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    id="submit-create-post-btn"
                  >
                    {submitting ? 'Publishing...' : 'Publish Post'}
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>
          </ScrollAnimator>
        )}

        {/* Posts List */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
          </div>
        ) : posts.length === 0 ? (
          <ScrollAnimator>
            <div className="glass-card p-16 text-center">
              <FileText className="w-14 h-14 text-zinc-700 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No posts yet</h3>
              <p className="text-zinc-400 mb-6">Start sharing your thoughts with the world</p>
              {!showForm && (
                <button onClick={() => setShowForm(true)} className="btn-primary text-sm">
                  <Plus className="w-4 h-4" /> Create Your First Post
                </button>
              )}
            </div>
          </ScrollAnimator>
        ) : (
          <div className="space-y-3">
            {posts.map((post, index) => (
              <ScrollAnimator key={post.id} delay={index * 60}>
                <div className="glass-card p-5 flex items-center gap-4 group hover:border-white/10 transition-all duration-200" id={`dashboard-post-${post.id}`}>
                  <div className="flex-1 min-w-0">
                    <Link
                      to={`/posts/${post.id}`}
                      className="text-base font-semibold text-white hover:text-accent-light transition-colors line-clamp-1"
                    >
                      {post.title}
                    </Link>
                    <p className="text-sm text-zinc-500 mt-1 line-clamp-1">{post.content}</p>
                    <p className="text-xs text-zinc-600 mt-2">{formatDate(post.created_at)}</p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <Link
                      to={`/posts/${post.id}/edit`}
                      className="p-2 text-zinc-500 hover:text-accent-light hover:bg-accent/10 rounded-lg transition-all"
                      aria-label="Edit post"
                    >
                      <Pencil className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="p-2 text-zinc-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                      aria-label="Delete post"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </ScrollAnimator>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
