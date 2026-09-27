import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  CheckCircle2,
  Headphones,
  ShieldCheck,
  Server,
  Activity,
  Database,
  Users2,
  Network,
  Cloud,
  FileCode2,
  Lock,
  Search,
  Compass,
  Sliders,
  Check,
  TrendingUp,
  Award,
  Clock,
  Layers,
  Zap,
  Globe2,
  ExternalLink,
  ChevronRight,
  Building2,
  Factory,
  ShoppingBag,
  Stethoscope,
  GraduationCap,
  Truck,
  Hotel,
} from 'lucide-react';
import { BrandButton } from '../components/common/BrandButton';

export const ManagedItServicesPage: React.FC = () => {
  // 6-Pillar Hero Service Bar
  const heroFeatures = [
    { label: '24/7 IT Support', sub: 'Always-on assistance', icon: <Headphones className="w-4 h-4 text-[#E5A93C]" /> },
    { label: 'Cybersecurity', sub: 'Protect your business', icon: <ShieldCheck className="w-4 h-4 text-[#E5A93C]" /> },
    { label: 'Infrastructure Management', sub: 'On-premise & cloud', icon: <Server className="w-4 h-4 text-[#E5A93C]" /> },
    { label: 'System Monitoring', sub: 'Proactive alerts', icon: <Activity className="w-4 h-4 text-[#E5A93C]" /> },
    { label: 'Backup & Disaster Recovery', sub: 'Business continuity', icon: <Database className="w-4 h-4 text-[#E5A93C]" /> },
    { label: 'Dedicated IT Team', sub: 'Experienced professionals', icon: <Users2 className="w-4 h-4 text-[#E5A93C]" /> },
  ];

  // 5 Floating Hero Pill Badges
  const heroBadges = [
    { label: '24/7 Monitoring & Support', icon: <Headphones className="w-3.5 h-3.5 text-[#E5A93C]" /> },
    { label: 'Proactive Management', icon: <Activity className="w-3.5 h-3.5 text-[#E5A93C]" /> },
    { label: 'Enterprise Security', icon: <ShieldCheck className="w-3.5 h-3.5 text-[#E5A93C]" /> },
    { label: 'Cost Optimization', icon: <TrendingUp className="w-3.5 h-3.5 text-[#E5A93C]" /> },
    { label: 'Dedicated IT Experts', icon: <Users2 className="w-3.5 h-3.5 text-[#E5A93C]" /> },
  ];

  // 6-Pillar Solutions Cards (2x3 Grid matching Screenshot)
  const solutions = [
    {
      id: 'helpdesk',
      title: 'IT Helpdesk Support',
      badgeIcon: <Headphones className="w-4 h-4 text-white" />,
      badgeBg: 'bg-[#020E26]',
      desc: 'Remote and on-site support for all your IT issues with fast response times.',
      img: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'network-infra',
      title: 'Network & Infrastructure Management',
      badgeIcon: <Network className="w-4 h-4 text-white" />,
      badgeBg: 'bg-[#0284c7]',
      desc: 'Monitoring, maintenance and optimization of your network, servers and IT infrastructure.',
      img: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'cybersecurity',
      title: 'Cybersecurity Services',
      badgeIcon: <ShieldCheck className="w-4 h-4 text-white" />,
      badgeBg: 'bg-[#0f172a]',
      desc: 'Advanced threat protection, firewall management, endpoint security and vulnerability assessments.',
      img: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'cloud',
      title: 'Cloud Services & Management',
      badgeIcon: <Cloud className="w-4 h-4 text-white" />,
      badgeBg: 'bg-[#0369a1]',
      desc: 'Setup, migration and management of AWS, Azure and hybrid cloud environments.',
      img: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'disaster-recovery',
      title: 'Backup & Disaster Recovery',
      badgeIcon: <Database className="w-4 h-4 text-white" />,
      badgeBg: 'bg-[#020E26]',
      desc: 'Ensure business continuity with automated backups and rapid disaster recovery solutions.',
      img: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'advisory',
      title: 'IT Consulting & Advisory',
      badgeIcon: <Sliders className="w-4 h-4 text-white" />,
      badgeBg: 'bg-[#6366f1]',
      desc: 'Strategic IT planning, technology upgrades and cost optimization.',
      img: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
    },
  ];

  // 5-Step Process
  const steps = [
    {
      step: '01',
      title: 'Assess',
      desc: 'Understand your IT environment and business needs.',
      icon: <Search className="w-4 h-4 text-[#020E26]" />,
    },
    {
      step: '02',
      title: 'Plan',
      desc: 'Design a tailored IT strategy and roadmap.',
      icon: <Compass className="w-4 h-4 text-[#020E26]" />,
    },
    {
      step: '03',
      title: 'Implement',
      desc: 'Deploy and configure solutions with minimal disruption.',
      icon: <Sliders className="w-4 h-4 text-[#020E26]" />,
    },
    {
      step: '04',
      title: 'Monitor',
      desc: '24/7 proactive monitoring and issue resolution.',
      icon: <Activity className="w-4 h-4 text-[#020E26]" />,
    },
    {
      step: '05',
      title: 'Optimize',
      desc: 'Continuous improvements and reporting.',
      icon: <TrendingUp className="w-4 h-4 text-[#020E26]" />,
    },
  ];

  // 7 Industries We Serve
  const industries = [
    {
      title: 'Manufacturing',
      img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80',
      icon: <Factory className="w-3.5 h-3.5 text-[#E5A93C]" />,
    },
    {
      title: 'Retail & E-commerce',
      img: 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=600&q=80',
      icon: <ShoppingBag className="w-3.5 h-3.5 text-[#E5A93C]" />,
    },
    {
      title: 'Healthcare',
      img: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80',
      icon: <Stethoscope className="w-3.5 h-3.5 text-[#E5A93C]" />,
    },
    {
      title: 'Real Estate',
      img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80',
      icon: <Building2 className="w-3.5 h-3.5 text-[#E5A93C]" />,
    },
    {
      title: 'Education',
      img: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=80',
      icon: <GraduationCap className="w-3.5 h-3.5 text-[#E5A93C]" />,
    },
    {
      title: 'Logistics & Transport',
      img: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80',
      icon: <Truck className="w-3.5 h-3.5 text-[#E5A93C]" />,
    },
    {
      title: 'Hospitality',
      img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80',
      icon: <Hotel className="w-3.5 h-3.5 text-[#E5A93C]" />,
    },
  ];

  // 6 Key Benefits
  const keyBenefits = [
    {
      title: 'Improved Operational Efficiency',
      desc: 'Streamline workflows and minimize technical downtime.',
      icon: <Sliders className="w-5 h-5 text-[#E5A93C]" />,
    },
    {
      title: 'Reduced IT Costs',
      desc: 'Predictable monthly billing without unexpected hardware costs.',
      icon: <Database className="w-5 h-5 text-[#E5A93C]" />,
    },
    {
      title: 'Enhanced Security & Compliance',
      desc: 'Adhere to ISO, GDPR, and regional GCC cybersecurity standards.',
      icon: <ShieldCheck className="w-5 h-5 text-[#E5A93C]" />,
    },
    {
      title: 'Increased System Uptime',
      desc: 'Proactive 24/7 monitoring guarantees 99.9% network availability.',
      icon: <Activity className="w-5 h-5 text-[#E5A93C]" />,
    },
    {
      title: 'Expert IT Professionals',
      desc: 'Direct access to certified network, cloud, and security engineers.',
      icon: <Users2 className="w-5 h-5 text-[#E5A93C]" />,
    },
    {
      title: 'Scalable Solutions',
      desc: 'Infrastructure that scales effortlessly as your business grows.',
      icon: <Layers className="w-5 h-5 text-[#E5A93C]" />,
    },
  ];

  return (
    <div className="bg-white text-slate-900 font-sans selection:bg-[#E5A93C]/30">
      {/* ========================================================= */}
      {/* 1. HERO SECTION: Reliable IT Operations for a Smarter Business */}
      {/* ========================================================= */}
      <section className="relative pt-36 pb-20 overflow-hidden border-b border-slate-100 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-6">
              <span className="heading-eyebrow block">
                MANAGED IT SERVICES
              </span>
              <h1 className="heading-hero text-[#020E26]">
                Reliable IT Operations <br />
                <span className="text-[#E5A93C] font-light">for a Smarter Business</span>
              </h1>
              <p className="text-base text-slate-600 leading-relaxed max-w-lg">
                We deliver comprehensive managed IT services to keep your systems secure, available and running at peak performance so you can focus on your core business.
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <BrandButton to="/contact" variant="gold" size="lg">
                  Get a Consultation
                </BrandButton>
                <BrandButton to="/services" variant="dark" size="lg">
                  View Our Services
                </BrandButton>
              </div>
            </div>

            {/* Right Visual: NOC Center with IT Engineer & Floating Pill Panel */}
            <div className="lg:col-span-6 relative flex items-center justify-center min-h-[460px]">
              <div className="absolute w-[460px] h-[460px] rounded-full bg-gradient-to-tr from-[#E5A93C]/10 via-[#0ea5e9]/10 to-transparent blur-3xl pointer-events-none" />

              <div className="relative w-full max-w-[540px] rounded-2xl bg-[#000B1E] border border-slate-800 p-4 sm:p-5 shadow-2xl overflow-hidden text-white flex flex-col sm:flex-row items-center gap-5">
                {/* Main NOC Monitor Visual */}
                <div className="relative w-full sm:w-[62%] aspect-[4/3] rounded-xl overflow-hidden border border-slate-800 bg-slate-950">
                  <img
                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80"
                    alt="Network Operations Command Center"
                    className="w-full h-full object-cover opacity-85"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#000B1E] via-transparent to-transparent" />
                  <div className="absolute bottom-2 left-2 right-2 flex justify-between items-center bg-black/60 backdrop-blur-md px-2.5 py-1 rounded text-[10px] border border-slate-800">
                    <span className="text-emerald-400 flex items-center gap-1 font-mono">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                      NOC ACTIVE
                    </span>
                    <span className="text-slate-400 font-mono">99.98% SLA</span>
                  </div>
                </div>

                {/* Right Anchored 5-Pill Feature Badges Stack */}
                <div className="w-full sm:w-[38%] space-y-2">
                  {heroBadges.map((b, i) => (
                    <div
                      key={i}
                      className="bg-slate-900/90 border border-slate-800 rounded-lg p-2.5 flex items-center gap-2 hover:border-[#E5A93C]/40 hover:bg-slate-800 transition-colors shadow-sm"
                    >
                      <div className="w-6 h-6 rounded bg-slate-800 flex items-center justify-center shrink-0">
                        {b.icon}
                      </div>
                      <span className="text-[11px] font-semibold text-slate-200 leading-tight">
                        {b.label}
                      </span>
                    </div>
                  ))}
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
      {/* 2. OUR MANAGED IT SERVICES: 2x3 Grid */}
      {/* ========================================================= */}
      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
            <div>
              <span className="heading-eyebrow block mb-2">
                OUR MANAGED IT SERVICES
              </span>
              <h2 className="heading-section text-[#020E26]">
                Complete IT Support for Modern Businesses
              </h2>
            </div>
            <div className="text-sm text-slate-600 max-w-md">
              <p className="mb-2">From day-to-day IT support to advanced infrastructure management, we provide end-to-end managed IT services tailored to your business needs.</p>
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
      {/* 3. HOW IT WORKS: Our Managed IT Service Process */}
      {/* ========================================================= */}
      <section className="py-24 bg-white border-b border-slate-100">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="heading-eyebrow block mb-3">
              HOW IT WORKS
            </span>
            <h2 className="heading-section text-[#020E26]">
              Our Managed IT Service Process
            </h2>
          </div>

          {/* 5-Step Pipeline */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
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
                  <p className="text-xs text-slate-600 leading-relaxed">{p.desc}</p>
                </div>
                {/* Step Connector Arrow for Desktop */}
                {i < 4 && (
                  <div className="hidden lg:block absolute -right-3.5 top-1/2 -translate-y-1/2 z-10 text-slate-300 font-bold">
                    →
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 4. INDUSTRIES WE SERVE: Managed IT for Every Industry */}
      {/* ========================================================= */}
      <section className="py-24 bg-slate-50 border-b border-slate-200">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="heading-eyebrow block mb-3">
              INDUSTRIES WE SERVE
            </span>
            <h2 className="heading-section text-[#020E26]">
              Managed IT for Every Industry
            </h2>
          </div>

          {/* 7 Industry Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
            {industries.map((ind, i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md hover:border-[#E5A93C]/50 transition-all flex flex-col items-center text-center group"
              >
                <div className="aspect-[4/3] w-full overflow-hidden bg-slate-100 relative">
                  <img 
                    src={ind.img} 
                    alt={ind.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-3">
                  <div className="flex items-center justify-center gap-1.5 mb-1">
                    {ind.icon}
                  </div>
                  <h4 className="text-xs font-bold text-[#020E26] group-hover:text-[#E5A93C] transition-colors leading-tight">
                    {ind.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 5. KEY BENEFITS */}
      {/* ========================================================= */}
      <section className="py-20 bg-white border-b border-slate-100">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="heading-eyebrow block mb-3">
              KEY BENEFITS
            </span>
            <h2 className="heading-section text-[#020E26]">
              Strategic Advantages of Managed IT
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-5">
            {keyBenefits.map((b, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl bg-slate-50/80 border border-slate-200 hover:border-[#E5A93C]/50 hover:bg-white hover:shadow-md transition-all flex flex-col items-center text-center group"
              >
                <div className="w-10 h-10 rounded-lg bg-white border border-slate-100 flex items-center justify-center mb-3 group-hover:bg-[#020E26] transition-colors shadow-xs">
                  {b.icon}
                </div>
                <h4 className="text-xs font-bold text-[#020E26] mb-1.5 group-hover:text-[#E5A93C] transition-colors">
                  {b.title}
                </h4>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  {b.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 6. EXECUTIVE CALL TO ACTION BANNER */}
      {/* ========================================================= */}
      <section className="relative py-20 bg-[#000B1E] text-white overflow-hidden border-t border-slate-800">
        {/* Right-anchored NOC Control Room Backdrop */}
        <div 
          className="absolute right-0 top-0 bottom-0 w-full lg:w-[60%] z-0 pointer-events-none overflow-hidden"
          style={{
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.2) 20%, rgba(0,0,0,0.7) 48%, black 75%)',
            maskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.2) 20%, rgba(0,0,0,0.7) 48%, black 75%)'
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1600&q=85"
            alt="Data Center Operations"
            className="w-full h-full object-cover object-[center_right] opacity-75 scale-100"
          />
        </div>

        <div className="relative z-10 max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 flex flex-col lg:flex-row items-center justify-between gap-10">
          <div className="max-w-xl">
            <span className="heading-eyebrow block mb-2 text-[#E5A93C]">
              LET'S BUILD TOGETHER
            </span>
            <h2 className="heading-section text-white">
              Focus on Your Business, We'll Handle Your IT
            </h2>
            <p className="text-sm text-slate-300 mt-2">
              Partner with Prabha Technologies for reliable, secure and cost-effective managed IT services.
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
              <div className="text-xs font-semibold text-slate-300 mt-1.5">IT Experts</div>
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

export default ManagedItServicesPage;
