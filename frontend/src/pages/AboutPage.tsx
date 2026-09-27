import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Target,
  Eye,
  Award,
  ArrowRight,
  Code2,
  Smartphone,
  Sparkles,
  Cpu,
  Cloud,
  Headphones,
  Users2,
  BookOpen,
  TrendingUp,
  Laptop2,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Building2,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { BrandButton } from '../components/common/BrandButton';

export const AboutPage: React.FC = () => {
  const milestones = [
    {
      year: '2014',
      title: 'Founded',
      desc: 'with 2 employees',
      icon: <Users2 className="w-5 h-5 text-[#E5A93C]" />,
    },
    {
      year: '2016',
      title: 'First major',
      desc: 'client in GCC',
      icon: <Award className="w-5 h-5 text-[#E5A93C]" />,
    },
    {
      year: '2018',
      title: 'Expanded',
      desc: 'team & services',
      icon: <TrendingUp className="w-5 h-5 text-[#E5A93C]" />,
    },
    {
      year: '2021',
      title: '100+ projects',
      desc: 'delivered',
      icon: <ShieldCheck className="w-5 h-5 text-[#E5A93C]" />,
    },
    {
      year: '2024',
      title: 'Opened office',
      desc: 'in Dubai, UAE',
      icon: <Building2 className="w-5 h-5 text-[#E5A93C]" />,
    },
    {
      year: '2026',
      title: 'Growing towards',
      desc: 'a global future',
      icon: <Sparkles className="w-5 h-5 text-[#E5A93C]" />,
    },
  ];

  const whatWeDo = [
    {
      title: 'Enterprise Software Development',
      desc: 'Custom enterprise applications built for scalability, resilience, and security.',
      icon: <Code2 className="w-6 h-6 transition-colors" />,
      link: '/services',
    },
    {
      title: 'Mobile Applications',
      desc: 'Native iOS & Android and high-performance cross-platform Flutter/React Native solutions.',
      icon: <Smartphone className="w-6 h-6 transition-colors" />,
      link: '/services',
    },
    {
      title: 'AI & Data Solutions',
      desc: 'Intelligent predictive analytics, conversational agents, and machine learning pipelines.',
      icon: <Sparkles className="w-6 h-6 transition-colors" />,
      link: '/services',
    },
    {
      title: 'Industrial IoT & Automation',
      desc: 'Smart factory telematics, SCADA integrations, and connected sensor ecosystems.',
      icon: <Cpu className="w-6 h-6 transition-colors" />,
      link: '/services',
    },
    {
      title: 'Cloud & DevOps Modern Infrastructure',
      desc: 'Automated CI/CD pipelines, container orchestration, and cloud architecture on AWS/Azure/GCP.',
      icon: <Cloud className="w-6 h-6 transition-colors" />,
      link: '/services',
    },
    {
      title: 'Managed IT Services',
      desc: '24/7 SLA-driven infrastructure monitoring, security governance, and enterprise support.',
      icon: <Headphones className="w-6 h-6 transition-colors" />,
      link: '/services',
    },
  ];

  const clientLogos = [
    { name: 'Client 1', src: '/assets/clients/client1.webp' },
    { name: 'Client 2', src: '/assets/clients/client2.webp' },
    { name: 'Client 3', src: '/assets/clients/client3.webp' },
    { name: 'Client 4', src: '/assets/clients/client4.webp' },
    { name: 'Client 5', src: '/assets/clients/client5.webp' },
    { name: 'Client 6', src: '/assets/clients/client6.webp' },
    { name: 'Client 7', src: '/assets/clients/client7.webp' },
    { name: 'Client 8', src: '/assets/clients/client8.png' },
    { name: 'Client 9', src: '/assets/clients/client9.png' },
    { name: 'Client 10', src: '/assets/clients/client10.png' },
    { name: 'Client 11', src: '/assets/clients/client11.png' },
    { name: 'Client 12', src: '/assets/clients/client12.png' },
    { name: 'Client 13', src: '/assets/clients/client13.png' },
    { name: 'Client 14', src: '/assets/clients/client14.png' },
    { name: 'Client 15', src: '/assets/clients/client15.png' },
    { name: 'Client 16', src: '/assets/clients/client16.png' },
  ];

  // Infinite Draggable & Arrow-Controlled Client Slider (3-buffer virtual wrap)
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);
  const isWrappingRef = useRef(false);

  // Triplicate clientLogos so the list can seamlessly wrap in both directions
  const loopedLogos = [...clientLogos, ...clientLogos, ...clientLogos];

  // Initialize scroll position in the center buffer (Set 2 of 3)
  useEffect(() => {
    const el = sliderRef.current;
    if (!el) return;
    const initScroll = () => {
      const setWidth = el.scrollWidth / 3;
      if (setWidth > 0) {
        el.scrollLeft = setWidth;
      }
    };
    initScroll();
    // Also recheck when images load or window resizes
    window.addEventListener('resize', initScroll);
    return () => window.removeEventListener('resize', initScroll);
  }, []);

  // Seamless boundary wrap on scroll
  const handleScroll = () => {
    const el = sliderRef.current;
    if (!el || isWrappingRef.current) return;
    const setWidth = el.scrollWidth / 3;
    if (setWidth <= 0) return;

    // Approaching left end of Set 1 -> silently jump to Set 2
    if (el.scrollLeft <= 10) {
      isWrappingRef.current = true;
      el.scrollLeft += setWidth;
      requestAnimationFrame(() => {
        isWrappingRef.current = false;
      });
    }
    // Approaching right end of Set 3 -> silently jump to Set 2
    else if (el.scrollLeft >= setWidth * 2 - 10) {
      isWrappingRef.current = true;
      el.scrollLeft -= setWidth;
      requestAnimationFrame(() => {
        isWrappingRef.current = false;
      });
    }
  };

  const scrollSlider = (direction: 'left' | 'right') => {
    const el = sliderRef.current;
    if (!el) return;
    const scrollOffset = el.clientWidth * 0.65;
    const setWidth = el.scrollWidth / 3;

    // Pre-wrap if next step would hit boundary
    if (direction === 'left' && el.scrollLeft <= scrollOffset + 10) {
      el.scrollLeft += setWidth;
    } else if (direction === 'right' && el.scrollLeft >= setWidth * 2 - scrollOffset - 10) {
      el.scrollLeft -= setWidth;
    }

    el.scrollBy({
      left: direction === 'left' ? -scrollOffset : scrollOffset,
      behavior: 'smooth'
    });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!sliderRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeftState(sliderRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !sliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    sliderRef.current.scrollLeft = scrollLeftState - walk;
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  return (
    <div className="bg-white text-slate-900 font-sans selection:bg-[#E5A93C]/30">
      {/* ========================================================= */}
      {/* 1. HERO SECTION: Daylight Architectural Hub with Smooth Fade */}
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
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=85"
            alt="Prabha Technologies Corporate AI Innovation Hub"
            className="w-full h-full object-cover object-[center_right] scale-100"
          />
          {/* Subtle top & bottom edge feathering */}
          <div className="hidden lg:block absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent pointer-events-none" />
          <div className="hidden lg:block absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white to-transparent pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Hero Content */}
            <div className="lg:col-span-6 space-y-6">
              <span className="heading-eyebrow block">
                ABOUT US
              </span>
              <h1 className="heading-hero text-[#020E26]">
                Building <br />
                Technology for <br />
                <span className="text-[#E5A93C] font-light">a Brighter Tomorrow</span>
              </h1>
              <p className="text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed">
                Prabha Technologies is an AI Innovation Hub delivering enterprise software, mobile applications and industrial IoT solutions for a smarter, more connected world.
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <BrandButton href="#story" variant="gold" size="md">
                  Our Journey
                </BrandButton>
                <BrandButton href="#team" variant="outline" size="md" showArrow={false}>
                  Meet the Team
                </BrandButton>
              </div>
            </div>
          </div>

          {/* Elevated Stats Metrics Strip */}
          <div className="mt-16 p-6 sm:p-8 rounded-3xl bg-slate-50/90 border border-slate-200/90 shadow-sm backdrop-blur-md">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 text-center">
              <div className="space-y-1">
                <div className="text-3xl sm:text-4xl font-extrabold text-[#020E26] tracking-tight">10+</div>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Years of Experience</div>
              </div>
              <div className="space-y-1">
                <div className="text-3xl sm:text-4xl font-extrabold text-[#020E26] tracking-tight">100+</div>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Projects Delivered</div>
              </div>
              <div className="space-y-1">
                <div className="text-3xl sm:text-4xl font-extrabold text-[#020E26] tracking-tight">35+</div>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Talented Professionals</div>
              </div>
              <div className="space-y-1">
                <div className="text-3xl sm:text-4xl font-extrabold text-[#020E26] tracking-tight">GCC</div>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">UAE | Saudi Arabia | Kuwait | India</div>
              </div>
              <div className="space-y-1 col-span-2 sm:col-span-1">
                <div className="text-3xl sm:text-4xl font-extrabold text-[#020E26] tracking-tight">100%</div>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Client Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. OUR STORY: FROM A VISION TO A GLOBAL TECHNOLOGY PARTNER */}
      {/* ========================================================= */}
      <section id="story" className="py-24 bg-white border-b border-slate-100">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-16">
            <div className="lg:col-span-6 space-y-6">
              <span className="heading-eyebrow block">
                OUR STORY
              </span>
              <h2 className="heading-section text-[#020E26]">
                From a Vision <br />
                <span className="text-[#E5A93C] font-light">to a Global Technology Partner</span>
              </h2>
              <p className="text-base text-slate-600 leading-relaxed">
                Prabha Technologies was founded with a simple belief — that technology can solve real-world problems and create meaningful impact. What started with a small team of two people has grown into a trusted technology partner delivering 100+ projects across the GCC region.
              </p>
              <div className="pt-2">
                <BrandButton href="#timeline" variant="gold" size="sm">
                  Our Journey
                </BrandButton>
              </div>
            </div>

            {/* Right Story Visual with Executive Silhouette Over Skyline */}
            <div className="lg:col-span-6 relative pt-4 pb-4">
              {/* Photo Frame with genuine technology-partner.jpg */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200/90 aspect-[16/10] bg-slate-100">
                <img
                  src="/assets/images/technology-partner.jpg"
                  alt="Prabha Technologies - Global Technology Partner Dubai Skyline"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Overlapping Clean Dark Card with Smooth Left-to-Right Opacity Fade */}
              <div 
                className="absolute -left-4 sm:-left-8 lg:-left-12 top-1/2 -translate-y-1/2 h-[78%] min-h-[250px] max-h-[330px] w-[220px] sm:w-[270px] lg:w-[295px] p-7 sm:p-9 rounded-3xl border border-white/15 text-white shadow-2xl z-20 flex flex-col justify-center overflow-hidden"
                style={{
                  background: 'linear-gradient(to right, rgba(0, 11, 30, 0.90) 0%, rgba(0, 11, 30, 0.70) 50%, rgba(0, 11, 30, 0.20) 100%)'
                }}
              >
                {/* Unified Vertical Content Stack with Identical Inter-Item Spacing */}
                <div className="space-y-3.5 sm:space-y-4">
                  <p className="text-base sm:text-lg font-semibold text-slate-100 tracking-wide leading-tight drop-shadow-sm">
                    "People
                  </p>
                  <p className="text-base sm:text-lg font-semibold text-slate-100 tracking-wide leading-tight drop-shadow-sm">
                    Ideas
                  </p>
                  <p className="text-base sm:text-lg font-semibold text-slate-100 tracking-wide leading-tight drop-shadow-sm">
                    Impact
                  </p>
                  <p className="text-base sm:text-lg font-semibold text-slate-100 tracking-wide leading-tight drop-shadow-sm">
                    AI Innovation Hub
                  </p>
                  <div className="h-1 w-24 sm:w-28 bg-[#E5A93C] rounded-full shadow-sm" />
                </div>
              </div>
            </div>
          </div>

          {/* Mission, Vision & Values Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200/90 hover:border-[#E5A93C]/60 hover:bg-white hover:shadow-xl transition-all duration-300 group">
              <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-[#E5A93C] mb-6 shadow-sm group-hover:scale-110 transition-transform">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#020E26] mb-3 group-hover:text-[#E5A93C] transition-colors">
                Our Mission
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                To deliver innovative, reliable and scalable technology solutions that help businesses grow, operate efficiently, and create lasting value.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200/90 hover:border-[#E5A93C]/60 hover:bg-white hover:shadow-xl transition-all duration-300 group">
              <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-[#E5A93C] mb-6 shadow-sm group-hover:scale-110 transition-transform">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#020E26] mb-3 group-hover:text-[#E5A93C] transition-colors">
                Our Vision
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                To be a global leader in AI-powered enterprise solutions, enabling intelligent businesses and a sustainable future.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200/90 hover:border-[#E5A93C]/60 hover:bg-white hover:shadow-xl transition-all duration-300 group">
              <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-[#E5A93C] mb-6 shadow-sm group-hover:scale-110 transition-transform">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#020E26] mb-3 group-hover:text-[#E5A93C] transition-colors">
                Our Values
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Innovation, Integrity, Excellence, Customer Success and a commitment to building a better tomorrow together.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. OUR JOURNEY: A DECADE OF INNOVATION AND GROWTH */}
      {/* ========================================================= */}
      <section id="timeline" className="py-24 bg-slate-50/70 border-b border-slate-100">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="heading-eyebrow block mb-2">
                OUR JOURNEY
              </span>
              <h2 className="heading-section text-[#020E26]">
                A Decade of <br />
                <span className="text-[#E5A93C] font-light">Innovation and Growth</span>
              </h2>
            </div>
            <p className="text-sm sm:text-base text-slate-600 max-w-md leading-relaxed">
              From a small beginning to a regional technology partner, our journey is built on trust, innovation and strong relationships.
            </p>
          </div>

          {/* Milestone Rail */}
          <div className="relative">
            {/* Connecting Horizontal Line for Desktop */}
            <div className="hidden lg:block absolute top-12 left-10 right-10 h-0.5 bg-gradient-to-r from-transparent via-[#E5A93C]/40 to-transparent z-0" />

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 relative z-10">
              {milestones.map((item, i) => (
                <div
                  key={i}
                  className="p-6 rounded-2xl bg-white border border-slate-200/90 hover:border-[#E5A93C]/60 hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center group"
                >
                  <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 group-hover:bg-[#020E26] group-hover:text-white transition-all">
                    {item.icon}
                  </div>
                  <div className="text-xl font-extrabold text-[#020E26] group-hover:text-[#E5A93C] transition-colors font-mono mb-1">
                    {item.year}
                  </div>
                  <div className="text-sm font-bold text-slate-800">
                    {item.title}
                  </div>
                  <p className="text-xs text-slate-500 mt-1 leading-snug">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 4. GLOBAL PRESENCE: LOCAL EXPERTISE GLOBAL IMPACT */}
      {/* ========================================================= */}
      <section className="relative py-28 bg-white border-b border-slate-100 overflow-hidden">
        {/* Right Unboxed Dot-Matrix World Map with Smooth Left Fade (Zero Pins) */}
        <div 
          className="absolute right-0 top-0 bottom-0 w-full lg:w-[62%] z-0 pointer-events-none flex items-center justify-end overflow-hidden"
          style={{
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.15) 15%, rgba(0,0,0,0.85) 55%, black 100%)',
            maskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.15) 15%, rgba(0,0,0,0.85) 55%, black 100%)'
          }}
        >
          <img
            src="/assets/images/grey-dots-world-map.jpg"
            alt="Prabha Technologies Global Presence Map"
            className="w-full h-full object-contain object-right opacity-85 mix-blend-multiply"
          />
        </div>

        <div className="relative z-10 max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="lg:col-span-5 space-y-6">
              <span className="heading-eyebrow block">
                GLOBAL PRESENCE
              </span>
              <h2 className="heading-section text-[#020E26]">
                Local Expertise <br />
                <span className="text-[#E5A93C] font-light">Global Impact</span>
              </h2>
              <p className="text-base text-slate-600 leading-relaxed max-w-md">
                We serve clients across the GCC region and India with a strong on-ground presence and a global delivery model.
              </p>
              <div className="pt-2">
                <BrandButton to="/contact" variant="gold" size="sm">
                  Our Offices
                </BrandButton>
              </div>
            </div>

            {/* Right Presence Badges Floating Over Faded Map */}
            <div className="lg:col-span-7">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 max-w-xl lg:ml-auto">
                <div className="p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200/90 text-center shadow-sm hover:border-[#E5A93C]/50 hover:shadow-md transition-all">
                  <span className="text-xs font-extrabold text-[#020E26] block mb-0.5">UAE</span>
                  <span className="text-[11px] text-slate-500 block">Dubai | Abu Dhabi</span>
                </div>
                <div className="p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200/90 text-center shadow-sm hover:border-[#E5A93C]/50 hover:shadow-md transition-all">
                  <span className="text-xs font-extrabold text-[#020E26] block mb-0.5">Saudi Arabia</span>
                  <span className="text-[11px] text-slate-500 block">Riyadh</span>
                </div>
                <div className="p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200/90 text-center shadow-sm hover:border-[#E5A93C]/50 hover:shadow-md transition-all">
                  <span className="text-xs font-extrabold text-[#020E26] block mb-0.5">Kuwait</span>
                  <span className="text-[11px] text-slate-500 block">Kuwait City</span>
                </div>
                <div className="p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200/90 text-center shadow-sm hover:border-[#E5A93C]/50 hover:shadow-md transition-all">
                  <span className="text-xs font-extrabold text-[#020E26] block mb-0.5">India</span>
                  <span className="text-[11px] text-slate-500 block">Hyderabad</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 5. WHAT WE DO: TURNING IDEAS INTO INTELLIGENT SOLUTIONS */}
      {/* ========================================================= */}
      <section className="py-24 bg-slate-50/70 border-b border-slate-100">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="heading-eyebrow block mb-2">
                WHAT WE DO
              </span>
              <h2 className="heading-section text-[#020E26]">
                Turning Ideas into <br />
                <span className="text-[#E5A93C] font-light">Intelligent Solutions</span>
              </h2>
            </div>
            <p className="text-sm sm:text-base text-slate-600 max-w-md leading-relaxed">
              We specialize in building AI-powered software, mobile applications and industrial IoT solutions across multiple industries.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whatWeDo.map((item, idx) => (
              <Link
                key={idx}
                to={item.link}
                className="p-8 rounded-3xl bg-white border border-slate-200/90 hover:border-[#E5A93C]/60 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 group-hover:bg-[#020E26] text-[#020E26] group-hover:text-[#E5A93C] transition-all duration-300">
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-bold text-[#020E26] group-hover:text-[#E5A93C] transition-colors mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
                <div className="flex items-center gap-2 pt-6 text-xs font-bold uppercase tracking-wider text-slate-400 group-hover:text-[#E5A93C] transition-colors">
                  <span>Explore Service</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 6. OUR PEOPLE: A TEAM THAT BUILDS TOMORROW */}
      {/* ========================================================= */}
      <section id="team" className="py-24 bg-white border-b border-slate-100">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="lg:col-span-5 space-y-6">
              <span className="heading-eyebrow block">
                OUR PEOPLE
              </span>
              <h2 className="heading-section text-[#020E26]">
                A Team That <br />
                <span className="text-[#E5A93C] font-light">Builds Tomorrow</span>
              </h2>
              <p className="text-base text-slate-600 leading-relaxed">
                Our strength lies in our people — a diverse team of engineers, designers, strategists and problem-solvers who are passionate about technology and impact.
              </p>
              <div className="pt-2">
                <BrandButton to="/contact" variant="gold" size="sm">
                  Join Our Team
                </BrandButton>
              </div>
            </div>

            {/* Right Team Photo & Pillars */}
            <div className="lg:col-span-7 space-y-4">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200/90 aspect-[16/9] bg-slate-100">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80"
                  alt="Prabha Technologies Team Collaboration"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 text-center text-xs font-bold text-slate-700 hover:border-[#E5A93C]/50 transition-colors">
                  Collaborative Culture
                </div>
                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 text-center text-xs font-bold text-slate-700 hover:border-[#E5A93C]/50 transition-colors">
                  Continuous Learning
                </div>
                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 text-center text-xs font-bold text-slate-700 hover:border-[#E5A93C]/50 transition-colors">
                  Career Growth
                </div>
                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 text-center text-xs font-bold text-slate-700 hover:border-[#E5A93C]/50 transition-colors">
                  Hybrid Work Model
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 7. OUR OFFICE: STRATEGICALLY LOCATED */}
      {/* ========================================================= */}
      <section className="py-24 bg-slate-50/70 border-b border-slate-100">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="heading-eyebrow block mb-2">
              OUR OFFICE
            </span>
            <h2 className="heading-section text-[#020E26]">
              Strategically Located <br />
              <span className="text-[#E5A93C] font-light">for a Connected World</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-4 leading-relaxed">
              Our Dubai office at Business Bay connects us to the heart of innovation in the GCC region, enabling closer collaboration with our clients and partners.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="group rounded-3xl overflow-hidden shadow-xl border border-slate-200/90 aspect-[16/10] relative bg-slate-100">
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80"
                alt="Dubai Office Reception"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020E26]/70 via-transparent to-transparent flex items-end p-6">
                <div>
                  <h4 className="text-white font-bold text-lg">Dubai Executive Office</h4>
                  <p className="text-xs text-[#E5A93C] font-medium">Business Bay, Dubai, UAE</p>
                </div>
              </div>
            </div>
            <div className="group rounded-3xl overflow-hidden shadow-xl border border-slate-200/90 aspect-[16/10] relative bg-slate-100">
              <img
                src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1000&q=80"
                alt="Executive Boardroom and Workspace"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020E26]/70 via-transparent to-transparent flex items-end p-6">
                <div>
                  <h4 className="text-white font-bold text-lg">Engineering & Design Center</h4>
                  <p className="text-xs text-[#E5A93C] font-medium">Innovation Pods & Collaborative Suites</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 8. CLIENT SUCCESS: TRUSTED BY TOP COMPANIES (Infinite Slider) */}
      {/* ========================================================= */}
      <section className="py-20 bg-white border-b border-slate-100 overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <span className="heading-eyebrow block mb-1">
                CLIENT SUCCESS
              </span>
              <h3 className="heading-section text-[#020E26]">
                Trusted By <span className="text-[#E5A93C] font-light">Top Companies</span>
              </h3>
            </div>

            {/* Carousel Navigation Indicators */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Previous logos"
                className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:text-[#020E26] hover:border-[#E5A93C] hover:bg-[#E5A93C]/10 active:scale-95 transition-all shadow-sm"
                onClick={() => scrollSlider('left')}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                aria-label="Next logos"
                className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:text-[#020E26] hover:border-[#E5A93C] hover:bg-[#E5A93C]/10 active:scale-95 transition-all shadow-sm"
                onClick={() => scrollSlider('right')}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Draggable & Arrow-Controlled Slider Track with Smooth Edge Fades */}
          <div 
            className="relative w-full overflow-hidden py-4"
            style={{
              WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)',
              maskImage: 'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)'
            }}
          >
            <div
              ref={sliderRef}
              onScroll={handleScroll}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUpOrLeave}
              onMouseLeave={handleMouseUpOrLeave}
              className={`flex items-center gap-4 sm:gap-6 overflow-x-auto no-scrollbar scroll-smooth py-2 select-none ${
                isDragging ? 'cursor-grabbing select-none' : 'cursor-grab'
              }`}
            >
              {loopedLogos.map((client, idx) => (
                <div
                  key={idx}
                  className="h-20 sm:h-24 w-32 sm:w-40 shrink-0 flex items-center justify-center p-1 group transition-transform duration-300 pointer-events-none sm:pointer-events-auto"
                >
                  <img
                    src={client.src}
                    alt={client.name}
                    draggable={false}
                    className="h-16 sm:h-20 max-h-20 max-w-[160px] sm:max-w-[190px] w-auto object-contain grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 select-none pointer-events-none"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 9. BOTTOM CTA BANNER: READY TO CREATE WHAT'S NEXT */}
      {/* ========================================================= */}
      <section className="relative py-24 bg-[#000B1E] text-white overflow-hidden">
        {/* Right Night Skyline with Smooth Left Fade */}
        <div
          className="absolute right-0 top-0 bottom-0 w-full lg:w-[60%] z-0 pointer-events-none overflow-hidden"
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
          <div className="max-w-xl space-y-4">
            <span className="heading-eyebrow block">
              LET'S BUILD TOGETHER
            </span>
            <h2 className="heading-section text-white">
              Ready to Create <br />
              <span className="text-gold-shimmer font-light">What's Next?</span>
            </h2>
            <p className="text-base text-slate-300 leading-relaxed max-w-lg">
              Partner with Prabha Technologies to build intelligent solutions that drive real business impact.
            </p>
            <div className="pt-2">
              <BrandButton to="/contact" variant="gold" size="lg">
                Let's Talk
              </BrandButton>
            </div>
          </div>

          {/* Floating Metric Badges */}
          <div className="grid grid-cols-3 gap-6 bg-slate-900/80 p-8 rounded-3xl border border-slate-800 backdrop-blur-md shadow-2xl">
            <div className="text-center space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#E5A93C]">100+</div>
              <div className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">Projects Delivered</div>
            </div>
            <div className="text-center space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#E5A93C]">10+</div>
              <div className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">Years Experience</div>
            </div>
            <div className="text-center space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#E5A93C]">100%</div>
              <div className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">Client Success</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
