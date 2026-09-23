import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CaseStudy } from '../../types';
import { ArrowUpRight, Award, ChevronRight } from 'lucide-react';

interface CaseStudiesGridProps {
  caseStudies: CaseStudy[];
  showFilters?: boolean;
}

const CATEGORIES = ['All', 'Banking', 'Wealthtech', 'Fintech', 'Crypto'];

export const CaseStudiesGrid: React.FC<CaseStudiesGridProps> = ({ caseStudies, showFilters = true }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filtered = selectedCategory === 'All'
    ? caseStudies
    : caseStudies.filter(c => c.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <section className="py-28 relative z-10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#00F2FE] mb-3 flex items-center gap-2">
              <span className="w-8 h-[1px] bg-[#00F2FE]"></span>
              Portfolio Showcase
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Award-Winning Financial Case Studies
            </h2>
          </div>

          {/* Category Tabs */}
          {showFilters && (
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wider transition-all duration-300 ${
                    selectedCategory === cat
                      ? 'bg-[#00F2FE] text-black shadow-[0_0_20px_rgba(0,242,254,0.35)] font-bold'
                      : 'bg-white/5 text-[#94A3B8] hover:text-white hover:bg-white/10 border border-white/10'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Case Studies Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10">
          {filtered.map((study, idx) => (
            <motion.div
              key={study.slug || idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="group relative rounded-2xl bg-[#0B101D] border border-white/10 overflow-hidden hover:border-[#00F2FE]/40 transition-all duration-500 flex flex-col shadow-xl hover:shadow-[0_10px_40px_rgba(0,0,0,0.8)]"
            >
              {/* Media Preview Container */}
              <div className="relative aspect-[16/10] overflow-hidden bg-black">
                <img
                  src={study.heroImageUrl}
                  alt={study.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B101D] via-transparent to-transparent opacity-90"></div>

                {/* Top Overlay Badges */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-black/75 backdrop-blur-md border border-white/10 text-[#00F2FE]">
                    {study.category}
                  </span>
                  {study.awards && study.awards.length > 0 && (
                    <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-black/75 backdrop-blur-md border border-white/10 text-white">
                      <Award className="w-3.5 h-3.5 text-[#F59E0B]" />
                      {study.awards[0]}
                    </span>
                  )}
                </div>

                {/* Floating Metrics Pill */}
                {study.metrics && study.metrics.length > 0 && (
                  <div className="absolute bottom-4 left-4 flex gap-2">
                    {study.metrics.slice(0, 2).map((m, mIdx) => (
                      <div key={mIdx} className="bg-black/85 backdrop-blur-md border border-white/15 px-3 py-1.5 rounded-xl shadow-lg">
                        <span className="font-mono text-xs font-extrabold text-[#00F2FE]">{m.label}</span>
                        <span className="text-[10px] text-[#94A3B8] ml-1.5 font-medium">{m.description}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-[11px] font-mono uppercase tracking-[0.15em] text-[#64748B] mb-2 font-medium">
                    Client: {study.clientName}
                  </div>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-white group-hover:text-[#00F2FE] transition-colors duration-200 mb-3 leading-snug">
                    {study.title}
                  </h3>
                  <p className="text-sm text-[#94A3B8] line-clamp-3 leading-relaxed mb-6 font-normal">
                    {study.summary}
                  </p>
                </div>

                <div className="pt-5 border-t border-white/8 flex items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    {study.tags?.slice(0, 3).map((tag, tIdx) => (
                      <span key={tIdx} className="text-[11px] text-[#64748B] bg-white/5 border border-white/5 px-2.5 py-1 rounded-md font-medium">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <Link
                    to={`/case-studies/${study.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-white group-hover:text-[#00F2FE] transition-colors"
                  >
                    <span>View Study</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

