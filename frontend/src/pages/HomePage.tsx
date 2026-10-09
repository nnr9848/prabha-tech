import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ChevronRight,
  CheckCircle2,
} from 'lucide-react';

import { BrandButton } from '../components/common/BrandButton';
import { SectionHeading } from '../components/common/SectionHeading';
import { FeaturedPortfolioSlider } from '../components/home/FeaturedPortfolioSlider';
import { ClientLogosCarousel } from '../components/common/ClientLogosCarousel';
import { useQuery } from '@tanstack/react-query';
import { publicApi } from '../api/client';
import { CaseStudy, ServiceItem, Article, HeroConfig } from '../types';
import { renderServiceIcon } from './admin/components/ServicesManager';

// Tiered Fallback Articles: Curated editorial insights used if the backend is restarting or DB unseeded
const DEFAULT_FALLBACK_ARTICLES: Article[] = [
  {
    id: 901,
    slug: 'ai-powered-smart-building-management',
    title: 'AI-Powered Smart Building Management Systems (BEMS)',
    excerpt: 'Deep-learning energy optimization cutting commercial facility power overhead by up to 34%.',
    content: '',
    coverImageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=85',
    authorName: 'Smart Facilities Team',
    category: 'Smart Buildings (BEMS)',
    createdAt: '2026-09-28T11:47:47Z',
    isPublished: true,
  },
  {
    id: 902,
    slug: 'digital-transformation-in-heavy-equipment-industry',
    title: 'Digital Transformation in Heavy Equipment Industry',
    excerpt: 'Connecting heavy construction fleets with CAN bus telemetry and cloud predictive maintenance.',
    content: '',
    coverImageUrl: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1000&q=85',
    authorName: 'Industrial IoT Division',
    category: 'Industrial IoT',
    createdAt: '2026-09-28T11:47:47Z',
    isPublished: true,
  },
  {
    id: 903,
    slug: 'super-app-all-in-one-solution-for-modern-businesses',
    title: 'Super App: All-in-One Solution for Modern Businesses',
    excerpt: 'Consolidating customer self-service, marketplace transactions, and communications into unified suites.',
    content: '',
    coverImageUrl: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=800&q=80',
    authorName: 'Mobile Engineering',
    category: 'Enterprise Software',
    createdAt: '2026-09-28T11:47:47Z',
    isPublished: true,
  },
  {
    id: 904,
    slug: 'how-ai-hrms-is-redefining-workplace-management',
    title: 'How AI HRMS is Redefining Workplace Management',
    excerpt: 'Automating talent acquisition, compliance tracking, and predictive retention modeling.',
    content: '',
    coverImageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
    authorName: 'Workforce Solutions',
    category: 'HR & Workforce',
    createdAt: '2026-09-28T11:47:47Z',
    isPublished: true,
  },
];

