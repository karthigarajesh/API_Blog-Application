import { Link } from 'react-router-dom';
import { Feather, Twitter, Github, Linkedin, Dribbble, ArrowRight } from 'lucide-react';

const footerLinks = {
  Services: ['Web Design', 'Development', 'E-Commerce', 'SEO Strategy'],
  Company: ['About Us', 'Careers', 'Blog', 'Contact'],
  Resources: ['Documentation', 'Case Studies', 'Guides', 'API Reference'],
  Legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy'],
};

const socialLinks = [
  { icon: Twitter, label: 'Twitter', href: '#' },
  { icon: Github, label: 'GitHub', href: '#' },
  { icon: Linkedin, label: 'LinkedIn', href: '#' },
  { icon: Dribbble, label: 'Dribbble', href: '#' },
];

const Footer = () => {
  return (
    <footer className="relative border-t border-white/[0.04] bg-dark-950" id="footer-section">
      {/* CTA Banner */}
      <div className="section-container py-20">
        <div className="relative glass-card p-10 sm:p-14 text-center overflow-hidden">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-accent/10 via-purple-500/5 to-cyan/10" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-accent/20 blur-[100px]" />

          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to build something amazing?
            </h2>
            <p className="text-zinc-400 mb-8 max-w-md mx-auto">
              Let&apos;s turn your vision into a high-performing website that stands out from the competition.
            </p>
            <Link to="/register" className="btn-primary text-base" id="footer-cta-btn">
              Get Started
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Footer Links */}
      <div className="section-container pb-12">
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="col-span-2 sm:col-span-4 lg:col-span-1 mb-4 lg:mb-0">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-purple-500 flex items-center justify-center">
                <Feather className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold text-white">
                Nova<span className="gradient-text">Byte</span>
              </span>
            </Link>
            <p className="text-sm text-zinc-500 leading-relaxed mb-6">
              Crafting digital experiences that move the needle for ambitious brands.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-9 h-9 rounded-lg bg-white/5 border border-white/[0.06] flex items-center justify-center text-zinc-500 hover:text-white hover:bg-white/10 hover:border-white/10 transition-all duration-200"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold text-white mb-4">{title}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/[0.06] mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-zinc-600">
            © {new Date().getFullYear()} NovaByte Studios. All rights reserved.
          </p>
          <p className="text-xs text-zinc-600">
            Designed & built with 💜 in San Francisco
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
