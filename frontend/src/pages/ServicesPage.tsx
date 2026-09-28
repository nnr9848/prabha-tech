import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  CheckCircle2,
  Code2,
  Smartphone,
  Cpu,
  Radio,
  Headphones,
  Users2,
  Search,
  Compass,
  FileCode2,
  Rocket,
  TrendingUp,
  Globe2,
  Award,
  ThumbsUp,
  Box,
} from 'lucide-react';
import { SectionHeading } from '../components/common/SectionHeading';
import { BrandButton } from '../components/common/BrandButton';

import { useQuery } from '@tanstack/react-query';
import { publicApi } from '../api/client';
import { ServiceItem } from '../types';

// Dynamic icon mapper for industry services
const getServiceIcon = (iconName: string) => {
  switch (iconName?.toLowerCase()) {
    case 'smartphone':
      return <Smartphone className="w-5 h-5 text-white" />;
    case 'cpu':
      return <Cpu className="w-5 h-5 text-white" />;
    case 'radio':
      return <Radio className="w-5 h-5 text-white" />;
    case 'box':
      return <Box className="w-5 h-5 text-white" />;
    case 'headphones':
      return <Headphones className="w-5 h-5 text-white" />;
    case 'users2':
      return <Users2 className="w-5 h-5 text-white" />;
    case 'code2':
    default:
      return <Code2 className="w-5 h-5 text-white" />;
  }
};

