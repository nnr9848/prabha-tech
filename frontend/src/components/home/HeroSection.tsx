import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative h-screen min-h-[700px] flex items-center overflow-hidden bg-[#050608]">
      {/* Background Holographic 3D Video / Overlay matching theuxda.com */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          autoPlay
          muted
          playsInline
          poster="https://www.theuxda.com/storage/app/media/background-video/UXDA-bg-X-desktop.jpg"
          className="w-full h-full object-cover object-right md:object-center opacity-100"
        >
          <source
            src="https://www.theuxda.com/storage/app/media/background-video/UXDA-bg-X-desktop.mp4"
            type="video/mp4"
          />
        </video>
        {/* Subtle Dark Left Vignette for Typography Legibility while Keeping 3D X Crystal Bright */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#050608]/90 via-[#050608]/30 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#050608] via-transparent to-[#050608]/60"></div>
      </div>

      <div className="max-w-[1600px] mx-auto px-8 sm:px-16 lg:px-24 relative z-10 w-full">
        <div className="max-w-5xl pt-12 sm:pt-16">
          {/* Top Editorial Sub-headline */}
          <motion.div
            initial={{ opacity: 0, y: -60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 5.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="text-[18px] sm:text-[21px] lg:text-[23px] text-[#A0A8B8] font-light leading-[1.5] mb-12 sm:mb-14 max-w-[480px]"
          >
            Financial UX design authority enabling large-scale financial institutions to differentiate and lead in the digital world.
          </motion.div>

          {/* Main Headline - Slower and deeper travel, large authentic UXDA stature */}
          <motion.h1
            initial={{ opacity: 0, y: -95 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 6.4, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-6xl lg:text-[68px] xl:text-[76px] font-light text-white tracking-[-0.03em] leading-[1.1] mb-12 sm:mb-14 max-w-5xl"
          >
            Defining Distinctive{' '}
            <span className="text-[#9873ff] font-light">Digital Brand</span>
            <br />
            <span className="text-[#9873ff] font-light">Identities</span> for Financial Institutions
          </motion.h1>

          {/* Authentic UXDA Pill Button */}
          <motion.div
            initial={{ opacity: 0, y: -65 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 6.0, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link to="/case-studies" className="uxda-pill-btn group inline-flex items-center">
              <span>Cases: strategic outcomes</span>
              <ArrowRight className="w-4 h-4 text-[#9873ff] transition-transform duration-300 group-hover:translate-x-1 ml-2" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};



