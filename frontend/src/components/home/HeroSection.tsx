import React from 'react';
import { motion } from 'framer-motion';
import { PillButton } from '../common/PillButton';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-[auto] md:h-screen md:min-h-[700px] flex items-center pt-28 pb-14 md:py-0 overflow-hidden bg-[#050608]">
      {/* Background Holographic 3D Video / Overlay matching theuxda.com */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          autoPlay
          muted
          playsInline
          poster="https://www.theuxda.com/storage/app/media/background-video/UXDA-bg-X-desktop.jpg"
          className="w-full h-full object-cover object-center opacity-100"
        >
          <source
            src="https://www.theuxda.com/storage/app/media/background-video/UXDA-bg-X-desktop.mp4"
            type="video/mp4"
          />
        </video>
        {/* Responsive Dark Vignette for Typography Legibility while Keeping 3D X Crystal Bright */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050608]/85 via-[#050608]/40 to-[#050608] md:bg-gradient-to-r md:from-[#050608]/90 md:via-[#050608]/30 md:to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#050608] via-transparent to-[#050608]/60"></div>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 sm:px-16 lg:px-24 relative z-10 w-full">
        <div className="max-w-5xl pt-4 sm:pt-16">
          {/* Top Editorial Sub-headline */}
          <motion.div
            initial={{ opacity: 0, y: -60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 5.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="text-[18px] sm:text-[21px] lg:text-[23px] text-white/95 font-normal leading-[1.55] mb-12 sm:mb-14 max-w-[540px]"
          >
            We catalyze business growth by reimagining digital experiences that conquer complex challenges through innovation and agility.
          </motion.div>

          {/* Main Headline - Elegant Light Weight & Expanded Font Size matching theuxda.com */}
          <motion.h1
            initial={{ opacity: 0, y: -95 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 6.4, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-6xl lg:text-[64px] xl:text-[70px] font-light font-[300] text-white tracking-[-0.03em] leading-[1.12] mb-12 sm:mb-14 max-w-5xl"
          >
            Meet the{' '}
            <span className="text-[#9873ff] font-light font-[300]">Digital Drivers</span>
            <br />
            of Global Disruptors
          </motion.h1>

          {/* Authentic UXDA Pill Button */}
          <motion.div
            initial={{ opacity: 0, y: -65 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 6.0, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <PillButton to="/contact" size="lg">
              Contact Our Experts
            </PillButton>
          </motion.div>
        </div>
      </div>
    </section>
  );
};



