import React from 'react';
import { motion } from 'framer-motion';
import { ServiceItem } from '../../types';
import { Layers, Compass, Zap, Shield, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const iconMap: Record<string, any> = {
  Layers: Layers,
  Compass: Compass,
  Zap: Zap,
  Shield: Shield,
  Sparkles: Sparkles,
};

interface ServicesGridProps {
  services: ServiceItem[];
}

export const ServicesGrid: React.FC<ServicesGridProps> = ({ services }) => {
  return (
    <section className="py-28 bg-[#05080F] border-y border-white/8 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#9873ff] mb-3">
            Our Core Capabilities
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-5">
            Financial UX Services Engineered for Market Dominance
          </h2>
          <p className="text-base text-[#94A3B8] font-normal leading-relaxed">
            We bridge the gap between complex banking legacy backends and frictionless, emotive customer journeys.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
          {services.map((srv, idx) => {
            const IconComponent = iconMap[srv.icon] || Layers;
            return (
              <motion.div
                key={srv.slug || idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-8 sm:p-10 rounded-2xl bg-[#0B101D] border border-white/10 hover:border-[#9873ff]/40 transition-all duration-300 flex flex-col justify-between group hover:shadow-[0_10px_40px_rgba(0,0,0,0.8)]"
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#9873ff] mb-6 group-hover:bg-[#9873ff] group-hover:text-black transition-all duration-300 shadow-md">
                    <IconComponent className="w-7 h-7" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-white mb-2 group-hover:text-[#9873ff] transition-colors leading-snug">
                    {srv.title}
                  </h3>
                  <p className="text-[11px] font-semibold text-[#b499ff] uppercase tracking-wider mb-4">
                    {srv.tagline}
                  </p>
                  <p className="text-sm text-[#94A3B8] leading-relaxed mb-6 font-normal">
                    {srv.shortDescription}
                  </p>

                  {/* Deliverables List */}
                  {srv.deliverables && srv.deliverables.length > 0 && (
                    <div className="space-y-2.5 mb-8">
                      {srv.deliverables.map((item, dIdx) => (
                        <div key={dIdx} className="flex items-center gap-2.5 text-xs text-white/80 font-medium">
                          <CheckCircle2 className="w-4 h-4 text-[#9873ff] shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white group-hover:text-[#9873ff] transition-colors pt-5 border-t border-white/8"
                >
                  <span>Request Capability Deck</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

