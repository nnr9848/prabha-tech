import React from 'react';
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
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { AdminTab } from './AdminSidebar';

interface AdminHeaderProps {
  activeTab: AdminTab;
  onQuickCreate: (type: 'case' | 'article' | 'social') => void;
  unreadInquiriesCount: number;
  onToggleMobileMenu?: () => void;
}

const TAB_TITLES: Record<AdminTab, { title: string; subtitle: string; category: string }> = {
  overview: {
    category: 'Analytics',
    title: 'Executive Dashboard',
    subtitle: 'Real-time performance metrics, portfolio statistics, and inbound client velocity.',
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
};

export const AdminHeader: React.FC<AdminHeaderProps> = ({
  activeTab,
  onQuickCreate,
  unreadInquiriesCount,
  onToggleMobileMenu,
}) => {
  const { user, logout } = useAuth();
  const meta = TAB_TITLES[activeTab] || TAB_TITLES.overview;

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

          {/* Unread Inquiries Notification Pill */}
          <div className="relative">
            <div
              className={`p-2 rounded-xl border transition-all ${
                unreadInquiriesCount > 0
                  ? 'bg-amber-50 border-amber-300 text-amber-800'
                  : 'bg-slate-50 border-slate-200 text-slate-500'
              }`}
              title={`${unreadInquiriesCount} new unread inquiries`}
            >
              <Bell className="w-4 h-4" />
              {unreadInquiriesCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-500 text-slate-950 text-[9px] font-bold flex items-center justify-center animate-pulse">
                  {unreadInquiriesCount}
                </span>
              )}
            </div>
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
