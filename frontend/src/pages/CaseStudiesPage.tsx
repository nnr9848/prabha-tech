import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
  ArrowRight,
  ExternalLink,
  Laptop,
  Smartphone,
  Cpu,
  Radio,
  Building,
  ShieldCheck,
  CreditCard,
  Truck,
  Sprout,
  Gift,
  Server,
  Layers,
  Sparkles,
} from 'lucide-react';
import { SectionHeading } from '../components/common/SectionHeading';
import { BrandButton } from '../components/common/BrandButton';
import { publicApi } from '../api/client';
import { CaseStudy } from '../types';

export const CaseStudiesPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  // Single Source of Truth: Fetch all case studies from PostgreSQL via public REST API
  const {
    data: caseStudies = [],
    isLoading,
    isError,
    refetch,
  } = useQuery<CaseStudy[]>({
    queryKey: ['publicCaseStudies'],
    queryFn: () => publicApi.getCaseStudies(),
    staleTime: 1000 * 60 * 5,
  });

  // Dynamically compute unique category filter tabs from live database records
  const filterCategories = React.useMemo(() => {
    const set = new Set<string>();
    caseStudies.forEach((cs) => {
      if (cs.category) set.add(cs.category);
    });
    return ['All', ...Array.from(set)];
  }, [caseStudies]);

  const filteredItems =
    activeCategory === 'All'
      ? caseStudies
      : caseStudies.filter((item) => item.category === activeCategory);

  return (
    <div className="bg-white text-slate-900 font-sans selection:bg-[#E5A93C]/30">
      {/* ========================================================= */}
      {/* 1. PORTFOLIO HERO: Daylight Clean Luxury Header */}
      {/* ========================================================= */}
      <section className="relative pt-36 pb-20 border-b border-slate-100 overflow-hidden bg-white">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-6">
              <span className="heading-eyebrow block">
                OUR PORTFOLIO
              </span>
              <h1 className="heading-hero text-[#020E26]">
                Building Impact <br />
                <span className="text-[#E5A93C] font-light">Through Technology</span>
              </h1>
              <p className="text-base text-slate-600 leading-relaxed max-w-lg">
                AI-powered software, mobile applications, and enterprise solutions that help businesses innovate, scale, and lead across industries.
              </p>

              {/* Stats Band with Light Luxury Typography */}
              <div className="grid grid-cols-4 gap-4 pt-6 border-t border-slate-200">
                <div>
                  <div className="text-3xl font-light text-gold-shimmer leading-none">100+</div>
                  <div className="text-[11px] font-bold text-slate-500 uppercase mt-1">Projects</div>
                </div>
                <div>
                  <div className="text-3xl font-light text-gold-shimmer leading-none">10+</div>
                  <div className="text-[11px] font-bold text-slate-500 uppercase mt-1">Years</div>
                </div>
                <div>
                  <div className="text-3xl font-light text-gold-shimmer leading-none">GCC</div>
                  <div className="text-[11px] font-bold text-slate-500 uppercase mt-1">Footprint</div>
                </div>
                <div>
                  <div className="text-3xl font-light text-gold-shimmer leading-none">Global</div>
                  <div className="text-[11px] font-bold text-slate-500 uppercase mt-1">Enterprises</div>
                </div>
              </div>
            </div>

            {/* Right Multi-Device Visual Showcase (Unboxed, Enterprise Depth) */}
            <div className="lg:col-span-6 relative flex items-center justify-center">
              {/* Subtle ambient gold & blue glow behind devices */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#E5A93C]/15 via-blue-500/10 to-transparent rounded-full filter blur-3xl opacity-70 pointer-events-none"></div>

              <div className="relative z-10 w-full flex items-center justify-center">
                <img
                  src="/assets/images/enterprise-software.png"
                  alt="Portfolio Multi-Device Platform"
                  className="w-full h-auto max-w-[620px] lg:max-w-none object-contain drop-shadow-[0_24px_48px_rgba(2,14,38,0.12)] hover:scale-[1.01] transition-transform duration-500 ease-out"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. CATEGORY FILTER TABS & 12 PORTFOLIO CARDS */}
      {/* ========================================================= */}
      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
          {/* Filter Categories */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-14 no-scrollbar">
            {filterCategories.map((cat) => {
              const isSelected = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2 rounded-md text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-[#020E26] text-white shadow-sm border border-[#020E26]'
                      : 'bg-white text-slate-600 hover:text-[#020E26] border border-slate-200 hover:border-slate-300 hover:shadow-xs'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Loading Skeleton */}
          {isLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[1, 2, 3, 4].map((n) => (
                <div
                  key={n}
                  className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs animate-pulse"
                >
                  <div className="aspect-[16/9] bg-slate-200" />
                  <div className="p-7 space-y-4">
                    <div className="h-6 bg-slate-200 rounded w-3/4" />
                    <div className="space-y-2">
                      <div className="h-3.5 bg-slate-200 rounded" />
                      <div className="h-3.5 bg-slate-200 rounded w-5/6" />
                    </div>
                    <div className="pt-4 border-t border-slate-100 flex gap-3">
                      <div className="h-9 bg-slate-200 rounded w-28" />
                      <div className="h-9 bg-slate-200 rounded w-28" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Error State */}
          {isError && !isLoading && (
            <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center">
              <p className="text-slate-600 font-medium mb-4">Unable to load portfolio projects at this moment.</p>
              <button
                onClick={() => refetch()}
                className="px-5 py-2.5 rounded-md bg-[#020E26] hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
              >
                Retry Loading
              </button>
            </div>
          )}

          {/* Empty State */}
          {!isLoading && !isError && filteredItems.length === 0 && (
            <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center text-slate-500">
              No portfolio projects found for this category.
            </div>
          )}

          {/* 2-Column Luxury Cards Grid */}
          {!isLoading && !isError && filteredItems.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredItems.map((item, idx) => (
                <div
                  key={item.slug || idx}
                  className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:border-[#E5A93C]/50 transition-all duration-300 flex flex-col group"
                >
                  {/* Visual Thumbnail */}
                  <div className="aspect-[16/9] bg-slate-100 overflow-hidden relative">
                    <img
                      src={item.heroImageUrl || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80'}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4 px-3 py-1 rounded-md bg-[#020E26]/85 backdrop-blur-sm text-[10px] font-bold uppercase tracking-wider text-[#E5A93C] border border-slate-700/60 shadow">
                      {item.category}
                    </div>
                  </div>

                  {/* Content Details */}
                  <div className="p-7 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-[#020E26] mb-2 group-hover:text-[#E5A93C] transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed mb-6">
                        {item.summary}
                      </p>
                    </div>

                    {/* Dual Action Buttons */}
                    <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                      <BrandButton to={`/portfolio/${item.slug}`} variant="dark" size="sm">
                        Case Study
                      </BrandButton>
                      <Link
                        to="/contact"
                        className="px-5 py-2.5 rounded-md bg-slate-100 hover:bg-slate-200 text-[#020E26] text-xs font-semibold uppercase tracking-wider transition-colors"
                      >
                        Explore →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. BOTTOM CTA BANNER (Panorama Skyline with Clean Left Fade) */}
      {/* ========================================================= */}
      <section className="relative py-20 bg-[#000B1E] text-white overflow-hidden border-t border-slate-800">
        {/* Right-anchored Skyline visual with smooth progressive fade into deep navy */}
        <div 
          className="absolute right-0 top-0 bottom-0 w-full lg:w-[58%] z-0 pointer-events-none overflow-hidden"
          style={{
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.2) 20%, rgba(0,0,0,0.7) 48%, black 75%)',
            maskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.2) 20%, rgba(0,0,0,0.7) 48%, black 75%)'
          }}
        >
          <img
            src="/assets/images/dubai-hero-rings.jpg"
            alt="Dubai Golden Skyline Innovation Hub at Night"
            className="w-full h-full object-cover object-[center_right] opacity-95 scale-100"
          />
        </div>

        <div className="relative z-10 max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <span className="heading-eyebrow block mb-2">
              LET'S BUILD TOGETHER
            </span>
            <h2 className="heading-section text-white">
              Turn Your Vision Into Real Business Impact
            </h2>
            <p className="text-sm text-slate-300 mt-2 max-w-xl">
              Partner with Prabha Technologies to build innovative and scalable digital solutions for a smarter tomorrow.
            </p>
          </div>
          <BrandButton to="/contact" variant="gold" size="lg">
            Let's Talk
          </BrandButton>
        </div>
      </section>
    </div>
  );
};
