import React from 'react';
import { motion } from 'framer-motion';

export interface SectionHeadingProps {
  badge?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  theme?: 'dark' | 'light';
  align?: 'left' | 'center' | 'right';
  size?: 'hero' | 'section';
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  badge,
  title,
  subtitle,
  theme = 'light',
  align = 'left',
  size = 'section',
  className = '',
}) => {
  const isDark = theme === 'dark';
  const isHero = size === 'hero';

  const alignClasses = {
    left: 'text-left items-start',
    center: 'text-center items-center mx-auto',
    right: 'text-right items-end ml-auto',
  }[align];

  return (
    <div className={`flex flex-col ${alignClasses} ${className}`}>
      {/* Eyebrow Tagline Badge */}
      {badge && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="heading-eyebrow mb-3"
        >
          <span>{badge}</span>
        </motion.div>
      )}

      {/* Main Display / Section Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.08 }}
        className={`${isHero ? 'heading-hero' : 'heading-section'} ${
          isDark ? 'text-white' : 'text-[#020E26]'
        } mb-4`}
      >
        {title}
      </motion.h2>

      {/* Supporting Subtitle */}
      {subtitle && (
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.16 }}
          className={`text-sm sm:text-base font-light leading-relaxed max-w-2xl ${
            isDark ? 'text-slate-300' : 'text-slate-600'
          }`}
        >
          {subtitle}
        </motion.div>
      )}
    </div>
  );
};
