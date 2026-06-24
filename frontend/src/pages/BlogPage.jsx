import { useState, useEffect } from 'react';
import api from '../api/axios';
import PostCard from '../components/PostCard';
import ScrollAnimator from '../components/ScrollAnimator';
import Footer from '../components/Footer';
import { Search, FileText } from 'lucide-react';

const BlogPage = () => {
  const [posts, setPosts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await api.get('/posts');
        setPosts(res.data.posts || []);
        setFiltered(res.data.posts || []);
      } catch (err) {
        console.error('Failed to load posts:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    if (!search.trim()) {
      setFiltered(posts);
    } else {
      const q = search.toLowerCase();
      setFiltered(
        posts.filter(
          (p) =>
            p.title.toLowerCase().includes(q) ||
            p.content.toLowerCase().includes(q) ||
            p.author_username.toLowerCase().includes(q)
        )
      );
    }
  }, [search, posts]);

  return (
    <div>
      <section className="pt-32 pb-24 min-h-screen">
        <div className="section-container">
          {/* Header */}
          <ScrollAnimator>
            <div className="max-w-2xl mb-12">
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                Our <span className="gradient-text">Blog</span>
              </h1>
              <p className="text-lg text-zinc-400">
                Insights, tutorials, and stories from our team about web design, development, and digital strategy.
              </p>
            </div>
          </ScrollAnimator>

          {/* Search */}
          <ScrollAnimator delay={100}>
            <div className="relative max-w-md mb-10">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                type="text"
                placeholder="Search posts..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input-field pl-11 text-sm"
                id="blog-search-input"
              />
            </div>
          </ScrollAnimator>

          {/* Posts Grid */}
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
            </div>
          ) : filtered.length === 0 ? (
            <ScrollAnimator>
              <div className="glass-card p-16 text-center">
                <FileText className="w-12 h-12 text-zinc-700 mx-auto mb-4" />
                <p className="text-zinc-400 text-lg mb-2">
                  {search ? 'No posts match your search' : 'No posts published yet'}
                </p>
                <p className="text-zinc-600 text-sm">
                  {search ? 'Try different keywords' : 'Check back soon for new content!'}
                </p>
              </div>
            </ScrollAnimator>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((post, index) => (
                <ScrollAnimator key={post.id} delay={index * 80}>
                  <PostCard post={post} />
                </ScrollAnimator>
              ))}
            </div>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default BlogPage;
