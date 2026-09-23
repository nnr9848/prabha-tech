import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { publicApi } from '../api/client';
import { Article } from '../types';
import { Link } from 'react-router-dom';
import { BookOpen, ArrowRight, Sparkles } from 'lucide-react';

export const InsightsPage: React.FC = () => {
  const { data: articles = [] } = useQuery<Article[]>({
    queryKey: ['articles', 'all'],
    queryFn: () => publicApi.getArticles(),
  });

  return (
    <div className="pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 mb-16 text-center">
        <div className="text-xs uppercase tracking-widest font-semibold text-[#00F0FF] mb-3">
          Thought Leadership
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight mb-4">
          Fintech UX Insights & Whitepapers
        </h1>
        <p className="text-base sm:text-lg text-[#94A3B8] max-w-2xl mx-auto">
          Deep-dive analysis, trends, and execution strategies on the future of financial experience design.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((art) => (
            <Link
              key={art.slug}
              to={`/insights/${art.slug}`}
              className="group rounded-2xl bg-[#0D111A] border border-white/10 overflow-hidden hover:border-[#00F0FF]/40 transition-all duration-300 flex flex-col"
            >
              <div className="aspect-[16/10] overflow-hidden bg-black relative">
                <img
                  src={art.coverImageUrl}
                  alt={art.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-black/60 border border-white/10 text-[#00F0FF]">
                  {art.category}
                </span>
              </div>
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-xs text-[#64748B] mb-2 flex items-center gap-2">
                    <span>{art.authorName}</span>
                    <span>•</span>
                    <span>{art.readTime || '5 min read'}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white group-hover:text-[#00F0FF] transition-colors mb-3 leading-snug">
                    {art.title}
                  </h3>
                  <p className="text-xs text-[#94A3B8] leading-relaxed line-clamp-3">
                    {art.excerpt}
                  </p>
                </div>
                <div className="pt-4 mt-6 border-t border-white/5 flex items-center text-xs font-bold uppercase tracking-wider text-[#00F0FF]">
                  <span>Read Article</span>
                  <ArrowRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
