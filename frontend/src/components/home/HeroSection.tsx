import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, ArrowRight, Award, Shield, Sparkles, TrendingUp } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-32 pb-20 overflow-hidden">
      {/* Background Animated Gradient Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[#00F0FF]/15 via-[#0070F3]/10 to-[#7928CA]/20 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-[#7928CA]/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10 w-full text-center">
        {/* Top Floating Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-ping"></span>
          <span className="text-xs uppercase tracking-widest font-semibold text-white/90 flex items-center gap-1.5">
            World-Leading Financial UX Agency
          </span>
          <span className="text-xs text-[#00F0FF] font-bold">★ #1 Ranked</span>
        </motion.div>

        {/* Hero Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1] max-w-5xl mx-auto mb-8"
        >
          Transforming Banking & Fintech Through{' '}
          <span className="uxda-accent-gradient">Human-Centered</span> UX Design
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg sm:text-xl text-[#94A3B8] max-w-3xl mx-auto mb-10 leading-relaxed font-normal"
        >
          We architect award-winning next-generation digital banking apps, wealthtech platforms, and crypto experiences used by millions across 37+ countries.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <Link
            to="/case-studies"
            className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-sm tracking-wider uppercase text-black bg-[#00F0FF] hover:bg-white transition-all duration-300 shadow-[0_0_30px_rgba(0,240,255,0.4)] flex items-center justify-center gap-2 group"
          >
            <span>Explore Case Studies</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
          <Link
            to="/contact"
            className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-sm tracking-wider uppercase text-white bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/30 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <span>Book UX Consultation</span>
          </Link>
        </motion.div>

        {/* Video / Reel Showcase Frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="relative max-w-5xl mx-auto rounded-2xl overflow-hidden border border-white/15 shadow-2xl bg-[#0D111A] group"
        >
          {/* Top Bar Decoration */}
          <div className="h-10 bg-[#07090E] border-b border-white/10 px-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
            </div>
            <span className="text-[11px] font-mono text-[#64748B]">uxda-showcase-reel-2026.mp4</span>
            <div className="w-12"></div>
          </div>

          {/* Video Player */}
          <div className="relative aspect-video w-full bg-black">
            <video
              autoPlay
              loop
              muted
              playsInline
              poster="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80"
              className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
            >
              <source
                src="https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-screens-with-charts-and-data-31913-large.mp4"
                type="video/mp4"
              />
            </video>

            {/* Video Overlay Info */}
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between pointer-events-none">
              <div className="flex items-center gap-3 bg-black/60 px-4 py-2 rounded-xl border border-white/10">
                <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-ping"></span>
                <span className="text-xs font-semibold text-white">Next-Gen Financial Architecture</span>
              </div>
              <div className="hidden sm:flex items-center gap-2 bg-black/60 px-4 py-2 rounded-xl border border-white/10 text-xs text-[#00F0FF] font-medium">
                <Award className="w-3.5 h-3.5" />
                Red Dot & IF Design Award Winners
              </div>
            </div>
          </div>
        </motion.div>

        {/* Global Impact Metrics Bar */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 py-10 border-y border-white/10 max-w-5xl mx-auto">
          <div>
            <div className="text-3xl sm:text-4xl font-extrabold text-white mb-1">37+</div>
            <div className="text-xs text-[#94A3B8] uppercase tracking-wider">Countries Served</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-extrabold text-[#00F0FF] mb-1">100+</div>
            <div className="text-xs text-[#94A3B8] uppercase tracking-wider">Fintech Products Launched</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-extrabold text-white mb-1">20+</div>
            <div className="text-xs text-[#94A3B8] uppercase tracking-wider">Global Design Awards</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-extrabold text-[#7928CA] mb-1">98%</div>
            <div className="text-xs text-[#94A3B8] uppercase tracking-wider">Client Retention Rate</div>
          </div>
        </div>
      </div>
    </section>
  );
};
