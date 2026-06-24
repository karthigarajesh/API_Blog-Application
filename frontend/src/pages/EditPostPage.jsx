import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';
import ScrollAnimator from '../components/ScrollAnimator';
import { ArrowLeft, Save } from 'lucide-react';

const EditPostPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: '', content: '' });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await api.get(`/posts/${id}`);
        const { title, content } = res.data.post;
        setForm({ title, content });
      } catch (err) {
        setError('Failed to load post');
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.content.trim()) return;
    setSubmitting(true);
    setError('');
    try {
      await api.put(`/posts/${id}`, form);
      navigate(`/posts/${id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update post');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="pt-28 pb-20 min-h-screen">
      <div className="section-container max-w-3xl">
        <ScrollAnimator>
          <Link
            to={`/posts/${id}`}
            className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to post
          </Link>

          <h1 className="text-3xl font-bold text-white mb-8">Edit Post</h1>

          {error && (
            <div className="mb-6 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              {error}
            </div>
          )}

          <div className="glass-card p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-5" id="edit-post-form">
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1.5">Title</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="input-field"
                  required
                  id="edit-post-title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1.5">Content</label>
                <textarea
                  value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                  className="input-field resize-none"
                  rows={12}
                  required
                  id="edit-post-content"
                />
              </div>
              <div className="flex justify-end gap-3">
                <Link to={`/posts/${id}`} className="btn-secondary text-sm">
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-primary text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  id="submit-edit-post-btn"
                >
                  {submitting ? 'Saving...' : 'Save Changes'}
                  <Save className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        </ScrollAnimator>
      </div>
    </div>
  );
};

export default EditPostPage;
