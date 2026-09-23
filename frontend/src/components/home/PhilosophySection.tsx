import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Brain, Compass, Cpu, Target, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export const PhilosophySection: React.FC = () => {
  const pillars = [
    {
      icon: Brain,
      title: 'Financial Experience Design (FXD)',
      description: 'A unique methodology fusing product psychology, behavioral economics, and financial engineering to eliminate user anxiety and cognitive overload.',
    },
    {
      icon: Compass,
      title: 'Human-Centered Banking',
      description: 'Shifting from legacy feature-centric spreadsheets to empathetic, goal-driven financial journeys that guide users toward long-term prosperity.',
    },
    {
      icon: Cpu,
      title: 'Contextual AI & Predictive UX',
      description: 'Embedding autonomous, ambient intelligence into daily banking flows to provide proactive insights before the customer even asks.',
    },
    {
      icon: Target,
      title: 'Pixel-Perfect Execution',
      description: 'Zero compromises on ergonomics, micro-interactions, responsive fluidity, and enterprise-grade design tokens ready for development handoff.',
    },
  ];

  return (
    <section className="py-24 relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Text */}
          <div>
            <div className="text-xs uppercase tracking-widest font-semibold text-[#00F0FF] mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              The UXDA Philosophy
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-6">
              Why 99% of Banking Apps Feel Cold, and How We Change It
            </h2>
            <p className="text-base text-[#94A3B8] leading-relaxed mb-6">
              Money is deeply emotional. Yet most digital banking interfaces look and feel like outdated spreadsheets. We replace complexity with delight, engineering interfaces that empower people to master their financial destiny.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                to="/philosophy"
                className="px-6 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider text-black bg-[#00F0FF] hover:bg-white transition-all shadow-[0_0_20px_rgba(0,240,255,0.3)] text-center"
              >
                Read Full FXD Whitepaper
              </Link>
              <Link
                to="/contact"
                className="px-6 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-white/5 hover:bg-white/10 border border-white/10 text-center"
              >
                Schedule Executive Briefing
              </Link>
            </div>
          </div>

          {/* Right Pillar Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="p-6 rounded-2xl bg-[#0D111A] border border-white/10 hover:border-[#7928CA]/50 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#00F0FF] mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2">{pillar.title}</h4>
                  <p className="text-xs text-[#94A3B8] leading-relaxed">{pillar.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
