import ScrollAnimator from './ScrollAnimator';

const logos = [
  { name: 'Vercel', text: '▲ Vercel' },
  { name: 'Stripe', text: 'stripe' },
  { name: 'Notion', text: '✦ Notion' },
  { name: 'Linear', text: '◆ Linear' },
  { name: 'Figma', text: '◉ Figma' },
  { name: 'Slack', text: '# Slack' },
];

const SocialProof = () => {
  return (
    <section className="relative py-20 border-y border-white/[0.04]" id="social-proof-section">
      <div className="section-container">
        <ScrollAnimator>
          <p className="text-center text-sm font-medium text-zinc-500 uppercase tracking-widest mb-10">
            Trusted by industry leaders
          </p>
        </ScrollAnimator>

        <ScrollAnimator delay={150}>
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6">
            {logos.map((logo, i) => (
              <div
                key={logo.name}
                className="text-xl sm:text-2xl font-bold text-zinc-600 hover:text-zinc-300 transition-all duration-300 cursor-default select-none"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                {logo.text}
              </div>
            ))}
          </div>
        </ScrollAnimator>
      </div>
    </section>
  );
};

export default SocialProof;
