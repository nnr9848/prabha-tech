import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight, Building2, Sparkles, Layers } from 'lucide-react';
import { CaseStudy } from '../../types';
import { SectionHeading } from '../common/SectionHeading';

interface FeaturedPortfolioSliderProps {
  items: CaseStudy[];
  isLoading?: boolean;
  isError?: boolean;
  onRetry?: () => void;
  autoPlayInterval?: number; // ms, default 5000
}

export const FeaturedPortfolioSlider: React.FC<FeaturedPortfolioSliderProps> = ({
  items,
  isLoading = false,
  isError = false,
  onRetry,
  autoPlayInterval = 5000,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // Responsive visible count: 3 on desktop, 2 on tablet, 1 on mobile
  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    const updateVisibleCount = () => {
      if (window.innerWidth >= 1024) {
        setVisibleCount(3);
      } else if (window.innerWidth >= 640) {
        setVisibleCount(2);
      } else {
        setVisibleCount(1);
      }
    };

    updateVisibleCount();
    window.addEventListener('resize', updateVisibleCount);
    return () => window.removeEventListener('resize', updateVisibleCount);
  }, []);

  // Compute unique categories dynamically from items
  const categories = React.useMemo(() => {
    const set = new Set<string>();
    items.forEach((item) => {
      if (item.category) set.add(item.category);
    });
    return ['All', ...Array.from(set)];
  }, [items]);

  // Filter items by category
  const filteredItems = React.useMemo(() => {
    if (activeCategory === 'All') return items;
    return items.filter((item) => item.category === activeCategory);
  }, [items, activeCategory]);

  const total = filteredItems.length;
  const [timerKey, setTimerKey] = useState(0);
  const touchResumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Maximum starting index so we don't scroll past the end
  const maxIndex = Math.max(0, total - visibleCount);

  // Reset index & restart timer fresh when changing category
  const handleCategorySelect = (cat: string) => {
    setActiveCategory(cat);
    setCurrentIndex(0);
    setTimerKey((k) => k + 1);
  };

  // Industry Standard: Auto-play timer with visibility listener & clean interval reset
  useEffect(() => {
    if (total <= visibleCount || isPaused) return;

    // Handle tab switching (pause when hidden, resume fresh when visible)
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsPaused(true);
      } else {
        setIsPaused(false);
        setTimerKey((k) => k + 1);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, autoPlayInterval);

    return () => {
      clearInterval(timer);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [total, maxIndex, visibleCount, isPaused, autoPlayInterval, timerKey]);

  // Clean next/prev with timer key bump to prevent double-sliding
  const handlePrev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
    setTimerKey((k) => k + 1);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    setTimerKey((k) => k + 1);
  };

  // Pointer-only hover pause: NEVER freeze on touch devices
  const handleMouseEnter = () => {
    if (window.matchMedia('(hover: hover)').matches) {
      setIsPaused(true);
    }
  };

  const handleMouseLeave = () => {
    if (window.matchMedia('(hover: hover)').matches) {
      setIsPaused(false);
      setTimerKey((k) => k + 1);
    }
  };

  // Touch Handlers for mobile & tablet: pause during swipe, auto-resume after 2.5s
  const handleTouchStart = (e: React.TouchEvent) => {
    if (touchResumeTimer.current) {
      clearTimeout(touchResumeTimer.current);
    }
    setIsPaused(true);
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current !== null && touchEndX.current !== null) {
      const distance = touchStartX.current - touchEndX.current;
      const minSwipeDistance = 45;

      if (distance > minSwipeDistance) {
        handleNext();
      } else if (distance < -minSwipeDistance) {
        handlePrev();
      }
    }

    touchStartX.current = null;
    touchEndX.current = null;

    // Gracefully resume autoplay on mobile after interaction
    if (touchResumeTimer.current) {
      clearTimeout(touchResumeTimer.current);
    }
    touchResumeTimer.current = setTimeout(() => {
      setIsPaused(false);
      setTimerKey((k) => k + 1);
    }, 2500);
  };

  // Cleanup touch resume timer on unmount
  useEffect(() => {
    return () => {
      if (touchResumeTimer.current) {
        clearTimeout(touchResumeTimer.current);
      }
    };
  }, []);

  if (total === 0) return null;

  // Percentage offset to shift the carousel track based on visibleCount
  const stepPercent = 100 / visibleCount;
  const transformX = -(currentIndex * stepPercent);

  return (
    <section className="relative py-14 lg:py-16 bg-white border-b border-slate-200 overflow-hidden">
      {/* Subtle ambient luxury backdrop aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-gradient-to-tr from-[#E5A93C]/5 via-[#020E26]/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
        {/* Section Header: Left Title, Right Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-6">
          <div>
            <SectionHeading
              theme="light"
              size="section"
              badge="Client Engagements & Portfolio"
              title="Our Complete Work Archive"
              subtitle="Browse our full portfolio of enterprise platforms, AI systems, industrial IoT, and digital solutions delivered across the GCC and global markets."
            />
          </div>

          {/* Navigation Controls + View Full Portfolio */}
          <div className="flex items-center gap-4 shrink-0">
            <Link
              to="/portfolio"
              className="text-xs font-bold uppercase tracking-wider text-[#020E26] hover:text-[#E5A93C] flex items-center gap-1.5 transition-colors mr-2 cursor-pointer"
            >
              <span>Explore Portfolio Page ({items.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                aria-label="Previous Slide"
                disabled={total <= visibleCount}
                className="w-10 h-10 rounded-md border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 hover:text-[#020E26] hover:border-slate-300 flex items-center justify-center transition-all shadow-2xs hover:shadow-xs active:scale-95 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next Slide"
                disabled={total <= visibleCount}
                className="w-10 h-10 rounded-md border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 hover:text-[#020E26] hover:border-slate-300 flex items-center justify-center transition-all shadow-2xs hover:shadow-xs active:scale-95 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {categories.map((cat) => {
            const isSelected = activeCategory === cat;
            const count = cat === 'All' ? items.length : items.filter((i) => i.category === cat).length;

            return (
              <button
                key={cat}
                onClick={() => handleCategorySelect(cat)}
                className={`px-4 py-2 rounded-md text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-[#020E26] text-white shadow-sm border border-[#020E26]'
                    : 'bg-white text-slate-600 hover:text-[#020E26] border border-slate-200 hover:border-slate-300 hover:shadow-xs'
                }`}
              >
                <span>{cat}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded ${isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Carousel Multi-Card Viewport */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs animate-pulse"
              >
                <div className="h-56 bg-slate-200" />
                <div className="p-6 space-y-4">
                  <div className="h-4 bg-slate-200 rounded w-1/3" />
                  <div className="h-6 bg-slate-200 rounded w-4/5" />
                  <div className="space-y-2">
                    <div className="h-3 bg-slate-200 rounded" />
                    <div className="h-3 bg-slate-200 rounded w-5/6" />
                  </div>
                  <div className="pt-4 border-t border-slate-100 flex justify-between">
                    <div className="h-8 bg-slate-200 rounded w-24" />
                    <div className="h-8 bg-slate-200 rounded w-24" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : isError ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center">
            <p className="text-slate-600 font-medium mb-4">Unable to load portfolio studies at this moment.</p>
            {onRetry && (
              <button
                onClick={onRetry}
                className="px-5 py-2.5 rounded-md bg-[#020E26] hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
              >
                Retry Loading
              </button>
            )}
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center text-slate-500">
            No portfolio projects found for this category.
          </div>
        ) : (
          <div
            className="relative overflow-hidden"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              ref={trackRef}
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(${transformX}%)`,
              }}
            >
            {filteredItems.map((study, idx) => {
              const primaryMetric = study.metrics && study.metrics.length > 0 ? study.metrics[0] : null;

              return (
                <div
                  key={study.slug || idx}
                  className="w-full sm:w-1/2 lg:w-1/3 shrink-0 px-3 flex flex-col"
                >
                  <div className="bg-white rounded-2xl border border-slate-200/90 hover:border-slate-300 hover:shadow-xl transition-all duration-300 flex flex-col h-full overflow-hidden group">
                    {/* Top Image Banner */}
                    <div className="relative h-56 sm:h-60 w-full overflow-hidden bg-slate-900">
                      <img
                        src={study.heroImageUrl}
                        alt={study.title}
                        className="w-full h-full object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent pointer-events-none" />

                      {/* Top Badges */}
                      <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
                        <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-white/95 backdrop-blur-md text-[#020E26] border border-white/20 shadow-xs">
                          {study.category || 'Enterprise'}
                        </span>
                        {study.featured && (
                          <span className="flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-[#E5A93C] text-[#000B1E] shadow-xs">
                            <Sparkles className="w-2.5 h-2.5" />
                            <span>Spotlight</span>
                          </span>
                        )}
                      </div>

                      {/* Client / Organization tag bottom left */}
                      {study.clientName && (
                        <div className="absolute bottom-3 left-4 flex items-center gap-1.5 text-xs text-white/90 font-medium">
                          <Building2 className="w-3.5 h-3.5 text-[#E5A93C]" />
                          <span className="truncate max-w-[200px]">{study.clientName}</span>
                        </div>
                      )}
                    </div>

                    {/* Card Body */}
                    <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-3">
                        <h3 className="text-lg font-bold text-[#020E26] group-hover:text-[#B45309] transition-colors leading-snug line-clamp-2">
                          {study.title}
                        </h3>

                        <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                          {study.summary}
                        </p>
                      </div>

                      {/* Primary Highlight Metric Widget */}
                      {primaryMetric && (
                        <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                          <div>
                            <span className="text-base font-bold text-[#020E26] tracking-tight">
                              {primaryMetric.label}
                            </span>
                            <span className="text-[11px] text-slate-500 block">
                              {primaryMetric.description}
                            </span>
                          </div>
                          <Link
                            to={`/portfolio/${study.slug}`}
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#020E26] group-hover:text-[#E5A93C] transition-colors uppercase tracking-wider shrink-0"
                          >
                            <span>Read Case</span>
                            <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                          </Link>
                        </div>
                      )}

                      {!primaryMetric && (
                        <div className="pt-2 border-t border-slate-100 flex justify-end">
                          <Link
                            to={`/portfolio/${study.slug}`}
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#020E26] group-hover:text-[#E5A93C] transition-colors uppercase tracking-wider"
                          >
                            <span>Explore Solution</span>
                            <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
            );
          })}
        </div>
      </div>
    )}

        {/* Carousel Bottom Pagination Bar */}
        <div className="mt-10 flex items-center justify-between">
          {/* Dot Indicators */}
          <div className="flex items-center gap-2">
            {Array.from({ length: maxIndex + 1 }).map((_, dotIdx) => {
              const isSelected = dotIdx === currentIndex;
              return (
                <button
                  key={dotIdx}
                  onClick={() => setCurrentIndex(dotIdx)}
                  aria-label={`Go to slide ${dotIdx + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    isSelected ? 'w-8 bg-[#E5A93C]' : 'w-2 bg-slate-200 hover:bg-slate-300'
                  }`}
                />
              );
            })}
          </div>

          {/* Interactive Liveness Status */}
          <div className="flex items-center gap-3 text-[11px] text-slate-500 font-medium">
            <span>Showing {total} project{total > 1 ? 's' : ''} in {activeCategory}</span>
            <span className="text-slate-300">•</span>
            <div className="flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${isPaused ? 'bg-amber-400' : 'bg-emerald-500 animate-pulse'}`} />
              <span className="hidden sm:inline">
                {isPaused ? 'Interactive (Paused on Hover)' : 'Live Ambient Rotation'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
