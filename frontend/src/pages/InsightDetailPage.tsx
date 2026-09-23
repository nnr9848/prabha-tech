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
        <div className="w-8 h-8 rounded-full border-2 border-[#9873ff] border-t-transparent animate-spin"></div>
      </div>
    );
  }

  if (isError || !article) {
    return (
      <div className="min-h-screen pt-36 pb-20 max-w-4xl mx-auto px-6 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">Article Not Found</h2>
        <Link to="/insights" className="text-[#9873ff] underline">
          Back to Insights
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-24">
      <div className="max-w-4xl mx-auto px-6 sm:px-8 mb-8">
        <Link
          to="/insights"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#94A3B8] hover:text-[#9873ff] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>All Insights</span>
        </Link>
      </div>

      <article className="max-w-4xl mx-auto px-6 sm:px-8 text-white">
        <div className="mb-8">
          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#9873ff]/15 border border-[#9873ff]/30 text-[#9873ff] mb-4 inline-block">
            {article.category}
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight mb-6">
            {article.title}
          </h1>
          <div className="flex items-center gap-4 text-xs text-[#94A3B8] pb-6 border-b border-white/10">
            <span className="flex items-center gap-1.5 font-medium text-white">
              <User className="w-3.5 h-3.5 text-[#9873ff]" />
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
        <div className="rounded-2xl overflow-hidden mb-12 border border-white/10 shadow-2xl">
          <img
            src={article.coverImageUrl}
            alt={article.title}
            className="w-full aspect-[16/9] object-cover"
          />
        </div>

        {/* Lead Excerpt */}
        <div className="p-6 rounded-2xl bg-[#0D111A] border-l-4 border-[#9873ff] mb-10">
          <p className="text-lg text-[#94A3B8] italic leading-relaxed">
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
