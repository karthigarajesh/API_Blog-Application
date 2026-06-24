import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import CommentSection from '../components/CommentSection';
import ScrollAnimator from '../components/ScrollAnimator';
import { Calendar, User, ArrowLeft, Pencil, Trash2 } from 'lucide-react';

const PostDetailPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await api.get(`/posts/${id}`);
        setPost(res.data.post);
      } catch (err) {
        setError(err.response?.status === 404 ? 'Post not found' : 'Failed to load post');
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    try {
      await api.delete(`/posts/${id}`);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete post');
    }
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-zinc-400 mb-4">{error || 'Post not found'}</p>
          <Link to="/blog" className="btn-primary text-sm">
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const isAuthor = user?.id === post.author_id;

  return (
    <div className="pt-28 pb-20 min-h-screen">
      <div className="section-container max-w-3xl">
        {/* Back Link */}
        <ScrollAnimator>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-white transition-colors mb-8"
            id="back-to-blog-btn"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
        </ScrollAnimator>

        {/* Post Header */}
        <ScrollAnimator delay={100}>
          <article id={`post-detail-${post.id}`}>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-500 mb-8 pb-8 border-b border-white/[0.06]">
              <span className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                  <User className="w-4 h-4 text-accent-light" />
                </div>
                <span className="text-zinc-300 font-medium">{post.author_username}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {formatDate(post.created_at)}
              </span>
              {isAuthor && (
                <div className="flex gap-2 ml-auto">
                  <Link
                    to={`/posts/${post.id}/edit`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-accent-light bg-accent/10 border border-accent/20 rounded-lg hover:bg-accent/20 transition-colors"
                    id="edit-post-btn"
                  >
                    <Pencil className="w-3 h-3" /> Edit
                  </Link>
                  <button
                    onClick={handleDelete}
                    className="btn-danger !text-xs"
                    id="delete-post-btn"
                  >
                    <Trash2 className="w-3 h-3" /> Delete
                  </button>
                </div>
              )}
            </div>

            {/* Post Content */}
            <div className="prose prose-invert max-w-none">
              {post.content.split('\n').map((paragraph, i) => (
                <p key={i} className="text-zinc-300 leading-relaxed mb-4 text-base">
                  {paragraph}
                </p>
              ))}
            </div>
          </article>
        </ScrollAnimator>

        {/* Comments */}
        <ScrollAnimator delay={200}>
          <div className="border-t border-white/[0.06] pt-8 mt-12">
            <CommentSection postId={post.id} />
          </div>
        </ScrollAnimator>
      </div>
    </div>
  );
};

export default PostDetailPage;
