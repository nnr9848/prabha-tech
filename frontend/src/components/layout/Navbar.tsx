import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShieldCheck } from 'lucide-react';
import logoImg from '../../assets/prabhatech-logo.png';
import { SocialIconsGroup } from '../common/SocialIconsGroup';
import { PillButton } from '../common/PillButton';

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
          {/* Authentic Logo Image */}
          <Link to="/" className="flex items-center gap-2 group">
            <img
              src={logoImg}
              alt="PrabhaTech Logo"
              className="h-8 sm:h-9 w-auto object-contain brightness-0 invert transition-opacity duration-200 group-hover:opacity-80"
            />
          </Link>

          {/* Center Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-[15.5px] font-medium tracking-[0.015em] transition-colors duration-200 ${
                    isActive ? 'text-[#9873ff] font-semibold' : 'text-white hover:text-[#9873ff]'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Social & CMS Icons (Desktop) */}
          <div className="hidden md:flex items-center gap-3">
            <PillButton
              to="/admin"
              size="sm"
              variant="secondary"
              icon={<ShieldCheck className="w-3.5 h-3.5 text-[#9873ff]" />}
              iconPosition="left"
              showDefaultIcon={false}
              className="mr-1 py-1.5 px-3.5 text-xs font-medium"
            >
              CMS
            </PillButton>

            {/* Official Pixel-Perfect Brand SVG Badges */}
            <SocialIconsGroup size="md" />
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
                <PillButton
                  to="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  size="sm"
                  variant="secondary"
                  icon={<ShieldCheck className="w-4 h-4 text-[#9873ff]" />}
                  iconPosition="left"
                  showDefaultIcon={false}
                >
                  Admin CMS
                </PillButton>
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


