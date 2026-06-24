import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight } from 'lucide-react';

const PostCard = ({ post }) => {
  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const excerpt = post.content?.length > 150
    ? post.content.substring(0, 150) + '...'
    : post.content;

  return (
    <Link to={`/posts/${post.id}`} className="glass-card-hover group block h-full" id={`post-card-${post.id}`}>
      {/* Gradient accent top */}
      <div className="h-1 bg-gradient-to-r from-accent via-purple-500 to-cyan rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="p-6">
        <div className="flex items-center gap-3 text-xs text-zinc-500 mb-4">
          <span className="flex items-center gap-1.5">
            <User className="w-3.5 h-3.5" />
            {post.author_username}
          </span>
          <span className="w-1 h-1 rounded-full bg-zinc-700" />
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            {formatDate(post.created_at)}
          </span>
        </div>

        <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-accent-light transition-colors duration-200 line-clamp-2">
          {post.title}
        </h3>

        <p className="text-sm text-zinc-400 leading-relaxed mb-5 line-clamp-3">
          {excerpt}
        </p>

        <div className="flex items-center gap-2 text-sm font-medium text-accent-light opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-0 group-hover:translate-x-1">
          Read more
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
