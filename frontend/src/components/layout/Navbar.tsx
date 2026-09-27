import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShieldCheck } from 'lucide-react';
import logoImg from '../../assets/prabhatech-logo.png';
import { SocialIconsGroup } from '../common/SocialIconsGroup';
import { BrandButton } from '../common/BrandButton';

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
    { name: 'Home', path: '/' },
    { name: 'Who We Are', path: '/about' },
    { name: 'Solutions', path: '/case-studies' },
    { name: 'Industries', path: '/services' },
    { name: 'Insights', path: '/insights' },
    { name: 'Careers', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'py-3.5 bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100'
            : 'py-4 bg-white border-b border-slate-100'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 flex items-center justify-between">
          {/* Authentic Bilingual Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <img
              src={logoImg}
              alt="Prabha Technologies Logo"
              className="h-10 sm:h-11 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.01]"
            />
          </Link>

          {/* Center Navigation Links (Desktop) matching screenshot 2 exactly */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-[14px] tracking-tight transition-all duration-150 relative py-1 ${
                    isActive
                      ? 'text-[#020E26] font-bold'
                      : 'text-[#020E26]/85 hover:text-[#020E26] font-semibold'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#E5A93C] rounded-full"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Section: LET'S TALK -> Exact Dark Navy Enterprise Button */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/admin"
              className="text-xs text-slate-400 hover:text-[#020E26] transition-colors px-2 py-1"
              title="Admin CMS"
            >
              CMS
            </Link>
            <BrandButton to="/contact" variant="dark" size="sm">
              LET'S TALK
            </BrandButton>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden p-2 rounded-lg text-slate-900 hover:bg-slate-100 transition-colors focus:outline-none"
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
                <img
                  src={logoImg}
                  alt="PrabhaTech Logo"
                  className="h-8 w-auto object-contain brightness-0 invert"
                />
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
                <BrandButton
                  to="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  size="sm"
                  variant="outline"
                  icon={<ShieldCheck className="w-4 h-4 text-[#E5A93C]" />}
                  showArrow={false}
                >
                  Admin CMS
                </BrandButton>
              </motion.div>
            </nav>

            {/* Bottom Official Social Media Badges */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center justify-center pt-6 border-t border-white/5"
            >
              <SocialIconsGroup size="lg" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};


