import React from 'react';
import {
  LayoutDashboard,
  Layers,
  BookOpen,
  MessageSquare,
  Share2,
  ChevronLeft,
  ChevronRight,
  Shield,
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { Link } from 'react-router-dom';

export type AdminTab = 'overview' | 'case-studies' | 'articles' | 'inquiries' | 'social-links';

interface AdminSidebarProps {
  activeTab: AdminTab;
  setActiveTab: (tab: AdminTab) => void;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  counts: {
    caseStudies: number;
    articles: number;
    inquiries: number;
    newInquiries: number;
    socialLinks: number;
  };
}

interface NavItem {
  id: AdminTab;
  label: string;
  icon: React.ReactNode;
  badge: number | null;
  highlightBadge?: string | null;
}

interface NavSection {
  group: string;
  items: NavItem[];
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  activeTab,
  setActiveTab,
  isCollapsed,
  setIsCollapsed,
  counts,
}) => {
  const navItems: NavSection[] = [
    {
      group: 'Analytics & Main',
      items: [
        {
          id: 'overview',
          label: 'Overview & KPIs',
          icon: <LayoutDashboard className="w-4 h-4" />,
          badge: null,
        },
      ],
    },
    {
      group: 'Content & CMS',
      items: [
        {
          id: 'case-studies',
          label: 'Case Studies',
          icon: <Layers className="w-4 h-4" />,
          badge: counts.caseStudies,
        },
        {
          id: 'articles',
          label: 'Articles / Insights',
          icon: <BookOpen className="w-4 h-4" />,
          badge: counts.articles,
        },
        {
          id: 'social-links',
          label: 'Social Channels',
          icon: <Share2 className="w-4 h-4" />,
          badge: counts.socialLinks,
        },
      ],
    },
    {
      group: 'Inbound Growth',
      items: [
        {
          id: 'inquiries',
          label: 'Lead Inquiries',
          icon: <MessageSquare className="w-4 h-4" />,
          badge: counts.inquiries,
          highlightBadge: counts.newInquiries > 0 ? `${counts.newInquiries} New` : null,
        },
      ],
    },
  ];

  return (
    <aside
      className={`fixed top-0 left-0 bottom-0 z-40 bg-[#0A0D14]/90 backdrop-blur-xl border-r border-white/10 flex flex-col justify-between transition-all duration-300 ease-in-out ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Brand Header */}
      <div>
        <div className="h-20 flex items-center justify-between px-5 border-b border-white/10">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-10 h-10 min-w-[2.5rem] rounded-xl bg-[var(--brand-primary,#9873ff)]/15 border border-[var(--brand-primary,#9873ff)]/30 text-[var(--brand-primary,#9873ff)] flex items-center justify-center shadow-[0_0_15px_rgba(152,115,255,0.2)]">
              <Shield className="w-5 h-5" />
            </div>
            {!isCollapsed && (
              <div className="transition-opacity duration-200">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-bold text-white tracking-wide">PRABHATECH</span>
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-[var(--brand-primary,#9873ff)]/20 text-[var(--brand-primary,#9873ff)] uppercase tracking-wider">
                    CMS
                  </span>
                </div>
                <p className="text-[10px] text-[#64748B] font-mono">v2.4 Enterprise</p>
              </div>
            )}
          </div>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden md:flex p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[#94A3B8] hover:text-white transition-colors cursor-pointer"
            title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation Sections */}
        <div className="p-3 space-y-6 overflow-y-auto max-h-[calc(100vh-12rem)]">
          {navItems.map((section, idx) => (
            <div key={idx} className="space-y-1.5">
              {!isCollapsed && (
                <div className="px-3 text-[10px] font-bold uppercase tracking-wider text-[#64748B]">
                  {section.group}
                </div>
              )}
              {section.items.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    title={isCollapsed ? item.label : undefined}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer group ${
                      isActive
                        ? 'bg-[var(--brand-primary,#9873ff)]/15 text-white border border-[var(--brand-primary,#9873ff)]/30 shadow-[0_0_12px_rgba(152,115,255,0.15)]'
                        : 'text-[#94A3B8] hover:text-white hover:bg-white/5 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`transition-colors ${
                          isActive
                            ? 'text-[var(--brand-primary,#9873ff)]'
                            : 'text-[#64748B] group-hover:text-white'
                        }`}
                      >
                        {item.icon}
                      </div>
                      {!isCollapsed && <span>{item.label}</span>}
                    </div>

                    {!isCollapsed && (
                      <div className="flex items-center gap-1.5">
                        {item.highlightBadge && (
                          <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-[var(--brand-primary,#9873ff)] text-white shadow-sm animate-pulse">
                            {item.highlightBadge}
                          </span>
                        )}
                        {item.badge !== null && !item.highlightBadge && (
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                              isActive
                                ? 'bg-white/10 text-white'
                                : 'bg-white/5 text-[#64748B] group-hover:text-white'
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Sidebar Footer */}
      <div className="p-3 border-t border-white/10 space-y-2">
        <Link
          to="/"
          target="_blank"
          className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold text-[#94A3B8] hover:text-white hover:bg-white/5 transition-colors"
          title="Open Public Site"
        >
          <ExternalLink className="w-4 h-4 text-[#64748B]" />
          {!isCollapsed && <span>Public Website</span>}
        </Link>
        {!isCollapsed && (
          <div className="p-3 rounded-xl bg-gradient-to-br from-[var(--brand-primary,#9873ff)]/10 to-transparent border border-[var(--brand-primary,#9873ff)]/20">
            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-white mb-1">
              <Sparkles className="w-3.5 h-3.5 text-[var(--brand-primary,#9873ff)]" />
              <span>System Live</span>
            </div>
            <p className="text-[10px] text-[#94A3B8] leading-tight">
              PostgreSQL & REST APIs operational.
            </p>
          </div>
        )}
      </div>
    </aside>
  );
};
