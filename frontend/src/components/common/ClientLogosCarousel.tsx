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
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);
  const isWrappingRef = useRef(false);

  // Triplicate logos for seamless infinite wrapping in both directions
  const loopedLogos = [...logos, ...logos, ...logos];

  // Initialize scroll position in the center buffer (Set 2 of 3)
  useEffect(() => {
    const el = sliderRef.current;
    if (!el) return;
    const initScroll = () => {
      const setWidth = el.scrollWidth / 3;
      if (setWidth > 0) {
        el.scrollLeft = setWidth;
      }
    };
    initScroll();
    const timer = setTimeout(initScroll, 100);
    return () => clearTimeout(timer);
  }, [logos]);

  // Seamless boundary wrap on scroll
  const handleScroll = () => {
    const el = sliderRef.current;
    if (!el || isWrappingRef.current) return;
    const setWidth = el.scrollWidth / 3;
    if (setWidth <= 0) return;

    // Approaching left end of Set 1 -> silently jump to Set 2
    if (el.scrollLeft <= 10) {
      isWrappingRef.current = true;
      el.scrollLeft += setWidth;
      requestAnimationFrame(() => {
        isWrappingRef.current = false;
      });
    }
    // Approaching right end of Set 3 -> silently jump to Set 2
    else if (el.scrollLeft >= setWidth * 2 - 10) {
      isWrappingRef.current = true;
      el.scrollLeft -= setWidth;
      requestAnimationFrame(() => {
        isWrappingRef.current = false;
      });
    }
  };

  const scrollSlider = (direction: 'left' | 'right') => {
    const el = sliderRef.current;
    if (!el) return;
    const scrollOffset = el.clientWidth * 0.65;
    const setWidth = el.scrollWidth / 3;

    if (direction === 'left' && el.scrollLeft <= scrollOffset + 10) {
      el.scrollLeft += setWidth;
    } else if (direction === 'right' && el.scrollLeft >= setWidth * 2 - scrollOffset - 10) {
      el.scrollLeft -= setWidth;
    }

    el.scrollBy({
      left: direction === 'left' ? -scrollOffset : scrollOffset,
      behavior: 'smooth',
    });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!sliderRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeftState(sliderRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !sliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    sliderRef.current.scrollLeft = scrollLeftState - walk;
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  return (
    <section className={`py-14 sm:py-20 bg-white border-b border-slate-100 overflow-hidden ${className}`}>
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10 gap-4">
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
                onClick={() => scrollSlider('left')}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                aria-label="Next logos"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-500 hover:text-[#020E26] hover:border-[#E5A93C] hover:bg-[#E5A93C]/10 active:scale-95 transition-all shadow-2xs"
                onClick={() => scrollSlider('right')}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Draggable & Looping Logo Track */}
        {/* On mobile: NO mask clipping or darkening; On desktop: smooth edge feathering */}
        <div className="relative w-full overflow-hidden py-2 carousel-mask-container">
          <div
            ref={sliderRef}
            onScroll={handleScroll}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUpOrLeave}
            onMouseLeave={handleMouseUpOrLeave}
            className={`flex items-center gap-3 sm:gap-6 overflow-x-auto no-scrollbar scroll-smooth py-2 select-none ${
              isDragging ? 'cursor-grabbing select-none' : 'cursor-grab'
            }`}
          >
            {loopedLogos.map((client, idx) => (
              <div
                key={idx}
                className="h-20 sm:h-24 w-32 sm:w-44 shrink-0 flex items-center justify-center p-3 rounded-xl bg-white border border-slate-100/90 shadow-2xs hover:shadow-md hover:border-slate-200 transition-all duration-300 group pointer-events-none sm:pointer-events-auto"
              >
                {/* Mobile: Full color (grayscale-0) & 100% opacity, zero dark layer. Desktop: subtle grayscale with hover transition */}
                <img
                  src={client.src}
                  alt={client.name}
                  draggable={false}
                  className="h-12 sm:h-16 max-h-16 max-w-[130px] sm:max-w-[160px] w-auto object-contain grayscale-0 opacity-100 sm:grayscale sm:opacity-85 sm:group-hover:grayscale-0 sm:group-hover:opacity-100 sm:group-hover:scale-105 transition-all duration-300 select-none pointer-events-none"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
