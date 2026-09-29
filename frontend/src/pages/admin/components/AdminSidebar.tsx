import React from 'react';
import {
  LayoutDashboard,
  Layers,
  BookOpen,
  MessageSquare,
  Share2,
  Briefcase,
  Users,
  ChevronLeft,
  ChevronRight,
  Shield,
  ExternalLink,
  Sparkles,
  X,
  Trash2,
} from 'lucide-react';
import { Link } from 'react-router-dom';

export type AdminTab =
  | 'overview'
  | 'case-studies'
  | 'articles'
  | 'jobs'
  | 'job-applications'
  | 'inquiries'
  | 'social-links'
  | 'trash';

interface AdminSidebarProps {
  activeTab: AdminTab;
  setActiveTab: (tab: AdminTab) => void;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  isMobileOpen?: boolean;
  setIsMobileOpen?: (open: boolean) => void;
  counts: {
    caseStudies: number;
    articles: number;
    jobs: number;
    applications: number;
    newApplications: number;
    inquiries: number;
    newInquiries: number;
    socialLinks: number;
    trash: number;
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
  isMobileOpen = false,
  setIsMobileOpen,
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
          id: 'jobs',
          label: 'Careers / Roles',
          icon: <Briefcase className="w-4 h-4" />,
          badge: counts.jobs,
        },
        {
          id: 'job-applications',
          label: 'Job Applicants',
          icon: <Users className="w-4 h-4" />,
          badge: counts.applications,
          highlightBadge: counts.newApplications > 0 ? `${counts.newApplications} New` : null,
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

  const handleTabClick = (id: AdminTab) => {
    setActiveTab(id);
    if (setIsMobileOpen) {
      setIsMobileOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen?.(false)}
          className="fixed inset-0 bg-slate-950/50 backdrop-blur-xs z-40 md:hidden transition-opacity duration-300"
          aria-hidden="true"
        />
      )}

      {/* Sidebar Aside */}
      <aside
        className={`fixed top-0 left-0 bottom-0 z-50 md:z-40 bg-white border-r border-slate-200 flex flex-col justify-between transition-all duration-300 ease-in-out shadow-lg md:shadow-sm ${
          // Mobile responsive: slide in/out
          isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        } ${isCollapsed ? 'md:w-20 w-64' : 'w-64'}`}
      >
        {/* Brand Header */}
        <div>
          <div className="h-20 flex items-center justify-between px-5 border-b border-slate-100">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-10 h-10 min-w-[2.5rem] rounded-xl bg-amber-50 border border-amber-200/80 text-amber-700 flex items-center justify-center shadow-sm">
                <Shield className="w-5 h-5" />
              </div>
              {(!isCollapsed || isMobileOpen) && (
                <div className="transition-opacity duration-200">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-bold text-slate-900 tracking-wide">PRABHATECH</span>
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-amber-100 text-amber-800 uppercase tracking-wider">
                      CMS
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400 font-mono">v2.4 Enterprise</p>
                </div>
              )}
            </div>

            {/* Desktop Collapse / Expand Button */}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hidden md:flex p-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer border border-slate-200"
              title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
            >
              {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>

            {/* Mobile Close Drawer Button */}
            <button
              onClick={() => setIsMobileOpen?.(false)}
              className="flex md:hidden p-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer border border-slate-200"
              aria-label="Close sidebar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Sections */}
          <div className="p-3 space-y-6 overflow-y-auto max-h-[calc(100vh-12rem)]">
            {navItems.map((section, idx) => (
              <div key={idx} className="space-y-1.5">
                {(!isCollapsed || isMobileOpen) && (
                  <div className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    {section.group}
                  </div>
                )}
                {section.items.map((item) => {
                  const isActive = activeTab === item.id;
                  const showFullText = !isCollapsed || isMobileOpen;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleTabClick(item.id)}
                      title={!showFullText ? item.label : undefined}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer group ${
                        isActive
                          ? 'bg-amber-50 text-amber-900 border border-amber-200/80 shadow-xs'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`transition-colors ${
                            isActive
                              ? 'text-amber-600'
                              : 'text-slate-400 group-hover:text-slate-600'
                          }`}
                        >
                          {item.icon}
                        </div>
                        {showFullText && <span>{item.label}</span>}
                      </div>

                      {showFullText && (
                        <div className="flex items-center gap-1.5">
                          {item.highlightBadge && (
                            <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500 text-slate-950 shadow-xs">
                              {item.highlightBadge}
                            </span>
                          )}
                          {item.badge !== null && !item.highlightBadge && (
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                                isActive
                                  ? 'bg-amber-100 text-amber-800'
                                  : 'bg-slate-100 text-slate-500 group-hover:text-slate-700'
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
        <div className="p-3 border-t border-slate-100 space-y-1.5">
          {/* Centralized Trash / Recycle Bin Navigation */}
          <button
            onClick={() => handleTabClick('trash')}
            title={isCollapsed && !isMobileOpen ? 'Recycle Bin / Trash' : undefined}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer ${
              activeTab === 'trash'
                ? 'bg-amber-50 text-amber-900 border border-amber-200/80 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-transparent'
            }`}
          >
            <div className="flex items-center gap-3">
              <Trash2
                className={`w-4 h-4 transition-colors ${
                  activeTab === 'trash' ? 'text-amber-600' : 'text-slate-400 group-hover:text-slate-600'
                }`}
              />
              {(!isCollapsed || isMobileOpen) && <span>Recycle Bin</span>}
            </div>

            {(!isCollapsed || isMobileOpen) && counts.trash > 0 && (
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  activeTab === 'trash'
                    ? 'bg-amber-100 text-amber-900'
                    : 'bg-red-50 text-red-600 border border-red-200/60'
                }`}
              >
                {counts.trash}
              </span>
            )}
          </button>

          <Link
            to="/"
            target="_blank"
            onClick={() => setIsMobileOpen?.(false)}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"
            title="Open Public Site"
          >
            <ExternalLink className="w-4 h-4 text-slate-400" />
            {(!isCollapsed || isMobileOpen) && <span>Public Website</span>}
          </Link>
          {(!isCollapsed || isMobileOpen) && (
            <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200/50">
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-amber-900 mb-0.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>System Live</span>
              </div>
              <p className="text-[10px] text-slate-500 leading-tight">
                PostgreSQL & REST APIs operational.
              </p>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};
