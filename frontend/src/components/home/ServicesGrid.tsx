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
    <section className="py-24 bg-[#090D15] border-y border-white/5 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs uppercase tracking-widest font-semibold text-[#00F0FF] mb-3">
            Our Core Capabilities
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Financial UX Services Engineered for Market Dominance
          </h2>
          <p className="text-base text-[#94A3B8]">
            We bridge the gap between complex banking legacy backends and frictionless, emotive customer journeys.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((srv, idx) => {
            const IconComponent = iconMap[srv.icon] || Layers;
            return (
              <motion.div
                key={srv.slug || idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-8 rounded-2xl bg-[#0D111A] border border-white/10 hover:border-[#00F0FF]/40 transition-all duration-300 flex flex-col justify-between group hover:shadow-[0_0_30px_rgba(0,240,255,0.1)]"
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#00F0FF] mb-6 group-hover:bg-[#00F0FF] group-hover:text-black transition-all duration-300">
                    <IconComponent className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[#00F0FF] transition-colors">
                    {srv.title}
                  </h3>
                  <p className="text-xs font-medium text-[#7928CA] uppercase tracking-wider mb-4">
                    {srv.tagline}
                  </p>
                  <p className="text-sm text-[#94A3B8] leading-relaxed mb-6">
                    {srv.shortDescription}
                  </p>

                  {/* Deliverables List */}
                  {srv.deliverables && srv.deliverables.length > 0 && (
                    <div className="space-y-2 mb-8">
                      {srv.deliverables.map((item, dIdx) => (
                        <div key={dIdx} className="flex items-center gap-2 text-xs text-white/80">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#00F0FF] shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white group-hover:text-[#00F0FF] transition-colors pt-4 border-t border-white/5"
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
