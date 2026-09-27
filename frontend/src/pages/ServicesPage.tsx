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
} from 'lucide-react';

export const ServicesPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('All Services');

  const filterTabs = [
    'All Services',
    'Software Development',
    'Mobile Applications',
    'AI & Analytics',
    'Industrial IoT',
    'Managed IT Services',
    'Consulting',
  ];

  const servicesList = [
    {
      category: 'Software Development',
      icon: <Code2 className="w-5 h-5 text-white" />,
      title: 'Enterprise Software Development',
      desc: 'Custom enterprise applications to streamline operations and drive digital transformation.',
      features: [
        'Web Applications',
        'Cloud-based Solutions',
        'System Integration',
        'Ongoing Support & Maintenance',
      ],
      img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    },
    {
      category: 'Mobile Applications',
      icon: <Smartphone className="w-5 h-5 text-white" />,
      title: 'Mobile Applications',
      desc: 'User-friendly and high-performance mobile apps for Android & iOS platforms.',
      features: [
        'iOS & Android Apps',
        'Cross-Platform Development',
        'UI/UX Design',
        'App Maintenance',
      ],
      img: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80',
    },
    {
      category: 'AI & Analytics',
      icon: <Cpu className="w-5 h-5 text-white" />,
      title: 'AI & Analytics Solutions',
      desc: 'Turn your data into intelligent insights with AI-powered solutions.',
      features: [
        'AI Automation',
        'Predictive Analytics',
        'Computer Vision',
        'Business Intelligence Dashboards',
      ],
      img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    },
    {
      category: 'Industrial IoT',
      icon: <Radio className="w-5 h-5 text-white" />,
      title: 'Industrial IoT & Automation',
      desc: 'Smart and connected solutions for industrial assets and facilities.',
      features: [
        'Fleet Management',
        'Building Management (BEMS)',
        'Smart Gate & Access Control',
        'Vertical Farming Solutions',
      ],
      img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
    },
    {
      category: 'Managed IT Services',
      icon: <Headphones className="w-5 h-5 text-white" />,
      title: 'Managed IT Services',
      desc: 'Reliable IT infrastructure and support to keep your business running smoothly.',
      features: [
        'IT Support & AMC',
        'Server & Network Setup',
        'CCTV & Biometric Solutions',
        'Data Center Construction',
      ],
      img: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
    },
    {
      category: 'Consulting',
      icon: <Users2 className="w-5 h-5 text-white" />,
      title: 'IT Consulting & Staffing',
      desc: 'Expert consulting and IT talent to accelerate your business growth.',
      features: [
        'IT Consultancy',
        'Project Management',
        'IT Staffing & Recruitment',
        'Technology Advisory',
      ],
      img: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
    },
  ];

  const filteredServices =
    activeFilter === 'All Services'
      ? servicesList
      : servicesList.filter((s) => s.category === activeFilter);

  return (
    <div className="bg-white text-slate-900 font-sans selection:bg-[#E5A93C]/30">
      {/* ========================================================= */}
      {/* 1. SERVICES HERO: Clean Daylight Architecture & Cityscape */}
      {/* ========================================================= */}
      <section className="relative pt-36 pb-24 overflow-hidden border-b border-slate-100">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-[#E5A93C]">
                Our Services
              </span>
              <h1 className="text-4xl sm:text-6xl font-extrabold text-[#020E26] tracking-tight leading-[1.1]">
                End-to-End Digital Solutions for a <br />
                <span className="text-[#E5A93C]">Smarter Tomorrow</span>
              </h1>
              <p className="text-base text-slate-600 leading-relaxed max-w-lg">
                From enterprise software to AI, IoT, and managed services, we build intelligent solutions that power businesses across industries.
              </p>
              <div className="pt-2">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#E5A93C] to-[#D4972B] hover:from-[#F9D976] hover:to-[#E5A93C] text-[#020E26] text-xs font-bold uppercase tracking-wider transition-all shadow-md hover:scale-[1.02]"
                >
                  <span>Get a Consultation</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right Architectural Visual */}
            <div className="lg:col-span-6 relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl border border-slate-200 aspect-[16/11]">
                <img
                  src="https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&w=1400&q=85"
                  alt="Dubai Modern Architecture & Burj Khalifa"
                  className="w-full h-full object-cover"
                />
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
          {/* Pill Filter Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-14 no-scrollbar">
            {filterTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveFilter(tab)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 ${
                  activeFilter === tab
                    ? 'bg-[#020E26] text-white shadow'
                    : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* 3x2 Grid Cards matching Screenshot */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((service, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:border-[#E5A93C]/50 transition-all duration-300 flex flex-col group"
              >
                {/* Visual Header */}
                <div className="aspect-[16/10] bg-slate-100 overflow-hidden relative">
                  <img
                    src={service.img}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 w-10 h-10 rounded-xl bg-[#020E26] flex items-center justify-center shadow-lg">
                    {service.icon}
                  </div>
                </div>

                {/* Content Body */}
                <div className="p-7 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-extrabold text-[#020E26] mb-2 group-hover:text-[#E5A93C] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed mb-6">
                      {service.desc}
                    </p>

                    {/* Feature Checkmarks with Gold Ticks */}
                    <div className="space-y-2.5 mb-8">
                      {service.features.map((feat, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-slate-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#E5A93C] shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center text-xs font-bold uppercase tracking-wider text-[#020E26] group-hover:text-[#E5A93C] transition-colors">
                    <span>Learn More</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. OUR PROCESS: A PROVEN APPROACH TO DELIVER SUCCESS */}
      {/* ========================================================= */}
      <section className="py-24 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-[#E5A93C] block mb-2">
              Our Process
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#020E26] tracking-tight">
              A Proven Approach to Deliver Success
            </h2>
          </div>

          {/* 5-Step Pipeline */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              {
                step: '01',
                title: 'Discover',
                desc: 'Understand your business goals and requirements through in-depth analysis.',
                icon: <Search className="w-5 h-5 text-[#E5A93C]" />,
              },
              {
                step: '02',
                title: 'Plan',
                desc: 'Create a strategic roadmap, architecture blueprint, and solution design.',
                icon: <Compass className="w-5 h-5 text-[#E5A93C]" />,
              },
              {
                step: '03',
                title: 'Develop',
                desc: 'Build with agile sprint methodology, security protocols, and best practices.',
                icon: <FileCode2 className="w-5 h-5 text-[#E5A93C]" />,
              },
              {
                step: '04',
                title: 'Deploy',
                desc: 'Launch, integrate smoothly, and ensure seamless user adoption across systems.',
                icon: <Rocket className="w-5 h-5 text-[#E5A93C]" />,
              },
              {
                step: '05',
                title: 'Grow',
                desc: 'Continuous SLA support, feature evolution, and optimization for long-term scale.',
                icon: <TrendingUp className="w-5 h-5 text-[#E5A93C]" />,
              },
            ].map((p, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-[#E5A93C]/50 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center shadow-sm">
                      {p.icon}
                    </div>
                    <span className="text-xs font-extrabold text-slate-400 font-mono">
                      {p.step}
                    </span>
                  </div>
                  <h4 className="text-base font-extrabold text-[#020E26] mb-2">{p.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 4. GCC TRUST STRIP & CALL TO ACTION BANNER */}
      {/* ========================================================= */}
      <section className="bg-[#020E26] text-white py-12 border-t border-slate-800">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#E5A93C]">100+</div>
              <div className="text-xs font-bold text-slate-300 uppercase mt-1">Projects Delivered</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#E5A93C]">35+</div>
              <div className="text-xs font-bold text-slate-300 uppercase mt-1">Talented Professionals</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#E5A93C]">10+</div>
              <div className="text-xs font-bold text-slate-300 uppercase mt-1">Years of Experience</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#E5A93C]">GCC</div>
              <div className="text-xs font-bold text-slate-300 uppercase mt-1">UAE | Saudi | Kuwait | India</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#E5A93C]">100%</div>
              <div className="text-xs font-bold text-slate-300 uppercase mt-1">Client Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#E5A93C] block mb-2">
              Let's Build Together
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Have a Project in Mind?</h2>
            <p className="text-sm text-slate-400 mt-2 max-w-xl">
              Partner with Prabha Technologies to build innovative solutions that drive real business impact.
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
