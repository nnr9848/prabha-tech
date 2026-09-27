import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { publicApi } from '../api/client';
import { CaseStudy } from '../types';
import { ArrowLeft, Award, CheckCircle2, TrendingUp, Sparkles, Building, Layers } from 'lucide-react';

export const CaseStudyDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const { data: study, isLoading, isError } = useQuery<CaseStudy>({
    queryKey: ['caseStudy', slug],
    queryFn: () => publicApi.getCaseStudyBySlug(slug || ''),
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen pt-36 pb-20 flex items-center justify-center text-white">
        <div className="w-8 h-8 rounded-full border-2 border-[#E5A93C] border-t-transparent animate-spin"></div>
      </div>
    );
  }

  if (isError || !study) {
    return (
      <div className="min-h-screen pt-36 pb-20 max-w-4xl mx-auto px-6 text-center text-slate-900">
        <h2 className="text-3xl font-bold mb-4 text-[#020E26]">Case Study Not Found</h2>
        <Link to="/portfolio" className="text-[#E5A93C] hover:underline font-bold">
          Back to Portfolio
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-24 bg-white text-slate-900">
      {/* Back button */}
      <div className="max-w-6xl mx-auto px-6 sm:px-8 mb-8">
        <Link
          to="/portfolio"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-[#E5A93C] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>All Case Studies</span>
        </Link>
      </div>

      {/* Header */}
      <div className="max-w-6xl mx-auto px-6 sm:px-8 mb-12">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#E5A93C]/10 border border-[#E5A93C]/30 text-[#E5A93C]">
            {study.category}
          </span>
          <span className="text-xs text-slate-500 flex items-center gap-1">
            <Building className="w-3.5 h-3.5" />
            Client: {study.clientName}
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#020E26] tracking-tight leading-tight mb-6">
          {study.title}
        </h1>
        {study.subtitle && (
          <p className="text-lg sm:text-xl text-slate-600 max-w-4xl leading-relaxed">
            {study.subtitle}
          </p>
        )}
      </div>

      {/* Hero Media Video/Image */}
      <div className="max-w-6xl mx-auto px-6 sm:px-8 mb-16">
        <div className="rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 shadow-2xl">
          {study.videoUrl ? (
            <video
              autoPlay
              loop
              muted
              playsInline
              poster={study.heroImageUrl}
              className="w-full aspect-[16/9] object-cover"
            >
              <source src={study.videoUrl} type="video/mp4" />
            </video>
          ) : (
            <img
              src={study.heroImageUrl}
              alt={study.title}
              className="w-full aspect-[16/9] object-cover"
            />
          )}
        </div>
      </div>

      {/* Metrics Banner */}
      {study.metrics && study.metrics.length > 0 && (
        <div className="max-w-6xl mx-auto px-6 sm:px-8 mb-20">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 p-8 rounded-2xl bg-slate-50 border border-slate-200">
            {study.metrics.map((m, idx) => (
              <div key={idx} className="text-center sm:text-left">
                <div className="text-3xl sm:text-4xl font-extrabold text-[#E5A93C] mb-1 font-mono">{m.label}</div>
                <div className="text-xs uppercase tracking-wider text-slate-600">{m.description}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main Study Details */}
      <div className="max-w-4xl mx-auto px-6 sm:px-8 space-y-16 text-slate-800">
        {/* Summary */}
        <div>
          <h3 className="text-xs uppercase tracking-widest font-semibold text-[#E5A93C] mb-3">
            Executive Summary
          </h3>
          <p className="text-lg text-slate-600 leading-relaxed">{study.summary}</p>
        </div>

        {/* Challenge */}
        {study.challenge && (
          <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200">
            <h3 className="text-2xl font-bold text-[#020E26] mb-4">The Challenge</h3>
            <p className="text-base text-slate-600 leading-relaxed">{study.challenge}</p>
          </div>
        )}

        {/* Solution */}
        {study.solution && (
          <div>
            <h3 className="text-2xl font-bold text-[#020E26] mb-4">The Solution Architecture</h3>
            <p className="text-base text-slate-600 leading-relaxed">{study.solution}</p>
          </div>
        )}

        {/* Results */}
        {study.results && (
          <div className="p-8 rounded-2xl bg-[#000B1E] text-white border border-slate-800">
            <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-[#E5A93C]" />
              Business Impact & Results
            </h3>
            <p className="text-base text-slate-300 leading-relaxed">{study.results}</p>
          </div>
        )}

        {/* Awards */}
        {study.awards && study.awards.length > 0 && (
          <div>
            <h3 className="text-xs uppercase tracking-widest font-semibold text-[#FFB800] mb-4">
              Accolades & Recognition
            </h3>
            <div className="flex flex-wrap gap-3">
              {study.awards.map((award, aIdx) => (
                <div
                  key={aIdx}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm font-semibold text-white"
                >
                  <Award className="w-4 h-4 text-[#FFB800]" />
                  <span>{award}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
