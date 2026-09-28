import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import {
  Search,
  ArrowRight,
  Calendar,
  Clock,
  Mail,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { publicApi } from '../api/client';
import { Article } from '../types';

export const InsightsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  // Single Source of Truth: Fetch published articles from PostgreSQL database
  const {
    data: allArticles = [],
    isLoading,
    isError,
    refetch,
  } = useQuery<Article[]>({
    queryKey: ['articles', 'all'],
    queryFn: () => publicApi.getArticles(),
    staleTime: 1000 * 60 * 5,
  });

  // Dynamically derive category pills from database articles
  const categories = useMemo(() => {
    const set = new Set<string>();
    allArticles.forEach((art) => {
      if (art.category) set.add(art.category);
    });
    return ['All', ...Array.from(set)];
  }, [allArticles]);

  // Featured Insights (1 main large + 2 stacked)
  const primaryFeatured = allArticles.find((a) => a.slug === 'future-of-ai-in-enterprise-applications') || allArticles[0];
  const secondaryFeaturedTop = allArticles.find((a) => a.slug === 'ai-driven-bems-for-sustainable-tomorrow') || allArticles[1];
  const secondaryFeaturedBottom = allArticles.find((a) => a.slug === 'digital-transformation-in-heavy-equipment-industry') || allArticles[2];

  // Filtered Latest Insights
  const filteredArticles = useMemo(() => {
    return allArticles.filter((art) => {
      // Category match
      const matchCat = selectedCategory === 'All' || art.category.toLowerCase() === selectedCategory.toLowerCase();
      // Search match
      const query = searchQuery.trim().toLowerCase();
      const matchSearch =
        !query ||
        art.title.toLowerCase().includes(query) ||
        art.excerpt.toLowerCase().includes(query) ||
        art.category.toLowerCase().includes(query);

      return matchCat && matchSearch;
    });
  }, [allArticles, selectedCategory, searchQuery]);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) return;
    setNewsletterSuccess(true);
    setTimeout(() => {
      setNewsletterEmail('');
      setNewsletterSuccess(false);
    }, 4000);
  };

  return (
    <div className="bg-white text-slate-900 font-sans selection:bg-[#E5A93C]/30 min-h-screen">
      {/* ========================================================= */}
      {/* 1. HERO SECTION: Daylight Architectural Skyline & Insights */}
      {/* ========================================================= */}
      <section className="relative pt-32 sm:pt-36 pb-16 lg:pb-24 border-b border-slate-100 overflow-hidden bg-white">
        {/* Right Dubai Skyline & Futuristic Architectural Curvature Frame */}
        <div 
          className="absolute right-0 top-0 bottom-0 w-full lg:w-[56%] z-0 pointer-events-none overflow-hidden"
          style={{
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.25) 15%, rgba(0,0,0,0.85) 45%, black 75%)',
            maskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.25) 15%, rgba(0,0,0,0.85) 45%, black 75%)'
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1600&q=85"
            alt="Futuristic Dubai Architecture & Corporate Hub"
            className="w-full h-full object-cover object-center scale-105"
          />
          {/* Subtle edge blends */}
          <div className="hidden lg:block absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent pointer-events-none" />
          <div className="hidden lg:block absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white to-transparent pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <span className="heading-eyebrow block">
                INSIGHTS
              </span>
              <h1 className="heading-hero text-[#020E26]">
                Ideas. Innovation. <br />
                <span className="text-[#E5A93C] font-light">Real Impact.</span>
              </h1>
              <p className="text-base sm:text-lg text-slate-600 max-w-xl font-light leading-relaxed">
                Expert insights, industry trends, technology updates and thought leadership from the Prabha Technologies team.
              </p>

              {/* Interactive Search Bar Pill */}
              <div className="pt-2 max-w-md">
                <div className="relative flex items-center bg-white rounded-full border border-slate-200/90 shadow-sm pl-4 pr-1.5 py-1.5 focus-within:border-[#E5A93C] focus-within:ring-2 focus-within:ring-[#E5A93C]/20 transition-all">
                  <Search className="w-4 h-4 text-slate-400 mr-2.5 shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search articles, topics or keywords..."
                    className="w-full bg-transparent text-sm text-slate-800 placeholder-slate-400 outline-none pr-2"
                  />
                  <button
                    type="button"
                    aria-label="Submit search"
                    className="w-8 h-8 rounded-full bg-[#E5A93C] hover:bg-[#D4972B] active:scale-95 text-[#000B1E] flex items-center justify-center shrink-0 transition-all shadow-sm"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Right Architectural Vignette Card */}
            <div className="lg:col-span-5 flex justify-end">
              <div className="relative w-full max-w-sm rounded-2xl bg-[#000B1E]/80 backdrop-blur-md border border-white/10 p-6 sm:p-7 shadow-2xl text-white">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-4 h-4 text-[#E5A93C]" />
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#E5A93C]">
                    Thought Leadership
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-light leading-tight mb-4 text-white">
                  Insights <br />
                  <span className="font-medium text-white">Today for a</span> <br />
                  <span className="text-[#E5A93C]">Smarter Tomorrow</span>
                </h3>
                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[10px] sm:text-[11px] font-semibold tracking-wider text-slate-300 uppercase">
                  <span>TECHNOLOGY</span>
                  <span>•</span>
                  <span>PEOPLE</span>
                  <span>•</span>
                  <span>INDUSTRIES</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. CATEGORY PILL FILTER BAR */}
      {/* ========================================================= */}
      <section className="py-6 border-b border-slate-100 bg-white sticky top-[68px] sm:top-[76px] z-30 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            {categories.map((cat) => {
              const isActive = selectedCategory.toLowerCase() === cat.toLowerCase();
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-[#020E26] text-white shadow-sm font-semibold'
                      : 'bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200/60'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. FEATURED INSIGHTS (Asymmetric Hero Editorial Grid) */}
      {/* ========================================================= */}
      {selectedCategory === 'All' && !searchQuery && (
        <section className="py-14 sm:py-20 bg-slate-50/60 border-b border-slate-100">
          <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
            <div className="mb-8">
              <span className="heading-eyebrow block">
                FEATURED INSIGHTS
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
              {/* Primary Large Card (Left 7 Cols) */}
              {primaryFeatured && (
                <div className="lg:col-span-7 rounded-2xl bg-[#000B1E] text-white border border-slate-800 overflow-hidden shadow-xl flex flex-col justify-between group relative">
                  {/* Subtle Background Glow & Cover Photo */}
                  <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden">
                    <img
                      src={primaryFeatured.coverImageUrl}
                      alt={primaryFeatured.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-85"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#000B1E] via-[#000B1E]/40 to-transparent" />
                    <span className="absolute top-5 left-5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/70 border border-white/15 text-[#E5A93C] backdrop-blur-sm">
                      AI & INNOVATION
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-6 sm:p-8 -mt-12 relative z-10 flex-1 flex flex-col justify-between">
                    <div>
                      <h2 className="text-2xl sm:text-3xl font-medium text-white mb-3 leading-snug group-hover:text-[#E5A93C] transition-colors">
                        {primaryFeatured.title}
                      </h2>
                      <p className="text-sm text-slate-300 font-light leading-relaxed mb-6 line-clamp-2">
                        {primaryFeatured.excerpt}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-white/10 text-xs text-slate-400">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-[#E5A93C]" />
                          {primaryFeatured.createdAt || '22 Sep 2026'}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-[#E5A93C]" />
                          {primaryFeatured.readTime || '5 min read'}
                        </span>
                      </div>

                      <Link
                        to={`/insights/${primaryFeatured.slug}`}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-[#000B1E] text-xs font-semibold hover:bg-[#E5A93C] transition-colors shadow-sm"
                      >
                        <span>Read Article</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              {/* Secondary Stacked Cards (Right 5 Cols) */}
              <div className="lg:col-span-5 flex flex-col gap-6">
                {/* Secondary Top Card */}
                {secondaryFeaturedTop && (
                  <Link
                    to={`/insights/${secondaryFeaturedTop.slug}`}
                    className="flex-1 rounded-2xl bg-[#000B1E] text-white border border-slate-800 overflow-hidden shadow-lg p-5 sm:p-6 flex flex-col justify-between group hover:border-[#E5A93C]/40 transition-all duration-300 relative"
                  >
                    <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden mb-4">
                      <img
                        src={secondaryFeaturedTop.coverImageUrl}
                        alt={secondaryFeaturedTop.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-85"
                      />
                      <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-black/75 border border-white/15 text-[#E5A93C] backdrop-blur-sm">
                        SMART BUILDINGS
                      </span>
                    </div>

                    <div>
                      <h3 className="text-lg sm:text-xl font-medium text-white group-hover:text-[#E5A93C] transition-colors mb-2 leading-snug">
                        {secondaryFeaturedTop.title}
                      </h3>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-white/10 text-xs text-slate-400 mt-2">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1 text-[11px]">
                          <Calendar className="w-3 h-3 text-[#E5A93C]" />
                          {secondaryFeaturedTop.createdAt || '18 Sep 2026'}
                        </span>
                        <span className="flex items-center gap-1 text-[11px]">
                          <Clock className="w-3 h-3 text-[#E5A93C]" />
                          {secondaryFeaturedTop.readTime || '4 min read'}
                        </span>
                      </div>
                      <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-white group-hover:bg-[#E5A93C] group-hover:text-[#000B1E] transition-colors">
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </Link>
                )}

                {/* Secondary Bottom Card */}
                {secondaryFeaturedBottom && (
                  <Link
                    to={`/insights/${secondaryFeaturedBottom.slug}`}
                    className="flex-1 rounded-2xl bg-[#000B1E] text-white border border-slate-800 overflow-hidden shadow-lg p-5 sm:p-6 flex flex-col justify-between group hover:border-[#E5A93C]/40 transition-all duration-300 relative"
                  >
                    <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden mb-4">
                      <img
                        src={secondaryFeaturedBottom.coverImageUrl}
                        alt={secondaryFeaturedBottom.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-85"
                      />
                      <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-black/75 border border-white/15 text-[#E5A93C] backdrop-blur-sm">
                        INDUSTRIAL IOT
                      </span>
                    </div>

                    <div>
                      <h3 className="text-lg sm:text-xl font-medium text-white group-hover:text-[#E5A93C] transition-colors mb-2 leading-snug">
                        {secondaryFeaturedBottom.title}
                      </h3>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-white/10 text-xs text-slate-400 mt-2">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1 text-[11px]">
                          <Calendar className="w-3 h-3 text-[#E5A93C]" />
                          {secondaryFeaturedBottom.createdAt || '15 Sep 2026'}
                        </span>
                        <span className="flex items-center gap-1 text-[11px]">
                          <Clock className="w-3 h-3 text-[#E5A93C]" />
                          {secondaryFeaturedBottom.readTime || '6 min read'}
                        </span>
                      </div>
                      <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-white group-hover:bg-[#E5A93C] group-hover:text-[#000B1E] transition-colors">
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ========================================================= */}
      {/* 4. LATEST INSIGHTS (4-Column Editorial Card Grid) */}
      {/* ========================================================= */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 pb-4 border-b border-slate-100">
            <div>
              <span className="heading-eyebrow block">
                {selectedCategory === 'All' ? 'LATEST INSIGHTS' : `${selectedCategory.toUpperCase()} ARTICLES`}
              </span>
              <h2 className="text-2xl sm:text-3xl font-light text-[#020E26] mt-1">
                Explore Knowledge <span className="font-medium text-[#E5A93C]">& Case Findings</span>
              </h2>
            </div>

            <div className="flex items-center gap-3 text-xs font-semibold text-[#020E26] hover:text-[#E5A93C] transition-colors cursor-pointer">
              <span>View All Articles</span>
              <ArrowRight className="w-4 h-4 text-[#E5A93C]" />
            </div>
          </div>

          {/* Grid of Articles */}
          {filteredArticles.length === 0 ? (
            <div className="py-16 text-center max-w-md mx-auto">
              <p className="text-slate-500 text-sm mb-4">
                No articles found matching &quot;{searchQuery}&quot; in {selectedCategory}.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                }}
                className="px-4 py-2 rounded-full bg-[#020E26] text-white text-xs font-semibold hover:bg-[#E5A93C] hover:text-[#000B1E] transition-colors"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {filteredArticles.map((article) => (
                <Link
                  key={article.slug}
                  to={`/insights/${article.slug}`}
                  className="group rounded-2xl bg-white border border-slate-200/80 hover:border-slate-300 hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden"
                >
                  <div>
                    {/* Cover Image */}
                    <div className="aspect-[16/10] w-full overflow-hidden bg-slate-100 relative">
                      <img
                        src={article.coverImageUrl}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>

                    {/* Metadata & Title */}
                    <div className="p-5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-2">
                        {article.category}
                      </span>
                      <h3 className="text-base font-semibold text-[#020E26] group-hover:text-[#E5A93C] transition-colors leading-snug line-clamp-2 mb-2">
                        {article.title}
                      </h3>
                      <p className="text-xs text-slate-500 font-light line-clamp-2 leading-relaxed">
                        {article.excerpt}
                      </p>
                    </div>
                  </div>

                  {/* Card Bottom Meta with Action Arrow */}
                  <div className="p-5 pt-0 flex items-center justify-between border-t border-slate-100 mt-4 text-[11px] text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      {article.createdAt || '22 Sep 2026'}
                    </span>
                    <div className="w-7 h-7 rounded-full bg-[#020E26] text-white flex items-center justify-center group-hover:bg-[#E5A93C] group-hover:text-[#000B1E] transition-colors">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 5. NEWSLETTER SUBSCRIPTION BANNER */}
      {/* ========================================================= */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
          <div className="relative rounded-3xl bg-gradient-to-r from-[#000B1E] via-[#02183A] to-[#000B1E] text-white overflow-hidden p-8 sm:p-12 lg:p-16 border border-slate-800 shadow-2xl">
            {/* Background Digital Globe Glow */}
            <div 
              className="absolute right-0 top-0 bottom-0 w-full lg:w-[48%] opacity-30 pointer-events-none overflow-hidden"
              style={{
                WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 60%)',
                maskImage: 'linear-gradient(to right, transparent 0%, black 60%)'
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80"
                alt="Digital Globe Network"
                className="w-full h-full object-cover object-center"
              />
            </div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Text */}
              <div className="lg:col-span-6 space-y-3">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#E5A93C]">
                  STAY AHEAD
                </span>
                <h2 className="text-3xl sm:text-4xl font-light text-white leading-tight">
                  Get the <span className="font-semibold text-white">Latest Insights</span>
                </h2>
                <p className="text-sm text-slate-300 font-light leading-relaxed max-w-lg">
                  Subscribe to our newsletter for expert insights, industry updates and product innovations.
                </p>
              </div>

              {/* Right Email Form */}
              <div className="lg:col-span-6">
                <form onSubmit={handleNewsletterSubmit} className="max-w-lg lg:ml-auto">
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center bg-white/95 rounded-2xl sm:rounded-full p-1.5 sm:pl-5 shadow-lg border border-white/20 focus-within:ring-2 focus-within:ring-[#E5A93C]">
                    <div className="flex items-center flex-1 px-3 py-2 sm:p-0">
                      <Mail className="w-4 h-4 text-slate-400 mr-2.5 shrink-0" />
                      <input
                        type="email"
                        required
                        value={newsletterEmail}
                        onChange={(e) => setNewsletterEmail(e.target.value)}
                        placeholder="Enter your email address"
                        className="w-full bg-transparent text-sm text-slate-900 placeholder-slate-400 outline-none"
                      />
                    </div>
                    <button
                      type="submit"
                      className="mt-2 sm:mt-0 px-6 py-3 rounded-xl sm:rounded-full bg-[#E5A93C] hover:bg-[#D4972B] active:scale-95 text-[#000B1E] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-md shrink-0 cursor-pointer"
                    >
                      {newsletterSuccess ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-[#000B1E]" />
                          <span>Subscribed!</span>
                        </>
                      ) : (
                        <>
                          <span>Subscribe</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

