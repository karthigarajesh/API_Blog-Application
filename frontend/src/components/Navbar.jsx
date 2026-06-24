import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Menu, X, Feather } from 'lucide-react';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/blog', label: 'Blog' },
  ];

  const authLinks = isAuthenticated
    ? [{ to: '/dashboard', label: 'Dashboard' }]
    : [];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-dark-950/80 backdrop-blur-xl border-b border-white/[0.06] py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="section-container flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group" id="nav-logo">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-accent to-purple-500 flex items-center justify-center group-hover:shadow-lg group-hover:shadow-accent/25 transition-all duration-300">
            <Feather className="w-5 h-5 text-white" />
          </div>
          <span className="text-lg font-bold text-white">
            Nova<span className="gradient-text">Byte</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-1">
          {[...navLinks, ...authLinks].map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                location.pathname === link.to
                  ? 'text-white bg-white/10'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop Auth */}
        <div className="hidden md:flex items-center gap-3">
          {isAuthenticated ? (
            <>
              <span className="text-sm text-zinc-400">
                Hey, <span className="text-accent-light font-medium">{user?.username}</span>
              </span>
              <button
                onClick={logout}
                className="px-4 py-2 text-sm font-medium text-zinc-400 hover:text-white border border-white/10 rounded-lg hover:bg-white/5 transition-all duration-200"
                id="nav-logout-btn"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors"
                id="nav-login-btn"
              >
                Sign in
              </Link>
              <Link
                to="/register"
                className="btn-primary !px-5 !py-2 text-sm"
                id="nav-register-btn"
              >
                Get Started
              </Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          id="nav-mobile-toggle"
          aria-label="Toggle navigation menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-dark-900/95 backdrop-blur-xl border-t border-white/[0.06] animate-fade-in-down">
          <div className="section-container py-4 flex flex-col gap-1">
            {[...navLinks, ...authLinks].map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  location.pathname === link.to
                    ? 'text-white bg-white/10'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="border-t border-white/[0.06] mt-2 pt-3 flex flex-col gap-2">
              {isAuthenticated ? (
                <button
                  onClick={logout}
                  className="px-4 py-3 text-sm font-medium text-zinc-400 hover:text-white text-left rounded-lg hover:bg-white/5"
                >
                  Log out ({user?.username})
                </button>
              ) : (
                <>
                  <Link to="/login" className="px-4 py-3 text-sm font-medium text-zinc-400 hover:text-white rounded-lg hover:bg-white/5">
                    Sign in
                  </Link>
                  <Link to="/register" className="btn-primary text-sm text-center">
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
