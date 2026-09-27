import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  CheckCircle2,
  Smartphone,
  Apple,
  Cpu,
  Layers,
  Palette,
  Workflow,
  Wrench,
  Search,
  PenTool,
  Code2,
  ShieldCheck,
  Rocket,
  Headphones,
  Award,
  Globe2,
  Users2,
  ThumbsUp,
  Clock,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Server,
  Cloud,
} from 'lucide-react';
import { BrandButton } from '../components/common/BrandButton';

export const MobileAppDevelopmentPage: React.FC = () => {
  // 5-Pillar Hero Service Bar
  const heroFeatures = [
    { label: 'Custom App Development', icon: <Smartphone className="w-4 h-4 text-[#E5A93C]" /> },
    { label: 'iOS App Development', icon: <Apple className="w-4 h-4 text-[#E5A93C]" /> },
    { label: 'Android App Development', icon: <Cpu className="w-4 h-4 text-[#E5A93C]" /> },
    { label: 'UI/UX Design', icon: <Palette className="w-4 h-4 text-[#E5A93C]" /> },
    { label: 'App Maintenance & Support', icon: <Wrench className="w-4 h-4 text-[#E5A93C]" /> },
  ];

  // 6-Pillar Solutions Cards (2x3 Grid matching Screenshot)
  const solutions = [
    {
      id: 'ios',
      title: 'iOS App Development',
      badgeIcon: <Apple className="w-4 h-4 text-white" />,
      badgeBg: 'bg-black',
      desc: 'High-performance, secure and feature-rich iOS applications for Apple devices.',
      img: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'android',
      title: 'Android App Development',
      badgeIcon: <Cpu className="w-4 h-4 text-white" />,
      badgeBg: 'bg-[#3DDC84]',
      desc: 'Robust and scalable Android apps for a wider audience across all devices.',
      img: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'cross-platform',
      title: 'Cross-Platform Development',
      badgeIcon: <Layers className="w-4 h-4 text-white" />,
      badgeBg: 'bg-[#0ea5e9]',
      desc: 'Build once, deploy everywhere with React Native and Flutter.',
      img: 'https://images.unsplash.com/photo-1526470608268-f674ce90ebd4?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'ui-ux',
      title: 'UI/UX Design',
      badgeIcon: <Palette className="w-4 h-4 text-white" />,
      badgeBg: 'bg-[#6366f1]',
      desc: 'Beautiful, intuitive and user-centric designs that enhance engagement.',
      img: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'integration',
      title: 'App Integration',
      badgeIcon: <Workflow className="w-4 h-4 text-white" />,
      badgeBg: 'bg-[#0284c7]',
      desc: 'Integrate with ERP, CRM, IoT, payment gateways and third-party systems.',
      img: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'maintenance',
      title: 'App Maintenance & Support',
      badgeIcon: <Headphones className="w-4 h-4 text-white" />,
      badgeBg: 'bg-[#020E26]',
      desc: 'Continuous support, updates and enhancements for smooth performance.',
      img: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
    },
  ];

  // 6-Step Development Process
  const steps = [
    {
      step: '01',
      title: 'Discover',
      desc: 'Understand your goals and requirements.',
      icon: <Search className="w-4 h-4 text-[#020E26]" />,
    },
    {
      step: '02',
      title: 'Design',
      desc: 'Create wireframes and UI/UX designs.',
      icon: <PenTool className="w-4 h-4 text-[#020E26]" />,
    },
    {
      step: '03',
      title: 'Develop',
      desc: 'Build and integrate core features.',
      icon: <Code2 className="w-4 h-4 text-[#020E26]" />,
    },
    {
      step: '04',
      title: 'Test',
      desc: 'Ensure quality, security and performance.',
      icon: <ShieldCheck className="w-4 h-4 text-[#020E26]" />,
    },
    {
      step: '05',
      title: 'Deploy',
      desc: 'Launch on App Store and Play Store.',
      icon: <Rocket className="w-4 h-4 text-[#020E26]" />,
    },
    {
      step: '06',
      title: 'Support',
      desc: 'Ongoing maintenance and feature updates.',
      icon: <Headphones className="w-4 h-4 text-[#020E26]" />,
    },
  ];

  // Modern Technologies Matrix
  const techStack = [
    { name: 'React Native', icon: '/assets/tech/react-native.svg' },
    { name: 'Flutter', icon: '/assets/tech/flutter.svg' },
    { name: 'Swift', icon: '/assets/tech/swift.svg' },
    { name: 'Kotlin', icon: '/assets/tech/kotlin.svg' },
    { name: 'Firebase', icon: '/assets/tech/firebase.svg' },
    { name: 'Node.js', icon: '/assets/tech/nodejs.svg' },
    { name: 'TypeScript', icon: '/assets/tech/typescript.svg' },
    { name: 'AWS Cloud', icon: '/assets/tech/aws.svg' },
    { name: 'Google Cloud', icon: '/assets/tech/gcp.svg' },
    { name: 'CI/CD Automation', icon: '/assets/tech/cicd.svg' },
  ];

  // 5 Real-World Applications Across Industries
  const industries = [
    {
      title: 'Industrial & Manufacturing',
      desc: 'Field operations, asset monitoring, and maintenance apps.',
      img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80',
    },
    {
      title: 'Retail & E-commerce',
      desc: 'Shopping, loyalty and customer engagement apps.',
      img: 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=600&q=80',
    },
    {
      title: 'Healthcare',
      desc: 'Telemedicine, patient management and appointment apps.',
      img: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80',
    },
    {
      title: 'Logistics & Transport',
      desc: 'Fleet tracking, driver and delivery management apps.',
      img: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80',
    },
    {
      title: 'Education',
      desc: 'E-learning, virtual classrooms and student engagement apps.',
      img: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=600&q=80',
    },
  ];

  // 6 Value Propositions (Why Choose Prabha Tech)
  const valueProps = [
    {
      title: 'Expert Developers',
      desc: 'Experienced iOS, Android and cross-platform teams.',
      icon: <Users2 className="w-5 h-5 text-[#E5A93C]" />,
    },
    {
      title: 'User-Centric Design',
      desc: 'Focus on intuitive and engaging experiences.',
      icon: <Sparkles className="w-5 h-5 text-[#E5A93C]" />,
    },
    {
      title: 'Scalable Solutions',
      desc: 'Built for growth and future-ready architectures.',
      icon: <Layers className="w-5 h-5 text-[#E5A93C]" />,
    },
    {
      title: 'Secure & Reliable',
      desc: 'Enterprise-grade security and strict compliance.',
      icon: <ShieldCheck className="w-5 h-5 text-[#E5A93C]" />,
    },
    {
      title: 'On-Time Delivery',
      desc: 'Agile methodology and proven milestone execution.',
      icon: <Clock className="w-5 h-5 text-[#E5A93C]" />,
    },
    {
      title: 'Ongoing Support',
      desc: 'Continuous improvement and 24/7 dedicated support.',
      icon: <Headphones className="w-5 h-5 text-[#E5A93C]" />,
    },
  ];

  return (
    <div className="bg-white text-slate-900 font-sans selection:bg-[#E5A93C]/30">
      {/* ========================================================= */}
      {/* 1. HERO SECTION: Innovative Mobile Apps for a Connected World */}
      {/* ========================================================= */}
      <section className="relative pt-36 pb-20 overflow-hidden border-b border-slate-100 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-6">
              <span className="heading-eyebrow block">
                MOBILE APP DEVELOPMENT
              </span>
              <h1 className="heading-hero text-[#020E26]">
                Innovative Mobile Apps <br />
                for a <span className="text-[#E5A93C] font-light">Connected World</span>
              </h1>
              <p className="text-base text-slate-600 leading-relaxed max-w-lg">
                We design and develop high-performance, user-friendly mobile applications for iOS and Android that deliver exceptional user experiences and real business value.
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <BrandButton to="/contact" variant="gold" size="lg">
                  Get a Consultation
                </BrandButton>
                <BrandButton to="/portfolio" variant="dark" size="lg">
                  View Our Work
                </BrandButton>
              </div>
            </div>

            {/* Right Visual: Dual Floating Smartphones with Innovation Badges */}
            <div className="lg:col-span-6 relative flex items-center justify-center min-h-[460px]">
              {/* Soft ambient radial backdrop */}
              <div className="absolute w-[440px] h-[440px] rounded-full bg-gradient-to-tr from-[#E5A93C]/10 via-[#0ea5e9]/10 to-transparent blur-3xl pointer-events-none" />

              {/* Central Composite Phone Showcase */}
              <div className="relative flex items-center justify-center gap-4 sm:gap-6 z-10">
                {/* Phone 1: Light Smart IT Solutions Dashboard */}
                <div className="w-[180px] sm:w-[220px] rounded-[36px] bg-slate-900 p-2.5 shadow-2xl border-4 border-slate-800 -rotate-3 hover:rotate-0 transition-transform duration-500">
                  <div className="rounded-[28px] overflow-hidden bg-white border border-slate-100 flex flex-col">
                    {/* Simulated iOS Dynamic Island */}
                    <div className="pt-2 pb-1 px-4 flex justify-between items-center text-[10px] text-slate-400 font-mono">
                      <span>9:41</span>
                      <div className="w-12 h-3.5 bg-black rounded-full" />
                      <span>5G</span>
                    </div>
                    {/* Header */}
                    <div className="p-3 border-b border-slate-100 flex items-center justify-between">
                      <div>
                        <div className="text-[10px] text-slate-400">Good Morning</div>
                        <div className="text-xs font-bold text-[#020E26]">Pradeep ✨</div>
                      </div>
                      <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-700">P</div>
                    </div>
                    {/* Hero Card inside phone */}
                    <div className="p-3">
                      <div className="bg-[#020E26] rounded-xl p-3 text-white">
                        <div className="text-[9px] uppercase tracking-wider text-[#E5A93C] font-semibold">Smart IT Solutions</div>
                        <div className="text-[11px] font-bold mt-1">For a Smarter Tomorrow</div>
                        <div className="mt-2.5 inline-block px-2 py-0.5 rounded bg-[#E5A93C] text-[#020E26] text-[9px] font-bold">Book Now</div>
                      </div>
                    </div>
                    {/* Mini Quick Actions Grid */}
                    <div className="px-3 pb-3 grid grid-cols-3 gap-2 text-center">
                      {['CCTV', 'Server', 'Biometric'].map((s, i) => (
                        <div key={i} className="bg-slate-50 border border-slate-100 rounded-lg p-1.5 text-[9px] font-medium text-slate-700">
                          {s}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Phone 2: Dark 3D Live Monitoring & Facility Hub */}
                <div className="w-[180px] sm:w-[220px] rounded-[36px] bg-slate-900 p-2.5 shadow-2xl border-4 border-slate-800 rotate-3 hover:rotate-0 transition-transform duration-500">
                  <div className="rounded-[28px] overflow-hidden bg-[#07090E] border border-slate-800 text-white flex flex-col">
                    {/* Simulated iOS Dynamic Island */}
                    <div className="pt-2 pb-1 px-4 flex justify-between items-center text-[10px] text-slate-500 font-mono">
                      <span>11:11</span>
                      <div className="w-12 h-3.5 bg-black rounded-full" />
                      <span>100%</span>
                    </div>
                    {/* Live Monitoring Header */}
                    <div className="p-3 border-b border-slate-800/80">
                      <div className="text-[10px] text-[#E5A93C] font-semibold flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                        Live Facility Monitoring
                      </div>
                      <div className="text-xs font-bold text-white mt-0.5">Dubai HQ Campus</div>
                    </div>
                    {/* 3D Facility Preview */}
                    <div className="p-3">
                      <div className="aspect-[4/3] rounded-lg overflow-hidden relative border border-slate-800 bg-slate-900">
                        <img 
                          src="/assets/images/glass-office-building.jpeg" 
                          alt="Facility 3D Twin"
                          className="w-full h-full object-cover opacity-80"
                        />
                        <div className="absolute bottom-1 left-2 text-[9px] font-bold text-emerald-400 bg-black/60 px-1.5 py-0.5 rounded">
                          245 kW/h Active
                        </div>
                      </div>
                      {/* Metric row */}
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        <div className="bg-slate-900/80 border border-slate-800 rounded p-1.5 text-center">
                          <div className="text-[9px] text-slate-400">Air Quality</div>
                          <div className="text-xs font-bold text-emerald-400">Good</div>
                        </div>
                        <div className="bg-slate-900/80 border border-slate-800 rounded p-1.5 text-center">
                          <div className="text-[9px] text-slate-400">Temp</div>
                          <div className="text-xs font-bold text-[#E5A93C]">22°C</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Apple Icon Badge */}
                <div className="absolute -left-4 top-1/4 w-11 h-11 rounded-2xl bg-white shadow-xl border border-slate-100 flex items-center justify-center text-[#020E26] hover:scale-110 transition-transform">
                  <Apple className="w-5 h-5 fill-current" />
                </div>

                {/* Floating Android Icon Badge */}
                <div className="absolute -right-4 bottom-1/3 w-11 h-11 rounded-2xl bg-[#3DDC84] shadow-xl border border-[#3DDC84]/20 flex items-center justify-center text-white hover:scale-110 transition-transform">
                  <Cpu className="w-5 h-5" />
                </div>
              </div>
            </div>
          </div>

          {/* 5-Pillar Hero Summary Strip */}
          <div className="mt-16 pt-8 border-t border-slate-100 grid grid-cols-2 md:grid-cols-5 gap-4">
            {heroFeatures.map((f, i) => (
              <div 
                key={i} 
                className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50/70 border border-slate-100 hover:border-[#E5A93C]/40 hover:bg-white hover:shadow-sm transition-all"
              >
                <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center shrink-0 shadow-xs">
                  {f.icon}
                </div>
                <span className="text-xs font-bold text-[#020E26] leading-snug">
                  {f.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. OUR MOBILE APP SOLUTIONS: 2x3 Solutions Grid */}
      {/* ========================================================= */}
      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
            <div>
              <span className="heading-eyebrow block mb-2">
                OUR MOBILE APP SOLUTIONS
              </span>
              <h2 className="heading-section text-[#020E26]">
                End-to-End Mobile App Development Services
              </h2>
            </div>
            <div className="text-sm text-slate-600 max-w-md">
              <p className="mb-2">From idea to deployment, we build scalable, secure and feature-rich mobile applications tailored to your business goals.</p>
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
                <div className="aspect-[16/10] overflow-hidden relative bg-slate-100">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className={`absolute top-4 left-4 w-9 h-9 rounded-lg ${item.badgeBg} flex items-center justify-center shadow-lg`}>
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
      {/* 3. OUR DEVELOPMENT PROCESS: From Idea to App Success */}
      {/* ========================================================= */}
      <section className="py-24 bg-white border-b border-slate-100">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="heading-eyebrow block mb-3">
              OUR DEVELOPMENT PROCESS
            </span>
            <h2 className="heading-section text-[#020E26]">
              From Idea to App Success
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
      {/* 4. TECHNOLOGIES WE USE: Modern Stack for Scalable Mobile Apps */}
      {/* ========================================================= */}
      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5">
              <span className="heading-eyebrow block mb-3">
                TECHNOLOGIES WE USE
              </span>
              <h2 className="heading-section text-[#020E26]">
                Modern Stack for Scalable Mobile Apps
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed mt-4">
                We harness state-of-the-art native and cross-platform mobile frameworks, secure cloud backends, and battle-tested DevOps pipelines to ensure fast performance and maximum security.
              </p>
            </div>

            <div className="lg:col-span-7">
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                {techStack.map((tech, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-white border border-slate-200 hover:border-[#E5A93C]/50 hover:shadow-md transition-all flex flex-col items-center text-center group"
                  >
                    <div className="w-10 h-10 flex items-center justify-center mb-2.5">
                      <img
                        src={tech.icon}
                        alt={tech.name}
                        className="w-7 h-7 object-contain group-hover:scale-110 transition-transform"
                      />
                    </div>
                    <span className="text-xs font-semibold text-slate-700 group-hover:text-[#020E26]">
                      {tech.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 5. REAL WORLD APPLICATIONS: Mobile Apps Across Industries */}
      {/* ========================================================= */}
      <section className="py-24 bg-white border-b border-slate-100">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
            <div>
              <span className="heading-eyebrow block mb-2">
                REAL WORLD APPLICATIONS
              </span>
              <h2 className="heading-section text-[#020E26]">
                Mobile Apps Across Industries
              </h2>
            </div>
            <Link 
              to="/portfolio" 
              className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-[#020E26] hover:text-[#E5A93C] transition-colors"
            >
              <span>View All Case Studies</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Link>
          </div>

          {/* 5 Industry Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
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
                  <div className="p-5">
                    <h4 className="text-sm font-bold text-[#020E26] mb-1.5 group-hover:text-[#E5A93C] transition-colors">
                      {ind.title}
                    </h4>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      {ind.desc}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <div className="w-7 h-7 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-700 group-hover:bg-[#020E26] group-hover:text-[#E5A93C] group-hover:border-[#020E26] transition-colors">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 6. WHY CHOOSE PRABHA TECH: 6 Value Pillars */}
      {/* ========================================================= */}
      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="heading-eyebrow block mb-3">
              WHY CHOOSE PRABHA TECH
            </span>
            <h2 className="heading-section text-[#020E26]">
              Delivering Excellence in Mobile Engineering
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-5">
            {valueProps.map((vp, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl bg-white border border-slate-200 hover:border-[#E5A93C]/50 hover:shadow-md transition-all flex flex-col items-center text-center group"
              >
                <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center mb-3 group-hover:bg-[#020E26] transition-colors">
                  {vp.icon}
                </div>
                <h4 className="text-xs font-bold text-[#020E26] mb-1.5 group-hover:text-[#E5A93C] transition-colors">
                  {vp.title}
                </h4>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  {vp.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 7. EXECUTIVE CALL TO ACTION BANNER: Turn Your App Idea into Reality */}
      {/* ========================================================= */}
      <section className="relative py-20 bg-[#000B1E] text-white overflow-hidden border-t border-slate-800">
        {/* Right-anchored Dubai Skyline and Global Earth backdrop with smooth progressive fade */}
        <div 
          className="absolute right-0 top-0 bottom-0 w-full lg:w-[60%] z-0 pointer-events-none overflow-hidden"
          style={{
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.2) 20%, rgba(0,0,0,0.7) 48%, black 75%)',
            maskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.2) 20%, rgba(0,0,0,0.7) 48%, black 75%)'
          }}
        >
          <img
            src="/assets/images/dubai-hero-rings.jpg"
            alt="Dubai Global Innovation Network"
            className="w-full h-full object-cover object-[center_right] opacity-90 scale-100"
          />
        </div>

        <div className="relative z-10 max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 flex flex-col lg:flex-row items-center justify-between gap-10">
          <div className="max-w-xl">
            <span className="heading-eyebrow block mb-2 text-[#E5A93C]">
              LET'S BUILD TOGETHER
            </span>
            <h2 className="heading-section text-white">
              Turn Your App Idea into Reality
            </h2>
            <p className="text-sm text-slate-300 mt-2">
              Partner with Prabha Technologies to build powerful mobile applications that drive business growth and delight your users.
            </p>
            <div className="pt-6">
              <BrandButton to="/contact" variant="gold" size="lg">
                Let's Talk
              </BrandButton>
            </div>
          </div>

          {/* Key Impact Stats Bar */}
          <div className="flex flex-wrap items-center gap-8 bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-2xl p-6 sm:p-8">
            <div className="text-center min-w-[110px]">
              <div className="text-3xl font-light text-gold-shimmer leading-none">100+</div>
              <div className="text-xs font-semibold text-slate-300 mt-1.5">Projects Delivered</div>
            </div>
            <div className="w-[1px] h-10 bg-slate-800 hidden sm:block" />
            <div className="text-center min-w-[110px]">
              <div className="text-3xl font-light text-gold-shimmer leading-none">35+</div>
              <div className="text-xs font-semibold text-slate-300 mt-1.5">Mobile App Experts</div>
            </div>
            <div className="w-[1px] h-10 bg-slate-800 hidden sm:block" />
            <div className="text-center min-w-[110px]">
              <div className="text-3xl font-light text-gold-shimmer leading-none">100%</div>
              <div className="text-xs font-semibold text-slate-300 mt-1.5">Client Success Rate</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MobileAppDevelopmentPage;
