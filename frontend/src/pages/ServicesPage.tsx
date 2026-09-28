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

export const ServicesPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('All Services');

  const filterTabs = [
    { label: 'All Services', icon: <span className="text-sm">▦</span> },
    { label: 'Software Development', icon: <Code2 className="w-3.5 h-3.5" /> },
    { label: 'Mobile Applications', icon: <Smartphone className="w-3.5 h-3.5" /> },
    { label: 'AI & Analytics', icon: <Cpu className="w-3.5 h-3.5" /> },
    { label: 'Industrial IoT', icon: <Radio className="w-3.5 h-3.5" /> },
    { label: 'Metaverse Development', icon: <Box className="w-3.5 h-3.5" /> },
    { label: 'Managed IT Services', icon: <Headphones className="w-3.5 h-3.5" /> },
    { label: 'Consulting', icon: <Users2 className="w-3.5 h-3.5" /> },
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
      img: '/assets/images/enterprise-software.png',
      isTransparentAsset: true,
      link: '/services/custom-software-development',
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
      link: '/services/mobile-app-development',
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
      link: '/services/ai-analytics',
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
      img: '/assets/images/indistrial-iot.jpg',
      link: '/services/iiot-automation',
    },
    {
      category: 'Metaverse Development',
      icon: <Box className="w-5 h-5 text-white" />,
      title: 'Metaverse & Web3 Development',
      desc: '3D virtual environments, digital twins, and immersive AR/VR applications.',
      features: [
        'Virtual Business Spaces',
        'Industrial Digital Twin',
        'VR Training & Simulation',
        'Metaverse Commerce & Showrooms',
      ],
      img: 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=800&q=80',
      link: '/services/metaverse-development',
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
      link: '/services/managed-it-services',
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
      link: '/services/staffing-recruitment',
    },
  ];

  const filteredServices =
    activeFilter === 'All Services'
      ? servicesList
      : servicesList.filter((s) => s.category === activeFilter);

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

          {/* 3x2 Grid Cards matching Screenshot */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((service, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:border-[#E5A93C]/50 transition-all duration-300 flex flex-col group"
              >
                {/* Visual Header */}
                <div className={`aspect-[16/10] overflow-hidden relative flex items-center justify-center ${
                  service.isTransparentAsset ? 'bg-gradient-to-tr from-slate-900 to-[#020E26] p-4' : 'bg-slate-100'
                }`}>
                  <img
                    src={service.img}
                    alt={service.title}
                    className={`w-full h-full transition-transform duration-500 group-hover:scale-105 ${
                      service.isTransparentAsset ? 'object-contain' : 'object-cover'
                    }`}
                  />
                  <div className="absolute top-4 left-4 w-9 h-9 rounded-lg bg-[#020E26] border border-slate-700 flex items-center justify-center shadow-lg">
                    {service.icon}
                  </div>
                </div>

                {/* Content Body */}
                <div className="p-7 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-[#020E26] mb-2 group-hover:text-[#E5A93C] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed mb-6">
                      {service.desc}
                    </p>

                    {/* Feature Checkmarks with Gold Ticks */}
                    <div className="space-y-2.5 mb-8">
                      {service.features.map((feat, i) => (
                        <div key={i} className="flex items-center gap-2.5 text-xs text-slate-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#E5A93C] shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Link
                    to={service.link || '/contact'}
                    className="pt-4 border-t border-slate-100 flex items-center text-xs font-bold uppercase tracking-wider text-[#020E26] group-hover:text-[#E5A93C] transition-colors"
                  >
                    <span>Learn More</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5 transition-transform group-hover:translate-x-1" />
                  </Link>
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
