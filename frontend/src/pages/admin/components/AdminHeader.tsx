import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import {
  Bell,
  LogOut,
  Plus,
  ExternalLink,
  Search,
  Sparkles,
  Layers,
  BookOpen,
  Share2,
  Menu,
  MessageSquare,
  Users,
  ChevronRight,
  Clock,
  CheckCircle2,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { AdminTab } from './AdminSidebar';
import { LeadInquiry, JobApplication } from '../../../types';

interface AdminHeaderProps {
  activeTab: AdminTab;
  onQuickCreate: (type: 'case' | 'article' | 'social' | 'service') => void;
  unreadInquiriesCount: number;
  unreadApplicationsCount?: number;
  recentInquiries?: LeadInquiry[];
  recentApplications?: JobApplication[];
  onNavigateToInquiry?: (inquiry: LeadInquiry) => void;
  onNavigateToApplications?: () => void;
  onToggleMobileMenu?: () => void;
}

const TAB_TITLES: Record<AdminTab, { title: string; subtitle: string; category: string }> = {
  overview: {
    category: 'Analytics',
    title: 'Executive Dashboard',
    subtitle: 'Real-time performance metrics, portfolio statistics, and inbound client velocity.',
  },
  services: {
    category: 'Content Management',
    title: 'Enterprise Services CMS',
    subtitle: 'Manage core capabilities, technical deliverables, architectural scopes, and icons.',
  },
  'case-studies': {
    category: 'Content Management',
    title: 'UX Portfolio & Case Studies',
    subtitle: 'Curate client transformations, impact metrics, and featured case studies.',
  },
  articles: {
    category: 'Content Management',
    title: 'Blog & Thought Leadership',
    subtitle: 'Manage research articles, market insights, and publication schedules.',
  },
  inquiries: {
    category: 'Inbound Growth',
    title: 'Client Inquiries & RFPs',
    subtitle: 'Track inbound client submissions, estimated budgets, and workflow stages.',
  },
  jobs: {
    category: 'Talent Acquisition',
    title: 'Careers & Open Roles',
    subtitle: 'Manage job postings, requisitions, requirements, and active recruitment pipelines.',
  },
  'job-applications': {
    category: 'Talent Acquisition',
    title: 'Candidate Applications & ATS',
    subtitle: 'Review candidate dossiers, stage pipelines, resume links, and hiring statuses.',
  },
  'social-links': {
    category: 'Platform Settings',
    title: 'Brand Social Channels',
    subtitle: 'Configure dynamic social media channels rendered across the web portal.',
  },
  trash: {
    category: 'Data Governance & Recovery',
    title: 'Centralized Recycle Bin & Trash Hub',
    subtitle: 'Audit, restore, or permanently purge soft-deleted records across CMS, Careers, and Inquiries.',
  },
};

export const AdminHeader: React.FC<AdminHeaderProps> = ({
  activeTab,
  onQuickCreate,
  unreadInquiriesCount,
  unreadApplicationsCount = 0,
  recentInquiries = [],
  recentApplications = [],
  onNavigateToInquiry,
  onNavigateToApplications,
  onToggleMobileMenu,
}) => {
  const { user, logout } = useAuth();
  const meta = TAB_TITLES[activeTab] || TAB_TITLES.overview;

  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notificationTab, setNotificationTab] = useState<'inquiries' | 'applications'>('inquiries');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const totalNotifications = unreadInquiriesCount + unreadApplicationsCount;

  // Click outside listener to dismiss flyout
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsNotificationOpen(false);
      }
    };
    if (isNotificationOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isNotificationOpen]);

  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200 px-4 sm:px-8 py-3.5 sm:py-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4">
        {/* Breadcrumb & Section Title with Mobile Hamburger */}
        <div className="flex items-center gap-3">
          {/* Mobile Hamburger Button */}
          <button
            onClick={onToggleMobileMenu}
            className="flex md:hidden p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors border border-slate-200 cursor-pointer shrink-0"
            aria-label="Toggle navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div>
            <div className="flex items-center gap-2 text-[11px] font-medium text-slate-500 mb-0.5 sm:mb-1">
              <span>Admin</span>
              <span>/</span>
              <span className="text-amber-700 font-medium">{meta.category}</span>
              <span>/</span>
              <span className="text-slate-900 font-semibold">{meta.title}</span>
            </div>
            <h1 className="text-lg sm:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              {meta.title}
            </h1>
          </div>
        </div>

        {/* Action Controls & User Profile */}
        <div className="flex items-center flex-wrap gap-3">
          {/* Quick Create Dropdown / Buttons based on tab context */}
          {activeTab === 'case-studies' && (
            <button
              onClick={() => onQuickCreate('case')}
              className="py-2 px-3.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-xs flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 text-slate-950" />
              <span>New Case Study</span>
            </button>
          )}

          {activeTab === 'articles' && (
            <button
              onClick={() => onQuickCreate('article')}
              className="py-2 px-3.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-xs flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 text-slate-950" />
              <span>New Article</span>
            </button>
          )}

          {activeTab === 'jobs' && (
            <button
              onClick={() => onQuickCreate('job' as any)}
              className="py-2 px-3.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-xs flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 text-slate-950" />
              <span>Post New Role</span>
            </button>
          )}

          {activeTab === 'social-links' && (
            <button
              onClick={() => onQuickCreate('social')}
              className="py-2 px-3.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-xs flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 text-slate-950" />
              <span>Add Social Link</span>
            </button>
          )}

          {activeTab === 'overview' && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => onQuickCreate('case')}
                className="py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <Layers className="w-3.5 h-3.5 text-slate-600" />
                <span>+ Case</span>
              </button>
              <button
                onClick={() => onQuickCreate('article')}
                className="py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <BookOpen className="w-3.5 h-3.5 text-slate-600" />
                <span>+ Article</span>
              </button>
            </div>
          )}

          {/* Interactive Unread Inquiries & Applications Notification Center */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsNotificationOpen((prev) => !prev)}
              className={`p-2 rounded-xl border transition-all cursor-pointer relative ${
                isNotificationOpen
                  ? 'bg-amber-100/80 border-amber-400 text-amber-950 shadow-xs ring-2 ring-amber-500/20'
                  : totalNotifications > 0
                  ? 'bg-amber-50 hover:bg-amber-100 border-amber-300 text-amber-800'
                  : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-500'
              }`}
              title={`${totalNotifications} new unread submissions`}
              aria-label="Open notifications flyout"
            >
              <Bell className="w-4 h-4" />
              {totalNotifications > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-500 text-slate-950 text-[9px] font-bold flex items-center justify-center animate-pulse shadow-xs">
                  {totalNotifications}
                </span>
              )}
            </button>

            {/* Floating Dropdown Panel */}
            {isNotificationOpen && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl border border-slate-200/90 shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
                {/* Header */}
                <div className="p-3.5 bg-slate-50/90 border-b border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900 tracking-tight">Notifications</span>
                    {totalNotifications > 0 && (
                      <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-200">
                        {totalNotifications} New
                      </span>
                    )}
                  </div>

                  <span className="text-[10px] text-slate-400 font-mono">Live Inbound Feed</span>
                </div>

                {/* Filter Sub-Tabs */}
                <div className="flex border-b border-slate-100 bg-white">
                  <button
                    onClick={() => setNotificationTab('inquiries')}
                    className={`flex-1 py-2 px-3 text-[11px] font-semibold flex items-center justify-center gap-1.5 border-b-2 transition-colors cursor-pointer ${
                      notificationTab === 'inquiries'
                        ? 'border-amber-500 text-amber-900 bg-amber-50/40'
                        : 'border-transparent text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Inquiries</span>
                    {unreadInquiriesCount > 0 && (
                      <span className="px-1.5 py-0.2 rounded-full text-[9px] font-bold bg-amber-200 text-amber-900">
                        {unreadInquiriesCount}
                      </span>
                    )}
                  </button>

                  <button
                    onClick={() => setNotificationTab('applications')}
                    className={`flex-1 py-2 px-3 text-[11px] font-semibold flex items-center justify-center gap-1.5 border-b-2 transition-colors cursor-pointer ${
                      notificationTab === 'applications'
                        ? 'border-amber-500 text-amber-900 bg-amber-50/40'
                        : 'border-transparent text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    <Users className="w-3.5 h-3.5" />
                    <span>Applicants</span>
                    {unreadApplicationsCount > 0 && (
                      <span className="px-1.5 py-0.2 rounded-full text-[9px] font-bold bg-amber-200 text-amber-900">
                        {unreadApplicationsCount}
                      </span>
                    )}
                  </button>
                </div>

                {/* Notification List Body */}
                <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
                  {notificationTab === 'inquiries' && (
                    <>
                      {recentInquiries.length === 0 ? (
                        <div className="p-8 text-center text-slate-400">
                          <CheckCircle2 className="w-6 h-6 mx-auto mb-1.5 text-slate-300" />
                          <p className="text-xs font-medium text-slate-600">All caught up!</p>
                          <p className="text-[10px] text-slate-400 mt-0.5">No unreviewed lead inquiries.</p>
                        </div>
                      ) : (
                        recentInquiries.map((inq) => (
                          <div
                            key={inq.id}
                            onClick={() => {
                              onNavigateToInquiry?.(inq);
                              setIsNotificationOpen(false);
                            }}
                            className="p-3 hover:bg-amber-50/50 transition-colors cursor-pointer group flex items-start gap-2.5"
                          >
                            <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                              {(inq.fullName || 'C')[0].toUpperCase()}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-1">
                                <h5 className="text-xs font-bold text-slate-900 truncate group-hover:text-amber-900">
                                  {inq.fullName}
                                </h5>
                                <span className="text-[9px] text-slate-400 font-mono shrink-0">
                                  {inq.createdAt ? new Date(inq.createdAt).toLocaleDateString() : 'New'}
                                </span>
                              </div>
                              <p className="text-[11px] text-slate-500 truncate">
                                {inq.companyName ? `${inq.companyName} • ` : ''}
                                {inq.projectType || 'General Inquiry'}
                              </p>
                            </div>
                            <ChevronRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-amber-600 shrink-0 self-center" />
                          </div>
                        ))
                      )}
                    </>
                  )}

                  {notificationTab === 'applications' && (
                    <>
                      {recentApplications.length === 0 ? (
                        <div className="p-8 text-center text-slate-400">
                          <CheckCircle2 className="w-6 h-6 mx-auto mb-1.5 text-slate-300" />
                          <p className="text-xs font-medium text-slate-600">No pending candidates</p>
                          <p className="text-[10px] text-slate-400 mt-0.5">All applications reviewed.</p>
                        </div>
                      ) : (
                        recentApplications.map((app) => (
                          <div
                            key={app.id}
                            onClick={() => {
                              onNavigateToApplications?.();
                              setIsNotificationOpen(false);
                            }}
                            className="p-3 hover:bg-amber-50/50 transition-colors cursor-pointer group flex items-start gap-2.5"
                          >
                            <div className="w-7 h-7 rounded-lg bg-purple-100 text-purple-800 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                              {(app.fullName || 'A')[0].toUpperCase()}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-1">
                                <h5 className="text-xs font-bold text-slate-900 truncate group-hover:text-amber-900">
                                  {app.fullName}
                                </h5>
                                <span className="text-[9px] text-slate-400 font-mono shrink-0">
                                  {app.createdAt ? new Date(app.createdAt).toLocaleDateString() : 'New'}
                                </span>
                              </div>
                              <p className="text-[11px] text-slate-500 truncate">
                                Applied for {app.jobTitle}
                              </p>
                            </div>
                            <ChevronRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-amber-600 shrink-0 self-center" />
                          </div>
                        ))
                      )}
                    </>
                  )}
                </div>

                {/* Footer Link */}
                <div className="p-2.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
                  <button
                    onClick={() => {
                      if (notificationTab === 'inquiries') {
                        onNavigateToInquiry?.(recentInquiries[0] || ({} as any));
                      } else {
                        onNavigateToApplications?.();
                      }
                      setIsNotificationOpen(false);
                    }}
                    className="text-amber-800 hover:text-amber-900 font-semibold text-[11px] hover:underline cursor-pointer flex items-center gap-1"
                  >
                    <span>View all {notificationTab === 'inquiries' ? 'Inquiries' : 'Applications'}</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => setIsNotificationOpen(false)}
                    className="text-slate-400 hover:text-slate-600 text-[10px] cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="h-6 w-[1px] bg-slate-200 hidden sm:block"></div>

          {/* User Profile Pill & Logout */}
          <div className="flex items-center gap-2.5 pl-1">
            <div className="w-8 h-8 rounded-full bg-amber-500 text-slate-950 text-xs font-bold flex items-center justify-center shadow-xs">
              {(user?.fullName || user?.username || 'A')[0].toUpperCase()}
            </div>
            <div className="hidden lg:block text-left">
              <div className="text-xs font-semibold text-slate-900 leading-tight">
                {user?.fullName || user?.username || 'Admin User'}
              </div>
              <div className="text-[10px] text-amber-700 font-medium">Administrator</div>
            </div>
            <button
              onClick={logout}
              className="p-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 transition-colors cursor-pointer ml-1"
              title="Sign out of Admin Portal"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
