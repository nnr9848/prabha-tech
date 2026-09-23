import React from 'react';
import { motion } from 'framer-motion';

export const ImpactStatsSection: React.FC = () => {
  return (
    <section className="relative z-10 bg-[#050608] border-b border-white/[0.06] py-16">
      <div className="max-w-[1600px] mx-auto px-8 sm:px-16 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12"
        >
          <div>
            <div className="text-3xl sm:text-4xl lg:text-5xl font-light text-white mb-2 tracking-tight">150+</div>
            <div className="text-xs sm:text-sm text-[#8E9BAE] font-normal">Financial Products Created</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl lg:text-5xl font-light text-white mb-2 tracking-tight">37+</div>
            <div className="text-xs sm:text-sm text-[#8E9BAE] font-normal">Countries Worldwide</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl lg:text-5xl font-light text-[#9873ff] mb-2 tracking-tight">20+</div>
            <div className="text-xs sm:text-sm text-[#8E9BAE] font-normal">International Design Awards</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl lg:text-5xl font-light text-white mb-2 tracking-tight">10+ Years</div>
            <div className="text-xs sm:text-sm text-[#8E9BAE] font-normal">Fintech Focus</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
