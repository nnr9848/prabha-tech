import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Target,
  Eye,
  Award,
  Globe2,
  Users,
  Building,
  CheckCircle2,
  Calendar,
  Layers,
  Cpu,
  Radio,
  Cloud,
  Headphones,
  Smartphone,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import logoImg from '../assets/prabhatech-logo.png';
import { BrandButton } from '../components/common/BrandButton';
import { SectionHeading } from '../components/common/SectionHeading';

export const AboutPage: React.FC = () => {
  return (
    <div className="bg-white text-slate-900 font-sans selection:bg-[#E5A93C]/30">
      {/* ========================================================= */}
      {/* 1. ABOUT HERO: Modern Daylight Architecture & Skyline */}
      {/* ========================================================= */}
      <section className="relative pt-36 pb-20 border-b border-slate-100 overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-6">
              <SectionHeading
                theme="light"
                size="hero"
                badge="About Us"
                title={
                  <>
                    Building Technology for <br />
                    <span className="font-normal text-[#E5A93C]">a Brighter Tomorrow</span>
                  </>
                }
                subtitle="Prabha Technologies is an AI innovation Hub delivering enterprise software, mobile applications, and industrial IoT solutions for a smarter, more connected world."
              />
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <BrandButton href="#story" variant="gold" size="sm">
                  OUR JOURNEY
                </BrandButton>
                <BrandButton href="#team" variant="outline" size="sm" showArrow={false}>
                  MEET THE TEAM
                </BrandButton>
              </div>
            </div>

            {/* Right Architectural Visual (Dubai Business Bay & Skyline) */}
            <div className="lg:col-span-6 relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl border border-slate-200 aspect-[16/11]">
                <img
                  src="https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&w=1400&q=85"
                  alt="Prabha Technologies Headquarters"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 pt-12 mt-12 border-t border-slate-200 text-center">
            <div>
              <div className="text-3xl font-extrabold text-[#020E26]">10+</div>
              <div className="text-xs font-bold text-slate-500 uppercase mt-1">Years of Experience</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-[#020E26]">100+</div>
              <div className="text-xs font-bold text-slate-500 uppercase mt-1">Projects Delivered</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-[#020E26]">35+</div>
              <div className="text-xs font-bold text-slate-500 uppercase mt-1">Talented Professionals</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-[#020E26]">GCC</div>
              <div className="text-xs font-bold text-slate-500 uppercase mt-1">UAE | Saudi | Kuwait | India</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-[#020E26]">100%</div>
              <div className="text-xs font-bold text-slate-500 uppercase mt-1">Client Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. OUR STORY: FROM A VISION TO A GLOBAL TECHNOLOGY PARTNER */}
      {/* ========================================================= */}
      <section id="story" className="py-24 bg-white border-b border-slate-100">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
            <div className="lg:col-span-6 space-y-6">
              <SectionHeading
                theme="light"
                size="section"
                badge="Our Story"
                title={
                  <>
                    From a Vision <br />
                    to a Global Technology Partner
                  </>
                }
                subtitle="Prabha Technologies was founded with a simple belief — that technology can solve real-world problems and create meaningful impact. What started with a small team of two people has grown into a trusted technology partner delivering 100+ projects across the GCC region."
              />
              <div className="pt-2">
                <BrandButton href="#timeline" variant="gold" size="sm">
                  OUR JOURNEY
                </BrandButton>
              </div>
            </div>

            {/* Right Story Visual with Executive Silhouette Over Skyline */}
            <div className="lg:col-span-6 relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl border border-slate-200 aspect-[16/10] relative">
                <img
                  src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80"
                  alt="Executive Looking Over Dubai Skyline"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020E26]/80 via-transparent to-transparent flex items-end p-8">
                  <div className="text-white space-y-1">
                    <p className="text-xs uppercase tracking-widest font-bold text-[#E5A93C]">
                      People • Ideas • Impact
                    </p>
                    <p className="text-lg font-bold">AI Innovation Hub</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mission, Vision & Values Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200 hover:border-[#E5A93C]/50 transition-all">
              <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-[#E5A93C] mb-6 shadow-sm">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-extrabold text-[#020E26] mb-3">Our Mission</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                To deliver innovative, reliable and scalable technology solutions that help businesses grow, operate efficiently, and create lasting value.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200 hover:border-[#E5A93C]/50 transition-all">
              <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-[#E5A93C] mb-6 shadow-sm">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-extrabold text-[#020E26] mb-3">Our Vision</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                To be a global leader in AI-powered enterprise solutions, enabling intelligent businesses and a sustainable future.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200 hover:border-[#E5A93C]/50 transition-all">
              <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-[#E5A93C] mb-6 shadow-sm">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-extrabold text-[#020E26] mb-3">Our Values</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Innovation, Integrity, Excellence, Customer Success and a commitment to building a better tomorrow together.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. OUR JOURNEY: A DECADE OF INNOVATION AND GROWTH */}
      {/* ========================================================= */}
      <section id="timeline" className="py-24 bg-slate-50 border-b border-slate-200">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-[#E5A93C] block mb-2">
              Our Journey
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#020E26] tracking-tight mb-4">
              A Decade of Innovation and Growth
            </h2>
            <p className="text-sm text-slate-600">
              From a small beginning to a regional technology partner, our journey is built on trust, innovation, and strong relationships.
            </p>
          </div>

          {/* Timeline Milestones Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 relative">
            {[
              { year: '2014', title: 'Founded', desc: 'with 2 employees' },
              { year: '2016', title: 'First major', desc: 'client in GCC' },
              { year: '2018', title: 'Expanded', desc: 'team & services' },
              { year: '2021', title: '100+ projects', desc: 'delivered' },
              { year: '2024', title: 'Opened office', desc: 'in Dubai, UAE' },
              { year: '2026', title: 'Growing towards', desc: 'a global future' },
            ].map((item, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm text-center flex flex-col items-center justify-between"
              >
                <div className="text-lg font-extrabold text-[#E5A93C] font-mono mb-2">
                  {item.year}
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#020E26]">{item.title}</h4>
                  <p className="text-xs text-slate-500 mt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 4. GLOBAL PRESENCE: LOCAL EXPERTISE GLOBAL IMPACT */}
      {/* ========================================================= */}
      <section className="py-24 bg-white border-b border-slate-100">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-[#E5A93C]">
                Global Presence
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-[#020E26] tracking-tight">
                Local Expertise <br />
                Global Impact
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                We serve clients across the GCC region and India with a strong on-ground presence and a global delivery model.
              </p>
              <div className="pt-2">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#020E26] hover:bg-[#122847] text-white text-xs font-bold uppercase tracking-wider transition-colors shadow"
                >
                  <span>Our Offices</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Right Map Visual with Pins */}
            <div className="lg:col-span-7 bg-slate-50 rounded-3xl p-8 border border-slate-200 relative overflow-hidden">
              <div className="space-y-4">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="p-4 rounded-xl bg-white border border-slate-200 text-center shadow-sm">
                    <span className="text-xs font-extrabold text-[#020E26] block">UAE</span>
                    <span className="text-[11px] text-[#E5A93C]">Dubai | Abu Dhabi</span>
                  </div>
                  <div className="p-4 rounded-xl bg-white border border-slate-200 text-center shadow-sm">
                    <span className="text-xs font-extrabold text-[#020E26] block">Saudi Arabia</span>
                    <span className="text-[11px] text-[#E5A93C]">Riyadh</span>
                  </div>
                  <div className="p-4 rounded-xl bg-white border border-slate-200 text-center shadow-sm">
                    <span className="text-xs font-extrabold text-[#020E26] block">Kuwait</span>
                    <span className="text-[11px] text-[#E5A93C]">Kuwait City</span>
                  </div>
                  <div className="p-4 rounded-xl bg-white border border-slate-200 text-center shadow-sm">
                    <span className="text-xs font-extrabold text-[#020E26] block">India</span>
                    <span className="text-[11px] text-[#E5A93C]">Hyderabad</span>
                  </div>
                </div>
                <div className="rounded-2xl overflow-hidden aspect-[16/8] bg-slate-200">
                  <img
                    src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1200&q=80"
                    alt="World Map Delivery Presence"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 5. OUR PEOPLE: A TEAM THAT BUILDS TOMORROW */}
      {/* ========================================================= */}
      <section id="team" className="py-24 bg-slate-50 border-b border-slate-200">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-[#E5A93C]">
                Our People
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-[#020E26] tracking-tight">
                A Team That Builds Tomorrow
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Our strength lies in our people — a diverse team of engineers, designers, strategists, and problem-solvers who are passionate about technology and impact.
              </p>
              <div className="pt-2">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#020E26] hover:bg-[#122847] text-white text-xs font-bold uppercase tracking-wider transition-colors shadow"
                >
                  <span>Join Our Team</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Right Team Photo & Value Badges */}
            <div className="lg:col-span-7 space-y-4">
              <div className="rounded-2xl overflow-hidden shadow-xl border border-slate-200 aspect-[16/9]">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80"
                  alt="Team Collaboration Session"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 bg-white rounded-xl border border-slate-200 text-center text-xs font-semibold text-slate-700">
                  Collaborative Culture
                </div>
                <div className="p-3 bg-white rounded-xl border border-slate-200 text-center text-xs font-semibold text-slate-700">
                  Continuous Learning
                </div>
                <div className="p-3 bg-white rounded-xl border border-slate-200 text-center text-xs font-semibold text-slate-700">
                  Career Growth
                </div>
                <div className="p-3 bg-white rounded-xl border border-slate-200 text-center text-xs font-semibold text-slate-700">
                  Hybrid Work Model
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 6. OUR OFFICE: STRATEGICALLY LOCATED */}
      {/* ========================================================= */}
      <section className="py-24 bg-white border-b border-slate-100">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-[#E5A93C] block mb-2">
              Our Office
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#020E26] tracking-tight mb-4">
              Strategically Located for a Connected World
            </h2>
            <p className="text-sm text-slate-600">
              Our Dubai office at Business Bay connects us to the heart of innovation in the GCC region, enabling closer collaboration with our clients and partners.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-200 aspect-[16/10]">
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80"
                alt="Dubai Office Reception"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-200 aspect-[16/10]">
              <img
                src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1000&q=80"
                alt="Executive Boardroom and Workspace"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 7. TRUSTED BY INDUSTRY LEADERS (Client Logos Strip) */}
      {/* ========================================================= */}
      <section className="py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
          <div className="text-center mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-500">
              Trusted by Industry Leaders
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-10 sm:gap-16 opacity-70 grayscale hover:grayscale-0 transition-all">
            <span className="font-extrabold text-slate-800 text-lg tracking-wider">ADNEC</span>
            <span className="font-extrabold text-slate-800 text-lg tracking-wider">EMIRATES</span>
            <span className="font-extrabold text-slate-800 text-lg tracking-wider">TATA</span>
            <span className="font-extrabold text-slate-800 text-lg tracking-wider">SIEMENS</span>
            <span className="font-extrabold text-slate-800 text-lg tracking-wider">SCHNEIDER</span>
            <span className="font-extrabold text-slate-800 text-lg tracking-wider">HONEYWELL</span>
            <span className="font-extrabold text-slate-800 text-lg tracking-wider">MICROSOFT</span>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 8. BOTTOM CTA BANNER: READY TO CREATE WHAT'S NEXT */}
      {/* ========================================================= */}
      <section className="relative py-24 bg-[#000B1E] text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=2000&q=85"
            alt="Dubai Skyline Night"
            className="w-full h-full object-cover object-bottom opacity-40 mix-blend-luminosity filter contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#000B1E] via-[#000B1E]/85 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="max-w-xl space-y-4">
            <SectionHeading
              theme="dark"
              size="section"
              badge="Let's Build Together"
              title="Ready to Create What's Next?"
              subtitle="Partner with Prabha Technologies to build intelligent solutions that drive real business impact."
            />
            <div className="pt-2">
              <BrandButton to="/contact" variant="gold" size="md">
                LET'S TALK
              </BrandButton>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6 bg-slate-900/80 p-8 rounded-3xl border border-slate-800 backdrop-blur-md">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#E5A93C]">100+</div>
              <div className="text-[11px] font-bold text-slate-300 uppercase mt-1">Projects Delivered</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#E5A93C]">10+</div>
              <div className="text-[11px] font-bold text-slate-300 uppercase mt-1">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#E5A93C]">100%</div>
              <div className="text-[11px] font-bold text-slate-300 uppercase mt-1">Client Success</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
