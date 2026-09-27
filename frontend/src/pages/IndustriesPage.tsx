import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Flame,
  Cog,
  HardHat,
  Zap,
  HeartPulse,
  ShoppingCart,
  Truck,
  Building2,
  Landmark,
  GraduationCap,
  Building,
  Hotel,
  CheckCircle2,
  Globe2,
  Award,
  Users2,
  ThumbsUp,
  Search,
  Compass,
  FileCode2,
  Rocket,
  Headphones,
  Cpu,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react';
import { SectionHeading } from '../components/common/SectionHeading';
import { BrandButton } from '../components/common/BrandButton';

export const IndustriesPage: React.FC = () => {
  const industries = [
    {
      title: 'Oil & Gas',
      desc: 'Digital solutions for exploration, production, safety and operations.',
      icon: <Flame className="w-5 h-5 text-[#020E26]" />,
      img: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Manufacturing',
      desc: 'Smart automation, quality control and real-time monitoring.',
      icon: <Cog className="w-5 h-5 text-[#020E26]" />,
      img: '/assets/images/indistrial-iot.jpg',
    },
    {
      title: 'Construction & Engineering',
      desc: 'Project management, workforce tracking and compliance.',
      icon: <HardHat className="w-5 h-5 text-[#020E26]" />,
      img: 'https://images.unsplash.com/photo-1541888946425-d0fbb186156a?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Energy & Utilities',
      desc: 'Grid management, smart meters and energy optimization.',
      icon: <Zap className="w-5 h-5 text-[#020E26]" />,
      img: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Healthcare',
      desc: 'Patient management, telemedicine and healthcare automation.',
      icon: <HeartPulse className="w-5 h-5 text-[#020E26]" />,
      img: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Retail & E-commerce',
      desc: 'Omnichannel platforms, customer engagement and analytics.',
      icon: <ShoppingCart className="w-5 h-5 text-[#020E26]" />,
      img: 'https://images.unsplash.com/photo-1555421689-491a97ff2040?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Logistics & Transport',
      desc: 'Fleet tracking, route optimization and supply chain visibility.',
      icon: <Truck className="w-5 h-5 text-[#020E26]" />,
      img: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Real Estate & Facilities',
      desc: 'Smart buildings, facility management and property solutions.',
      icon: <Building2 className="w-5 h-5 text-[#020E26]" />,
      img: '/assets/images/glass-office-building.jpeg',
    },
    {
      title: 'Banking & Finance',
      desc: 'Secure, scalable and compliant financial technology solutions.',
      icon: <Landmark className="w-5 h-5 text-[#020E26]" />,
      img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Education',
      desc: 'E-learning platforms, virtual classrooms and student management.',
      icon: <GraduationCap className="w-5 h-5 text-[#020E26]" />,
      img: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Government & Public Sector',
      desc: 'Citizen services, digital transformation and process automation.',
      icon: <Building className="w-5 h-5 text-[#020E26]" />,
      img: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Hospitality',
      desc: 'Guest engagement, smart operations and property management.',
      icon: <Hotel className="w-5 h-5 text-[#020E26]" />,
      img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    },
  ];

  const techStack = [
    { name: 'Java', icon: '/assets/tech/java.svg' },
    { name: 'Spring Boot', icon: '/assets/tech/spring.svg' },
    { name: 'Python', icon: '/assets/tech/python.svg' },
    { name: '.NET', icon: '/assets/tech/dotnet.svg' },
    { name: 'Node.js', icon: '/assets/tech/nodejs.svg' },
    { name: 'React', icon: '/assets/tech/react.svg' },
    { name: 'Angular', icon: '/assets/tech/angular.svg' },
    { name: 'Next.js', icon: '/assets/tech/nextjs.svg' },
    { name: 'Flutter', icon: '/assets/tech/flutter.svg' },
    { name: 'React Native', icon: '/assets/tech/react-native.svg' },
    { name: 'TypeScript', icon: '/assets/tech/typescript.svg' },
    { name: 'AWS', icon: '/assets/tech/aws.svg' },
    { name: 'Microsoft Azure', icon: '/assets/tech/azure.svg' },
    { name: 'Google Cloud', icon: '/assets/tech/gcp.svg' },
    { name: 'PostgreSQL', icon: '/assets/tech/postgresql.svg' },
    { name: 'MongoDB', icon: '/assets/tech/mongodb.svg' },
    { name: 'MySQL', icon: '/assets/tech/mysql.svg' },
    { name: 'Docker', icon: '/assets/tech/docker.svg' },
    { name: 'Kubernetes', icon: '/assets/tech/kubernetes.svg' },
    { name: 'CI/CD', icon: '/assets/tech/cicd.svg' },
  ];

  return (
    <div className="bg-white text-slate-900 font-sans selection:bg-[#E5A93C]/30">
      {/* ========================================================= */}
      {/* 1. INDUSTRIES HERO: Daylight Skyline & Collage Visual */}
      {/* ========================================================= */}
      <section className="relative pt-36 pb-20 border-b border-slate-100 overflow-hidden bg-white">
        {/* Right Modern Architectural Innovation Hub with Smooth Left Fade */}
        <div 
          className="absolute right-0 top-0 bottom-0 w-full lg:w-[54%] z-0 pointer-events-none overflow-hidden"
          style={{
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.2) 20%, rgba(0,0,0,0.7) 48%, black 75%)',
            maskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.2) 20%, rgba(0,0,0,0.7) 48%, black 75%)'
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1600&q=85"
            alt="Dubai Modern Cityscape Highway and Skyline"
            className="w-full h-full object-cover object-[center_right] scale-100"
          />
        </div>

        <div className="relative z-10 max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-6">
              <span className="heading-eyebrow block">
                INDUSTRIES
              </span>
              <h1 className="heading-hero text-[#020E26]">
                Industry-Focused <br />
                Technology for <br />
                <span className="text-[#E5A93C] font-light">Real Business Impact</span>
              </h1>
              <p className="text-base text-slate-600 leading-relaxed max-w-lg">
                We deliver innovative software, mobile apps, AI, IIoT and managed IT services tailored to industry-specific challenges across the GCC, India and global markets.
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <BrandButton to="/contact" variant="gold" size="lg">
                  Discuss Your Industry Needs
                </BrandButton>
                <BrandButton to="/portfolio" variant="outline" size="lg">
                  Explore Our Expertise
                </BrandButton>
              </div>
            </div>
          </div>

          {/* 4-Pillar Capability Strip */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-16 mt-16 border-t border-slate-200">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center text-[#020E26] shrink-0">
                <Building2 className="w-5 h-5 text-[#E5A93C]" />
              </div>
              <div>
                <div className="text-sm font-bold text-[#020E26]">Industry Expertise</div>
                <div className="text-xs text-slate-500">Deep domain knowledge</div>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center text-[#020E26] shrink-0">
                <Cog className="w-5 h-5 text-[#E5A93C]" />
              </div>
              <div>
                <div className="text-sm font-bold text-[#020E26]">Tailored Solutions</div>
                <div className="text-xs text-slate-500">Built for your unique needs</div>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center text-[#020E26] shrink-0">
                <TrendingUp className="w-5 h-5 text-[#E5A93C]" />
              </div>
              <div>
                <div className="text-sm font-bold text-[#020E26]">Measurable Impact</div>
                <div className="text-xs text-slate-500">Drive growth & efficiency</div>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center text-[#020E26] shrink-0">
                <Globe2 className="w-5 h-5 text-[#E5A93C]" />
              </div>
              <div>
                <div className="text-sm font-bold text-[#020E26]">Global Delivery</div>
                <div className="text-xs text-slate-500">UAE | KSA | Kuwait | India</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. INDUSTRIES WE SERVE: 12-PILLAR GRID */}
      {/* ========================================================= */}
      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="heading-eyebrow block mb-2">
                INDUSTRIES WE SERVE
              </span>
              <h2 className="heading-section text-[#020E26]">
                Powering Transformation <br />
                <span className="text-[#E5A93C] font-light">Across Key Industries</span>
              </h2>
            </div>
            <p className="text-sm text-slate-600 max-w-md leading-relaxed">
              We understand industry-specific challenges and deliver technologies that improve efficiency, compliance, safety and customer experience.
            </p>
          </div>

          {/* 12 Industry Cards (4 cols on lg, 2 on md, 1 on sm) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {industries.map((ind, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:border-[#E5A93C]/50 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Photo Header */}
                  <div className="aspect-[16/10] bg-slate-100 overflow-hidden relative">
                    <img
                      src={ind.img}
                      alt={ind.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Body Content */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-9 h-9 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center group-hover:bg-[#020E26] group-hover:text-[#E5A93C] transition-colors">
                        {ind.icon}
                      </div>
                      <Link
                        to="/contact"
                        className="w-8 h-8 rounded-full bg-slate-100 hover:bg-[#020E26] hover:text-[#E5A93C] flex items-center justify-center transition-colors text-slate-600"
                        title={`Inquire about ${ind.title}`}
                      >
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                    <h3 className="text-base font-bold text-[#020E26] mb-2 group-hover:text-[#E5A93C] transition-colors">
                      {ind.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {ind.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. TECHNOLOGIES WE USE: MODERN TECH STACK */}
      {/* ========================================================= */}
      <section className="py-24 bg-white border-b border-slate-200">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="heading-eyebrow block mb-2">
                TECHNOLOGIES WE USE
              </span>
              <h2 className="heading-section text-[#020E26]">
                Modern Technologies <br />
                <span className="text-[#E5A93C] font-light">for Scalable Solutions</span>
              </h2>
            </div>
            <p className="text-sm text-slate-600 max-w-md leading-relaxed">
              We leverage the latest technologies to build secure, scalable and future-ready solutions for our clients.
            </p>
          </div>

          {/* Tech Badges Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-10 gap-3.5">
            {techStack.map((tech, i) => (
              <div
                key={i}
                className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/90 hover:border-[#E5A93C]/60 hover:bg-white hover:shadow-md transition-all flex flex-col items-center justify-center text-center group cursor-pointer"
              >
                <div className="w-8 h-8 flex items-center justify-center mb-2 transition-transform duration-300 group-hover:scale-110">
                  <img
                    src={tech.icon}
                    alt={tech.name}
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                </div>
                <span className="text-xs font-semibold text-slate-700 group-hover:text-[#020E26] transition-colors whitespace-nowrap">
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 4. OUR PROCESS: 5-STEP PIPELINE */}
      {/* ========================================================= */}
      <section className="py-24 bg-slate-50 border-b border-slate-200">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="heading-eyebrow block mb-3">
              OUR PROCESS
            </span>
            <h2 className="heading-section text-[#020E26]">
              From Understanding to Lasting Impact
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              {
                step: '01',
                title: 'Discover',
                desc: 'Understand your business, industry and goals.',
                icon: <Search className="w-4 h-4 text-[#020E26]" />,
              },
              {
                step: '02',
                title: 'Plan',
                desc: 'Design a tailored strategy and solution roadmap.',
                icon: <Compass className="w-4 h-4 text-[#020E26]" />,
              },
              {
                step: '03',
                title: 'Develop',
                desc: 'Build and configure with best practices.',
                icon: <FileCode2 className="w-4 h-4 text-[#020E26]" />,
              },
              {
                step: '04',
                title: 'Deploy',
                desc: 'Launch with minimal disruption and seamless integration.',
                icon: <Rocket className="w-4 h-4 text-[#020E26]" />,
              },
              {
                step: '05',
                title: 'Support',
                desc: 'Continuous monitoring, optimization and support.',
                icon: <Headphones className="w-4 h-4 text-[#020E26]" />,
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
      {/* 5. BOTTOM CTA BANNER WITH TRUST METRICS */}
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

        <div className="relative z-10 max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left CTA Text */}
          <div className="max-w-xl space-y-3">
            <span className="heading-eyebrow block">
              LET'S BUILD TOGETHER
            </span>
            <h2 className="heading-section text-white">
              Your Industry. Our Expertise. <br />
              <span className="text-gold-shimmer font-light">A Smarter Tomorrow.</span>
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Partner with Prabha Technologies to drive innovation, efficiency and sustainable growth in your industry.
            </p>
            <div className="pt-2">
              <BrandButton to="/contact" variant="gold" size="lg">
                Let's Talk
              </BrandButton>
            </div>
          </div>

          {/* Right Metrics Strip Embedded in Banner */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 bg-[#020E26]/85 backdrop-blur-md p-6 rounded-2xl border border-slate-800 shadow-2xl">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-light text-gold-shimmer leading-none">100+</div>
              <div className="text-[11px] font-semibold text-slate-300 mt-1.5">Projects Delivered</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-light text-gold-shimmer leading-none">35+</div>
              <div className="text-[11px] font-semibold text-slate-300 mt-1.5">Expert Team</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-light text-gold-shimmer leading-none">6+</div>
              <div className="text-[11px] font-semibold text-slate-300 mt-1.5">Industries Served</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-light text-gold-shimmer leading-none">100%</div>
              <div className="text-[11px] font-semibold text-slate-300 mt-1.5">Client Success Rate</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