export const HomePage: React.FC = () => {
  const [isVideoLoaded, setIsVideoLoaded] = React.useState(false);

  // Single Source of Truth: Load dynamic Hero Section Configuration from PostgreSQL
  const { data: heroConfig } = useQuery<HeroConfig>({
    queryKey: ['homepageHeroConfig'],
    queryFn: () => publicApi.getHeroConfig(),
    staleTime: 1000 * 60 * 5,
  });

  // Effective video and poster URLs with production defaults
  const activeVideoUrl = heroConfig?.videoUrl?.trim() || '/assets/video/hero-bg.mp4';
  const activePosterUrl = heroConfig?.posterUrl?.trim() || undefined;

  // Single Source of Truth: Load published portfolio from PostgreSQL via Spring Boot REST API
  const {
    data: caseStudies = [],
    isLoading: isPortfolioLoading,
    isError: isPortfolioError,
    refetch: refetchPortfolio,
  } = useQuery<CaseStudy[]>({
    queryKey: ['allHomepagePortfolio'],
    queryFn: () => publicApi.getCaseStudies(),
    staleTime: 1000 * 60 * 5,
  });

  // Single Source of Truth: Load published enterprise services from PostgreSQL
  const {
    data: services = [],
    isLoading: isServicesLoading,
  } = useQuery<ServiceItem[]>({
    queryKey: ['allHomepageServices'],
    queryFn: () => publicApi.getServices(),
    staleTime: 1000 * 60 * 5,
  });

  // Single Source of Truth: Load published articles & insights from PostgreSQL
  const {
    data: articles = [],
    isLoading: isArticlesLoading,
  } = useQuery<Article[]>({
    queryKey: ['allHomepageArticles'],
    queryFn: () => publicApi.getArticles(),
    staleTime: 1000 * 60 * 5,
  });

  // Tiered Resolution: Filter published articles, and fall back safely if DB is empty/reconnecting
  const publishedDbArticles = articles.filter((a) => a.isPublished !== false);
  const displayArticles = publishedDbArticles.length > 0 ? publishedDbArticles : DEFAULT_FALLBACK_ARTICLES;

  return (
    <div className="bg-white text-slate-900 font-sans selection:bg-[#E5A93C]/30">
      {/* ========================================================= */}
      {/* 1. HERO SECTION (Dark Luxury Dubai Skyline & Golden Vortex) */}
      {/* ========================================================= */}
      <section className="relative min-h-[90vh] flex flex-col justify-center pt-40 sm:pt-44 lg:pt-48 pb-20 bg-[#000B1E] text-white overflow-hidden">
        {/* Video Hero Canvas centered in the right half on Desktop with gentle edge feathering */}
        <div className="absolute right-0 top-0 bottom-0 w-full lg:w-[55%] z-0 pointer-events-none overflow-hidden bg-[#000B1E]">
          <video
            key={activeVideoUrl}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster={activePosterUrl}
            onLoadedData={() => setIsVideoLoaded(true)}
            onPlaying={() => setIsVideoLoaded(true)}
            className={`w-full h-full object-cover object-[48%_center] transition-opacity duration-700 ease-out ${
              isVideoLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <source src={activeVideoUrl} type="video/mp4" />
          </video>
          {/* Diluted soft left-edge feather: allows full warehouse video visibility while smoothly blending */}
          <div className="hidden lg:block absolute inset-y-0 left-0 w-28 sm:w-36 bg-gradient-to-r from-[#000B1E]/80 via-[#000B1E]/30 to-transparent"></div>
          {/* Subtle bottom edge feathering */}
          <div className="hidden lg:block absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-[#000B1E]/40 to-transparent"></div>
          {/* Mobile/Tablet readability gradient: soft dissolve keeping typography sharp */}
          <div className="lg:hidden absolute inset-0 bg-gradient-to-r from-[#000B1E]/95 via-[#000B1E]/60 to-transparent"></div>
        </div>

        {/* Hero Main Content - Left Aligned to Page Margin */}
        <div className="relative z-10 max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 w-full">
          <div className="max-w-2xl text-left">
            <SectionHeading
              theme="dark"
              size="hero"
              badge="AI-POWERED TECHNOLOGY FOR A BRIGHTER TOMORROW"
              title={
                <>
                  Engineering <br />
                  <span className="font-normal text-white">Intelligent</span> <br />
                  <span className="font-normal text-[#E5A93C]">Digital Experiences</span>
                </>
              }
              subtitle="At Prabha Technologies, we deliver AI-powered solutions, enterprise software, and intelligent automation to help businesses grow smarter, faster, and stronger."
              className="mb-8"
            />

            {/* Action CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4"
            >
              {/* Gold Enterprise Button */}
              <BrandButton to="/portfolio" variant="gold" size="md">
                EXPLORE OUR SOLUTIONS
              </BrandButton>
            </motion.div>
          </div>
        </div>

        {/* Right Corner Accent Tag: "PEOPLE TECHNOLOGY PROGRESS TOGETHER" */}
        <div className="hidden lg:block absolute top-40 right-14 text-right z-10">
          <div className="text-[10px] font-extrabold tracking-[0.25em] uppercase text-slate-300 space-y-1 drop-shadow-md">
            <div>PEOPLE</div>
            <div>TECHNOLOGY</div>
            <div>PROGRESS</div>
            <div className="text-[#E5A93C]">TOGETHER</div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. WHITE BACKGROUND SECTION: 6 CAPABILITIES STRIP */}
      {/* (Dynamic Capabilities Strip powered by PostgreSQL) */}
      {/* ========================================================= */}
      <section className="bg-white text-slate-800 py-6 border-y border-slate-100 shadow-sm relative z-20">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
          {isServicesLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 items-center">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div key={n} className="flex items-center gap-3 animate-pulse">
                  <div className="w-9 h-9 rounded-lg bg-slate-100 shrink-0" />
                  <div className="space-y-1.5 flex-1">
                    <div className="h-3 w-3/4 bg-slate-100 rounded" />
                    <div className="h-2 w-1/2 bg-slate-100 rounded" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 items-center">
              {services
                .filter((s) => s.isActive !== false)
                .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0))
                .slice(0, 6)
                .map((srv) => (
                  <Link
                    key={srv.id || srv.slug}
                    to={`/services/${srv.slug}`}
                    className="flex items-center gap-3 group cursor-pointer"
                  >
                    <div className="w-9 h-9 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-[#020E26] group-hover:bg-[#020E26] group-hover:text-[#E5A93C] transition-colors shrink-0">
                      {renderServiceIcon(srv.icon, 'w-5 h-5')}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#020E26] group-hover:text-[#E5A93C] transition-colors leading-tight line-clamp-1">
                        {srv.title}
                      </div>
                      <div className="text-[10px] text-slate-500 leading-tight mt-0.5 line-clamp-1">
                        {srv.tagline || 'Enterprise Service'}
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          )}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. STATS SECTION WITH CRYSTAL-CLEAR NIGHT GLOBE ON RIGHT END */}
      {/* ========================================================= */}
      <section className="relative text-white py-12 lg:py-14 overflow-hidden bg-[#000B1E]">
        {/* Crystal-Clear Blue Night Earth Globe strictly confined to RIGHT SIDE */}
        <div className="absolute right-0 top-0 bottom-0 w-full lg:w-[46%] pointer-events-none overflow-hidden">
          <img
            src="/assets/images/night-globe-lights.jpg"
            alt="Middle East Night Globe with Golden City Lights"
            className="w-full h-full object-cover object-[right_center] scale-105"
          />
          {/* Smooth left-edge soft blend into pure navy background */}
          <div className="absolute inset-y-0 left-0 w-24 sm:w-32 bg-gradient-to-r from-[#000B1E] to-transparent"></div>
        </div>

        {/* Content: Left-Aligned Stat Columns matching Reference Screenshot */}
        <div className="relative z-10 max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-10 text-left max-w-3xl">
            {/* Stat 1 */}
            <div className="text-left space-y-1">
              <div className="text-4xl sm:text-5xl lg:text-[50px] font-light tracking-[-0.02em] leading-none text-gold-shimmer drop-shadow-sm">
                10+
              </div>
              <div className="text-xs sm:text-sm font-bold text-white tracking-normal pt-1">
                Years of
              </div>
              <div className="text-xs text-slate-300">
                Excellence
              </div>
            </div>

            {/* Stat 2 */}
            <div className="text-left space-y-1">
              <div className="text-4xl sm:text-5xl lg:text-[50px] font-light tracking-[-0.02em] leading-none text-gold-shimmer drop-shadow-sm">
                100+
              </div>
              <div className="text-xs sm:text-sm font-bold text-white tracking-normal pt-1">
                Projects
              </div>
              <div className="text-xs text-slate-300">
                Delivered
              </div>
            </div>

            {/* Stat 3 */}
            <div className="text-left space-y-1">
              <div className="text-4xl sm:text-5xl lg:text-[50px] font-light tracking-[-0.02em] leading-none text-gold-shimmer drop-shadow-sm">
                GCC
              </div>
              <div className="text-xs sm:text-sm font-bold text-white tracking-normal pt-1">
                Trusted by
              </div>
              <div className="text-xs text-slate-300">
                Leading Enterprises
              </div>
            </div>

            {/* Stat 4 */}
            <div className="text-left space-y-1">
              <div className="text-4xl sm:text-5xl lg:text-[50px] font-light tracking-[-0.02em] leading-none text-gold-shimmer drop-shadow-sm">
                Global
              </div>
              <div className="text-xs sm:text-sm font-bold text-white tracking-normal pt-1">
                Expanding
              </div>
              <div className="text-xs text-slate-300">
                Our Impact
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. TRUSTED BY LEADING ENTERPRISES (Infinite Client Logos) */}
      {/* ========================================================= */}
      <ClientLogosCarousel
        badge="OUR CLIENTS"
        title={
          <>
            Trusted by <span className="text-[#E5A93C] font-light">Industry Leaders</span>
          </>
        }
        subtitle="Empowering top GCC organizations and international enterprises with AI and robust software engineering."
      />

      {/* ========================================================= */}
      {/* 4. COMPLETE WORK ARCHIVE & CLIENT SOLUTIONS (Interactive 3-Card Carousel) */}
      {/* ========================================================= */}
      <FeaturedPortfolioSlider
        items={caseStudies}
        isLoading={isPortfolioLoading}
        isError={isPortfolioError}
        onRetry={refetchPortfolio}
        autoPlayInterval={6000}
      />


      {/* ========================================================= */}
      {/* 4. TECHNOLOGY THAT DRIVES REAL IMPACT (Reference Design 3x2 Matrix) */}
      {/* ========================================================= */}
      <section className="py-10 lg:py-12 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
          {/* Header matching reference mockup */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 lg:mb-10 gap-6">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-[#020E26] tracking-tight leading-[1.15]">
                Technology <br />
                <span className="font-bold">That Drives</span> <br />
                <span className="font-bold">Real Impact</span>
              </h2>
            </div>
            <div className="max-w-xl flex flex-col items-start lg:items-end text-left lg:text-right">
              <p className="text-xs sm:text-sm text-slate-600 mb-4 max-w-lg leading-relaxed">
                From intelligent automation to connected industries, we deliver end-to-end technology solutions that solve complex challenges and create lasting value.
              </p>
              <Link
                to="/services"
                className="text-xs font-bold uppercase tracking-wider text-[#020E26] hover:text-[#E5A93C] flex items-center gap-1.5 transition-colors group cursor-pointer"
              >
                <span>EXPLORE ALL SERVICES</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Dynamic 6-Card Horizontal Matrix matching Reference Image */}
          {isServicesLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div key={n} className="p-6 rounded-2xl bg-white border border-slate-200/90 animate-pulse flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 shrink-0" />
                  <div className="space-y-2 flex-1">
                    <div className="h-4 w-3/4 bg-slate-100 rounded" />
                    <div className="h-3 w-full bg-slate-100 rounded" />
                    <div className="h-3 w-5/6 bg-slate-100 rounded" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {services
                .filter((s) => s.isActive !== false)
                .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0))
                .slice(0, 6)
                .map((service) => (
                  <Link
                    key={service.id || service.slug}
                    to={`/services/${service.slug}`}
                    className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 hover:border-[#E5A93C]/60 hover:shadow-lg transition-all duration-300 group flex items-start gap-4 cursor-pointer"
                  >
                    {/* Outline Icon Box with smooth hover highlight */}
                    <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-center text-slate-800 group-hover:bg-[#020E26] group-hover:text-[#E5A93C] group-hover:border-[#020E26] transition-colors shrink-0 shadow-2xs">
                      {renderServiceIcon(service.icon, 'w-6 h-6 stroke-[1.75]')}
                    </div>

                    {/* Content: Title & 2-line Description */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-[#020E26] transition-colors leading-snug line-clamp-1 mb-1">
                        {service.title}
                      </h3>
                      <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                        {service.shortDescription}
                      </p>
                    </div>
                  </Link>
                ))}
            </div>
          )}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 5. SPOTLIGHT: INDUSTRIAL IOT BANNER (Deep Navy Accent) */}
      {/* ========================================================= */}
      <section className="py-24 bg-[#020E26] text-white overflow-hidden relative">
        {/* Left-anchored Industrial IoT visual with smooth progressive fade into deep navy */}
        <div 
          className="absolute left-0 top-0 bottom-0 w-full lg:w-[58%] z-0 pointer-events-none overflow-hidden"
          style={{
            WebkitMaskImage: 'linear-gradient(to right, black 0%, rgba(0,0,0,0.95) 45%, rgba(0,0,0,0.5) 70%, rgba(0,0,0,0.15) 88%, transparent 100%)',
            maskImage: 'linear-gradient(to right, black 0%, rgba(0,0,0,0.95) 45%, rgba(0,0,0,0.5) 70%, rgba(0,0,0,0.15) 88%, transparent 100%)'
          }}
        >
          <img
            src="/assets/images/indistrial-iot.jpg"
            alt="Industrial Engineer with IoT Holographic Smart Factory Interface"
            className="w-full h-full object-cover object-[center_left] opacity-90 scale-100"
          />
          {/* Subtle top & bottom edge blend into deep navy */}
          <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#020E26] via-[#020E26]/40 to-transparent pointer-events-none"></div>
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#020E26] via-[#020E26]/40 to-transparent pointer-events-none"></div>
        </div>

        <div className="relative z-10 max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Spacer on Desktop to give breathing room for the visual */}
            <div className="hidden lg:block lg:col-span-5"></div>

            {/* Right Industrial IoT Content */}
            <div className="lg:col-span-7 space-y-6 lg:pl-6">
              <SectionHeading
                theme="dark"
                size="section"
                badge="Connected Operations"
                title="Industrial IoT"
                subtitle={
                  <div>
                    <p className="text-sm font-semibold text-slate-200 mb-2">
                      Smarter Machines. Higher Productivity.
                    </p>
                    <p>
                      Leverage IoT, AI, and analytics to connect your assets, optimize performance, and drive operational excellence across your industrial ecosystem.
                    </p>
                  </div>
                }
              />

              {/* 4 Feature Bullet Points */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="flex items-center gap-2.5 text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-[#E5A93C]" />
                  <span>Real-time Monitoring</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-[#E5A93C]" />
                  <span>Predictive Maintenance</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-[#E5A93C]" />
                  <span>Operational Efficiency</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-[#E5A93C]" />
                  <span>Reduced Downtime</span>
                </div>
              </div>

              <div className="pt-4">
                <BrandButton to="/services" variant="gold" size="sm">
                  EXPLORE INDUSTRIAL IOT
                </BrandButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 6. SPOTLIGHT: ENTERPRISE SOFTWARE */}
      {/* ========================================================= */}
      <section className="py-14 lg:py-16 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-5 space-y-6">
              <SectionHeading
                theme="light"
                size="section"
                badge="Enterprise Excellence"
                title="Enterprise Software"
                subtitle={
                  <div>
                    <p className="text-sm font-semibold text-slate-800 mb-2">
                      Software Solutions for a More Efficient Future
                    </p>
                    <p>
                      We design and develop custom enterprise software that streamlines operations, enhances productivity, and accelerates digital transformation across large organizations.
                    </p>
                  </div>
                }
              />

              <div className="pt-2">
                <BrandButton to="/services" variant="gold" size="sm">
                  VIEW OUR SOLUTIONS
                </BrandButton>
              </div>
            </div>

            {/* Right Multi-Device Floating Showcase (Unboxed, Enterprise Depth) */}
            <div className="lg:col-span-7 relative flex items-center justify-center">
              {/* Subtle ambient warm gold & navy depth glow behind the devices */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#E5A93C]/15 via-blue-500/10 to-transparent rounded-full filter blur-3xl opacity-70 transform -translate-y-2 pointer-events-none"></div>

              {/* Floating Multi-Device Image without constraining box */}
              <div className="relative z-10 w-full flex items-center justify-center">
                <img
                  src="/assets/images/enterprise-software.png"
                  alt="Prabha Technologies Enterprise Software Multi-Device Platform"
                  className="w-full h-auto max-w-[700px] lg:max-w-none object-contain drop-shadow-[0_24px_48px_rgba(2,14,38,0.12)] hover:scale-[1.01] transition-transform duration-500 ease-out"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 7. BUILDING SOLUTIONS FOR EVERY INDUSTRY (Reference Asymmetric Layout) */}
      {/* ========================================================= */}
      <section className="py-14 lg:py-16 bg-white border-t border-slate-100">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
          <div className="flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-12">
            {/* Left Title Column matching Reference Mockup */}
            <div className="lg:w-[26%] shrink-0">
              <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-light text-[#020E26] tracking-tight leading-[1.15]">
                Building <br />
                <span className="font-bold">Solutions for</span> <br />
                <span className="font-bold">Every Industry</span>
              </h2>
            </div>

            {/* Right 6-Card Horizontal Strip */}
            <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
              {[
                {
                  title: 'Real Estate',
                  subtitle: 'Smart Buildings',
                  img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80',
                  link: '/industries#real-estate',
                },
                {
                  title: 'Manufacturing',
                  subtitle: 'Industry 4.0',
                  img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80',
                  link: '/industries#manufacturing',
                },
                {
                  title: 'Energy & Utilities',
                  subtitle: 'Sustainable Ops',
                  img: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=600&q=80',
                  link: '/industries#energy',
                },
                {
                  title: 'Logistics & Transp.',
                  subtitle: 'Connected Supply Chains',
                  img: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80',
                  link: '/industries#logistics',
                },
                {
                  title: 'Government',
                  subtitle: 'Digital Transformation',
                  img: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=600&q=80',
                  link: '/industries#government',
                },
                {
                  title: 'Healthcare',
                  subtitle: 'Better, Smarter Care',
                  img: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=600&q=80',
                  link: '/industries#healthcare',
                },
              ].map((ind, i) => (
                <Link
                  key={i}
                  to={ind.link}
                  className="group relative rounded-xl overflow-hidden aspect-[4/5] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-end p-3 cursor-pointer"
                >
                  <img
                    src={ind.img}
                    alt={ind.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Dark gradient overlay for text legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#000B1E] via-[#000B1E]/60 to-transparent"></div>
                  
                  <div className="relative z-10 text-white">
                    <h4 className="font-bold text-xs sm:text-sm text-white group-hover:text-[#E5A93C] transition-colors leading-tight">
                      {ind.title}
                    </h4>
                    <p className="text-[10px] text-slate-300 leading-tight mt-0.5 line-clamp-1">
                      {ind.subtitle}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 8. INSIGHTS & PERSPECTIVES (Exact Reference: Asymmetric Left Title + 4 Horizontal Cards) */}
      {/* ========================================================= */}
      <section className="py-14 lg:py-16 bg-white border-t border-slate-100">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
          <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-12">
            {/* Left Column: Stacked Title, Subtitle, and View All Link */}
            <div className="lg:w-[24%] shrink-0">
              <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-light text-[#020E26] tracking-tight leading-[1.15]">
                Insights & <br />
                <span className="font-bold">Perspectives</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-3 mb-6 leading-relaxed max-w-sm">
                Latest trends, stories, and ideas shaping a smarter, more connected future.
              </p>

              <Link
                to="/insights"
                className="text-xs font-bold uppercase tracking-wider text-[#020E26] hover:text-[#E5A93C] inline-flex items-center gap-1.5 transition-colors group cursor-pointer"
              >
                <span>VIEW ALL INSIGHTS</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Right Column: 4 Compact Editorial Cards */}
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 w-full">
              {isArticlesLoading ? (
                [1, 2, 3, 4].map((n) => (
                  <div key={n} className="animate-pulse space-y-3">
                    <div className="aspect-[16/9] bg-slate-100 rounded-xl" />
                    <div className="h-3 w-1/3 bg-slate-100 rounded" />
                    <div className="h-4 w-5/6 bg-slate-100 rounded" />
                    <div className="h-3 w-1/4 bg-slate-100 rounded pt-1" />
                  </div>
                ))
              ) : (
                displayArticles
                  .slice(0, 4)
                  .map((art) => (
                    <Link
                      key={art.id || art.slug}
                      to={`/insights/${art.slug}`}
                      className="group flex flex-col justify-between cursor-pointer"
                    >
                      <div>
                        {/* 16:9 Compact Rounded Image */}
                        <div className="relative overflow-hidden rounded-xl aspect-[16/9] bg-slate-100 mb-3 shadow-2xs group-hover:shadow-md transition-shadow">
                          <img
                            src={art.coverImageUrl}
                            alt={art.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>

                        {/* Eyebrow: Category & Date */}
                        <div className="text-[10px] font-bold uppercase tracking-wider text-amber-700/90 mb-1 line-clamp-1">
                          <span>{art.category || 'INNOVATION'}</span>
                          <span className="mx-1 text-slate-300">•</span>
                          <span className="text-slate-400 font-medium">
                            {art.createdAt
                              ? new Date(art.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                              : 'JUN 12, 2026'}
                          </span>
                        </div>

                        {/* Headline */}
                        <h3 className="font-bold text-xs sm:text-sm text-[#020E26] group-hover:text-amber-700 transition-colors leading-snug line-clamp-2">
                          {art.title}
                        </h3>
                      </div>

                      {/* Inline Read More Link */}
                      <div className="pt-2 flex items-center text-[11px] font-bold text-[#020E26] group-hover:text-amber-700 transition-colors">
                        <span>Read More</span>
                        <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </Link>
                  ))
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 9. LET'S BUILD WHAT COMES NEXT (Panoramic Skyline Banner) */}
      {/* ========================================================= */}
      <section className="relative py-24 bg-[#000B1E] text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=2000&q=85"
            alt="Dubai Skyline Night"
            className="w-full h-full object-cover object-bottom opacity-40 mix-blend-luminosity filter contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#000B1E] via-[#000B1E]/85 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
          <div className="max-w-2xl space-y-6">
            <SectionHeading
              theme="dark"
              size="section"
              badge="Let's Build Together"
              title="Let's Build What Comes Next"
              subtitle="Partner with Prabha Technologies to turn your vision into real-world impact through AI, innovation, and trusted expertise."
            />
            <div className="pt-2">
              <BrandButton to="/contact" variant="gold" size="md">
                START A CONVERSATION
              </BrandButton>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
