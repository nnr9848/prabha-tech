import React from 'react';
import {
  Layers,
  BookOpen,
  MessageSquare,
  Share2,
  TrendingUp,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  Plus,
  ExternalLink,
} from 'lucide-react';
import { CaseStudy, Article, LeadInquiry, SocialLink } from '../../../types';
import { PillButton } from '../../../components/common/PillButton';
import { AdminTab } from './AdminSidebar';

interface AdminOverviewProps {
  caseStudies: CaseStudy[];
  articles: Article[];
  inquiries: LeadInquiry[];
  socialLinks: SocialLink[];
  onNavigateTab: (tab: AdminTab) => void;
  onQuickCreate: (type: 'case' | 'article' | 'social') => void;
  onSelectInquiry: (inquiry: LeadInquiry) => void;
}

export const AdminOverview: React.FC<AdminOverviewProps> = ({
  caseStudies,
  articles,
  inquiries,
  socialLinks,
  onNavigateTab,
  onQuickCreate,
  onSelectInquiry,
}) => {
  const newInquiries = inquiries.filter((i) => !i.status || i.status === 'NEW');
  const inReviewInquiries = inquiries.filter((i) => i.status === 'IN_REVIEW');
  const contactedInquiries = inquiries.filter((i) => i.status === 'CONTACTED');
  const activeSocials = socialLinks.filter((s) => s.isActive);
  const featuredCases = caseStudies.filter((c) => c.featured);

  const stats = [
    {
      title: 'Inbound Inquiries',
      value: inquiries.length,
      change: `${newInquiries.length} New Unread`,
      changeType: newInquiries.length > 0 ? 'highlight' : 'neutral',
      icon: <MessageSquare className="w-5 h-5" />,
      tab: 'inquiries' as AdminTab,
      subtitle: `${contactedInquiries.length} responded (${inquiries.length > 0 ? Math.round((contactedInquiries.length / inquiries.length) * 100) : 0}% velocity)`,
    },
    {
      title: 'UX Case Studies',
      value: caseStudies.length,
      change: `${featuredCases.length} Featured`,
      changeType: 'positive',
      icon: <Layers className="w-5 h-5" />,
      tab: 'case-studies' as AdminTab,
      subtitle: 'Portfolio showcase live on homepage',
    },
    {
      title: 'Published Articles',
      value: articles.length,
      change: 'Active Insights',
      changeType: 'positive',
      icon: <BookOpen className="w-5 h-5" />,
      tab: 'articles' as AdminTab,
      subtitle: 'Fintech & Design thought leadership',
    },
    {
      title: 'Active Social Channels',
      value: `${activeSocials.length} / ${socialLinks.length}`,
      change: 'Dynamic CMS',
      changeType: 'neutral',
      icon: <Share2 className="w-5 h-5" />,
      tab: 'social-links' as AdminTab,
      subtitle: 'Rendered in Header & Footer',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-50 via-white to-slate-50 border border-amber-200/80 p-6 sm:p-8 shadow-xs">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 border border-amber-300/80 text-amber-900 text-xs font-semibold">
              <TrendingUp className="w-3.5 h-3.5 text-amber-700" />
              <span>Platform Health: Operational (PostgreSQL & Spring Boot)</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Enterprise CMS & Lead Management Cockpit
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Monitor project inquiries from GCC and global enterprise clients, manage your software portfolio case studies, and distribute AI and tech insights.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => onQuickCreate('case')}
              className="py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 text-slate-950" />
              <span>Add Case Study</span>
            </button>
            <button
              onClick={() => onQuickCreate('article')}
              className="py-2.5 px-4 rounded-xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <Plus className="w-3.5 h-3.5 text-slate-500" />
              <span>Write Article</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat, i) => (
          <div
            key={i}
            onClick={() => onNavigateTab(stat.tab)}
            className="group relative rounded-2xl bg-white border border-slate-200/80 hover:border-amber-400 p-5 cursor-pointer transition-all duration-300 hover:shadow-md shadow-2xs flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold text-slate-500 group-hover:text-slate-900 transition-colors">
                  {stat.title}
                </span>
                <div className="w-9 h-9 rounded-xl bg-slate-50 group-hover:bg-amber-50 border border-slate-200 group-hover:border-amber-300 text-slate-500 group-hover:text-amber-700 flex items-center justify-center transition-all duration-300">
                  {stat.icon}
                </div>
              </div>

              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-3xl font-black text-slate-900 tracking-tight">
                  {stat.value}
                </span>
              </div>

              <div className="flex items-center gap-1.5 mt-2">
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                    stat.changeType === 'highlight'
                      ? 'bg-amber-100 text-amber-900 border border-amber-300/60 font-bold'
                      : stat.changeType === 'positive'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {stat.change}
                </span>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 group-hover:text-slate-600">
              <span className="truncate pr-2">{stat.subtitle}</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-700 shrink-0 transition-colors" />
            </div>
          </div>
        ))}
      </div>

      {/* Two-Column Grid: Recent Inquiries & Portfolio Highlights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Inquiries List */}
        <div className="lg:col-span-2 rounded-2xl bg-white border border-slate-200/80 p-6 space-y-5 shadow-2xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-200/80 text-amber-700 flex items-center justify-center">
                <MessageSquare className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Recent Client Inquiries</h3>
                <p className="text-xs text-slate-500">Inbound leads awaiting review or followup</p>
              </div>
            </div>
            <button
              onClick={() => onNavigateTab('inquiries')}
              className="text-xs font-semibold text-amber-700 hover:text-amber-800 flex items-center gap-1 transition-colors cursor-pointer"
            >
              <span>View All ({inquiries.length})</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="divide-y divide-slate-100">
            {inquiries.length === 0 ? (
              <div className="py-10 text-center text-xs text-slate-400">
                No client inquiries recorded yet.
              </div>
            ) : (
              inquiries.slice(0, 5).map((inq) => (
                <div
                  key={inq.id}
                  onClick={() => onSelectInquiry(inq)}
                  className="py-3.5 flex items-center justify-between gap-4 hover:bg-slate-50 px-2 rounded-xl transition-colors cursor-pointer group"
                >
                  <div className="space-y-1 min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900 group-hover:text-amber-700 transition-colors truncate">
                        {inq.fullName}
                      </span>
                      {inq.companyName && (
                        <span className="text-[10px] text-slate-500 px-2 py-0.5 rounded bg-slate-100">
                          {inq.companyName}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 truncate">{inq.message || 'No message provided'}</p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-xs font-semibold text-amber-700 font-mono">
                      {inq.budgetRange}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                        inq.status === 'CONTACTED'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : inq.status === 'IN_REVIEW'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-amber-100 text-amber-800 border border-amber-300'
                      }`}
                    >
                      {inq.status || 'NEW'}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Content Quick Status & Summary */}
        <div className="rounded-2xl bg-white border border-slate-200/80 p-6 space-y-5 flex flex-col justify-between shadow-2xs">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-200/80 text-amber-700 flex items-center justify-center">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Portfolio Highlights</h3>
                  <p className="text-xs text-slate-500">Active case studies</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {caseStudies.slice(0, 3).map((study) => (
                <div
                  key={study.id || study.slug}
                  className="p-3 rounded-xl bg-slate-50 border border-slate-100 hover:border-slate-200 transition-colors flex items-center gap-3"
                >
                  <img
                    src={study.heroImageUrl}
                    alt={study.title}
                    className="w-12 h-12 rounded-lg object-cover shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-amber-700 uppercase">
                        {study.category}
                      </span>
                      {study.featured && (
                        <span className="text-[9px] font-semibold text-amber-700 bg-amber-100 px-1 rounded">
                          ★ Featured
                        </span>
                      )}
                    </div>
                    <h4 className="text-xs font-bold text-slate-900 truncate">{study.title}</h4>
                    <p className="text-[10px] text-slate-500 truncate">Client: {study.clientName}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={() => onNavigateTab('case-studies')}
              className="w-full text-center py-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-xs font-semibold text-slate-700 border border-slate-200 transition-colors cursor-pointer"
            >
              Manage Full Portfolio ({caseStudies.length})
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
