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
      <section className="relative pt-36 pb-20 border-b border-slate-100 overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-[#E5A93C]">
                Our Portfolio
              </span>
              <h1 className="text-4xl sm:text-6xl font-extrabold text-[#020E26] tracking-tight leading-[1.1]">
                Building Impact <br />
                <span className="text-[#E5A93C]">Through Technology</span>
              </h1>
              <p className="text-base text-slate-600 leading-relaxed max-w-lg">
                AI-powered software, mobile applications, and enterprise solutions that help businesses innovate, scale, and lead across industries.
              </p>

              {/* Stats Band */}
              <div className="grid grid-cols-4 gap-4 pt-4 border-t border-slate-200">
                <div>
                  <div className="text-2xl font-extrabold text-[#020E26]">100+</div>
                  <div className="text-[11px] font-bold text-slate-500 uppercase mt-0.5">Projects</div>
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-[#020E26]">10+</div>
                  <div className="text-[11px] font-bold text-slate-500 uppercase mt-0.5">Years</div>
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-[#020E26]">GCC</div>
                  <div className="text-[11px] font-bold text-slate-500 uppercase mt-0.5">Footprint</div>
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-[#020E26]">Global</div>
                  <div className="text-[11px] font-bold text-slate-500 uppercase mt-0.5">Enterprises</div>
                </div>
              </div>
            </div>

            {/* Right Multi-Device Visual Mockup */}
            <div className="lg:col-span-6">
              <div className="relative rounded-2xl overflow-hidden p-6 bg-slate-50 border border-slate-200 shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80"
                  alt="Portfolio Showcase Dashboard"
                  className="rounded-xl w-full h-auto object-cover"
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
          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-14 no-scrollbar">
            {filterCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 ${
                  activeCategory === cat
                    ? 'bg-[#020E26] text-white shadow'
                    : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* 2-Column Luxury Cards matching Screenshot 3 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredItems.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:border-[#E5A93C]/50 transition-all duration-300 flex flex-col group"
              >
                {/* Visual Thumbnail */}
                <div className="aspect-[16/9] bg-slate-100 overflow-hidden relative">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 px-3 py-1 rounded bg-[#020E26]/80 backdrop-blur-sm text-[10px] font-bold uppercase tracking-wider text-[#E5A93C]">
                    {item.badge}
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-7 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-extrabold text-[#020E26] mb-2 group-hover:text-[#E5A93C] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed mb-6">
                      {item.desc}
                    </p>
                  </div>

                  {/* Dual Action Buttons */}
                  <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                    <Link
                      to={`/case-studies/${item.slug}`}
                      className="px-5 py-2 rounded-full bg-[#020E26] hover:bg-[#122847] text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
                    >
                      Case Study →
                    </Link>
                    <Link
                      to="/contact"
                      className="px-5 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold uppercase tracking-wider transition-colors"
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
      {/* 3. BOTTOM CTA BANNER */}
      {/* ========================================================= */}
      <section className="py-20 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 flex flex-col md:flex-row items-center justify-between gap-8 p-12 rounded-3xl bg-slate-900 text-white shadow-2xl">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#E5A93C] block mb-2">
              Let's Build Together
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Turn Your Vision Into Real Business Impact
            </h2>
            <p className="text-sm text-slate-400 mt-2 max-w-xl">
              Partner with Prabha Technologies to build innovative and scalable digital solutions for a smarter tomorrow.
            </p>
          </div>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#E5A93C] hover:bg-[#D4972B] text-[#020E26] text-xs font-bold uppercase tracking-wider transition-colors shadow-lg shrink-0"
          >
            <span>Let's Talk</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
};
