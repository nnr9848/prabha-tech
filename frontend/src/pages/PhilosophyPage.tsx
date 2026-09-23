import React from 'react';
import { PhilosophySection } from '../components/home/PhilosophySection';
import { InquirySection } from '../components/home/InquirySection';
import { Brain, ShieldCheck, Sparkles, TrendingUp, Users, Zap } from 'lucide-react';

export const PhilosophyPage: React.FC = () => {
  return (
    <div className="pt-28">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 mb-8 text-center">
        <div className="text-xs uppercase tracking-widest font-semibold text-[#9873ff] mb-3">
          Methodology & Vision
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight mb-4">
          Financial Experience Design (FXD)
        </h1>
        <p className="text-base sm:text-lg text-[#94A3B8] max-w-2xl mx-auto">
          The proprietary design methodology engineered to decode financial psychology, reduce cognitive friction, and elevate customer trust.
        </p>
      </div>

      <PhilosophySection />

      {/* Deep-dive methodology steps */}
      <section className="py-20 bg-[#090D15] border-y border-white/5">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <h2 className="text-3xl font-bold text-white text-center mb-16">
            The 5 Pillars of the FXD Engineering Cycle
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-[#0D111A] border border-white/10">
              <div className="text-2xl font-extrabold text-[#9873ff] mb-2">01</div>
              <h3 className="text-lg font-bold text-white mb-2">Forensic UX Research</h3>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                Analyzing financial user journeys, identifying cognitive drop-offs, and benchmarking against global leaders.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-[#0D111A] border border-white/10">
              <div className="text-2xl font-extrabold text-[#9873ff] mb-2">02</div>
              <h3 className="text-lg font-bold text-white mb-2">Emotional Banking Architecture</h3>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                Structuring data flows and micro-interactions around human peace of mind rather than legacy bank database schemas.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-[#0D111A] border border-white/10">
              <div className="text-2xl font-extrabold text-[#9873ff] mb-2">03</div>
              <h3 className="text-lg font-bold text-white mb-2">Atomic Fintech Design System</h3>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                Developing responsive, accessible components, charts, and dark-mode tokens for high-speed cross-platform parity.
              </p>
            </div>
          </div>
        </div>
      </section>

      <InquirySection />
    </div>
  );
};
