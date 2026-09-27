import React from 'react';
import { Link } from 'react-router-dom';
import {
  Code2,
  Cpu,
  Cloud,
  ShieldCheck,
  Layers,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Smartphone,
  Server,
  Zap,
  Lock,
  Headphones,
  Settings,
  Search,
  FileCode2,
  Rocket,
  LineChart,
  DollarSign,
  Users2,
  Sliders,
  TrendingUp,
  Award,
} from 'lucide-react';
import { BrandButton } from '../components/common/BrandButton';

export const CustomSoftwareDevelopmentPage: React.FC = () => {
  return (
    <div className="bg-white text-slate-900 font-sans selection:bg-[#E5A93C]/30 min-h-screen">
      {/* ========================================================= */}
      {/* 1. HERO SECTION: Daylight High-Tech Laptop & Features */}
      {/* ========================================================= */}
      <section className="relative pt-32 sm:pt-36 pb-16 lg:pb-24 border-b border-slate-100 overflow-hidden bg-white">
        {/* Right Modern Architectural & Laptop UI Dashboard Visual with Smooth Left Fade */}
        <div 
          className="absolute right-0 top-0 bottom-0 w-full lg:w-[56%] z-0 pointer-events-none overflow-hidden"
          style={{
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.2) 15%, rgba(0,0,0,0.85) 45%, black 75%)',
            maskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.2) 15%, rgba(0,0,0,0.85) 45%, black 75%)',
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=85"
            alt="Enterprise Analytics Dashboard on Modern Laptop"
            className="w-full h-full object-cover object-center scale-100"
          />
          {/* Edge feathering */}
          <div className="hidden lg:block absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent pointer-events-none" />
          <div className="hidden lg:block absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white to-transparent pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-6">
              <span className="heading-eyebrow block">
                ENTERPRISE SOFTWARE DEVELOPMENT
              </span>
              <h1 className="heading-hero text-[#020E26]">
                Scalable Enterprise <br />
                Software for a <br />
                <span className="text-[#E5A93C] font-light">Smarter Tomorrow</span>
              </h1>
              <p className="text-base sm:text-lg text-slate-600 max-w-xl font-light leading-relaxed">
                We design and develop secure, scalable and high-performance enterprise software solutions that streamline operations, improve productivity and drive digital transformation.
              </p>

              {/* CTAs using BrandButton */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <BrandButton to="/contact" variant="gold" size="md">
                  Get a Consultation
                </BrandButton>
                <BrandButton
                  to="/portfolio"
                  variant="ghost"
                  size="md"
                  className="bg-white border border-slate-300 hover:border-slate-400 text-[#020E26]"
                >
                  View Our Work
                </BrandButton>
              </div>
            </div>

            {/* Right Floating Feature Badges Card */}
            <div className="lg:col-span-5 flex justify-end">
              <div className="relative w-full max-w-xs rounded-2xl bg-[#000B1E]/85 backdrop-blur-md border border-white/10 p-5 shadow-2xl text-white space-y-3">
                <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-[#E5A93C]/40 transition-colors">
                  <Sliders className="w-4 h-4 text-[#E5A93C] shrink-0" />
                  <span className="text-xs font-semibold text-white">Custom Solutions</span>
                </div>
                <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-[#E5A93C]/40 transition-colors">
                  <Cpu className="w-4 h-4 text-[#E5A93C] shrink-0" />
                  <span className="text-xs font-semibold text-white">AI Integration</span>
                </div>
                <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-[#E5A93C]/40 transition-colors">
                  <Cloud className="w-4 h-4 text-[#E5A93C] shrink-0" />
                  <span className="text-xs font-semibold text-white">Cloud Ready</span>
                </div>
                <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-[#E5A93C]/40 transition-colors">
                  <ShieldCheck className="w-4 h-4 text-[#E5A93C] shrink-0" />
                  <span className="text-xs font-semibold text-white">Enterprise Security</span>
                </div>
                <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-[#E5A93C]/40 transition-colors">
                  <Layers className="w-4 h-4 text-[#E5A93C] shrink-0" />
                  <span className="text-xs font-semibold text-white">Scalable Architecture</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. 6-PILLAR CAPABILITY STRIP */}
      {/* ========================================================= */}
      <section className="border-b border-slate-100 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 divide-y md:divide-y-0 md:divide-x divide-slate-100 py-6 sm:py-8">
            <div className="flex flex-col items-center text-center p-3">
              <Code2 className="w-6 h-6 text-[#E5A93C] mb-2" />
              <span className="text-xs font-bold text-[#020E26]">Custom Development</span>
              <span className="text-[10px] text-slate-500 mt-0.5">Tailored to your business</span>
            </div>

            <div className="flex flex-col items-center text-center p-3">
              <Layers className="w-6 h-6 text-[#E5A93C] mb-2" />
              <span className="text-xs font-bold text-[#020E26]">Web Applications</span>
              <span className="text-[10px] text-slate-500 mt-0.5">Modern & responsive</span>
            </div>

            <div className="flex flex-col items-center text-center p-3">
              <Settings className="w-6 h-6 text-[#E5A93C] mb-2" />
              <span className="text-xs font-bold text-[#020E26]">Enterprise Integration</span>
              <span className="text-[10px] text-slate-500 mt-0.5">Seamless connectivity</span>
            </div>

            <div className="flex flex-col items-center text-center p-3">
              <Cloud className="w-6 h-6 text-[#E5A93C] mb-2" />
              <span className="text-xs font-bold text-[#020E26]">Cloud & On-Premise</span>
              <span className="text-[10px] text-slate-500 mt-0.5">Flexible deployment</span>
            </div>

            <div className="flex flex-col items-center text-center p-3">
              <Cpu className="w-6 h-6 text-[#E5A93C] mb-2" />
              <span className="text-xs font-bold text-[#020E26]">AI & Automation</span>
              <span className="text-[10px] text-slate-500 mt-0.5">Intelligent solutions</span>
            </div>

            <div className="flex flex-col items-center text-center p-3">
              <Headphones className="w-6 h-6 text-[#E5A93C] mb-2" />
              <span className="text-xs font-bold text-[#020E26]">Ongoing Support</span>
              <span className="text-[10px] text-slate-500 mt-0.5">Long-term partnership</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. END-TO-END DEVELOPMENT SERVICES (2x3 Grid) */}
      {/* ========================================================= */}
      <section className="py-16 sm:py-24 bg-slate-50/60 border-b border-slate-100">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
            <div>
              <span className="heading-eyebrow block">
                OUR DEVELOPMENT SERVICES
              </span>
              <h2 className="text-2xl sm:text-4xl font-light text-[#020E26] mt-2">
                End-to-End Enterprise <br />
                <span className="font-semibold text-[#020E26]">Software Development</span>
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 max-w-lg font-light leading-relaxed">
              From concept to deployment, we deliver enterprise-grade software solutions designed to solve complex business challenges and create measurable impact.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Card 1: Custom Software Development */}
            <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-xl hover:border-[#E5A93C]/50 transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div className="aspect-[16/10] w-full overflow-hidden bg-slate-100 relative">
                  <img
                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80"
                    alt="Custom Software Development"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 w-9 h-9 rounded-lg bg-[#000B1E] flex items-center justify-center text-white shadow-md">
                    <Code2 className="w-4 h-4 text-[#E5A93C]" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-base sm:text-lg font-bold text-[#020E26] group-hover:text-[#E5A93C] transition-colors mb-2">
                    Custom Software Development
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed mb-4">
                    Build tailored software solutions to meet your unique business requirements.
                  </p>
                </div>
              </div>
              <div className="p-6 pt-0">
                <Link
                  to="/contact"
                  className="inline-flex items-center text-xs font-bold text-[#020E26] group-hover:text-[#E5A93C] transition-colors"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            {/* Card 2: Cloud Application Development */}
            <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-xl hover:border-[#E5A93C]/50 transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div className="aspect-[16/10] w-full overflow-hidden bg-slate-100 relative">
                  <img
                    src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80"
                    alt="Cloud Application Development"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 w-9 h-9 rounded-lg bg-[#000B1E] flex items-center justify-center text-white shadow-md">
                    <Cloud className="w-4 h-4 text-[#E5A93C]" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-base sm:text-lg font-bold text-[#020E26] group-hover:text-[#E5A93C] transition-colors mb-2">
                    Cloud Application Development
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed mb-4">
                    Scalable, secure and high-performance cloud-native applications.
                  </p>
                </div>
              </div>
              <div className="p-6 pt-0">
                <Link
                  to="/contact"
                  className="inline-flex items-center text-xs font-bold text-[#020E26] group-hover:text-[#E5A93C] transition-colors"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            {/* Card 3: Enterprise Web & Mobile Apps */}
            <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-xl hover:border-[#E5A93C]/50 transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div className="aspect-[16/10] w-full overflow-hidden bg-slate-100 relative">
                  <img
                    src="https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=600&q=80"
                    alt="Enterprise Web & Mobile Apps"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 w-9 h-9 rounded-lg bg-[#000B1E] flex items-center justify-center text-white shadow-md">
                    <Smartphone className="w-4 h-4 text-[#E5A93C]" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-base sm:text-lg font-bold text-[#020E26] group-hover:text-[#E5A93C] transition-colors mb-2">
                    Enterprise Web & Mobile Apps
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed mb-4">
                    Modern web and mobile applications for iOS, Android and enterprise users.
                  </p>
                </div>
              </div>
              <div className="p-6 pt-0">
                <Link
                  to="/contact"
                  className="inline-flex items-center text-xs font-bold text-[#020E26] group-hover:text-[#E5A93C] transition-colors"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            {/* Card 4: System Integration */}
            <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-xl hover:border-[#E5A93C]/50 transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div className="aspect-[16/10] w-full overflow-hidden bg-slate-100 relative">
                  <img
                    src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80"
                    alt="System Integration"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 w-9 h-9 rounded-lg bg-[#000B1E] flex items-center justify-center text-white shadow-md">
                    <Settings className="w-4 h-4 text-[#E5A93C]" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-base sm:text-lg font-bold text-[#020E26] group-hover:text-[#E5A93C] transition-colors mb-2">
                    System Integration
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed mb-4">
                    Integrate with ERP, CRM, HRMS and third-party systems for seamless operations.
                  </p>
                </div>
              </div>
              <div className="p-6 pt-0">
                <Link
                  to="/contact"
                  className="inline-flex items-center text-xs font-bold text-[#020E26] group-hover:text-[#E5A93C] transition-colors"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            {/* Card 5: AI-Powered Solutions */}
            <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-xl hover:border-[#E5A93C]/50 transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div className="aspect-[16/10] w-full overflow-hidden bg-slate-100 relative">
                  <img
                    src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80"
                    alt="AI-Powered Solutions"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 w-9 h-9 rounded-lg bg-[#000B1E] flex items-center justify-center text-white shadow-md">
                    <Cpu className="w-4 h-4 text-[#E5A93C]" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-base sm:text-lg font-bold text-[#020E26] group-hover:text-[#E5A93C] transition-colors mb-2">
                    AI-Powered Solutions
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed mb-4">
                    Intelligent automation, analytics and AI-driven business applications.
                  </p>
                </div>
              </div>
              <div className="p-6 pt-0">
                <Link
                  to="/contact"
                  className="inline-flex items-center text-xs font-bold text-[#020E26] group-hover:text-[#E5A93C] transition-colors"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            {/* Card 6: Enterprise Support & Maintenance */}
            <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-xl hover:border-[#E5A93C]/50 transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div className="aspect-[16/10] w-full overflow-hidden bg-slate-100 relative">
                  <img
                    src="https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=600&q=80"
                    alt="Enterprise Support & Maintenance"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 w-9 h-9 rounded-lg bg-[#000B1E] flex items-center justify-center text-white shadow-md">
                    <ShieldCheck className="w-4 h-4 text-[#E5A93C]" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-base sm:text-lg font-bold text-[#020E26] group-hover:text-[#E5A93C] transition-colors mb-2">
                    Enterprise Support & Maintenance
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed mb-4">
                    Reliable support, upgrades and continuous improvements.
                  </p>
                </div>
              </div>
              <div className="p-6 pt-0">
                <Link
                  to="/contact"
                  className="inline-flex items-center text-xs font-bold text-[#020E26] group-hover:text-[#E5A93C] transition-colors"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 4. OUR PROCESS: 6-STEP PROVEN APPROACH */}
      {/* ========================================================= */}
      <section className="py-16 sm:py-24 bg-white border-b border-slate-100">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
          <div className="mb-12">
            <span className="heading-eyebrow block">
              OUR DEVELOPMENT PROCESS
            </span>
            <h2 className="text-2xl sm:text-4xl font-light text-[#020E26] mt-2">
              A Proven Approach to <br />
              <span className="font-semibold text-[#020E26]">Deliver Success</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 relative">
            {[
              { step: '01', title: 'Discover', desc: 'Understand your goals and requirements.' },
              { step: '02', title: 'Plan', desc: 'Define strategy, roadmap and architecture.' },
              { step: '03', title: 'Design', desc: 'Create intuitive UI/UX and system design.' },
              { step: '04', title: 'Develop', desc: 'Build with agile methodology and best practices.' },
              { step: '05', title: 'Deploy', desc: 'Launch and integrate with your environment.' },
              { step: '06', title: 'Support', desc: 'Ongoing support and continuous improvement.' },
            ].map((p, idx) => (
              <div
                key={p.step}
                className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between relative group hover:border-[#E5A93C]/40 hover:shadow-md transition-all"
              >
                <div>
                  <span className="text-xl font-bold text-slate-300 group-hover:text-[#E5A93C] transition-colors block mb-2">
                    {p.step}
                  </span>
                  <h4 className="text-sm font-bold text-[#020E26] mb-1.5">{p.title}</h4>
                  <p className="text-xs text-slate-500 font-light leading-relaxed">{p.desc}</p>
                </div>

                {idx < 5 && (
                  <div className="hidden lg:flex absolute -right-3.5 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-white border border-slate-200 items-center justify-center text-slate-400">
                    <ArrowRight className="w-3 h-3" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 5. TECHNOLOGIES WE WORK WITH */}
      {/* ========================================================= */}
      <section className="py-16 sm:py-20 bg-slate-50/50 border-b border-slate-100">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
          <div className="mb-10 text-center max-w-xl mx-auto">
            <span className="heading-eyebrow block">
              TECHNOLOGIES WE WORK WITH
            </span>
            <h2 className="text-2xl sm:text-3xl font-light text-[#020E26] mt-1.5">
              Modern Technologies <br />
              <span className="font-semibold text-[#020E26]">for Modern Enterprises</span>
            </h2>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
            {[
              { name: 'Java', src: '/assets/tech/java.svg' },
              { name: '.NET', src: '/assets/tech/dotnet.svg' },
              { name: 'Node.js', src: '/assets/tech/nodejs.svg' },
              { name: 'React', src: '/assets/tech/react.svg' },
              { name: 'Angular', src: '/assets/tech/angular.svg' },
              { name: 'Python', src: '/assets/tech/python.svg' },
              { name: 'AWS', src: '/assets/tech/aws.svg' },
              { name: 'Microsoft Azure', src: '/assets/tech/azure.svg' },
              { name: 'Google Cloud', src: '/assets/tech/gcp.svg' },
              { name: 'PostgreSQL', src: '/assets/tech/postgresql.svg' },
              { name: 'MongoDB', src: '/assets/tech/mongodb.svg' },
              { name: 'Docker', src: '/assets/tech/docker.svg' },
            ].map((tech) => (
              <div
                key={tech.name}
                className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex flex-col items-center justify-center text-center hover:border-slate-300 hover:shadow-md transition-all gap-2"
              >
                <img src={tech.src} alt={tech.name} className="h-8 w-auto object-contain" />
                <span className="text-xs font-semibold text-slate-700">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 6. WHY CHOOSE PRABHA TECH (6 Key Benefits) */}
      {/* ========================================================= */}
      <section className="py-16 sm:py-24 bg-white border-b border-slate-100">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
          <div className="mb-12">
            <span className="heading-eyebrow block">
              KEY BENEFITS
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#020E26] mt-1.5">
              Why Choose Prabha Tech
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5">
            {[
              { icon: <TrendingUp className="w-5 h-5 text-blue-600" />, title: 'Scalable Solutions', sub: 'Grow with your business' },
              { icon: <Zap className="w-5 h-5 text-blue-600" />, title: 'Enhanced Efficiency', sub: 'Automate and optimize' },
              { icon: <LineChart className="w-5 h-5 text-blue-600" />, title: 'Better Decision Making', sub: 'Data-driven insights' },
              { icon: <ShieldCheck className="w-5 h-5 text-blue-600" />, title: 'Secure & Reliable', sub: 'Enterprise-grade security' },
              { icon: <DollarSign className="w-5 h-5 text-blue-600" />, title: 'Cost Effective', sub: 'Maximum ROI' },
              { icon: <Headphones className="w-5 h-5 text-blue-600" />, title: 'Dedicated Support', sub: 'Long-term partnership' },
            ].map((b, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-white border border-slate-200/80 p-5 flex flex-col items-center text-center hover:border-slate-300 hover:shadow-md transition-all duration-200"
              >
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center mb-3">
                  {b.icon}
                </div>
                <span className="text-xs font-bold text-[#020E26]">{b.title}</span>
                <span className="text-[11px] text-slate-500 font-light mt-0.5">{b.sub}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 7. REAL PROJECTS. REAL IMPACT. (Case Studies Preview) */}
      {/* ========================================================= */}
      <section className="py-16 sm:py-24 bg-slate-50/60 border-b border-slate-100">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 pb-4 border-b border-slate-200/80">
            <div>
              <span className="heading-eyebrow block">
                SUCCESS STORIES
              </span>
              <h2 className="text-2xl sm:text-3xl font-light text-[#020E26] mt-1">
                Real Projects. <span className="font-semibold text-[#020E26]">Real Impact.</span>
              </h2>
            </div>
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#020E26] hover:text-[#E5A93C] transition-colors"
            >
              <span>View All Case Studies</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Case Study 1 */}
            <Link
              to="/portfolio"
              className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <div className="aspect-[16/10] w-full overflow-hidden bg-slate-100 relative">
                  <img
                    src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=600&q=80"
                    alt="HRMS Platform"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h4 className="text-base font-bold text-[#020E26] group-hover:text-[#E5A93C] transition-colors mb-1">
                    HRMS Platform
                  </h4>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                    Enterprise Software
                  </span>
                  <p className="text-xs text-slate-500 font-light leading-relaxed">
                    Complete HRMS with payroll, attendance and multi-branch support.
                  </p>
                </div>
              </div>
              <div className="p-6 pt-0 flex justify-end">
                <div className="w-7 h-7 rounded-full bg-[#020E26] text-white flex items-center justify-center group-hover:bg-[#E5A93C] group-hover:text-[#000B1E] transition-colors">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </Link>

            {/* Case Study 2 */}
            <Link
              to="/portfolio"
              className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <div className="aspect-[16/10] w-full overflow-hidden bg-slate-100 relative">
                  <img
                    src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=600&q=80"
                    alt="Industrial BEMS"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h4 className="text-base font-bold text-[#020E26] group-hover:text-[#E5A93C] transition-colors mb-1">
                    Industrial BEMS
                  </h4>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                    IoT & Automation
                  </span>
                  <p className="text-xs text-slate-500 font-light leading-relaxed">
                    Real-time building management and energy optimization.
                  </p>
                </div>
              </div>
              <div className="p-6 pt-0 flex justify-end">
                <div className="w-7 h-7 rounded-full bg-[#020E26] text-white flex items-center justify-center group-hover:bg-[#E5A93C] group-hover:text-[#000B1E] transition-colors">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </Link>

            {/* Case Study 3 */}
            <Link
              to="/portfolio"
              className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <div className="aspect-[16/10] w-full overflow-hidden bg-slate-100 relative">
                  <img
                    src="https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=600&q=80"
                    alt="Procurement Platform"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h4 className="text-base font-bold text-[#020E26] group-hover:text-[#E5A93C] transition-colors mb-1">
                    Procurement Platform
                  </h4>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                    Supply Chain
                  </span>
                  <p className="text-xs text-slate-500 font-light leading-relaxed">
                    End-to-end procurement solution connecting buyers and suppliers.
                  </p>
                </div>
              </div>
              <div className="p-6 pt-0 flex justify-end">
                <div className="w-7 h-7 rounded-full bg-[#020E26] text-white flex items-center justify-center group-hover:bg-[#E5A93C] group-hover:text-[#000B1E] transition-colors">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 8. EXECUTIVE CTA BANNER ("Ready to Build Your Enterprise Solution?") */}
      {/* ========================================================= */}
      <section className="relative py-20 bg-[#000B1E] text-white overflow-hidden">
        {/* Right Dubai Night Skyline */}
        <div 
          className="absolute right-0 top-0 bottom-0 w-full lg:w-[60%] z-0 pointer-events-none overflow-hidden"
          style={{
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 50%)',
            maskImage: 'linear-gradient(to right, transparent 0%, black 50%)',
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1600&q=85"
            alt="Dubai Skyline Night"
            className="w-full h-full object-cover object-bottom opacity-45"
          />
        </div>

        <div className="relative z-10 max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-4">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#E5A93C]">
                LET’S BUILD TOGETHER
              </span>
              <h2 className="text-2xl sm:text-4xl font-light text-white leading-tight">
                Ready to Build Your <br />
                <span className="font-semibold text-white">Enterprise Solution?</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 font-light max-w-lg leading-relaxed">
                Partner with Prabha Technologies to turn your ideas into scalable, secure and high-performance enterprise software.
              </p>
              <div className="pt-2">
                <BrandButton to="/contact" variant="gold" size="md">
                  Let’s Talk
                </BrandButton>
              </div>
            </div>

            {/* Right Mini Stat Strip */}
            <div className="lg:col-span-5 flex flex-wrap items-center gap-4 lg:justify-end">
              <div className="rounded-xl bg-white/10 backdrop-blur-md px-4 py-3 border border-white/10 text-center min-w-[90px]">
                <Layers className="w-4 h-4 text-[#E5A93C] mx-auto mb-1" />
                <span className="text-base font-bold text-white block">100+</span>
                <span className="text-[10px] text-slate-300 uppercase">Projects</span>
              </div>

              <div className="rounded-xl bg-white/10 backdrop-blur-md px-4 py-3 border border-white/10 text-center min-w-[90px]">
                <Users2 className="w-4 h-4 text-[#E5A93C] mx-auto mb-1" />
                <span className="text-base font-bold text-white block">35+</span>
                <span className="text-[10px] text-slate-300 uppercase">Professionals</span>
              </div>

              <div className="rounded-xl bg-white/10 backdrop-blur-md px-4 py-3 border border-white/10 text-center min-w-[90px]">
                <Award className="w-4 h-4 text-[#E5A93C] mx-auto mb-1" />
                <span className="text-base font-bold text-white block">100%</span>
                <span className="text-[10px] text-slate-300 uppercase">Success Rate</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
