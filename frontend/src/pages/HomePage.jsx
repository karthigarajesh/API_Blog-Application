import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import HeroSection from '../components/HeroSection';
import SocialProof from '../components/SocialProof';
import Features from '../components/Features';
import Footer from '../components/Footer';
import PostCard from '../components/PostCard';
import ScrollAnimator from '../components/ScrollAnimator';
import { ArrowRight } from 'lucide-react';

const HomePage = () => {
  const [recentPosts, setRecentPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await api.get('/posts');
        setRecentPosts(res.data.posts?.slice(0, 3) || []);
      } catch (err) {
        console.error('Failed to load posts:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div>
      <HeroSection />
      <SocialProof />
      <Features />

      {/* Latest Blog Posts Section */}
      <section className="relative py-24 sm:py-32 border-t border-white/[0.04]" id="latest-posts-section">
        <div className="section-container">
          <ScrollAnimator>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12">
              <div>
                <p className="text-sm font-semibold text-accent-light uppercase tracking-widest mb-2">
                  From Our Blog
                </p>
                <h2 className="text-3xl sm:text-4xl font-bold text-white">
                  Latest insights & stories
                </h2>
              </div>
              <Link to="/blog" className="btn-secondary !py-2.5 text-sm" id="view-all-posts-btn">
                View all posts
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </ScrollAnimator>

          {loading ? (
            <div className="flex justify-center py-16">
              <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
            </div>
          ) : recentPosts.length === 0 ? (
            <ScrollAnimator>
              <div className="glass-card p-12 text-center">
                <p className="text-zinc-400 mb-4">No blog posts yet. Be the first to publish!</p>
                <Link to="/dashboard" className="btn-primary text-sm">
                  Create a Post
                </Link>
              </div>
            </ScrollAnimator>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {recentPosts.map((post, index) => (
                <ScrollAnimator key={post.id} delay={index * 100}>
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

export default HomePage;
