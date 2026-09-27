import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  CheckCircle2,
  Cpu,
  Brain,
  BarChart3,
  Bot,
  Database,
  Eye,
  MessageSquareCode,
  Sparkles,
  TrendingUp,
  Search,
  Filter,
  Layers,
  Rocket,
  LineChart,
  ShieldCheck,
  Zap,
  DollarSign,
  Target,
  Award,
  Globe2,
  Users2,
  ThumbsUp,
  ExternalLink,
  ChevronRight,
  Binary,
  Compass,
} from 'lucide-react';
import { BrandButton } from '../components/common/BrandButton';

export const AiAnalyticsPage: React.FC = () => {
  // 5-Pillar Hero Service Bar
  const heroFeatures = [
    { label: 'Predictive Insights', sub: 'Anticipate trends & risks', icon: <TrendingUp className="w-4 h-4 text-[#E5A93C]" /> },
    { label: 'Process Automation', sub: 'Reduce manual effort', icon: <Zap className="w-4 h-4 text-[#E5A93C]" /> },
    { label: 'Data Integration', sub: 'Unify all your data sources', icon: <Database className="w-4 h-4 text-[#E5A93C]" /> },
    { label: 'AI Model Development', sub: 'Custom AI for your business', icon: <Brain className="w-4 h-4 text-[#E5A93C]" /> },
    { label: 'Real-time Analytics', sub: 'Make faster decisions', icon: <BarChart3 className="w-4 h-4 text-[#E5A93C]" /> },
  ];

  // 6-Pillar Solutions Cards (2x3 Grid matching Screenshot)
  const solutions = [
    {
      id: 'bi-analytics',
      title: 'Business Intelligence & Analytics',
      badgeIcon: <BarChart3 className="w-4 h-4 text-white" />,
      badgeBg: 'bg-[#020E26]',
      desc: 'Interactive dashboards and real-time analytics to track performance and drive growth.',
      img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'ai-ml',
      title: 'AI & Machine Learning Solutions',
      badgeIcon: <Brain className="w-4 h-4 text-white" />,
      badgeBg: 'bg-[#6366f1]',
      desc: 'Custom AI models for prediction, classification, and intelligent automation.',
      img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'intelligent-automation',
      title: 'Intelligent Automation',
      badgeIcon: <Zap className="w-4 h-4 text-white" />,
      badgeBg: 'bg-[#0284c7]',
      desc: 'Automate business processes using AI, RPA and intelligent workflows.',
      img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'data-engineering',
      title: 'Data Engineering & Integration',
      badgeIcon: <Database className="w-4 h-4 text-white" />,
      badgeBg: 'bg-[#0369a1]',
      desc: 'Collect, clean, transform and integrate data from multiple sources.',
      img: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'computer-vision',
      title: 'Computer Vision Solutions',
      badgeIcon: <Eye className="w-4 h-4 text-white" />,
      badgeBg: 'bg-[#0f172a]',
      desc: 'AI-powered image and video analysis for real-world applications.',
      img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'nlp',
      title: 'Natural Language Processing',
      badgeIcon: <Bot className="w-4 h-4 text-white" />,
      badgeBg: 'bg-[#020E26]',
      desc: 'Build chatbots, document intelligence and language models for smarter interactions.',
      img: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80',
    },
  ];

  // 6 Industries We Serve
  const industries = [
    {
      title: 'Manufacturing',
      desc: 'Predictive maintenance & quality control.',
      img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80',
    },
    {
      title: 'Retail & E-commerce',
      desc: 'Customer insights & demand forecasting.',
      img: 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=600&q=80',
    },
    {
      title: 'Finance & Banking',
      desc: 'Risk analysis & fraud detection.',
      img: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=600&q=80',
    },
    {
      title: 'Healthcare',
      desc: 'Patient analytics & operational efficiency.',
      img: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80',
    },
    {
      title: 'Real Estate',
      desc: 'Market analysis & smart building insights.',
      img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80',
    },
    {
      title: 'Logistics & Transport',
      desc: 'Route optimization & fleet analytics.',
      img: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80',
    },
  ];

  // 5-Step Process: From Data to Business Impact
  const steps = [
    {
      step: '01',
      title: 'Discover',
      desc: 'Understand your goals and data sources.',
      icon: <Search className="w-4 h-4 text-[#020E26]" />,
    },
    {
      step: '02',
      title: 'Prepare',
      desc: 'Clean, integrate and structure your data.',
      icon: <Filter className="w-4 h-4 text-[#020E26]" />,
    },
    {
      step: '03',
      title: 'Build',
      desc: 'Develop AI models and analytics solutions.',
      icon: <Layers className="w-4 h-4 text-[#020E26]" />,
    },
    {
      step: '04',
      title: 'Deploy',
      desc: 'Implement and integrate into your systems.',
      icon: <Rocket className="w-4 h-4 text-[#020E26]" />,
    },
    {
      step: '05',
      title: 'Measure',
      desc: 'Track performance and optimize continuously.',
      icon: <LineChart className="w-4 h-4 text-[#020E26]" />,
    },
  ];

  // Technologies We Use
  const techStack = [
    { name: 'Python', icon: '/assets/tech/python.svg' },
    { name: 'TensorFlow', icon: '/assets/tech/tensorflow.svg' },
    { name: 'PyTorch', icon: '/assets/tech/pytorch.svg' },
    { name: 'Apache Spark', icon: '/assets/tech/python.svg' },
    { name: 'Databricks', icon: '/assets/tech/databricks.svg' },
    { name: 'Snowflake', icon: '/assets/tech/snowflake.svg' },
    { name: 'Power BI', icon: '/assets/tech/powerbi.svg' },
    { name: 'Google Cloud', icon: '/assets/tech/gcp.svg' },
    { name: 'AWS Cloud', icon: '/assets/tech/aws.svg' },
    { name: 'PostgreSQL', icon: '/assets/tech/postgresql.svg' },
  ];

  // 6 Key Benefits
  const keyBenefits = [
    {
      title: 'Better Decision Making',
      desc: 'Make data-backed decisions with real-time analytics.',
      icon: <Target className="w-5 h-5 text-[#E5A93C]" />,
    },
    {
      title: 'Increased Efficiency',
      desc: 'Automate manual processes and reduce human errors.',
      icon: <Zap className="w-5 h-5 text-[#E5A93C]" />,
    },
    {
      title: 'Cost Optimization',
      desc: 'Identify bottlenecks and optimize resource spending.',
      icon: <DollarSign className="w-5 h-5 text-[#E5A93C]" />,
    },
    {
      title: 'Accurate Forecasting',
      desc: 'Predict demands and operational risks with precision.',
      icon: <LineChart className="w-5 h-5 text-[#E5A93C]" />,
    },
    {
      title: 'Scalable Solutions',
      desc: 'Architectures engineered to grow with your data volume.',
      icon: <Layers className="w-5 h-5 text-[#E5A93C]" />,
    },
    {
      title: 'Competitive Advantage',
      desc: 'Stay ahead in the market through intelligent differentiation.',
      icon: <Award className="w-5 h-5 text-[#E5A93C]" />,
    },
  ];

  // Success Stories (3 Cards)
  const successStories = [
    {
      title: 'Manufacturing Plant',
      desc: 'Predictive maintenance solution reduced unexpected downtime by 40%.',
      img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
      link: '/portfolio/industrial-iot-bems',
    },
    {
      title: 'Retail Chain',
      desc: 'AI demand forecasting improved multi-warehouse inventory accuracy by 35%.',
      img: 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=800&q=80',
      link: '/portfolio/smart-procurement-system',
    },
    {
      title: 'Healthcare Provider',
      desc: 'Patient analytics platform enhanced operational room efficiency by 50%.',
      img: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
      link: '/portfolio/enterprise-hrms-suite',
    },
  ];

  return (
    <div className="bg-white text-slate-900 font-sans selection:bg-[#E5A93C]/30">
      {/* ========================================================= */}
      {/* 1. HERO SECTION: Turn Your Data into Smarter Decisions */}
      {/* ========================================================= */}
      <section className="relative pt-36 pb-20 overflow-hidden border-b border-slate-100 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-6">
              <span className="heading-eyebrow block">
                AI & ANALYTICS SOLUTIONS
              </span>
              <h1 className="heading-hero text-[#020E26]">
                Turn Your Data into <br />
                <span className="text-[#E5A93C] font-light">Smarter Decisions</span>
              </h1>
              <p className="text-base text-slate-600 leading-relaxed max-w-lg">
                We build AI-powered and data-driven solutions that help businesses gain actionable insights, automate processes and achieve measurable growth.
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

            {/* Right Visual: High-Tech AI & Analytics Holographic Deck */}
            <div className="lg:col-span-6 relative flex items-center justify-center min-h-[460px]">
              {/* Soft ambient radial backdrop */}
              <div className="absolute w-[460px] h-[460px] rounded-full bg-gradient-to-tr from-[#E5A93C]/10 via-[#6366f1]/10 to-transparent blur-3xl pointer-events-none" />

              {/* Main Futuristic AI Glassmorphism Card */}
              <div className="relative w-full max-w-[540px] rounded-2xl bg-[#000B1E] border border-slate-800 p-6 shadow-2xl overflow-hidden text-white">
                {/* Top Terminal Bar */}
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-4 mb-5">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                    <span className="text-xs font-mono text-slate-400 ml-2">prabhatech.ai // real-time telemetry</span>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    SYSTEM ACTIVE
                  </div>
                </div>

                {/* Split Data Deck Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">
                  {/* Humanoid Robot Visual */}
                  <div className="sm:col-span-5 relative rounded-xl overflow-hidden border border-slate-800 bg-slate-900/60 aspect-[4/5] flex items-center justify-center">
                    <img
                      src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=600&q=80"
                      alt="AI Autonomous Intelligence"
                      className="w-full h-full object-cover opacity-85"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#000B1E] via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3 text-left">
                      <div className="text-[10px] font-mono text-[#E5A93C] font-semibold">AI Neural Core</div>
                      <div className="text-xs font-bold text-white">99.8% Accuracy</div>
                    </div>
                  </div>

                  {/* High-Impact Analytics Metrics */}
                  <div className="sm:col-span-7 space-y-3.5">
                    {/* Revenue Growth Card */}
                    <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5">
                      <div className="flex justify-between items-center text-[11px] text-slate-400 mb-1">
                        <span>Business Growth</span>
                        <span className="text-emerald-400 font-bold">+42%</span>
                      </div>
                      <div className="text-xl font-bold text-white flex items-baseline gap-2">
                        <span>$2.4M</span>
                        <span className="text-[10px] text-slate-500 font-normal">Revenue Uplift</span>
                      </div>
                      <div className="w-full bg-slate-800 rounded-full h-1.5 mt-2 overflow-hidden">
                        <div className="bg-gradient-to-r from-[#E5A93C] to-emerald-400 h-1.5 rounded-full w-[84%]" />
                      </div>
                    </div>

                    {/* Operational Efficiency Card */}
                    <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5">
                      <div className="flex justify-between items-center text-[11px] text-slate-400 mb-1">
                        <span>Operational Efficiency</span>
                        <span className="text-[#E5A93C] font-bold">78%</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2 mt-2 pt-2 border-t border-slate-800/60 text-center">
                        <div>
                          <div className="text-[9px] text-slate-400">Cost Drop</div>
                          <div className="text-xs font-bold text-white">32%</div>
                        </div>
                        <div>
                          <div className="text-[9px] text-slate-400">Productivity</div>
                          <div className="text-xs font-bold text-[#E5A93C]">45%</div>
                        </div>
                        <div>
                          <div className="text-[9px] text-slate-400">Speedup</div>
                          <div className="text-xs font-bold text-emerald-400">68%</div>
                        </div>
                      </div>
                    </div>

                    {/* AI Insights Ticker */}
                    <div className="flex items-center gap-2 p-2 bg-[#E5A93C]/10 border border-[#E5A93C]/30 rounded-lg text-[10px] text-amber-200">
                      <Sparkles className="w-3.5 h-3.5 text-[#E5A93C] shrink-0" />
                      <span>Model dynamically optimizing supply chain across UAE & KSA nodes</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 5-Pillar Hero Summary Strip */}
          <div className="mt-16 pt-8 border-t border-slate-100 grid grid-cols-2 md:grid-cols-5 gap-4">
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
      {/* 2. OUR AI & ANALYTICS SOLUTIONS: 2x3 Grid */}
      {/* ========================================================= */}
      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
            <div>
              <span className="heading-eyebrow block mb-2">
                OUR AI & ANALYTICS SOLUTIONS
              </span>
              <h2 className="heading-section text-[#020E26]">
                End-to-End AI & Analytics Services
              </h2>
            </div>
            <div className="text-sm text-slate-600 max-w-md">
              <p className="mb-2">From data strategy to AI model deployment, we deliver complete AI and analytics solutions tailored to your business goals.</p>
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
      {/* 3. INDUSTRIES WE SERVE: AI & Analytics Across Industries */}
      {/* ========================================================= */}
      <section className="py-24 bg-white border-b border-slate-100">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="heading-eyebrow block mb-3">
              INDUSTRIES WE SERVE
            </span>
            <h2 className="heading-section text-[#020E26]">
              AI & Analytics Across Industries
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
      {/* 4. OUR PROCESS: From Data to Business Impact */}
      {/* ========================================================= */}
      <section className="py-24 bg-slate-50 border-b border-slate-200">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="heading-eyebrow block mb-3">
              OUR PROCESS
            </span>
            <h2 className="heading-section text-[#020E26]">
              From Data to Business Impact
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
      {/* 5. TECHNOLOGIES WE USE */}
      {/* ========================================================= */}
      <section className="py-20 bg-white border-b border-slate-100">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="heading-eyebrow block mb-3">
              TECHNOLOGIES WE USE
            </span>
            <h2 className="heading-section text-[#020E26]">
              Modern AI & Data Engineering Stack
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            {techStack.map((tech, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-slate-50/80 border border-slate-200 hover:border-[#E5A93C]/50 hover:bg-white hover:shadow-md transition-all flex flex-col items-center text-center group"
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
      </section>

      {/* ========================================================= */}
      {/* 6. KEY BENEFITS */}
      {/* ========================================================= */}
      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="heading-eyebrow block mb-3">
              KEY BENEFITS
            </span>
            <h2 className="heading-section text-[#020E26]">
              Transforming Data into Concrete Business Value
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-5">
            {keyBenefits.map((b, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl bg-white border border-slate-200 hover:border-[#E5A93C]/50 hover:shadow-md transition-all flex flex-col items-center text-center group"
              >
                <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center mb-3 group-hover:bg-[#020E26] transition-colors">
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
      {/* 7. SUCCESS STORIES: Real Results with AI & Analytics */}
      {/* ========================================================= */}
      <section className="py-24 bg-white border-b border-slate-100">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
            <div>
              <span className="heading-eyebrow block mb-2">
                SUCCESS STORIES
              </span>
              <h2 className="heading-section text-[#020E26]">
                Real Results with AI & Analytics
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

          {/* 3 Case Study Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {successStories.map((cs, i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:border-[#E5A93C]/50 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="aspect-[16/10] overflow-hidden bg-slate-100 relative">
                    <img 
                      src={cs.img} 
                      alt={cs.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <h4 className="text-base font-bold text-[#020E26] mb-2 group-hover:text-[#E5A93C] transition-colors">
                      {cs.title}
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {cs.desc}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <Link
                    to={cs.link}
                    className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-[#020E26] group-hover:text-[#E5A93C] transition-colors"
                  >
                    <span>Read Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 8. EXECUTIVE CALL TO ACTION BANNER */}
      {/* ========================================================= */}
      <section className="relative py-20 bg-[#000B1E] text-white overflow-hidden border-t border-slate-800">
        {/* Right-anchored Data Control Room Backdrop */}
        <div 
          className="absolute right-0 top-0 bottom-0 w-full lg:w-[60%] z-0 pointer-events-none overflow-hidden"
          style={{
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.2) 20%, rgba(0,0,0,0.7) 48%, black 75%)',
            maskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.2) 20%, rgba(0,0,0,0.7) 48%, black 75%)'
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=85"
            alt="AI Innovation Control Center"
            className="w-full h-full object-cover object-[center_right] opacity-75 scale-100"
          />
        </div>

        <div className="relative z-10 max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 flex flex-col lg:flex-row items-center justify-between gap-10">
          <div className="max-w-xl">
            <span className="heading-eyebrow block mb-2 text-[#E5A93C]">
              LET'S BUILD TOGETHER
            </span>
            <h2 className="heading-section text-white">
              Unlock the Power of Your Data
            </h2>
            <p className="text-sm text-slate-300 mt-2">
              Partner with Prabha Technologies to build AI and analytics solutions that create real business value.
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
              <div className="text-xs font-semibold text-slate-300 mt-1.5">AI & Data Experts</div>
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

export default AiAnalyticsPage;
