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
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { PillButton } from '../../../components/common/PillButton';
import { AdminTab } from './AdminSidebar';

interface AdminHeaderProps {
  activeTab: AdminTab;
  onQuickCreate: (type: 'case' | 'article' | 'social') => void;
  unreadInquiriesCount: number;
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
}) => {
  const { user, logout } = useAuth();
  const meta = TAB_TITLES[activeTab] || TAB_TITLES.overview;

  return (
    <header className="sticky top-0 z-30 bg-[#07090E]/80 backdrop-blur-xl border-b border-white/10 px-6 sm:px-8 py-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Breadcrumb & Section Title */}
        <div>
          <div className="flex items-center gap-2 text-[11px] font-medium text-[#64748B] mb-1">
            <span>Admin</span>
            <span>/</span>
            <span className="text-[var(--brand-primary,#9873ff)]">{meta.category}</span>
            <span>/</span>
            <span className="text-white font-semibold">{meta.title}</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            {meta.title}
          </h1>
        </div>

        {/* Action Controls & User Profile */}
        <div className="flex items-center flex-wrap gap-3">
          {/* Quick Create Dropdown / Buttons based on tab context */}
          {activeTab === 'case-studies' && (
            <PillButton
              onClick={() => onQuickCreate('case')}
              size="sm"
              icon={<Plus className="w-3.5 h-3.5 text-[var(--brand-primary,#9873ff)] group-hover:text-white transition-colors" />}
              iconPosition="left"
              showDefaultIcon={false}
            >
              New Case Study
            </PillButton>
          )}

          {activeTab === 'articles' && (
            <PillButton
              onClick={() => onQuickCreate('article')}
              size="sm"
              icon={<Plus className="w-3.5 h-3.5 text-[var(--brand-primary,#9873ff)] group-hover:text-white transition-colors" />}
              iconPosition="left"
              showDefaultIcon={false}
            >
              New Article
            </PillButton>
          )}

          {activeTab === 'social-links' && (
            <PillButton
              onClick={() => onQuickCreate('social')}
              size="sm"
              icon={<Plus className="w-3.5 h-3.5 text-[var(--brand-primary,#9873ff)] group-hover:text-white transition-colors" />}
              iconPosition="left"
              showDefaultIcon={false}
            >
              Add Social Link
            </PillButton>
          )}

          {activeTab === 'overview' && (
            <div className="flex items-center gap-2">
              <PillButton
                onClick={() => onQuickCreate('case')}
                variant="secondary"
                size="sm"
                icon={<Layers className="w-3.5 h-3.5" />}
                iconPosition="left"
                showDefaultIcon={false}
              >
                + Case
              </PillButton>
              <PillButton
                onClick={() => onQuickCreate('article')}
                variant="secondary"
                size="sm"
                icon={<BookOpen className="w-3.5 h-3.5" />}
                iconPosition="left"
                showDefaultIcon={false}
              >
                + Article
              </PillButton>
            </div>
          )}

          {/* Unread Inquiries Notification Pill */}
          <div className="relative">
            <div
              className={`p-2 rounded-xl border transition-all ${
                unreadInquiriesCount > 0
                  ? 'bg-[var(--brand-primary,#9873ff)]/15 border-[var(--brand-primary,#9873ff)]/30 text-[var(--brand-primary,#9873ff)]'
                  : 'bg-white/5 border-white/10 text-[#94A3B8]'
              }`}
              title={`${unreadInquiriesCount} new unread inquiries`}
            >
              <Bell className="w-4 h-4" />
              {unreadInquiriesCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[var(--brand-primary,#9873ff)] text-white text-[9px] font-bold flex items-center justify-center animate-pulse">
                  {unreadInquiriesCount}
                </span>
              )}
            </div>
          </div>

          <div className="h-6 w-[1px] bg-white/10 hidden sm:block"></div>

          {/* User Profile Pill & Logout */}
          <div className="flex items-center gap-2.5 pl-1">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[var(--brand-primary,#9873ff)] to-[#8054ff] text-white text-xs font-bold flex items-center justify-center shadow-sm">
              {(user?.fullName || user?.username || 'A')[0].toUpperCase()}
            </div>
            <div className="hidden lg:block text-left">
              <div className="text-xs font-semibold text-white leading-tight">
                {user?.fullName || user?.username || 'Admin User'}
              </div>
              <div className="text-[10px] text-[var(--brand-primary,#9873ff)] font-medium">Administrator</div>
            </div>
            <button
              onClick={logout}
              className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 transition-colors cursor-pointer ml-1"
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
