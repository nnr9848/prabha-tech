import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
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
} from 'lucide-react';
import { SectionHeading } from '../components/common/SectionHeading';
import { BrandButton } from '../components/common/BrandButton';

export const CaseStudiesPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const filterCategories = [
    'All',
    'Enterprise Solutions',
    'Mobile Applications',
    'AI & Analytics',
    'Industrial & IoT',
    'IT Services',
    'Platforms & Marketplaces',
    'Smart Solutions',
  ];

  const portfolioItems = [
    {
      badge: 'ENTERPRISE PLATFORM',
      title: 'Super App All-in-One',
      desc: 'A unified mobile and web application integrating multiple services, business operations, and customer engagement in one seamless platform.',
      category: 'Enterprise Solutions',
      img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
      slug: 'super-app-all-in-one',
    },
    {
      badge: 'INDUSTRIAL SOLUTIONS',
      title: 'AI Fleet Management',
      desc: 'Smart platform for heavy equipment sales, rental maintenance, and tracking with AI-powered fleet operations and analytics.',
      category: 'Industrial & IoT',
      img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
      slug: 'ai-fleet-management',
    },
    {
      badge: 'MARKETPLACE',
      title: 'BigAuction Auction Portal',
      desc: 'A digital auction platform for heavy equipment, vehicles, and industrial assets with live bidding, secure payments, and global reach.',
      category: 'Platforms & Marketplaces',
      img: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
      slug: 'bigauction-portal',
    },
    {
      badge: 'HR & WORKFORCE',
      title: 'Grecha.ai AI HRMS',
      desc: 'All-in-one HRMS with attendance, payroll, leave, performance, recruitment, and workforce management for modern enterprises.',
      category: 'Enterprise Solutions',
      img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
      slug: 'grecha-ai-hrms',
    },
    {
      badge: 'AI & SECURITY',
      title: 'AI Analytics for Cameras',
      desc: 'Real-time video analytics for malls and commercial spaces with crowd analysis, behavior detection, and smart monitoring.',
      category: 'AI & Analytics',
      img: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=800&q=80',
      slug: 'ai-camera-analytics',
    },
    {
      badge: 'BUILDING MANAGEMENT',
      title: 'BEMS Smart Buildings',
      desc: 'AI-powered Building Energy Management System for HVAC, electrical, and facilities with real-time monitoring, analytics, and energy optimization.',
      category: 'Smart Solutions',
      img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
      slug: 'bems-smart-buildings',
    },
    {
      badge: 'INSURANCE SOLUTIONS',
      title: 'Insurance CRM Portal',
      desc: 'Complete CRM for insurance brokers and agents with lead management, policy tracking, reminders, and meeting scheduling.',
      category: 'Enterprise Solutions',
      img: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80',
      slug: 'insurance-crm-portal',
    },
    {
      badge: 'IT SERVICES PLATFORM',
      title: 'Wefyx.pro IT Support & Rental',
      desc: 'One-stop platform for IT support, equipment rental, managed services, AMC, and on-site engineer booking for businesses and individuals.',
      category: 'IT Services',
      img: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
      slug: 'wefyx-it-platform',
    },
    {
      badge: 'ACCESS & SECURITY',
      title: 'Smart Gate Cloud',
      desc: 'Cloud-based access control and gate management system with real-time monitoring, visitor management, and secure entry solutions.',
      category: 'Smart Solutions',
      img: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=800&q=80',
      slug: 'smart-gate-cloud',
    },
    {
      badge: 'AGRICULTURE TECHNOLOGY',
      title: 'Vertical Farming',
      desc: 'IoT and AI-based smart farming system for controlled environment agriculture, increasing yield and resource efficiency.',
      category: 'Industrial & IoT',
      img: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=800&q=80',
      slug: 'vertical-farming-iot',
    },
    {
      badge: 'LOYALTY & REWARDS',
      title: 'Rewards Portal',
      desc: 'Enterprise rewards and loyalty platform where companies and banks can purchase rewards for their customers, and users can also buy directly.',
      category: 'Platforms & Marketplaces',
      img: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80',
      slug: 'rewards-portal',
    },
    {
      badge: 'FINANCIAL SOLUTIONS',
      title: 'Blink Financial Pay App',
      desc: 'Secure and modern payment application for seamless transactions, wallet services, and financial management for individuals and businesses.',
      category: 'Mobile Applications',
      img: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80',
      slug: 'blink-financial-pay',
    },
  ];

  const filteredItems =
    activeCategory === 'All'
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === activeCategory);

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

          {/* 2-Column Luxury Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredItems.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:border-[#E5A93C]/50 transition-all duration-300 flex flex-col group"
              >
                {/* Visual Thumbnail */}
                <div className="aspect-[16/9] bg-slate-100 overflow-hidden relative">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-md bg-[#020E26]/85 backdrop-blur-sm text-[10px] font-bold uppercase tracking-wider text-[#E5A93C] border border-slate-700/60 shadow">
                    {item.badge}
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-7 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-[#020E26] mb-2 group-hover:text-[#E5A93C] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed mb-6">
                      {item.desc}
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
