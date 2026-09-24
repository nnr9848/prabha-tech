import React from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { publicApi } from '../../api/client';
import { HeroConfig } from '../../types';
import { PillButton } from '../common/PillButton';

export const DEFAULT_HERO_CONFIG: HeroConfig = {
  id: 1,
  subHeadline:
    'We catalyze business growth by reimagining digital experiences that conquer complex challenges through innovation and agility.',
  headlinePrefix: 'Meet the',
  headlineHighlight: 'Digital Drivers',
  headlineSuffix: 'of Global Disruptors',
  ctaText: 'Contact Our Experts',
  ctaLink: '/contact',
  videoUrl: '/assets/video/hero-bg.mp4',
  posterUrl: '',
};

// Centralized Framer Motion Transitions (Cinematic ease-out curve matching brand standard)
export const HERO_MOTION_VARIANTS = {
  subHeadline: {
    initial: { opacity: 0, y: -60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 5.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] as const },
  },
  headline: {
    initial: { opacity: 0, y: -95 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 6.4, delay: 0.45, ease: [0.16, 1, 0.3, 1] as const },
  },
  ctaButton: {
    initial: { opacity: 0, y: -65 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 6.0, delay: 0.55, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export type PreviewLayerMode = 'all' | 'poster-only' | 'gradient-only';

interface HeroSectionProps {
  overrideConfig?: Partial<HeroConfig> | null;
  isPreview?: boolean;
  previewLayerMode?: PreviewLayerMode;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  overrideConfig,
  isPreview = false,
  previewLayerMode = 'all',
}) => {
  const [isVideoLoaded, setIsVideoLoaded] = React.useState(false);

  const { data: fetchedConfig } = useQuery<HeroConfig>({
    queryKey: ['heroConfig'],
    queryFn: () => publicApi.getHeroConfig(),
    staleTime: 1000 * 60 * 5, // 5 minutes fresh
    enabled: !overrideConfig, // Skip remote query if override is provided (e.g. CMS live simulator)
  });

  const hero: HeroConfig = {
    ...DEFAULT_HERO_CONFIG,
    ...(fetchedConfig || {}),
    ...(overrideConfig || {}),
  };

  const showVideo = previewLayerMode === 'all' && Boolean(hero.videoUrl);
  const showPosterImage =
    (previewLayerMode === 'poster-only' || (!hero.videoUrl && previewLayerMode === 'all')) &&
    Boolean(hero.posterUrl);

  return (
    <section
      className={`relative overflow-hidden bg-[#050608] flex items-center ${
        isPreview
          ? 'min-h-[480px] p-6 sm:p-10 rounded-2xl border border-white/20 shadow-2xl'
          : 'min-h-[auto] md:h-screen md:min-h-[700px] pt-28 pb-14 md:py-0'
      }`}
    >
      {/* Background Holographic 3D Video / Fallback Poster Image / Pure Dark Vignette */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* 1. Video Layer with Silk Smooth Cross-fade */}
        {showVideo && (
          <video
            key={hero.videoUrl}
            autoPlay
            muted
            loop
            playsInline
            poster={hero.posterUrl || undefined}
            onLoadedData={() => setIsVideoLoaded(true)}
            className={`w-full h-full object-cover object-center transition-opacity duration-700 ease-out ${
              isVideoLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <source src={hero.videoUrl} type="video/mp4" />
          </video>
        )}

        {/* 2. Isolated Fallback Poster Image Layer (when previewing poster or video is disabled) */}
        {showPosterImage && (
          <img
            src={hero.posterUrl}
            alt="Hero Background Poster"
            className="w-full h-full object-cover object-center opacity-90 transition-opacity duration-500"
          />
        )}

        {/* 3. Responsive Dark Vignette for Typography Legibility while Keeping Visuals Crystal Bright */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050608]/85 via-[#050608]/40 to-[#050608] md:bg-gradient-to-r md:from-[#050608]/90 md:via-[#050608]/30 md:to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#050608] via-transparent to-[#050608]/60"></div>
      </div>

      <div
        className={`relative z-10 w-full ${
          isPreview
            ? 'max-w-xl'
            : 'max-w-[1600px] mx-auto px-6 sm:px-16 lg:px-24'
        }`}
      >
        <div className={isPreview ? 'space-y-6' : 'max-w-5xl pt-4 sm:pt-16'}>
          {/* Top Editorial Sub-headline */}
          <motion.div
            initial={HERO_MOTION_VARIANTS.subHeadline.initial}
            animate={HERO_MOTION_VARIANTS.subHeadline.animate}
            transition={HERO_MOTION_VARIANTS.subHeadline.transition}
            className={
              isPreview
                ? 'text-xs sm:text-sm text-white/95 font-normal leading-relaxed max-w-md'
                : 'text-[18px] sm:text-[21px] lg:text-[23px] text-white/95 font-normal leading-[1.55] mb-12 sm:mb-14 max-w-[540px]'
            }
          >
            {hero.subHeadline}
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={HERO_MOTION_VARIANTS.headline.initial}
            animate={HERO_MOTION_VARIANTS.headline.animate}
            transition={HERO_MOTION_VARIANTS.headline.transition}
            className={
              isPreview
                ? 'text-2xl sm:text-4xl font-light font-[300] text-white tracking-tight leading-tight'
                : 'text-4xl sm:text-6xl lg:text-[64px] xl:text-[70px] font-light font-[300] text-white tracking-[-0.03em] leading-[1.12] mb-12 sm:mb-14 max-w-5xl'
            }
          >
            {hero.headlinePrefix}{' '}
            <span className="text-[var(--brand-primary,#9873ff)] font-light font-[300]">
              {hero.headlineHighlight}
            </span>
            <br />
            {hero.headlineSuffix}
          </motion.h1>

          {/* Reusable Brand Pill Button */}
          <motion.div
            initial={HERO_MOTION_VARIANTS.ctaButton.initial}
            animate={HERO_MOTION_VARIANTS.ctaButton.animate}
            transition={HERO_MOTION_VARIANTS.ctaButton.transition}
          >
            {isPreview ? (
              <PillButton size="md" showDefaultIcon={true}>
                {hero.ctaText || 'Contact Our Experts'}
              </PillButton>
            ) : (
              <PillButton to={hero.ctaLink || '/contact'} size="lg">
                {hero.ctaText || 'Contact Our Experts'}
              </PillButton>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
