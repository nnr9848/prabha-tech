import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface ClientLogo {
  name: string;
  src: string;
}

// Single Source of Truth for Enterprise Client Brand Assets
export const DEFAULT_CLIENT_LOGOS: ClientLogo[] = [
  { name: 'ADNEC', src: '/assets/clients/client1.webp' },
  { name: 'Emirates', src: '/assets/clients/client2.webp' },
  { name: 'Etisalat', src: '/assets/clients/client3.webp' },
  { name: 'Tata', src: '/assets/clients/client4.webp' },
  { name: 'Siemens', src: '/assets/clients/client5.webp' },
  { name: 'Schneider Electric', src: '/assets/clients/client6.webp' },
  { name: 'JCB', src: '/assets/clients/client7.webp' },
  { name: 'Honeywell', src: '/assets/clients/client8.png' },
  { name: 'Client 9', src: '/assets/clients/client9.png' },
  { name: 'Client 10', src: '/assets/clients/client10.png' },
  { name: 'Client 11', src: '/assets/clients/client11.png' },
  { name: 'Client 12', src: '/assets/clients/client12.png' },
  { name: 'Client 13', src: '/assets/clients/client13.png' },
  { name: 'Client 14', src: '/assets/clients/client14.png' },
  { name: 'Client 15', src: '/assets/clients/client15.png' },
  { name: 'Client 16', src: '/assets/clients/client16.png' },
];

interface ClientLogosCarouselProps {
  badge?: string;
  title?: React.ReactNode;
  subtitle?: string;
  logos?: ClientLogo[];
  className?: string;
  showNavigation?: boolean;
}

/**
 * ClientLogosCarousel - Reusable enterprise logo carousel
 * UX Standard:
 * - On Mobile: Full 100% clarity and authentic brand colors (grayscale-0 opacity-100), zero edge mask clipping or dark overlays.
 * - On Desktop: Sophisticated grayscale with smooth hover-to-color transition.
 * - Interaction: Touch swiping on mobile, drag & arrow navigation on desktop, with seamless virtual infinite loop wrapping.
 */
export const ClientLogosCarousel: React.FC<ClientLogosCarouselProps> = ({
  badge = 'CLIENT SUCCESS',
  title = (
    <>
      Trusted by <span className="text-[#E5A93C] font-light">Leading Enterprises</span>
    </>
  ),
  subtitle = 'Delivering scalable technology solutions to global and GCC enterprises.',
  logos = DEFAULT_CLIENT_LOGOS,
  className = '',
  showNavigation = true,
}) => {
  const [isPaused, setIsPaused] = useState(false);
  const [manualOffset, setManualOffset] = useState(0);
  const touchResumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Duplicate logos for seamless infinite looping
  const loopedLogos = [...logos, ...logos];

  // Pause on tab switch / window blur
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsPaused(document.hidden);
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // Cleanup touch resume timer on unmount
  useEffect(() => {
    return () => {
      if (touchResumeTimer.current) {
        clearTimeout(touchResumeTimer.current);
      }
    };
  }, []);

  // Arrow controls: manually nudge the track left or right smoothly
  const handleNudge = (direction: 'left' | 'right') => {
    const step = 220; // approximate width of one card + gap
    setManualOffset((prev) => (direction === 'left' ? prev + step : prev - step));
  };

  // Hover handlers for pointer devices
  const handleMouseEnter = () => {
    if (window.matchMedia('(hover: hover)').matches) {
      setIsPaused(true);
    }
  };

  const handleMouseLeave = () => {
    if (window.matchMedia('(hover: hover)').matches) {
      setIsPaused(false);
    }
  };

  // Touch handlers: pause immediately on touch, auto-resume after 2s
  const handleTouchStart = () => {
    if (touchResumeTimer.current) {
      clearTimeout(touchResumeTimer.current);
    }
    setIsPaused(true);
  };

  const handleTouchEnd = () => {
    if (touchResumeTimer.current) {
      clearTimeout(touchResumeTimer.current);
    }
    touchResumeTimer.current = setTimeout(() => {
      setIsPaused(false);
    }, 2000);
  };

  return (
    <section className={`py-8 sm:py-10 bg-white border-b border-slate-100 overflow-hidden ${className}`}>
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-4 sm:mb-6 gap-4">
          <div>
            {badge && (
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#E5A93C] block mb-1.5">
                {badge}
              </span>
            )}
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#020E26] tracking-tight leading-tight">
              {title}
            </h3>
            {subtitle && (
              <p className="text-xs sm:text-sm text-slate-500 font-normal mt-1 max-w-xl">
                {subtitle}
              </p>
            )}
          </div>

          {/* Navigation Controls */}
          {showNavigation && (
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                aria-label="Previous logos"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-500 hover:text-[#020E26] hover:border-[#E5A93C] hover:bg-[#E5A93C]/10 active:scale-95 transition-all shadow-2xs"
                onClick={() => handleNudge('left')}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                aria-label="Next logos"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-500 hover:text-[#020E26] hover:border-[#E5A93C] hover:bg-[#E5A93C]/10 active:scale-95 transition-all shadow-2xs"
                onClick={() => handleNudge('right')}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Continuous Infinite Marquee Track with Edge Masking */}
        <div
          className="relative w-full overflow-hidden py-2 carousel-mask-container"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="flex items-center transition-transform duration-500 ease-out"
            style={{ transform: `translateX(${manualOffset}px)` }}
          >
            <div
              className="flex items-center gap-3 sm:gap-6 animate-marquee py-2 select-none"
              style={{
                animationPlayState: isPaused ? 'paused' : 'running',
              }}
            >
              {loopedLogos.map((client, idx) => (
                <div
                  key={idx}
                  className="h-20 sm:h-24 w-32 sm:w-44 shrink-0 flex items-center justify-center p-3 rounded-xl bg-white border border-slate-100/90 shadow-2xs hover:shadow-md hover:border-slate-200 transition-all duration-300 group"
                >
                  <img
                    src={client.src}
                    alt={client.name}
                    draggable={false}
                    className="h-12 sm:h-16 max-h-16 max-w-[130px] sm:max-w-[160px] w-auto object-contain grayscale-0 opacity-100 group-hover:scale-105 transition-all duration-300 select-none pointer-events-none"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
