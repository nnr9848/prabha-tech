import React from 'react';
import { InquirySection } from '../components/home/InquirySection';
import { Award, Globe2, ShieldCheck, Users, Zap } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="pt-28">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 mb-16 text-center">
        <div className="text-xs uppercase tracking-widest font-semibold text-[#9873ff] mb-3">
          Agency Heritage
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight mb-4">
          Architects of the Next Financial Generation
        </h1>
        <p className="text-base sm:text-lg text-[#94A3B8] max-w-2xl mx-auto">
          We are a specialized financial UX design agency dedicated exclusively to banking, fintech, wealthtech, and blockchain ecosystems.
        </p>
      </div>

      <section className="py-16 max-w-5xl mx-auto px-6 sm:px-8 text-white space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 rounded-2xl bg-[#0D111A] border border-white/10">
            <h3 className="text-2xl font-bold mb-3 text-[#9873ff]">100% Financial Focus</h3>
            <p className="text-sm text-[#94A3B8] leading-relaxed">
              Unlike generic design studios, we exclusively focus on financial products. Our team understands regulatory frameworks, core banking systems, security models, and financial psychology.
            </p>
          </div>
          <div className="p-8 rounded-2xl bg-[#0D111A] border border-white/10">
            <h3 className="text-2xl font-bold mb-3 text-[#7928CA]">Global Impact</h3>
            <p className="text-sm text-[#94A3B8] leading-relaxed">
              From London and New York to Singapore and Dubai, we collaborate with tier-1 international banks, hyper-growth fintech unicorns, and visionary founders across 37+ countries.
            </p>
          </div>
        </div>
      </section>

      <InquirySection />
    </div>
  );
};
