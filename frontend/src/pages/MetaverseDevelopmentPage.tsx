import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  CheckCircle2,
  Box,
  Glasses,
  Users2,
  Cpu,
  Globe2,
  Sparkles,
  Building2,
  Calendar,
  GraduationCap,
  Home,
  Factory,
  ShoppingBag,
  Search,
  PenTool,
  Layers,
  Workflow,
  Rocket,
  Headphones,
  Award,
  ThumbsUp,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Stethoscope,
  Plane,
} from 'lucide-react';
import { BrandButton } from '../components/common/BrandButton';

export const MetaverseDevelopmentPage: React.FC = () => {
  // 6-Pillar Hero Service Bar
  const heroFeatures = [
    { label: 'Virtual Environments', sub: '3D immersive worlds', icon: <Box className="w-4 h-4 text-[#E5A93C]" /> },
    { label: 'AR/VR Applications', sub: 'Interactive experiences', icon: <Glasses className="w-4 h-4 text-[#E5A93C]" /> },
    { label: 'Virtual Collaboration', sub: 'Work, meet & connect', icon: <Users2 className="w-4 h-4 text-[#E5A93C]" /> },
    { label: 'Digital Twin', sub: 'Real-world simulation', icon: <Cpu className="w-4 h-4 text-[#E5A93C]" /> },
    { label: 'Metaverse Platforms', sub: 'Web, Mobile, VR devices', icon: <Globe2 className="w-4 h-4 text-[#E5A93C]" /> },
    { label: 'AI Integration', sub: 'Smarter experiences', icon: <Sparkles className="w-4 h-4 text-[#E5A93C]" /> },
  ];

  // 6-Pillar Solutions Cards (2x3 Grid matching Screenshot)
  const solutions = [
    {
      id: 'virtual-business-spaces',
      title: 'Virtual Business Spaces',
      badgeIcon: <Building2 className="w-4 h-4 text-white" />,
      badgeBg: 'bg-[#020E26]',
      desc: '3D corporate offices, virtual campuses and collaboration spaces for global teams.',
      img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'virtual-events-exhibitions',
      title: 'Virtual Events & Exhibitions',
      badgeIcon: <Calendar className="w-4 h-4 text-white" />,
      badgeBg: 'bg-[#6366f1]',
      desc: 'Immersive product launches, expos, conferences and networking events.',
      img: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'training-simulation',
      title: 'Training & Simulation',
      badgeIcon: <GraduationCap className="w-4 h-4 text-white" />,
      badgeBg: 'bg-[#0ea5e9]',
      desc: 'Realistic and interactive VR training for employees and industrial operations.',
      img: 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'virtual-real-estate',
      title: 'Virtual Real Estate',
      badgeIcon: <Home className="w-4 h-4 text-white" />,
      badgeBg: 'bg-[#0284c7]',
      desc: '3D property showcases, virtual tours and sales experiences.',
      img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'industrial-digital-twin',
      title: 'Industrial Digital Twin',
      badgeIcon: <Factory className="w-4 h-4 text-white" />,
      badgeBg: 'bg-[#0f172a]',
      desc: '3D simulation of factories, plants and assets for monitoring and training.',
      img: '/assets/images/indistrial-iot.jpg',
    },
    {
      id: 'metaverse-commerce',
      title: 'Metaverse Commerce',
      badgeIcon: <ShoppingBag className="w-4 h-4 text-white" />,
      badgeBg: 'bg-[#020E26]',
      desc: 'Virtual showrooms and interactive shopping experiences.',
      img: 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=800&q=80',
    },
  ];

  // 6 Industries We Serve
  const industries = [
    {
      title: 'Real Estate',
      desc: 'Virtual property tours & digital showrooms.',
      img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80',
    },
    {
      title: 'Education',
      desc: 'Immersive learning & virtual campuses.',
      img: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=80',
    },
    {
      title: 'Manufacturing',
      desc: 'Training, simulation & remote support.',
      img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80',
    },
    {
      title: 'Retail & E-commerce',
      desc: 'Virtual stores and branded experiences.',
      img: 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=600&q=80',
    },
    {
      title: 'Healthcare',
      desc: 'Medical training & patient engagement.',
      img: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80',
    },
    {
      title: 'Tourism & Hospitality',
      desc: 'Virtual destinations & interactive travel.',
      img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
    },
  ];

  // 6-Step Development Process
  const steps = [
    {
      step: '01',
      title: 'Discover',
      desc: 'Understand your goals and use cases.',
      icon: <Search className="w-4 h-4 text-[#020E26]" />,
    },
    {
      step: '02',
      title: 'Design',
      desc: 'Create immersive concepts and 3D designs.',
      icon: <PenTool className="w-4 h-4 text-[#020E26]" />,
    },
    {
      step: '03',
      title: 'Develop',
      desc: 'Build interactive metaverse experiences.',
      icon: <Box className="w-4 h-4 text-[#020E26]" />,
    },
    {
      step: '04',
      title: 'Integrate',
      desc: 'Connect with AI, IoT, and enterprise systems.',
      icon: <Workflow className="w-4 h-4 text-[#020E26]" />,
    },
    {
      step: '05',
      title: 'Deploy',
      desc: 'Launch on web, mobile, VR/AR devices.',
      icon: <Rocket className="w-4 h-4 text-[#020E26]" />,
    },
    {
      step: '06',
      title: 'Support',
      desc: 'Ongoing support and enhancements.',
      icon: <Headphones className="w-4 h-4 text-[#020E26]" />,
    },
  ];

  return (
    <div className="bg-white text-slate-900 font-sans selection:bg-[#E5A93C]/30">
      {/* ========================================================= */}
      {/* 1. HERO SECTION: Create Immersive Experiences in the Metaverse */}
      {/* ========================================================= */}
      <section className="relative pt-36 pb-20 overflow-hidden border-b border-slate-100 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-6">
              <span className="heading-eyebrow block">
                METAVERSE
              </span>
              <h1 className="heading-hero text-[#020E26]">
                Create Immersive <br />
                <span className="text-[#E5A93C] font-light">Experiences in the Metaverse</span>
              </h1>
              <p className="text-base text-slate-600 leading-relaxed max-w-lg">
                We design and build immersive 3D worlds, virtual workplaces, digital twins and interactive experiences to help businesses engage, train, collaborate and grow in the next generation internet.
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <BrandButton to="/contact" variant="gold" size="lg">
                  Discuss Your Project
                </BrandButton>
                <BrandButton to="/portfolio" variant="dark" size="lg">
                  View Showcase
                </BrandButton>
              </div>
            </div>

            {/* Right Visual: Futuristic VR/XR Metaverse Explorer & Floating Spatial Displays */}
            <div className="lg:col-span-6 relative flex items-center justify-center min-h-[460px]">
              <div className="absolute w-[460px] h-[460px] rounded-full bg-gradient-to-tr from-[#E5A93C]/10 via-[#6366f1]/15 to-transparent blur-3xl pointer-events-none" />

              {/* Spatial Command Deck Visual */}
              <div className="relative w-full max-w-[540px] rounded-2xl bg-[#000B1E] border border-slate-800 p-4 sm:p-6 shadow-2xl overflow-hidden text-white">
                <div className="relative aspect-[16/10] rounded-xl overflow-hidden border border-slate-800 bg-slate-950">
                  <img
                    src="https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=1200&q=80"
                    alt="VR Metaverse Experience"
                    className="w-full h-full object-cover opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#000B1E] via-transparent to-transparent" />

                  {/* Floating Spatial Badges */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2">
                    <div className="bg-[#6366f1]/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-semibold text-white border border-[#6366f1] shadow-lg flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3 text-[#E5A93C]" />
                      <span>Virtual Worlds</span>
                    </div>
                    <div className="bg-[#0284c7]/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-semibold text-white border border-[#0284c7] shadow-lg flex items-center gap-1.5">
                      <Cpu className="w-3 h-3 text-[#E5A93C]" />
                      <span>Digital Twin</span>
                    </div>
                    <div className="bg-[#0f172a]/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-semibold text-white border border-slate-700 shadow-lg flex items-center gap-1.5">
                      <Glasses className="w-3 h-3 text-[#E5A93C]" />
                      <span>AR/VR Experiences</span>
                    </div>
                  </div>

                  {/* Bottom Holographic Dubai Tag */}
                  <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center bg-black/60 backdrop-blur-md px-3 py-2 rounded-lg border border-slate-700/60">
                    <div className="flex items-center gap-2 text-[10px] font-mono text-slate-300">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span>SPATIAL REALM // ONLINE</span>
                    </div>
                    <div className="text-[10px] font-bold text-[#E5A93C]">DUBAI METAVERSE HUB</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 6-Pillar Hero Summary Strip */}
          <div className="mt-16 pt-8 border-t border-slate-100 grid grid-cols-2 md:grid-cols-6 gap-4">
            {heroFeatures.map((f, i) => (
              <div 
                key={i} 
                className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50/70 border border-slate-100 hover:border-[#E5A93C]/40 hover:bg-white hover:shadow-sm transition-all"
              >
                <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center shrink-0 shadow-xs mt-0.5">
                  {f.icon}
                </div>
                <div>
                  <div className="text-xs font-bold text-[#020E26] leading-snug">
                    {f.label}
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">
                    {f.sub}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. OUR METAVERSE SOLUTIONS: 2x3 Grid */}
      {/* ========================================================= */}
      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
            <div>
              <span className="heading-eyebrow block mb-2">
                OUR METAVERSE SOLUTIONS
              </span>
              <h2 className="heading-section text-[#020E26]">
                Complete Metaverse Development for Business and Enterprise
              </h2>
            </div>
            <div className="text-sm text-slate-600 max-w-md">
              <p className="mb-2">From concept to deployment, we deliver end-to-end metaverse solutions that create meaningful and immersive digital experiences.</p>
              <Link 
                to="/services" 
                className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-[#020E26] hover:text-[#E5A93C] transition-colors"
              >
                <span>View All Services</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Link>
            </div>
          </div>

          {/* 2x3 Grid matching Screenshot */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {solutions.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:border-[#E5A93C]/50 transition-all duration-300 flex flex-col group"
              >
                {/* Visual Header */}
                <div className="aspect-[16/10] overflow-hidden relative bg-slate-900">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-90"
                  />
                  <div className={`absolute top-4 left-4 w-9 h-9 rounded-lg ${item.badgeBg} flex items-center justify-center shadow-lg border border-slate-700/50`}>
                    {item.badgeIcon}
                  </div>
                </div>

                {/* Content Body */}
                <div className="p-7 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-[#020E26] mb-2 group-hover:text-[#E5A93C] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed mb-6">
                      {item.desc}
                    </p>
                  </div>

                  <Link
                    to="/contact"
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
      {/* 3. INDUSTRIES WE SERVE: Metaverse Use Cases */}
      {/* ========================================================= */}
      <section className="py-24 bg-white border-b border-slate-100">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="heading-eyebrow block mb-3">
              INDUSTRIES WE SERVE
            </span>
            <h2 className="heading-section text-[#020E26]">
              Metaverse Use Cases Across Industries
            </h2>
          </div>

          {/* 6 Industry Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-5">
            {industries.map((ind, i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:border-[#E5A93C]/50 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="aspect-[4/3] overflow-hidden bg-slate-100 relative">
                    <img 
                      src={ind.img} 
                      alt={ind.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="text-xs font-bold text-[#020E26] mb-1.5 group-hover:text-[#E5A93C] transition-colors">
                      {ind.title}
                    </h4>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      {ind.desc}
                    </p>
                  </div>
                </div>

                <div className="p-4 pt-0">
                  <div className="w-6 h-6 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-700 group-hover:bg-[#020E26] group-hover:text-[#E5A93C] group-hover:border-[#020E26] transition-colors">
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 4. OUR PROCESS: From Vision to Virtual Reality */}
      {/* ========================================================= */}
      <section className="py-24 bg-slate-50 border-b border-slate-200">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="heading-eyebrow block mb-3">
              OUR PROCESS
            </span>
            <h2 className="heading-section text-[#020E26]">
              From Vision to Virtual Reality
            </h2>
          </div>

          {/* 6-Step Pipeline */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-5">
            {steps.map((p, i) => (
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
                  <h4 className="text-sm font-bold text-[#020E26] mb-2 group-hover:text-[#E5A93C] transition-colors">
                    {p.title}
                  </h4>
                  <p className="text-[11px] text-slate-600 leading-relaxed">{p.desc}</p>
                </div>
                {/* Step Connector Arrow for Desktop */}
                {i < 5 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-slate-300 font-bold">
                    →
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 5. GCC TRUST METRICS STRIP (Midnight Navy #000B1E) */}
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
              <div className="text-xs font-semibold text-white mt-1.5">Metaverse Experts</div>
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
      {/* 6. CALL TO ACTION BANNER: Bring Your Ideas to Life in the Metaverse */}
      {/* ========================================================= */}
      <section className="relative py-20 bg-[#000B1E] text-white overflow-hidden border-t border-slate-800">
        <div 
          className="absolute right-0 top-0 bottom-0 w-full lg:w-[60%] z-0 pointer-events-none overflow-hidden"
          style={{
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.2) 20%, rgba(0,0,0,0.7) 48%, black 75%)',
            maskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.2) 20%, rgba(0,0,0,0.7) 48%, black 75%)'
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=1600&q=85"
            alt="Futuristic VR Metaverse City"
            className="w-full h-full object-cover object-[center_right] opacity-75 scale-100"
          />
        </div>

        <div className="relative z-10 max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <span className="heading-eyebrow block mb-2 text-[#E5A93C]">
              LET'S BUILD TOGETHER
            </span>
            <h2 className="heading-section text-white">
              Bring Your Ideas to Life in the Metaverse
            </h2>
            <p className="text-sm text-slate-300 mt-2">
              Partner with Prabha Technologies to create immersive experiences that connect people, products and possibilities.
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

export default MetaverseDevelopmentPage;
