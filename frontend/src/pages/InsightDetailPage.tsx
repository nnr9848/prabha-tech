import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { publicApi } from '../api/client';
import { Article } from '../types';
import { ArrowLeft, BookOpen, Clock, User, Share2 } from 'lucide-react';

export const InsightDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const { data: article, isLoading, isError } = useQuery<Article>({
    queryKey: ['article', slug],
    queryFn: () => publicApi.getArticleBySlug(slug || ''),
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen pt-36 pb-20 flex items-center justify-center text-white">
        <div className="w-8 h-8 rounded-full border-2 border-[#E5A93C] border-t-transparent animate-spin"></div>
      </div>
    );
  }

  if (isError || !article) {
    return (
      <div className="min-h-screen pt-36 pb-20 max-w-4xl mx-auto px-6 text-center text-slate-900">
        <h2 className="text-3xl font-bold mb-4 text-[#020E26]">Article Not Found</h2>
        <Link to="/insights" className="text-[#E5A93C] hover:underline font-bold">
          Back to Insights
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-24 bg-white text-slate-900">
      <div className="max-w-4xl mx-auto px-6 sm:px-8 mb-8">
        <Link
          to="/insights"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-[#E5A93C] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>All Insights</span>
        </Link>
      </div>

      <article className="max-w-4xl mx-auto px-6 sm:px-8 text-slate-900">
        <div className="mb-8">
          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#E5A93C]/10 border border-[#E5A93C]/30 text-[#E5A93C] mb-4 inline-block">
            {article.category}
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#020E26] tracking-tight leading-tight mb-6">
            {article.title}
          </h1>
          <div className="flex items-center gap-4 text-xs text-slate-500 pb-6 border-b border-slate-200">
            <span className="flex items-center gap-1.5 font-medium text-[#020E26]">
              <User className="w-3.5 h-3.5 text-[#E5A93C]" />
              {article.authorName}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {article.readTime}
            </span>
          </div>
        </div>

        {/* Cover Image */}
        <div className="rounded-2xl overflow-hidden mb-12 border border-slate-200 shadow-2xl">
          <img
            src={article.coverImageUrl}
            alt={article.title}
            className="w-full aspect-[16/9] object-cover"
          />
        </div>

        {/* Lead Excerpt */}
        <div className="p-6 rounded-2xl bg-slate-50 border-l-4 border-[#E5A93C] mb-10">
          <p className="text-lg text-slate-700 italic leading-relaxed">
            "{article.excerpt}"
          </p>
        </div>

        {/* Article Content */}
        <div className="prose prose-invert max-w-none text-base sm:text-lg text-[#94A3B8] leading-relaxed space-y-6">
          <p>{article.content || article.excerpt}</p>
          <p>
            In the rapid evolution of next-generation finance, user retention is dictated not solely by interest rates or transaction speeds, but by clarity, emotional peace of mind, and the removal of cognitive hurdles. Modern banking interfaces must adapt to customer habits dynamically, utilizing predictive telemetry, frictionless authentication, and context-driven suggestions.
          </p>
          <p>
            When financial institutions replace fragmented feature silos with holistic customer journeys, engagement rates consistently surge by over 200%. The future belongs to those who view design not as decoration, but as the core driver of enterprise business transformation.
          </p>
        </div>
      </article>
    </div>
  );
};
