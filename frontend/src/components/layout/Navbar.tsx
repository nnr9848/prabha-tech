import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

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

  const navLinks = [
    { name: 'Case Studies', path: '/case-studies' },
    { name: 'Services', path: '/services' },
    { name: 'Philosophy', path: '/philosophy' },
    { name: 'Insights', path: '/insights' },
    { name: 'About', path: '/about' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#07090E]/90 border-b border-white/10 backdrop-none py-4 shadow-2xl'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#00F0FF] via-[#0070F3] to-[#7928CA] p-[2px] transition-transform duration-300 group-hover:scale-105">
            <div className="w-full h-full bg-[#07090E] rounded-[10px] flex items-center justify-center">
              <span className="font-extrabold text-lg text-white tracking-tighter">UX</span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-xl tracking-tight text-white flex items-center gap-1.5">
              UXDA
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#00F0FF] animate-pulse"></span>
            </span>
            <span className="text-[10px] uppercase tracking-widest text-[#94A3B8] -mt-1 font-medium">
              Financial UX Agency
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-medium tracking-wide transition-colors duration-200 relative py-1 ${
                  isActive ? 'text-[#00F0FF]' : 'text-[#94A3B8] hover:text-white'
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#00F0FF] rounded-full"></span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right CTA & CMS Link */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            to="/admin"
            className="text-xs font-semibold px-3 py-2 rounded-lg border border-white/10 text-[#94A3B8] hover:text-white hover:border-[#00F0FF]/40 transition-all flex items-center gap-1.5"
            title="CMS Admin Portal"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#00F0FF]" />
            <span>CMS</span>
          </Link>

          <Link
            to="/contact"
            className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs tracking-wider uppercase text-black bg-[#00F0FF] hover:bg-white transition-all duration-300 shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]"
          >
            <span>Let's Talk</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-white hover:bg-white/5 transition-colors"
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#07090E] border-b border-white/10 px-6 py-6 space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-medium text-[#94A3B8] hover:text-[#00F0FF] py-2"
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
            <Link
              to="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="text-center py-2.5 text-xs font-semibold rounded-lg border border-white/10 text-white flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-[#00F0FF]" />
              Admin CMS
            </Link>
            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="text-center py-3 text-xs font-bold uppercase tracking-wider rounded-xl bg-[#00F0FF] text-black shadow-lg"
            >
              Start a Project
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
