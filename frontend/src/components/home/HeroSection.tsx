import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Award } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-28 pb-20 overflow-hidden bg-[#050608]">
      {/* Background Holographic 3D Loop Video / Overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-40 mix-blend-screen">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1920&q=80"
          className="w-full h-full object-cover"
        >
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-screens-with-charts-and-data-31913-large.mp4"
            type="video/mp4"
          />
        </video>
        {/* Dark Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#050608] via-[#050608]/70 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#050608] via-transparent to-[#050608]/80"></div>
      </div>

      <div className="max-w-[1600px] mx-auto px-8 sm:px-16 lg:px-24 relative z-10 w-full">
        <div className="max-w-5xl pt-10 sm:pt-16">
          {/* Top Editorial Sub-headline */}
          <motion.div
            initial={{ opacity: 0, y: -60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 5.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="text-[19px] sm:text-[21px] lg:text-[23px] text-[#E2E8F0] font-normal leading-[1.55] mb-14 max-w-[500px]"
          >
            Financial UX design authority enabling large-scale financial institutions to differentiate and lead in the digital world.
          </motion.div>

          {/* Main Headline - Slower and deeper travel */}
          <motion.h1
            initial={{ opacity: 0, y: -95 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 6.4, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl sm:text-5xl lg:text-[54px] xl:text-[60px] font-normal text-white tracking-[-0.02em] leading-[1.15] mb-12 max-w-4xl"
          >
            Defining Distinctive{' '}
            <span className="text-[#9873ff] font-normal">Digital Brand</span>
            <br />
            <span className="text-[#9873ff] font-normal">Identities</span> for Financial Institutions
          </motion.h1>

          {/* Authentic UXDA Pill Button */}
          <motion.div
            initial={{ opacity: 0, y: -65 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 6.0, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link to="/case-studies" className="uxda-pill-btn group">
              <span>Cases: strategic outcomes</span>
              <ArrowRight className="w-4 h-4 text-[#9873ff] transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>

        {/* Floating Impact Stats Banner at Bottom */}
        <motion.div
          initial={{ opacity: 0, y: -65 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 6.0, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="mt-28 pt-8 border-t border-white/8 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          <div>
            <div className="text-3xl sm:text-4xl font-[300] text-white mb-1 tracking-tight">150+</div>
            <div className="text-xs text-[#8E9BAE] font-normal">Financial Products Created</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-[300] text-white mb-1 tracking-tight">37+</div>
            <div className="text-xs text-[#8E9BAE] font-normal">Countries Worldwide</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-[300] text-[#9873ff] mb-1 tracking-tight">20+</div>
            <div className="text-xs text-[#8E9BAE] font-normal">International Design Awards</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-[300] text-white mb-1 tracking-tight">10+ Years</div>
            <div className="text-xs text-[#8E9BAE] font-normal">Fintech Focus</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};


