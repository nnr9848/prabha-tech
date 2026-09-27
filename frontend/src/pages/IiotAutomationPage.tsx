import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  CheckCircle2,
  Radio,
  Cpu,
  Zap,
  Activity,
  ShieldAlert,
  BarChart3,
  Sliders,
  Settings,
  Server,
  Cloud,
  Layers,
  Monitor,
  Smartphone,
  Gauge,
  Factory,
  Flame,
  UtilityPole,
  HardHat,
  Building2,
  Truck,
  LineChart,
  Leaf,
  Clock,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';
import { BrandButton } from '../components/common/BrandButton';

export const IiotAutomationPage: React.FC = () => {
  // 6-Pillar Hero Service Bar
  const heroFeatures = [
    { label: 'Real-time Monitoring', sub: 'Live equipment data', icon: <Activity className="w-4 h-4 text-[#E5A93C]" /> },
    { label: 'Predictive Maintenance', sub: 'AI-driven insights', icon: <Cpu className="w-4 h-4 text-[#E5A93C]" /> },
    { label: 'Energy Management', sub: 'Reduce operational cost', icon: <Zap className="w-4 h-4 text-[#E5A93C]" /> },
    { label: 'Remote Operations', sub: 'Control from anywhere', icon: <Radio className="w-4 h-4 text-[#E5A93C]" /> },
    { label: 'Process Automation', sub: 'Higher productivity', icon: <Sliders className="w-4 h-4 text-[#E5A93C]" /> },
    { label: 'Data Analytics', sub: 'Actionable intelligence', icon: <BarChart3 className="w-4 h-4 text-[#E5A93C]" /> },
  ];

  // 6-Pillar Solutions Cards (2x3 Grid matching Screenshot)
  const solutions = [
    {
      id: 'smart-asset-monitoring',
      title: 'Smart Asset Monitoring',
      badgeIcon: <Activity className="w-4 h-4 text-white" />,
      badgeBg: 'bg-[#020E26]',
      desc: 'Real-time monitoring of critical assets and equipment health.',
      img: '/assets/images/indistrial-iot.jpg',
    },
    {
      id: 'predictive-maintenance',
      title: 'Predictive Maintenance',
      badgeIcon: <Cpu className="w-4 h-4 text-white" />,
      badgeBg: 'bg-[#0284c7]',
      desc: 'AI-powered analytics to predict failures and reduce downtime.',
      img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'energy-management',
      title: 'Energy Management',
      badgeIcon: <Zap className="w-4 h-4 text-white" />,
      badgeBg: 'bg-[#0369a1]',
      desc: 'Monitor, analyze and optimize energy consumption across facilities.',
      img: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'process-automation',
      title: 'Process Automation',
      badgeIcon: <Sliders className="w-4 h-4 text-white" />,
      badgeBg: 'bg-[#020E26]',
      desc: 'Automate industrial processes with smart control systems.',
      img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'safety-compliance',
      title: 'Safety & Compliance',
      badgeIcon: <ShieldAlert className="w-4 h-4 text-white" />,
      badgeBg: 'bg-[#0f172a]',
      desc: 'Ensure workplace safety with real-time alerts, sensors and compliance tracking.',
      img: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'data-analytics-reporting',
      title: 'Data Analytics & Reporting',
      badgeIcon: <BarChart3 className="w-4 h-4 text-white" />,
      badgeBg: 'bg-[#020E26]',
      desc: 'Turn operational data into actionable insights with advanced analytics.',
      img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    },
  ];

  // 6 Industries We Serve
  const industries = [
    {
      title: 'Manufacturing',
      desc: 'Smart factories & production.',
      img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80',
      icon: <Factory className="w-3.5 h-3.5 text-[#E5A93C]" />,
    },
    {
      title: 'Oil & Gas',
      desc: 'Upstream, midstream & downstream.',
      img: '/assets/images/indistrial-iot.jpg',
      icon: <Flame className="w-3.5 h-3.5 text-[#E5A93C]" />,
    },
    {
      title: 'Power & Utilities',
      desc: 'Smart grids & energy management.',
      img: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=600&q=80',
      icon: <UtilityPole className="w-3.5 h-3.5 text-[#E5A93C]" />,
    },
    {
      title: 'Construction',
      desc: 'Equipment monitoring & site automation.',
      img: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=600&q=80',
      icon: <HardHat className="w-3.5 h-3.5 text-[#E5A93C]" />,
    },
    {
      title: 'Real Estate',
      desc: 'Smart buildings & facility automation.',
      img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80',
      icon: <Building2 className="w-3.5 h-3.5 text-[#E5A93C]" />,
    },
    {
      title: 'Logistics & Transport',
      desc: 'Fleet management & asset tracking.',
      img: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80',
      icon: <Truck className="w-3.5 h-3.5 text-[#E5A93C]" />,
    },
  ];

  // 4-Stage Architecture Pipeline
  const architectureStages = [
    {
      title: 'Sensors & Devices',
      items: [
        { label: 'Industrial Machines', icon: <Factory className="w-3.5 h-3.5" /> },
        { label: 'PLC & Controllers', icon: <Sliders className="w-3.5 h-3.5" /> },
        { label: 'Energy Meters', icon: <Gauge className="w-3.5 h-3.5" /> },
        { label: 'CCTV / IoT Nodes', icon: <Radio className="w-3.5 h-3.5" /> },
      ],
    },
    {
      title: 'Edge Gateway',
      items: [
        { label: 'Data Collection' },
        { label: 'Local Processing' },
        { label: 'Edge Filtering' },
        { label: 'Secure Transmission' },
      ],
      isGatewayCard: true,
    },
    {
      title: 'Cloud Platform',
      items: [
        { label: 'Data Lake / Storage' },
        { label: 'AI Analytics Engine' },
        { label: 'Device Management' },
        { label: 'Rules & Alerts Engine' },
      ],
      isCloudCard: true,
    },
    {
      title: 'Applications',
      items: [
        { label: 'Web Scada Dashboard' },
        { label: 'Mobile Ops App' },
        { label: 'Real-time Alerts & SMS' },
        { label: 'ERP / SAP Integration' },
      ],
      isAppCard: true,
    },
  ];

  // Key Benefits Stats
  const keyBenefits = [
    { stat: '30%', label: 'Lower Operational Costs', icon: <Clock className="w-4 h-4 text-[#E5A93C]" /> },
    { stat: '50%', label: 'Reduced Downtime', icon: <Sliders className="w-4 h-4 text-[#E5A93C]" /> },
    { stat: '20%', label: 'Higher Productivity', icon: <TrendingUp className="w-4 h-4 text-[#E5A93C]" /> },
    { stat: '100%', label: 'Real-time Visibility', icon: <Activity className="w-4 h-4 text-[#E5A93C]" /> },
    { stat: 'Improved', label: 'Safety & Compliance', icon: <ShieldAlert className="w-4 h-4 text-[#E5A93C]" /> },
    { stat: 'Sustainable', label: '& Energy Efficient', icon: <Leaf className="w-4 h-4 text-[#E5A93C]" /> },
  ];

  return (
    <div className="bg-white text-slate-900 font-sans selection:bg-[#E5A93C]/30">
      {/* ========================================================= */}
      {/* 1. HERO SECTION: Connect. Monitor. Automate. Optimize. */}
      {/* ========================================================= */}
      <section className="relative pt-36 pb-20 overflow-hidden border-b border-slate-100 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-6">
              <span className="heading-eyebrow block">
                IIOT AUTOMATION
              </span>
              <h1 className="heading-hero text-[#020E26]">
                Connect. Monitor. <br />
                <span className="text-[#E5A93C] font-light">Automate. Optimize.</span>
              </h1>
              <p className="text-base text-slate-600 leading-relaxed max-w-lg">
                End-to-end Industrial IoT and automation solutions to make your operations smarter, safer and more efficient.
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <BrandButton to="/contact" variant="gold" size="lg">
                  Get a Consultation
                </BrandButton>
                <BrandButton to="/portfolio" variant="dark" size="lg">
                  View Use Cases
                </BrandButton>
              </div>
            </div>

            {/* Right Visual: Industrial Plant with Floating IIoT Dashboard */}
            <div className="lg:col-span-6 relative flex items-center justify-center min-h-[460px]">
              <div className="absolute w-[460px] h-[460px] rounded-full bg-gradient-to-tr from-[#E5A93C]/10 via-[#0ea5e9]/10 to-transparent blur-3xl pointer-events-none" />

              {/* Main Plant + Floating SCADA Dashboard composite */}
              <div className="relative w-full max-w-[540px] rounded-2xl bg-[#000B1E] border border-slate-800 p-3 sm:p-5 shadow-2xl overflow-hidden text-white">
                {/* Background Plant Image */}
                <div className="relative aspect-[16/10] rounded-xl overflow-hidden border border-slate-800 bg-slate-950">
                  <img
                    src="/assets/images/indistrial-iot.jpg"
                    alt="Industrial Plant IIoT Automation"
                    className="w-full h-full object-cover opacity-60"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#000B1E] via-transparent to-transparent" />

                  {/* High-Tech Overlay Telemetry Header */}
                  <div className="absolute top-3 left-3 right-3 flex justify-between items-center bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700/60">
                    <div className="flex items-center gap-2 text-[10px] font-mono text-slate-300">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span>PLANT SCADA // ONLINE</span>
                    </div>
                    <div className="text-[10px] font-bold text-[#E5A93C]">245 SENSORS ACTIVE</div>
                  </div>

                  {/* Floating IIoT Dashboard Widget Card */}
                  <div className="absolute bottom-3 right-3 left-3 sm:left-auto sm:w-[280px] bg-slate-900/90 backdrop-blur-md border border-slate-700/80 rounded-xl p-3.5 shadow-2xl">
                    <div className="flex justify-between items-center text-[10px] text-slate-400 border-b border-slate-800 pb-2 mb-2">
                      <span className="font-semibold text-white">IIoT Live Monitoring</span>
                      <span className="text-emerald-400 font-bold">99.9% Uptime</span>
                    </div>

                    <div className="flex items-center justify-between gap-4">
                      {/* Radial Gauge */}
                      <div className="relative w-16 h-16 rounded-full border-4 border-[#0284c7] border-t-emerald-400 flex flex-col items-center justify-center shrink-0">
                        <span className="text-xs font-bold text-white leading-none">85%</span>
                        <span className="text-[8px] text-slate-400 mt-0.5">OEE</span>
                      </div>
                      <div className="space-y-1 text-[10px]">
                        <div className="flex justify-between gap-3 text-slate-300">
                          <span>Overall Equipment</span>
                          <span className="text-white font-bold">Good</span>
                        </div>
                        <div className="flex justify-between gap-3 text-slate-300">
                          <span>Power Factor</span>
                          <span className="text-[#E5A93C] font-bold">0.98</span>
                        </div>
                        <div className="flex justify-between gap-3 text-slate-300">
                          <span>Predictive Alarms</span>
                          <span className="text-emerald-400 font-bold">0 Active</span>
                        </div>
                      </div>
                    </div>
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
      {/* 2. OUR IIOT SOLUTIONS: 2x3 Grid */}
      {/* ========================================================= */}
      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
            <div>
              <span className="heading-eyebrow block mb-2">
                OUR IIOT SOLUTIONS
              </span>
              <h2 className="heading-section text-[#020E26]">
                Building Intelligent Industrial Operations
              </h2>
            </div>
            <div className="text-sm text-slate-600 max-w-md">
              <p className="mb-2">We design and deliver IIoT and automation solutions that connect your machines, people and processes, enabling real-time visibility, automation, and data-driven decision making.</p>
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
      {/* 3. INDUSTRIES WE SERVE: IIoT Solutions for Every Industry */}
      {/* ========================================================= */}
      <section className="py-24 bg-white border-b border-slate-100">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
            <div>
              <span className="heading-eyebrow block mb-2">
                INDUSTRIES WE SERVE
              </span>
              <h2 className="heading-section text-[#020E26]">
                IIoT Solutions for Every Industry
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed max-w-lg mt-2">
                Our IIoT and automation solutions are designed to meet the unique needs of various industries, enabling smarter and more sustainable operations.
              </p>
            </div>
            <BrandButton to="/industries" variant="gold" size="md">
              Explore Industries
            </BrandButton>
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
                    <div className="flex items-center gap-1.5 mb-1.5">
                      {ind.icon}
                      <h4 className="text-xs font-bold text-[#020E26] group-hover:text-[#E5A93C] transition-colors">
                        {ind.title}
                      </h4>
                    </div>
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
      {/* 4. HOW IT WORKS: Our IIoT Architecture */}
      {/* ========================================================= */}
      <section className="py-24 bg-slate-50 border-b border-slate-200">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="heading-eyebrow block mb-2">
                HOW IT WORKS
              </span>
              <h2 className="heading-section text-[#020E26]">
                Our IIoT Architecture
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed max-w-lg mt-2">
                A scalable, secure and flexible architecture designed to collect, analyze and deliver real-time data from your industrial assets.
              </p>
            </div>
            <BrandButton to="/contact" variant="dark" size="md">
              View Technical Details
            </BrandButton>
          </div>

          {/* 4-Stage Architecture Diagram */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {architectureStages.map((stage, i) => (
              <div
                key={i}
                className="relative bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-between shadow-sm hover:shadow-lg transition-all"
              >
                <div>
                  <div className="text-sm font-bold text-[#020E26] border-b border-slate-100 pb-3 mb-4">
                    {stage.title}
                  </div>

                  {/* Visual content for each stage */}
                  <div className="space-y-3">
                    {stage.items.map((item, idx) => {
                      const hasIcon = 'icon' in item && Boolean(item.icon);
                      return (
                        <div key={idx} className="flex items-center gap-2.5 text-xs text-slate-700">
                          {hasIcon ? (
                            <div className="w-6 h-6 rounded bg-slate-100 flex items-center justify-center text-slate-700 shrink-0">
                              {(item as { label: string; icon?: React.ReactNode }).icon}
                            </div>
                          ) : (
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#E5A93C] shrink-0" />
                          )}
                          <span>{item.label}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Arrow connector */}
                {i < 3 && (
                  <div className="hidden lg:block absolute -right-3.5 top-1/2 -translate-y-1/2 z-10 text-slate-300 font-bold text-lg">
                    →
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 5. KEY BENEFITS: Performance Metrics */}
      {/* ========================================================= */}
      <section className="py-20 bg-white border-b border-slate-100">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="heading-eyebrow block mb-3">
              KEY BENEFITS
            </span>
            <h2 className="heading-section text-[#020E26]">
              Measurable Operational Impact
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5">
            {keyBenefits.map((b, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl bg-slate-50/80 border border-slate-200 hover:border-[#E5A93C]/50 hover:bg-white hover:shadow-md transition-all flex flex-col items-center text-center group"
              >
                <div className="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center mb-3 group-hover:bg-[#020E26] transition-colors shadow-xs">
                  {b.icon}
                </div>
                <div className="text-2xl font-light text-[#020E26] group-hover:text-[#E5A93C] transition-colors font-mono">
                  {b.stat}
                </div>
                <div className="text-[11px] text-slate-600 font-medium mt-1">
                  {b.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 6. CASE STUDY & EXECUTIVE CTA SPLIT BANNER */}
      {/* ========================================================= */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left Card: Featured Case Study */}
            <div className="lg:col-span-6 rounded-2xl bg-[#000B1E] text-white p-7 sm:p-9 border border-slate-800 flex flex-col justify-between overflow-hidden relative">
              <div 
                className="absolute inset-0 z-0 pointer-events-none opacity-20"
                style={{
                  backgroundImage: 'url(/assets/images/indistrial-iot.jpg)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />

              <div className="relative z-10">
                <span className="heading-eyebrow block mb-3 text-[#E5A93C]">
                  FEATURED CASE STUDY
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
                  AI-Powered Monitoring for a Leading Manufacturing Plant
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-md">
                  Implemented IIoT solution for real-time equipment monitoring and predictive maintenance, resulting in 30% reduction in downtime and 20% increase in operational efficiency.
                </p>
              </div>

              <div className="relative z-10 pt-8">
                <BrandButton to="/portfolio/industrial-iot-bems" variant="gold" size="md">
                  Read Full Case Study
                </BrandButton>
              </div>
            </div>

            {/* Right Card: Executive CTA Consultation */}
            <div className="lg:col-span-6 rounded-2xl bg-white border border-slate-200 p-7 sm:p-9 flex flex-col justify-between shadow-sm hover:shadow-lg transition-all relative overflow-hidden">
              <div>
                <span className="heading-eyebrow block mb-3 text-[#E5A93C]">
                  LET'S BUILD TOGETHER
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-[#020E26] mb-3">
                  Ready to Transform Your Industrial Operations?
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-md">
                  Partner with Prabha Technologies to design and deploy custom IIoT and automation solutions for your business.
                </p>
              </div>

              <div className="pt-8">
                <BrandButton to="/contact" variant="dark" size="md">
                  Schedule a Consultation
                </BrandButton>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default IiotAutomationPage;
