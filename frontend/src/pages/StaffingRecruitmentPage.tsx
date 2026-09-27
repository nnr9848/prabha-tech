import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  CheckCircle2,
  Users2,
  UserCheck,
  Briefcase,
  Globe2,
  Award,
  Clock,
  ShieldCheck,
  Search,
  Filter,
  FileCheck,
  UserPlus,
  Building2,
  Factory,
  Flame,
  Stethoscope,
  Landmark,
  ShoppingBag,
  Layers,
  Sparkles,
  Zap,
  Target,
  LineChart,
  ChevronRight,
  Code2,
  Database,
  Cloud,
  Cpu,
  Smartphone,
  Server,
  Lock,
} from 'lucide-react';
import { BrandButton } from '../components/common/BrandButton';

export const StaffingRecruitmentPage: React.FC = () => {
  // 6 Metric Strip
  const statsStrip = [
    { stat: '500+', label: 'IT Professionals Placed', icon: <Users2 className="w-5 h-5 text-[#E5A93C]" /> },
    { stat: '100+', label: 'Clients Across GCC & India', icon: <Building2 className="w-5 h-5 text-[#E5A93C]" /> },
    { stat: '95%', label: 'Client Satisfaction Rate', icon: <Award className="w-5 h-5 text-[#E5A93C]" /> },
    { stat: '30+', label: 'Technology Domains', icon: <Layers className="w-5 h-5 text-[#E5A93C]" /> },
    { stat: 'Fast', label: 'Turnaround Time', icon: <Clock className="w-5 h-5 text-[#E5A93C]" /> },
    { stat: 'Long-term', label: 'Partnerships', icon: <ShieldCheck className="w-5 h-5 text-[#E5A93C]" /> },
  ];

  // 5 Floating Badges in Hero Card
  const heroBadges = [
    { label: 'Contract Staffing', icon: <Briefcase className="w-3.5 h-3.5 text-[#E5A93C]" /> },
    { label: 'Permanent Hiring', icon: <UserCheck className="w-3.5 h-3.5 text-[#E5A93C]" /> },
    { label: 'Dedicated Teams', icon: <Users2 className="w-3.5 h-3.5 text-[#E5A93C]" /> },
    { label: 'Global Talent Network', icon: <Globe2 className="w-3.5 h-3.5 text-[#E5A93C]" /> },
    { label: 'IT Consulting & Workforce Solutions', icon: <Target className="w-3.5 h-3.5 text-[#E5A93C]" /> },
  ];

  // 6 Solutions Cards (2x3 Grid matching Screenshot)
  const solutions = [
    {
      id: 'contract-staffing',
      title: 'Contract Staffing',
      badgeIcon: <Briefcase className="w-4 h-4 text-white" />,
      badgeBg: 'bg-[#020E26]',
      desc: 'Skilled IT professionals for short-term and project-based requirements.',
      img: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'permanent-hiring',
      title: 'Permanent Hiring',
      badgeIcon: <UserCheck className="w-4 h-4 text-white" />,
      badgeBg: 'bg-[#0284c7]',
      desc: 'End-to-end recruitment for full-time positions across all technology domains.',
      img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'dedicated-teams',
      title: 'Dedicated Teams',
      badgeIcon: <Users2 className="w-4 h-4 text-white" />,
      badgeBg: 'bg-[#0f172a]',
      desc: 'Build and manage your extended development and support teams.',
      img: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'executive-search',
      title: 'Executive Search',
      badgeIcon: <Award className="w-4 h-4 text-white" />,
      badgeBg: 'bg-[#6366f1]',
      desc: 'Leadership and niche talent for critical roles including CTOs, Architects and Leads.',
      img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'rpo',
      title: 'RPO (Recruitment Process Outsourcing)',
      badgeIcon: <Target className="w-4 h-4 text-white" />,
      badgeBg: 'bg-[#0369a1]',
      desc: 'Complete recruitment lifecycle management from sourcing to final onboarding.',
      img: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'it-consulting',
      title: 'IT Consulting & Workforce Solutions',
      badgeIcon: <LineChart className="w-4 h-4 text-white" />,
      badgeBg: 'bg-[#020E26]',
      desc: 'Strategic hiring, market insights and workforce planning to scale smoothly.',
      img: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
    },
  ];

  // 5-Step Process
  const steps = [
    {
      step: '01',
      title: 'Understand',
      desc: 'Analyze your technical requirements and culture fit.',
      icon: <Search className="w-4 h-4 text-[#020E26]" />,
    },
    {
      step: '02',
      title: 'Source',
      desc: 'Tap into our pre-screened talent network across GCC & India.',
      icon: <Globe2 className="w-4 h-4 text-[#020E26]" />,
    },
    {
      step: '03',
      title: 'Screen',
      desc: 'Rigorous technical evaluation and HR screening.',
      icon: <Filter className="w-4 h-4 text-[#020E26]" />,
    },
    {
      step: '04',
      title: 'Match',
      desc: 'Shortlist and present the top candidates.',
      icon: <FileCheck className="w-4 h-4 text-[#020E26]" />,
    },
    {
      step: '05',
      title: 'Onboard',
      desc: 'Seamless joining, compliance and continuous check-ins.',
      icon: <UserPlus className="w-4 h-4 text-[#020E26]" />,
    },
  ];

  // Technologies We Hire For
  const technologies = [
    { name: 'Java', icon: '/assets/tech/java.svg' },
    { name: '.NET', icon: '/assets/tech/dotnet.svg' },
    { name: 'Python', icon: '/assets/tech/python.svg' },
    { name: 'TypeScript', icon: '/assets/tech/typescript.svg' },
    { name: 'React', icon: '/assets/tech/react.svg' },
    { name: 'Node.js', icon: '/assets/tech/nodejs.svg' },
    { name: 'Cloud (AWS/GCP)', icon: '/assets/tech/aws.svg' },
    { name: 'DevOps & CI/CD', icon: '/assets/tech/cicd.svg' },
    { name: 'Mobile Apps', icon: '/assets/tech/flutter.svg' },
    { name: 'Data & AI', icon: '/assets/tech/tensorflow.svg' },
  ];

  // 8 Industries We Serve
  const industries = [
    {
      title: 'IT & Software',
      img: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=400&q=80',
      icon: <Code2 className="w-3.5 h-3.5 text-[#E5A93C]" />,
    },
    {
      title: 'Manufacturing',
      img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=400&q=80',
      icon: <Factory className="w-3.5 h-3.5 text-[#E5A93C]" />,
    },
    {
      title: 'Oil & Gas',
      img: '/assets/images/indistrial-iot.jpg',
      icon: <Flame className="w-3.5 h-3.5 text-[#E5A93C]" />,
    },
    {
      title: 'Healthcare',
      img: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=400&q=80',
      icon: <Stethoscope className="w-3.5 h-3.5 text-[#E5A93C]" />,
    },
    {
      title: 'Banking & Finance',
      img: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=400&q=80',
      icon: <Landmark className="w-3.5 h-3.5 text-[#E5A93C]" />,
    },
    {
      title: 'Real Estate',
      img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=400&q=80',
      icon: <Building2 className="w-3.5 h-3.5 text-[#E5A93C]" />,
    },
    {
      title: 'Retail & E-commerce',
      img: 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=400&q=80',
      icon: <ShoppingBag className="w-3.5 h-3.5 text-[#E5A93C]" />,
    },
    {
      title: 'Government',
      img: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=400&q=80',
      icon: <Award className="w-3.5 h-3.5 text-[#E5A93C]" />,
    },
  ];

  // 7 Value Pillars
  const valuePillars = [
    { label: 'Access to Top Talent in GCC & India', icon: <Globe2 className="w-4 h-4 text-[#E5A93C]" /> },
    { label: 'Faster Hiring Turnaround', icon: <Clock className="w-4 h-4 text-[#E5A93C]" /> },
    { label: 'Pre-vetted & Skilled Professionals', icon: <UserCheck className="w-4 h-4 text-[#E5A93C]" /> },
    { label: 'Flexible Engagement Models', icon: <Layers className="w-4 h-4 text-[#E5A93C]" /> },
    { label: 'Domain Expertise Across Technologies', icon: <Cpu className="w-4 h-4 text-[#E5A93C]" /> },
    { label: 'Dedicated Account Management', icon: <Briefcase className="w-4 h-4 text-[#E5A93C]" /> },
    { label: 'End-to-End Recruitment Support', icon: <ShieldCheck className="w-4 h-4 text-[#E5A93C]" /> },
  ];

  return (
    <div className="bg-white text-slate-900 font-sans selection:bg-[#E5A93C]/30">
      {/* ========================================================= */}
      {/* 1. HERO SECTION: Right Talent for a Stronger Tomorrow */}
      {/* ========================================================= */}
      <section className="relative pt-36 pb-20 overflow-hidden border-b border-slate-100 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-6">
              <span className="heading-eyebrow block">
                IT RECRUITMENT & STAFFING
              </span>
              <h1 className="heading-hero text-[#020E26]">
                Right Talent <br />
                <span className="text-[#E5A93C] font-light">for a Stronger Tomorrow</span>
              </h1>
              <p className="text-base text-slate-600 leading-relaxed max-w-lg">
                We connect top IT talent with forward-thinking businesses across UAE, Saudi Arabia, Kuwait, India and globally. From contract staffing to permanent hiring, we help you build high-performing teams that drive success.
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <BrandButton to="/contact" variant="gold" size="lg">
                  Hire Talent
                </BrandButton>
                <BrandButton to="/careers" variant="dark" size="lg">
                  Find a Job
                </BrandButton>
              </div>
            </div>

            {/* Right Visual: Executive Recruiter & Future-Ready Stack */}
            <div className="lg:col-span-6 relative flex items-center justify-center min-h-[460px]">
              <div className="absolute w-[460px] h-[460px] rounded-full bg-gradient-to-tr from-[#E5A93C]/10 via-[#0284c7]/10 to-transparent blur-3xl pointer-events-none" />

              <div className="relative w-full max-w-[540px] rounded-2xl bg-[#000B1E] border border-slate-800 p-4 sm:p-6 shadow-2xl overflow-hidden text-white flex flex-col sm:flex-row items-center gap-6">
                {/* Executive Image */}
                <div className="relative w-full sm:w-[58%] aspect-[4/5] rounded-xl overflow-hidden border border-slate-800 bg-slate-950">
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80"
                    alt="Prabha Technologies Executive IT Recruiter"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#000B1E] via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-800">
                    <span className="text-xs font-bold text-white">Prabha Talent Hub</span>
                    <span className="text-[10px] text-[#E5A93C] font-semibold">GCC & Global</span>
                  </div>
                </div>

                {/* Right Badges Stack */}
                <div className="w-full sm:w-[42%] space-y-2.5">
                  <div className="text-xs font-bold text-white mb-1 border-b border-slate-800 pb-2">
                    Building Future-Ready IT Teams
                  </div>
                  {heroBadges.map((b, i) => (
                    <div
                      key={i}
                      className="bg-slate-900/90 border border-slate-800 rounded-lg p-2.5 flex items-center gap-2 hover:border-[#E5A93C]/40 hover:bg-slate-800 transition-colors shadow-sm"
                    >
                      <div className="w-5 h-5 rounded bg-slate-800 flex items-center justify-center shrink-0">
                        {b.icon}
                      </div>
                      <span className="text-[10px] font-semibold text-slate-200 leading-tight">
                        {b.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 6 Metric Strip */}
          <div className="mt-16 pt-8 border-t border-slate-100 grid grid-cols-2 md:grid-cols-6 gap-4">
            {statsStrip.map((s, i) => (
              <div 
                key={i} 
                className="flex flex-col items-center text-center p-4 rounded-xl bg-slate-50/70 border border-slate-100 hover:border-[#E5A93C]/40 hover:bg-white hover:shadow-sm transition-all"
              >
                <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center mb-2 shrink-0 shadow-xs">
                  {s.icon}
                </div>
                <div className="text-xl font-bold text-[#020E26] font-mono leading-none">
                  {s.stat}
                </div>
                <div className="text-[11px] text-slate-600 mt-1">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. OUR STAFFING SOLUTIONS: 2x3 Grid */}
      {/* ========================================================= */}
      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
            <div>
              <span className="heading-eyebrow block mb-2">
                OUR STAFFING SOLUTIONS
              </span>
              <h2 className="heading-section text-[#020E26]">
                Comprehensive IT Staffing Services
              </h2>
            </div>
            <div className="text-sm text-slate-600 max-w-md">
              <p className="mb-2">Flexible and scalable staffing solutions to meet your unique business needs.</p>
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
      {/* 3. OUR RECRUITMENT PROCESS: 5-Step Pipeline */}
      {/* ========================================================= */}
      <section className="py-24 bg-white border-b border-slate-100">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="heading-eyebrow block mb-3">
              OUR RECRUITMENT PROCESS
            </span>
            <h2 className="heading-section text-[#020E26]">
              A Structured Approach to Right Hiring
            </h2>
          </div>

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
      {/* 4. TECHNOLOGIES WE HIRE FOR: Talent Across All Technologies */}
      {/* ========================================================= */}
      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="heading-eyebrow block mb-3">
              TECHNOLOGIES WE HIRE FOR
            </span>
            <h2 className="heading-section text-[#020E26]">
              Talent Across All Technologies
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            {technologies.map((t, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-white border border-slate-200 hover:border-[#E5A93C]/50 hover:shadow-md transition-all flex flex-col items-center text-center group"
              >
                <div className="w-10 h-10 flex items-center justify-center mb-2.5">
                  <img
                    src={t.icon}
                    alt={t.name}
                    className="w-7 h-7 object-contain group-hover:scale-110 transition-transform"
                  />
                </div>
                <span className="text-xs font-semibold text-slate-700 group-hover:text-[#020E26]">
                  {t.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 5. INDUSTRIES WE SERVE: Hiring for a Better Tomorrow */}
      {/* ========================================================= */}
      <section className="py-24 bg-white border-b border-slate-100">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="heading-eyebrow block mb-3">
              INDUSTRIES WE SERVE
            </span>
            <h2 className="heading-section text-[#020E26]">
              Hiring for a Better Tomorrow
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
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
                  <h4 className="text-[11px] font-bold text-[#020E26] group-hover:text-[#E5A93C] transition-colors leading-tight">
                    {ind.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 6. WHY CHOOSE PRABHA TECH: 7 Value Pillars */}
      {/* ========================================================= */}
      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="heading-eyebrow block mb-3">
              WHY CHOOSE PRABHA TECH
            </span>
            <h2 className="heading-section text-[#020E26]">
              Your Trusted Talent Acquisition Partner
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
            {valuePillars.map((vp, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-white border border-slate-200 hover:border-[#E5A93C]/50 hover:shadow-md transition-all flex flex-col items-center text-center group"
              >
                <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center mb-2.5 group-hover:bg-[#020E26] transition-colors shadow-xs">
                  {vp.icon}
                </div>
                <h4 className="text-[11px] font-bold text-[#020E26] group-hover:text-[#E5A93C] transition-colors leading-snug">
                  {vp.label}
                </h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 7. EXECUTIVE CALL TO ACTION BANNER */}
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
            src="/assets/images/dubai-hero-rings.jpg"
            alt="Dubai Global Talent Skyline"
            className="w-full h-full object-cover object-[center_right] opacity-75 scale-100"
          />
        </div>

        <div className="relative z-10 max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 flex flex-col lg:flex-row items-center justify-between gap-10">
          <div className="max-w-xl">
            <span className="heading-eyebrow block mb-2 text-[#E5A93C]">
              LET'S BUILD TOGETHER
            </span>
            <h2 className="heading-section text-white">
              Find the Right Talent. Build a Stronger Team.
            </h2>
            <p className="text-sm text-slate-300 mt-2">
              Partner with Prabha Technologies for reliable IT recruitment and staffing solutions that help your business grow.
            </p>
            <div className="pt-6">
              <BrandButton to="/contact" variant="gold" size="lg">
                Get Started
              </BrandButton>
            </div>
          </div>

          {/* Key Impact Stats Bar */}
          <div className="flex flex-wrap items-center gap-8 bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-2xl p-6 sm:p-8">
            <div className="text-center min-w-[110px]">
              <div className="text-3xl font-light text-gold-shimmer leading-none">500+</div>
              <div className="text-xs font-semibold text-slate-300 mt-1.5">Talents Placed</div>
            </div>
            <div className="w-[1px] h-10 bg-slate-800 hidden sm:block" />
            <div className="text-center min-w-[110px]">
              <div className="text-3xl font-light text-gold-shimmer leading-none">100+</div>
              <div className="text-xs font-semibold text-slate-300 mt-1.5">Happy Clients</div>
            </div>
            <div className="w-[1px] h-10 bg-slate-800 hidden sm:block" />
            <div className="text-center min-w-[110px]">
              <div className="text-3xl font-light text-gold-shimmer leading-none">95%</div>
              <div className="text-xs font-semibold text-slate-300 mt-1.5">Success Rate</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StaffingRecruitmentPage;
