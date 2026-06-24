import { Paintbrush, Zap, Search, Smartphone, Headphones, BarChart3 } from 'lucide-react';
import ScrollAnimator from './ScrollAnimator';

const features = [
  {
    icon: Paintbrush,
    title: 'Custom Design',
    description: 'Every pixel is crafted to match your brand identity. No templates, no shortcuts — just original design.',
    gradient: 'from-violet-500/20 to-purple-500/20',
    iconBg: 'bg-violet-500/15',
    iconColor: 'text-violet-400',
  },
  {
    icon: Zap,
    title: 'Blazing Fast',
    description: 'Performance-first approach ensures your site loads in under 2 seconds. Speed is a competitive advantage.',
    gradient: 'from-amber-500/20 to-orange-500/20',
    iconBg: 'bg-amber-500/15',
    iconColor: 'text-amber-400',
  },
  {
    icon: Search,
    title: 'SEO Optimized',
    description: 'Built-in best practices to rank higher on Google. From structured data to core web vitals — we cover it all.',
    gradient: 'from-emerald-500/20 to-green-500/20',
    iconBg: 'bg-emerald-500/15',
    iconColor: 'text-emerald-400',
  },
  {
    icon: Smartphone,
    title: 'Mobile First',
    description: 'Responsive design that looks stunning on every device. Over 60% of traffic is mobile — we prioritize it.',
    gradient: 'from-sky-500/20 to-blue-500/20',
    iconBg: 'bg-sky-500/15',
    iconColor: 'text-sky-400',
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    description: 'Dedicated support team available around the clock. We dont just build and leave — we partner with you.',
    gradient: 'from-pink-500/20 to-rose-500/20',
    iconBg: 'bg-pink-500/15',
    iconColor: 'text-pink-400',
  },
  {
    icon: BarChart3,
    title: 'Analytics Built-In',
    description: 'Real-time dashboards to track visitors, conversions, and engagement. Data-driven decisions from day one.',
    gradient: 'from-cyan-500/20 to-teal-500/20',
    iconBg: 'bg-cyan-500/15',
    iconColor: 'text-cyan-400',
  },
];

const Features = () => {
  return (
    <section className="relative py-24 sm:py-32" id="features-section">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-accent/5 rounded-full blur-[200px]" />

      <div className="section-container relative z-10">
        <ScrollAnimator>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-sm font-semibold text-accent-light uppercase tracking-widest mb-4">
              Why Choose Us
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Everything you need to{' '}
              <span className="gradient-text">win online</span>
            </h2>
            <p className="text-lg text-zinc-400">
              We combine stunning design with battle-tested technology to deliver websites that actually grow your business.
            </p>
          </div>
        </ScrollAnimator>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, index) => (
            <ScrollAnimator key={feature.title} delay={index * 100}>
              <div className="glass-card-hover p-6 sm:p-7 h-full group">
                <div className={`w-12 h-12 rounded-xl ${feature.iconBg} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className={`w-6 h-6 ${feature.iconColor}`} />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </ScrollAnimator>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
