import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  Play,
  Cpu,
  Layers,
  Smartphone,
  Radio,
  Cloud,
  Headphones,
  CheckCircle2,
  Building2,
  Factory,
  Zap,
  Truck,
  Landmark,
  HeartPulse,
  TrendingUp,
  BarChart3,
  Globe2,
  ShieldCheck,
  Award,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';

import { BrandButton } from '../components/common/BrandButton';
import { SectionHeading } from '../components/common/SectionHeading';
import { FeaturedPortfolioSlider } from '../components/home/FeaturedPortfolioSlider';
import { useQuery } from '@tanstack/react-query';
import { publicApi } from '../api/client';
import { CaseStudy } from '../types';

export const HomePage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');

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

  return (
    <div className="bg-white text-slate-900 font-sans selection:bg-[#E5A93C]/30">
      {/* ========================================================= */}
      {/* 1. HERO SECTION (Dark Luxury Dubai Skyline & Golden Vortex) */}
      {/* ========================================================= */}
      <section className="relative min-h-[90vh] flex flex-col justify-center pt-40 sm:pt-44 lg:pt-48 pb-20 bg-[#000B1E] text-white overflow-hidden">
        {/* Dubai Skyline with Burj Khalifa centered strictly in the RIGHT half on Desktop */}
        <div className="absolute right-0 top-0 bottom-0 w-full lg:w-[48%] z-0 pointer-events-none overflow-hidden">
          <img
            src="/assets/images/dubai-hero-rings.jpg"
            alt="Dubai Skyline with Golden Rings"
            className="w-full h-full object-cover object-[46%_center]"
          />
          {/* Smooth left-edge gradient dissolving into the solid navy background */}
          <div className="hidden lg:block absolute inset-y-0 left-0 w-48 sm:w-60 bg-gradient-to-r from-[#000B1E] via-[#000B1E]/60 to-transparent"></div>
          {/* Subtle bottom edge feathering */}
          <div className="hidden lg:block absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#000B1E]/50 to-transparent"></div>
          {/* Mobile/Tablet readability gradient */}
          <div className="lg:hidden absolute inset-0 bg-gradient-to-r from-[#000B1E] via-[#000B1E]/85 to-transparent"></div>
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

              {/* Dark Outlined Watch Video Button */}
              <BrandButton
                variant="outline"
                size="md"
                showArrow={false}
                icon={
                  <div className="w-5 h-5 rounded-full bg-[#E5A93C] text-[#000B1E] flex items-center justify-center mr-1">
                    <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
                  </div>
                }
              >
                WATCH VIDEO
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
      {/* (Dividing Hero and Globe as in Reference Screenshot 2) */}
      {/* ========================================================= */}
      <section className="bg-white text-slate-800 py-6 border-y border-slate-100 shadow-sm relative z-20">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 items-center">
            <div className="flex items-center gap-3 group cursor-pointer">
              <div className="w-9 h-9 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-[#020E26] group-hover:bg-[#020E26] group-hover:text-[#E5A93C] transition-colors shrink-0">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-[#020E26] leading-tight">AI & Automation</div>
                <div className="text-[10px] text-slate-500 leading-tight mt-0.5">Intelligent Solutions</div>
              </div>
            </div>

            <div className="flex items-center gap-3 group cursor-pointer">
              <div className="w-9 h-9 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-[#020E26] group-hover:bg-[#020E26] group-hover:text-[#E5A93C] transition-colors shrink-0">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-[#020E26] leading-tight">Enterprise Software</div>
                <div className="text-[10px] text-slate-500 leading-tight mt-0.5">Scalable Platforms</div>
              </div>
            </div>

            <div className="flex items-center gap-3 group cursor-pointer">
              <div className="w-9 h-9 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-[#020E26] group-hover:bg-[#020E26] group-hover:text-[#E5A93C] transition-colors shrink-0">
                <Radio className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-[#020E26] leading-tight">Industrial IoT</div>
                <div className="text-[10px] text-slate-500 leading-tight mt-0.5">Connected Operations</div>
              </div>
            </div>

            <div className="flex items-center gap-3 group cursor-pointer">
              <div className="w-9 h-9 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-[#020E26] group-hover:bg-[#020E26] group-hover:text-[#E5A93C] transition-colors shrink-0">
                <Smartphone className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-[#020E26] leading-tight">Mobile Applications</div>
                <div className="text-[10px] text-slate-500 leading-tight mt-0.5">Innovative Experiences</div>
              </div>
            </div>

            <div className="flex items-center gap-3 group cursor-pointer">
              <div className="w-9 h-9 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-[#020E26] group-hover:bg-[#020E26] group-hover:text-[#E5A93C] transition-colors shrink-0">
                <Cloud className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-[#020E26] leading-tight">Cloud & DevOps</div>
                <div className="text-[10px] text-slate-500 leading-tight mt-0.5">Trusted Infrastructure</div>
              </div>
            </div>

            <div className="flex items-center gap-3 group cursor-pointer">
              <div className="w-9 h-9 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-[#020E26] group-hover:bg-[#020E26] group-hover:text-[#E5A93C] transition-colors shrink-0">
                <Headphones className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-[#020E26] leading-tight">Managed IT Services</div>
                <div className="text-[10px] text-slate-500 leading-tight mt-0.5">Always-On Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. STATS SECTION WITH CRYSTAL-CLEAR NIGHT GLOBE ON RIGHT END */}
      {/* ========================================================= */}
      <section className="relative text-white py-16 overflow-hidden bg-[#000B1E]">
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
      {/* 3. COMPLETE WORK ARCHIVE & CLIENT SOLUTIONS (Interactive 3-Card Carousel) */}
      {/* ========================================================= */}
      <FeaturedPortfolioSlider
        items={caseStudies}
        isLoading={isPortfolioLoading}
        isError={isPortfolioError}
        onRetry={refetchPortfolio}
        autoPlayInterval={6000}
      />


      {/* ========================================================= */}
      {/* 4. TECHNOLOGY THAT DRIVES REAL IMPACT (6-Pillar Grid) */}
      {/* ========================================================= */}
      <section className="py-24 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <SectionHeading
                theme="light"
                size="section"
                badge="Our Capabilities"
                title={
                  <>
                    Technology That Drives <br /> Real Impact
                  </>
                }
              />
            </div>
            <div className="max-w-md">
              <p className="text-sm text-slate-600 mb-4">
                From intelligent automation to connected industries, we deliver end-to-end technology solutions that solve complex challenges and create lasting value.
              </p>
              <Link
                to="/services"
                className="text-xs font-bold uppercase tracking-wider text-[#020E26] hover:text-[#E5A93C] flex items-center gap-1 transition-colors"
              >
                <span>Explore All Services</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* 6 Capabilities Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="p-8 rounded-2xl bg-white border border-slate-200 hover:border-[#E5A93C]/50 hover:shadow-xl transition-all duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-[#020E26] group-hover:bg-[#020E26] group-hover:text-[#E5A93C] transition-colors mb-6">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#020E26] mb-3">AI & Automation</h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                Transform your business with intelligent automation, predictive analytics, and enterprise AI models that accelerate execution.
              </p>
              <Link to="/services" className="text-xs font-bold uppercase tracking-wider text-[#020E26] group-hover:text-[#E5A93C] flex items-center gap-1.5 transition-colors">
                <span>Learn More</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Card 2 */}
            <div className="p-8 rounded-2xl bg-white border border-slate-200 hover:border-[#E5A93C]/50 hover:shadow-xl transition-all duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-[#020E26] group-hover:bg-[#020E26] group-hover:text-[#E5A93C] transition-colors mb-6">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#020E26] mb-3">Enterprise Software</h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                Custom, scalable, and secure software platforms engineered for modern enterprises to digitize mission-critical workflows.
              </p>
              <Link to="/services" className="text-xs font-bold uppercase tracking-wider text-[#020E26] group-hover:text-[#E5A93C] flex items-center gap-1.5 transition-colors">
                <span>Learn More</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Card 3 */}
            <div className="p-8 rounded-2xl bg-white border border-slate-200 hover:border-[#E5A93C]/50 hover:shadow-xl transition-all duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-[#020E26] group-hover:bg-[#020E26] group-hover:text-[#E5A93C] transition-colors mb-6">
                <Smartphone className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#020E26] mb-3">Mobile Applications</h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                High-performance mobile solutions for iOS and Android tailored for exceptional user engagement and operational speed.
              </p>
              <Link to="/services" className="text-xs font-bold uppercase tracking-wider text-[#020E26] group-hover:text-[#E5A93C] flex items-center gap-1.5 transition-colors">
                <span>Learn More</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Card 4 */}
            <div className="p-8 rounded-2xl bg-white border border-slate-200 hover:border-[#E5A93C]/50 hover:shadow-xl transition-all duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-[#020E26] group-hover:bg-[#020E26] group-hover:text-[#E5A93C] transition-colors mb-6">
                <Radio className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#020E26] mb-3">Industrial IoT</h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                Connect, monitor, and optimize your physical infrastructure, machinery, and fleet operations with sensor telemetry.
              </p>
              <Link to="/services" className="text-xs font-bold uppercase tracking-wider text-[#020E26] group-hover:text-[#E5A93C] flex items-center gap-1.5 transition-colors">
                <span>Learn More</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Card 5 */}
            <div className="p-8 rounded-2xl bg-white border border-slate-200 hover:border-[#E5A93C]/50 hover:shadow-xl transition-all duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-[#020E26] group-hover:bg-[#020E26] group-hover:text-[#E5A93C] transition-colors mb-6">
                <Cloud className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#020E26] mb-3">Cloud & DevOps</h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                Build, scale, and innovate with reliable cloud infrastructure, automated CI/CD pipelines, and zero-trust security.
              </p>
              <Link to="/services" className="text-xs font-bold uppercase tracking-wider text-[#020E26] group-hover:text-[#E5A93C] flex items-center gap-1.5 transition-colors">
                <span>Learn More</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Card 6 */}
            <div className="p-8 rounded-2xl bg-white border border-slate-200 hover:border-[#E5A93C]/50 hover:shadow-xl transition-all duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-[#020E26] group-hover:bg-[#020E26] group-hover:text-[#E5A93C] transition-colors mb-6">
                <Headphones className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#020E26] mb-3">Managed IT Services</h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                Reliable 24/7 IT support, AMC maintenance, network management, and server administration for seamless business continuity.
              </p>
              <Link to="/services" className="text-xs font-bold uppercase tracking-wider text-[#020E26] group-hover:text-[#E5A93C] flex items-center gap-1.5 transition-colors">
                <span>Learn More</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
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
      <section className="py-24 bg-white">
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
      {/* 7. BUILDING SOLUTIONS FOR EVERY INDUSTRY */}
      {/* ========================================================= */}
      <section className="py-24 bg-slate-50 border-y border-slate-200">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <SectionHeading
              theme="light"
              size="section"
              align="center"
              badge="Cross-Sector Expertise"
              title="Building Solutions for Every Industry"
              subtitle="Our domain experience spans key enterprise verticals across the GCC and international markets."
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              {
                title: 'Real Estate',
                subtitle: 'Smart Buildings',
                img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80',
              },
              {
                title: 'Manufacturing',
                subtitle: 'Industry 4.0',
                img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80',
              },
              {
                title: 'Energy & Utilities',
                subtitle: 'Sustainable Ops',
                img: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=600&q=80',
              },
              {
                title: 'Logistics',
                subtitle: 'Supply Chain',
                img: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80',
              },
              {
                title: 'Government',
                subtitle: 'Digital Services',
                img: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=600&q=80',
              },
              {
                title: 'Healthcare',
                subtitle: 'Smart Care',
                img: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=600&q=80',
              },
            ].map((ind, i) => (
              <div
                key={i}
                className="group relative rounded-2xl overflow-hidden aspect-[4/5] shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <img
                  src={ind.img}
                  alt={ind.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020E26] via-[#020E26]/40 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h4 className="font-bold text-sm">{ind.title}</h4>
                  <p className="text-[11px] text-[#E5A93C]">{ind.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 8. INSIGHTS & PERSPECTIVES */}
      {/* ========================================================= */}
      <section className="py-24 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <SectionHeading
                theme="light"
                size="section"
                badge="Knowledge & Frameworks"
                title="Insights & Perspectives"
              />
            </div>
            <Link
              to="/insights"
              className="text-xs font-bold uppercase tracking-wider text-[#020E26] hover:text-[#E5A93C] flex items-center gap-1 transition-colors"
            >
              <span>View All Insights</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'How AI is Transforming Smart Buildings in the GCC',
                date: 'JUN 15, 2026',
                category: 'AI & Innovation',
                img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80',
              },
              {
                title: 'The Future of Industrial IoT in Manufacturing',
                date: 'MAY 28, 2026',
                category: 'Industry Trends',
                img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80',
              },
              {
                title: 'Sustainable Cities Through Intelligent Technology',
                date: 'MAY 12, 2026',
                category: 'Sustainability',
                img: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=600&q=80',
              },
              {
                title: 'Why Custom Software Drives Sustainable Business Growth',
                date: 'APR 30, 2026',
                category: 'Enterprise',
                img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80',
              },
            ].map((art, i) => (
              <div
                key={i}
                className="group rounded-2xl bg-white border border-slate-200 overflow-hidden hover:border-[#E5A93C]/50 hover:shadow-lg transition-all duration-300 flex flex-col"
              >
                <div className="aspect-[16/10] overflow-hidden bg-slate-100 relative">
                  <img
                    src={art.img}
                    alt={art.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded bg-[#020E26]/80 backdrop-blur-sm text-[10px] font-bold uppercase tracking-wider text-[#E5A93C]">
                    {art.category}
                  </span>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-[11px] font-semibold text-slate-400 mb-2">{art.date}</div>
                    <h3 className="font-bold text-sm text-[#020E26] group-hover:text-[#E5A93C] transition-colors leading-snug">
                      {art.title}
                    </h3>
                  </div>
                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center text-xs font-bold uppercase tracking-wider text-[#020E26] group-hover:text-[#E5A93C] transition-colors">
                    <span>Read More</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </div>
                </div>
              </div>
            ))}
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