// Curated service images
const SERVICE_IMAGES: Record<string, { img: string; isTransparent?: boolean }> = {
  'custom-software-development': { img: '/assets/images/enterprise-software.png', isTransparent: true },
  'mobile-app-development': { img: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80' },
  'ai-analytics': { img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80' },
  'iiot-automation': { img: '/assets/images/indistrial-iot.jpg' },
  'metaverse-development': { img: 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=800&q=80' },
  'managed-it-services': { img: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80' },
  'staffing-recruitment': { img: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80' },
};

export const ServicesPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('All Services');

  // Single Source of Truth: Fetch published enterprise services from PostgreSQL
  const {
    data: services = [],
    isLoading,
    isError,
    refetch,
  } = useQuery<ServiceItem[]>({
    queryKey: ['publicServices'],
    queryFn: () => publicApi.getServices(),
    staleTime: 1000 * 60 * 5,
  });

  const filterTabs = [
    { label: 'All Services', icon: <span className="text-sm">▦</span> },
    ...services.map((s) => ({
      label: s.title,
      icon: getServiceIcon(s.icon),
    })),
  ];

  const filteredServices =
    activeFilter === 'All Services'
      ? services
      : services.filter((s) => s.title === activeFilter);

  return (
    <div className="bg-white text-slate-900 font-sans selection:bg-[#E5A93C]/30">
      {/* ========================================================= */}
      {/* 1. SERVICES HERO: Daylight Architecture with Smooth Left Fade */}
      {/* ========================================================= */}
      <section className="relative pt-36 pb-24 overflow-hidden border-b border-slate-100 bg-white">
        {/* Right Modern Architectural Innovation Hub with Smooth Left Fade */}
        <div 
          className="absolute right-0 top-0 bottom-0 w-full lg:w-[54%] z-0 pointer-events-none overflow-hidden"
          style={{
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.2) 20%, rgba(0,0,0,0.7) 48%, black 75%)',
            maskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.2) 20%, rgba(0,0,0,0.7) 48%, black 75%)'
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&w=1600&q=85"
            alt="Prabha Technologies Corporate AI Innovation Hub Dubai"
            className="w-full h-full object-cover object-[center_right] scale-100"
          />
          {/* Subtle top & bottom edge feathering */}
          <div className="hidden lg:block absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
          <div className="hidden lg:block absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white to-transparent pointer-events-none"></div>
        </div>

        <div className="relative z-10 max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-6">
              <span className="heading-eyebrow block">
                OUR SERVICES
              </span>
              <h1 className="heading-hero text-[#020E26]">
                End-to-End Digital <br />
                Solutions for a <br />
                <span className="text-[#E5A93C] font-light">Smarter Tomorrow</span>
              </h1>
              <p className="text-base text-slate-600 leading-relaxed max-w-lg">
                From enterprise software to AI, IoT, and managed services, we build intelligent solutions that power businesses across industries.
              </p>
              <div className="pt-2">
                <BrandButton to="/contact" variant="gold" size="lg">
                  Get a Consultation
                </BrandButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. FILTER TABS & 6-CARD SERVICES GRID */}
      {/* ========================================================= */}
      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
          {/* Enterprise Category Filter Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-14 no-scrollbar">
            {filterTabs.map((tab) => {
              const isSelected = activeFilter === tab.label;
              return (
                <button
                  key={tab.label}
                  onClick={() => setActiveFilter(tab.label)}
                  className={`flex items-center gap-2 px-5 py-2 rounded-md text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-[#020E26] text-white shadow-sm border border-[#020E26]'
                      : 'bg-white text-slate-600 hover:text-[#020E26] border border-slate-200 hover:border-slate-300 hover:shadow-xs'
                  }`}
                >
                  <span className={isSelected ? 'text-[#E5A93C]' : 'text-slate-400'}>
                    {tab.icon}
                  </span>
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Loading Skeleton */}
          {isLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div
                  key={n}
                  className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs animate-pulse"
                >
                  <div className="aspect-[16/10] bg-slate-200" />
                  <div className="p-7 space-y-4">
                    <div className="h-6 bg-slate-200 rounded w-3/4" />
                    <div className="h-3.5 bg-slate-200 rounded w-full" />
                    <div className="space-y-2 pt-2">
                      <div className="h-3 bg-slate-200 rounded w-4/5" />
                      <div className="h-3 bg-slate-200 rounded w-3/5" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Error State */}
          {isError && !isLoading && (
            <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center">
              <p className="text-slate-600 font-medium mb-4">Unable to load enterprise services at this moment.</p>
              <button
                onClick={() => refetch()}
                className="px-5 py-2.5 rounded-md bg-[#020E26] hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
              >
                Retry Loading
              </button>
            </div>
          )}

          {/* 3x2 Grid Cards from Database */}
          {!isLoading && !isError && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredServices.map((service, idx) => {
                const serviceVisual = SERVICE_IMAGES[service.slug] || {
                  img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
                  isTransparent: false,
                };

                return (
                  <div
                    key={service.slug || idx}
                    className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:border-[#E5A93C]/50 transition-all duration-300 flex flex-col group"
                  >
                    {/* Visual Header */}
                    <div className={`aspect-[16/10] overflow-hidden relative flex items-center justify-center ${
                      serviceVisual.isTransparent ? 'bg-gradient-to-tr from-slate-900 to-[#020E26] p-4' : 'bg-slate-100'
                    }`}>
                      <img
                        src={serviceVisual.img}
                        alt={service.title}
                        className={`w-full h-full transition-transform duration-500 group-hover:scale-105 ${
                          serviceVisual.isTransparent ? 'object-contain' : 'object-cover'
                        }`}
                      />
                      <div className="absolute top-4 left-4 w-9 h-9 rounded-lg bg-[#020E26] border border-slate-700 flex items-center justify-center shadow-lg">
                        {getServiceIcon(service.icon)}
                      </div>
                    </div>

                    {/* Content Body */}
                    <div className="p-7 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-[#020E26] mb-2 group-hover:text-[#E5A93C] transition-colors">
                          {service.title}
                        </h3>
                        <p className="text-xs text-slate-600 leading-relaxed mb-6">
                          {service.shortDescription}
                        </p>

                        {/* Feature Checkmarks with Gold Ticks */}
                        {service.deliverables && service.deliverables.length > 0 && (
                          <div className="space-y-2.5 mb-8">
                            {service.deliverables.map((feat, i) => (
                              <div key={i} className="flex items-center gap-2.5 text-xs text-slate-700">
                                <CheckCircle2 className="w-3.5 h-3.5 text-[#E5A93C] shrink-0" />
                                <span>{feat}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      <Link
                        to={`/services/${service.slug}`}
                        className="pt-4 border-t border-slate-100 flex items-center text-xs font-bold uppercase tracking-wider text-[#020E26] group-hover:text-[#E5A93C] transition-colors"
                      >
                        <span>Learn More</span>
                        <ArrowRight className="w-3.5 h-3.5 ml-1.5 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. OUR PROCESS: A PROVEN APPROACH TO DELIVER SUCCESS */}
      {/* ========================================================= */}
      <section className="py-24 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="heading-eyebrow block mb-3">
              OUR PROCESS
            </span>
            <h2 className="heading-section text-[#020E26]">
              A Proven Approach to Deliver Success
            </h2>
          </div>

          {/* 5-Step Pipeline Connected with Directional Flow */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              {
                step: '01',
                title: 'Discover',
                desc: 'Understand your business goals and requirements.',
                icon: <Search className="w-4 h-4 text-[#020E26]" />,
              },
              {
                step: '02',
                title: 'Plan',
                desc: 'Create a strategic roadmap and solution design.',
                icon: <Compass className="w-4 h-4 text-[#020E26]" />,
              },
              {
                step: '03',
                title: 'Develop',
                desc: 'Build with agile methodology and best practices.',
                icon: <FileCode2 className="w-4 h-4 text-[#020E26]" />,
              },
              {
                step: '04',
                title: 'Deploy',
                desc: 'Launch, integrate and ensure smooth adoption.',
                icon: <Rocket className="w-4 h-4 text-[#020E26]" />,
              },
              {
                step: '05',
                title: 'Grow',
                desc: 'Continuous support and innovation for long-term success.',
                icon: <TrendingUp className="w-4 h-4 text-[#020E26]" />,
              },
            ].map((p, i) => (
              <div
                key={i}
                className="relative p-6 rounded-xl bg-white border border-slate-200 hover:border-[#E5A93C]/50 hover:shadow-lg transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-9 h-9 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center text-[#020E26] group-hover:bg-[#020E26] group-hover:text-[#E5A93C] transition-colors">
                      {p.icon}
                    </div>
                    <span className="text-xs font-bold text-slate-400 font-mono tracking-wider">
                      {p.step}
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-[#020E26] mb-2 group-hover:text-[#E5A93C] transition-colors">
                    {p.title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{p.desc}</p>
                </div>
                {/* Step Connector Arrow for Desktop */}
                {i < 4 && (
                  <div className="hidden lg:block absolute -right-3.5 top-1/2 -translate-y-1/2 z-10 text-slate-300">
                    →
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 4. GCC TRUST STRIP (Dark Midnight Navy #000B1E) */}
      {/* ========================================================= */}
      <section className="bg-[#000B1E] text-white py-16 border-t border-slate-800">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-center items-center">
            <div className="flex flex-col items-center">
              <Globe2 className="w-6 h-6 text-[#E5A93C] mb-2 opacity-90" />
              <div className="text-3xl sm:text-4xl font-light text-gold-shimmer leading-none">100+</div>
              <div className="text-xs font-semibold text-white mt-1.5">Projects Delivered</div>
            </div>
            <div className="flex flex-col items-center">
              <Users2 className="w-6 h-6 text-[#E5A93C] mb-2 opacity-90" />
              <div className="text-3xl sm:text-4xl font-light text-gold-shimmer leading-none">35+</div>
              <div className="text-xs font-semibold text-white mt-1.5">Talented Professionals</div>
            </div>
            <div className="flex flex-col items-center">
              <Award className="w-6 h-6 text-[#E5A93C] mb-2 opacity-90" />
              <div className="text-3xl sm:text-4xl font-light text-gold-shimmer leading-none">10+</div>
              <div className="text-xs font-semibold text-white mt-1.5">Years of Experience</div>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-sm font-bold text-[#E5A93C] mb-2 tracking-widest">GCC</span>
              <div className="text-3xl sm:text-4xl font-light text-gold-shimmer leading-none">GCC</div>
              <div className="text-[11px] font-semibold text-slate-300 mt-1.5">UAE | Saudi Arabia | Kuwait | India</div>
            </div>
            <div className="flex flex-col items-center">
              <ThumbsUp className="w-6 h-6 text-[#E5A93C] mb-2 opacity-90" />
              <div className="text-3xl sm:text-4xl font-light text-gold-shimmer leading-none">100%</div>
              <div className="text-xs font-semibold text-white mt-1.5">Client Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 5. CALL TO ACTION BANNER (Panorama Skyline + Glowing Earth) */}
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
            <h2 className="heading-section text-white">Have a Project in Mind?</h2>
            <p className="text-sm text-slate-300 mt-2 max-w-xl">
              Partner with Prabha Technologies to build innovative solutions that drive real business impact.
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
