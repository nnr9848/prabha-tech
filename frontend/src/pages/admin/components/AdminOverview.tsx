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
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[var(--brand-primary,#9873ff)]/20 via-[#0A0D14] to-[#0A0D14] border border-[var(--brand-primary,#9873ff)]/30 p-6 sm:p-8">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--brand-primary,#9873ff)]/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--brand-primary,#9873ff)]/15 border border-[var(--brand-primary,#9873ff)]/30 text-[var(--brand-primary,#9873ff)] text-xs font-semibold">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Platform Health: Operational</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Enterprise CMS & Lead Management Cockpit
            </h2>
            <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
              Monitor project inquiries from global banking and fintech clients, manage your UX portfolio case studies, and distribute industry insights.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <PillButton
              onClick={() => onQuickCreate('case')}
              size="sm"
              icon={<Plus className="w-3.5 h-3.5 text-[var(--brand-primary,#9873ff)] group-hover:text-white transition-colors" />}
              iconPosition="left"
              showDefaultIcon={false}
            >
              Add Case Study
            </PillButton>
            <PillButton
              onClick={() => onQuickCreate('article')}
              variant="secondary"
              size="sm"
              icon={<Plus className="w-3.5 h-3.5" />}
              iconPosition="left"
              showDefaultIcon={false}
            >
              Write Article
            </PillButton>
          </div>
        </div>
      </div>

      {/* KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat, i) => (
          <div
            key={i}
            onClick={() => onNavigateTab(stat.tab)}
            className="group relative rounded-2xl bg-[#0D111A] border border-white/10 hover:border-[var(--brand-primary,#9873ff)]/40 p-5 cursor-pointer transition-all duration-300 hover:shadow-[0_10px_30px_rgba(152,115,255,0.08)] flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold text-[#94A3B8] group-hover:text-white transition-colors">
                  {stat.title}
                </span>
                <div className="w-9 h-9 rounded-xl bg-white/5 group-hover:bg-[var(--brand-primary,#9873ff)]/15 border border-white/10 group-hover:border-[var(--brand-primary,#9873ff)]/30 text-[#94A3B8] group-hover:text-[var(--brand-primary,#9873ff)] flex items-center justify-center transition-all duration-300">
                  {stat.icon}
                </div>
              </div>

              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-3xl font-black text-white tracking-tight">
                  {stat.value}
                </span>
              </div>

              <div className="flex items-center gap-1.5 mt-2">
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                    stat.changeType === 'highlight'
                      ? 'bg-[var(--brand-primary,#9873ff)] text-white shadow-sm animate-pulse'
                      : stat.changeType === 'positive'
                      ? 'bg-green-500/15 text-green-400 border border-green-500/20'
                      : 'bg-white/5 text-[#94A3B8]'
                  }`}
                >
                  {stat.change}
                </span>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between text-[11px] text-[#64748B] group-hover:text-[#94A3B8]">
              <span className="truncate pr-2">{stat.subtitle}</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#64748B] group-hover:text-[var(--brand-primary,#9873ff)] shrink-0 transition-colors" />
            </div>
          </div>
        ))}
      </div>

      {/* Two-Column Grid: Recent Inquiries & Portfolio Highlights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Inquiries List */}
        <div className="lg:col-span-2 rounded-2xl bg-[#0D111A] border border-white/10 p-6 space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[var(--brand-primary,#9873ff)]/15 border border-[var(--brand-primary,#9873ff)]/30 text-[var(--brand-primary,#9873ff)] flex items-center justify-center">
                <MessageSquare className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Recent Client Inquiries</h3>
                <p className="text-xs text-[#64748B]">Inbound leads awaiting review or followup</p>
              </div>
            </div>
            <button
              onClick={() => onNavigateTab('inquiries')}
              className="text-xs font-semibold text-[var(--brand-primary,#9873ff)] hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
            >
              <span>View All ({inquiries.length})</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="divide-y divide-white/5">
            {inquiries.length === 0 ? (
              <div className="py-10 text-center text-xs text-[#64748B]">
                No client inquiries recorded yet.
              </div>
            ) : (
              inquiries.slice(0, 5).map((inq) => (
                <div
                  key={inq.id}
                  onClick={() => onSelectInquiry(inq)}
                  className="py-3.5 flex items-center justify-between gap-4 hover:bg-white/5 px-2 rounded-xl transition-colors cursor-pointer group"
                >
                  <div className="space-y-1 min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white group-hover:text-[var(--brand-primary,#9873ff)] transition-colors truncate">
                        {inq.fullName}
                      </span>
                      {inq.companyName && (
                        <span className="text-[10px] text-[#64748B] px-2 py-0.5 rounded bg-white/5">
                          {inq.companyName}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#94A3B8] truncate">{inq.message || 'No message provided'}</p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-xs font-semibold text-[var(--brand-primary,#9873ff)] font-mono">
                      {inq.budgetRange}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                        inq.status === 'CONTACTED'
                          ? 'bg-green-500/20 text-green-400'
                          : inq.status === 'IN_REVIEW'
                          ? 'bg-yellow-500/20 text-yellow-400'
                          : 'bg-[var(--brand-primary,#9873ff)]/20 text-[var(--brand-primary,#9873ff)]'
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
        <div className="rounded-2xl bg-[#0D111A] border border-white/10 p-6 space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[var(--brand-primary,#9873ff)]/15 border border-[var(--brand-primary,#9873ff)]/30 text-[var(--brand-primary,#9873ff)] flex items-center justify-center">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Portfolio Highlights</h3>
                  <p className="text-xs text-[#64748B]">Active case studies</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {caseStudies.slice(0, 3).map((study) => (
                <div
                  key={study.id || study.slug}
                  className="p-3 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors flex items-center gap-3"
                >
                  <img
                    src={study.heroImageUrl}
                    alt={study.title}
                    className="w-12 h-12 rounded-lg object-cover shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-[var(--brand-primary,#9873ff)] uppercase">
                        {study.category}
                      </span>
                      {study.featured && (
                        <span className="text-[9px] font-semibold text-yellow-400 bg-yellow-400/10 px-1 rounded">
                          ★ Featured
                        </span>
                      )}
                    </div>
                    <h4 className="text-xs font-bold text-white truncate">{study.title}</h4>
                    <p className="text-[10px] text-[#64748B] truncate">Client: {study.clientName}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-white/5 flex items-center justify-between">
            <button
              onClick={() => onNavigateTab('case-studies')}
              className="w-full text-center py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-white transition-colors"
            >
              Manage Full Portfolio ({caseStudies.length})
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
