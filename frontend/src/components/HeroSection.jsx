import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import ScrollAnimator from './ScrollAnimator';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden" id="hero-section">
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Gradient orbs */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-accent/20 rounded-full blur-[128px] animate-pulse-glow" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-cyan/15 rounded-full blur-[128px] animate-pulse-glow" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[200px]" />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="section-container relative z-10 py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left Content */}
          <div className="max-w-2xl">
            <ScrollAnimator>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5 mb-8">
                <Sparkles className="w-4 h-4 text-accent-light" />
                <span className="text-sm font-medium text-accent-light">Award-Winning Design Studio</span>
              </div>
            </ScrollAnimator>

            <ScrollAnimator delay={100}>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight mb-6">
                We Build{' '}
                <span className="gradient-text">Digital</span>
                <br />
                Experiences
              </h1>
            </ScrollAnimator>

            <ScrollAnimator delay={200}>
              <p className="text-lg sm:text-xl text-zinc-400 leading-relaxed mb-10 max-w-lg">
                Award-winning web design agency crafting modern, high-performance websites that convert visitors into customers.
              </p>
            </ScrollAnimator>

            <ScrollAnimator delay={300}>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/register" className="btn-primary text-base" id="hero-cta-btn">
                  Get Started
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link to="/blog" className="btn-secondary text-base" id="hero-blog-btn">
                  Read Our Blog
                </Link>
              </div>
            </ScrollAnimator>

            <ScrollAnimator delay={400}>
              <div className="flex items-center gap-8 mt-12 pt-8 border-t border-white/[0.06]">
                <div>
                  <div className="text-2xl font-bold text-white">200+</div>
                  <div className="text-sm text-zinc-500">Projects Delivered</div>
                </div>
                <div className="w-px h-10 bg-white/10" />
                <div>
                  <div className="text-2xl font-bold text-white">98%</div>
                  <div className="text-sm text-zinc-500">Client Satisfaction</div>
                </div>
                <div className="w-px h-10 bg-white/10" />
                <div>
                  <div className="text-2xl font-bold text-white">15+</div>
                  <div className="text-sm text-zinc-500">Awards Won</div>
                </div>
              </div>
            </ScrollAnimator>
          </div>

          {/* Right — Browser Mockup */}
          <ScrollAnimator delay={200} className="hidden lg:block">
            <div className="relative">
              {/* Glow */}
              <div className="absolute -inset-4 bg-gradient-to-r from-accent/20 via-purple-500/10 to-cyan/20 rounded-3xl blur-2xl opacity-50" />
              {/* Browser Window */}
              <div className="relative glass-card overflow-hidden">
                {/* Browser Chrome */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06]">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/60" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                    <div className="w-3 h-3 rounded-full bg-green-500/60" />
                  </div>
                  <div className="flex-1 mx-4">
                    <div className="bg-dark-700 rounded-md px-3 py-1 text-xs text-zinc-500 text-center">
                      novabyte.studio
                    </div>
                  </div>
                </div>
                {/* Screen Content */}
                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-cyan flex items-center justify-center text-white font-bold text-sm">N</div>
                    <div>
                      <div className="h-3 w-28 bg-white/10 rounded" />
                      <div className="h-2 w-20 bg-white/5 rounded mt-1.5" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-gradient-to-br from-accent/10 to-purple-500/5 rounded-xl p-4 border border-accent/10">
                      <div className="w-8 h-8 rounded-lg bg-accent/20 mb-3" />
                      <div className="h-2.5 w-16 bg-white/10 rounded" />
                      <div className="h-2 w-24 bg-white/5 rounded mt-2" />
                    </div>
                    <div className="bg-gradient-to-br from-cyan/10 to-blue-500/5 rounded-xl p-4 border border-cyan/10">
                      <div className="w-8 h-8 rounded-lg bg-cyan/20 mb-3" />
                      <div className="h-2.5 w-20 bg-white/10 rounded" />
                      <div className="h-2 w-16 bg-white/5 rounded mt-2" />
                    </div>
                  </div>
                  <div className="bg-dark-700/50 rounded-xl p-4 border border-white/[0.04]">
                    <div className="flex justify-between items-center mb-3">
                      <div className="h-2.5 w-24 bg-white/10 rounded" />
                      <div className="h-6 w-16 bg-accent/20 rounded-md" />
                    </div>
                    <div className="space-y-2">
                      <div className="h-2 w-full bg-white/5 rounded" />
                      <div className="h-2 w-4/5 bg-white/5 rounded" />
                      <div className="h-2 w-3/5 bg-white/5 rounded" />
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-1 h-10 bg-gradient-to-r from-accent to-purple-500 rounded-lg opacity-60" />
                    <div className="flex-1 h-10 border border-white/10 rounded-lg" />
                  </div>
                </div>
              </div>
              {/* Floating elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-accent/10 rounded-2xl border border-accent/20 backdrop-blur-sm animate-float flex items-center justify-center">
                <span className="text-3xl">🚀</span>
              </div>
              <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-cyan/10 rounded-2xl border border-cyan/20 backdrop-blur-sm animate-float flex items-center justify-center" style={{ animationDelay: '2s' }}>
                <span className="text-2xl">✨</span>
              </div>
            </div>
          </ScrollAnimator>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
