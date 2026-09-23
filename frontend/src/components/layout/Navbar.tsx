import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShieldCheck } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scrolling when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: 'Why us', path: '/philosophy' },
    { name: 'Portfolio', path: '/case-studies' },
    { name: 'Team', path: '/about' },
    { name: 'Blog', path: '/insights' },
    { name: 'Contact us', path: '/contact' },
  ];

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-40 transition-[background-color,padding,border-color] duration-300 ${
          isScrolled
            ? 'py-4 bg-[#050608]/90 backdrop-blur-md border-b border-white/5'
            : 'py-6 bg-transparent'
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-8 sm:px-16 lg:px-24 flex items-center justify-between">
          {/* Authentic UXDA Logo with Registered Mark */}
          <Link to="/" className="flex items-center gap-1 group">
            <span className="text-2xl sm:text-[28px] font-light tracking-[0.25em] text-white transition-opacity hover:opacity-80">
              UXD<span className="font-extrabold tracking-normal">^</span>
            </span>
            <span className="text-[10px] text-[#8E9BAE] align-super -mt-3 font-normal">®</span>
          </Link>

          {/* Center Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-[15px] font-normal tracking-[0.02em] transition-colors duration-200 ${
                    isActive ? 'text-[#9873ff] font-medium' : 'text-white hover:text-[#9873ff]'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Social & CMS Icons (Desktop) */}
          <div className="hidden md:flex items-center gap-2.5">
            <Link
              to="/admin"
              className="text-xs px-3.5 py-1.5 rounded-full border border-white/20 text-[#E2E8F0] hover:text-white hover:border-[#9873ff]/60 transition-all duration-200 flex items-center gap-1.5 mr-2"
              title="CMS Admin Portal"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#9873ff]" />
              <span className="font-medium">CMS</span>
            </Link>

            {/* Crisp Branded Solid Social Circles */}
            <a
              href="https://www.linkedin.com/company/theuxda"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-[#0077B5] hover:opacity-90 hover:scale-105 text-white flex items-center justify-center text-xs font-bold transition-all duration-200 shadow-sm"
              title="LinkedIn"
            >
              in
            </a>
            <a
              href="https://twitter.com/theuxda"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-white text-black hover:opacity-90 hover:scale-105 flex items-center justify-center text-xs font-bold transition-all duration-200 shadow-sm"
              title="X"
            >
              𝕏
            </a>
            <a
              href="https://www.behance.net/theuxda"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-[#0057FF] hover:opacity-90 hover:scale-105 text-white flex items-center justify-center text-xs font-bold transition-all duration-200 shadow-sm"
              title="Behance"
            >
              Bē
            </a>
            <a
              href="https://www.instagram.com/theuxda"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#FF543E] via-[#E4405F] to-[#833AB4] hover:opacity-90 hover:scale-105 text-white flex items-center justify-center text-[11px] font-bold transition-all duration-200 shadow-sm"
              title="Instagram"
            >
              ig
            </a>
            <a
              href="https://www.youtube.com/c/theuxda"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-[#FF0000] hover:opacity-90 hover:scale-105 text-white flex items-center justify-center text-xs font-bold transition-all duration-200 shadow-sm"
              title="YouTube"
            >
              ▶
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden p-2 rounded-lg text-white hover:bg-white/5 transition-colors focus:outline-none"
            aria-label="Open Navigation Menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </motion.header>

      {/* Fullscreen Mobile Drawer Overlay with Downward Entry */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 bg-[#050608] flex flex-col justify-between p-8 sm:p-12 lg:hidden"
          >
            {/* Top Bar inside Overlay */}
            <div className="flex items-center justify-between">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2"
              >
                <span className="text-2xl font-light tracking-[0.25em] text-white">
                  UXD<span className="font-extrabold tracking-normal">^</span>
                </span>
              </Link>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-white/80 hover:text-white transition-colors focus:outline-none"
                aria-label="Close Navigation Menu"
              >
                <X className="w-7 h-7" />
              </button>
            </div>

            {/* Centered Navigation Links */}
            <nav className="flex flex-col items-center justify-center gap-8 my-auto">
              {navLinks.map((link, idx) => {
                const isActive = location.pathname === link.path;
                return (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + idx * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      to={link.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`text-xl sm:text-2xl tracking-wide font-normal transition-colors ${
                        isActive ? 'text-white font-medium' : 'text-[#8E9BAE] hover:text-white'
                      }`}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                );
              })}

              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="pt-4"
              >
                <Link
                  to="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-xs px-4 py-2 rounded-full border border-white/10 text-white/80 hover:text-white hover:border-[#8B5CF6]/60 transition-all flex items-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4 text-[#8B5CF6]" />
                  <span>Admin CMS</span>
                </Link>
              </motion.div>
            </nav>

            {/* Bottom Social Media Pills Row */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center justify-center gap-4 pt-6 border-t border-white/5"
            >
              <a
                href="https://www.linkedin.com/company/theuxda"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#0077B5] text-white flex items-center justify-center text-xs font-bold transition-all"
                title="LinkedIn"
              >
                in
              </a>
              <a
                href="https://twitter.com/theuxda"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/20 text-white flex items-center justify-center text-xs font-bold transition-all"
                title="X"
              >
                𝕏
              </a>
              <a
                href="https://www.behance.net/theuxda"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#0057FF] text-white flex items-center justify-center text-xs font-bold transition-all"
                title="Behance"
              >
                Bē
              </a>
              <a
                href="https://www.instagram.com/theuxda"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#E4405F] text-white flex items-center justify-center text-xs font-bold transition-all"
                title="Instagram"
              >
                ig
              </a>
              <a
                href="https://www.youtube.com/c/theuxda"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#FF0000] text-white flex items-center justify-center text-xs font-bold transition-all"
                title="YouTube"
              >
                ▶
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};


