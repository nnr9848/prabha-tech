import React from 'react';
import {
  Share2,
  Plus,
  Edit,
  Trash2,
  ToggleLeft,
  ToggleRight,
  ExternalLink,
} from 'lucide-react';
import { SocialLink } from '../../../types';
import { PLATFORM_ICONS } from '../../../components/common/SocialIconsGroup';
import { PillButton } from '../../../components/common/PillButton';

interface SocialLinksManagerProps {
  socialLinks: SocialLink[];
  onOpenCreate: () => void;
  onOpenEdit: (link: SocialLink) => void;
  onDelete: (id: number) => void;
  onToggleActive: (link: SocialLink) => void;
}

export const SocialLinksManager: React.FC<SocialLinksManagerProps> = ({
  socialLinks,
  onOpenCreate,
  onOpenEdit,
  onDelete,
  onToggleActive,
}) => {
  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-[#0D111A] border border-white/10">
        <div className="space-y-1">
          <h3 className="text-base font-bold text-white">Dynamic Social Channels CMS</h3>
          <p className="text-xs text-[#94A3B8]">
            Configure and manage the social channels that render in the Navigation Bar, Mobile Drawer, and Footer.
          </p>
        </div>
        <PillButton
          onClick={onOpenCreate}
          size="sm"
          icon={<Plus className="w-3.5 h-3.5 text-[var(--brand-primary,#9873ff)] group-hover:text-white transition-colors" />}
          iconPosition="left"
          showDefaultIcon={false}
        >
          Add Channel
        </PillButton>
      </div>

      {/* Grid of Social Links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {socialLinks.map((link) => {
          const platform = PLATFORM_ICONS[link.platformKey] || PLATFORM_ICONS.linkedin;
          const bgStyle = link.bgColor?.includes('gradient')
            ? { background: link.bgColor }
            : { backgroundColor: link.bgColor || platform.defaultBg };

          return (
            <div
              key={link.id || link.platformKey}
              className="group rounded-2xl bg-[#0D111A] border border-white/10 hover:border-[var(--brand-primary,#9873ff)]/40 p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div
                    style={bgStyle}
                    className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-105 transition-transform"
                  >
                    {platform.icon}
                  </div>
                  <span
                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      link.isActive
                        ? 'bg-green-500/15 text-green-400 border border-green-500/20'
                        : 'bg-red-500/15 text-red-400 border border-red-500/20'
                    }`}
                  >
                    {link.isActive ? 'Active' : 'Disabled'}
                  </span>
                </div>

                <h4 className="text-base font-bold text-white mb-1">{link.platformName}</h4>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-[var(--brand-primary,#9873ff)] hover:underline font-mono break-all line-clamp-1 flex items-center gap-1"
                >
                  <span>{link.url}</span>
                  <ExternalLink className="w-3 h-3 shrink-0" />
                </a>

                <div className="flex items-center gap-2 mt-4">
                  <span className="text-[10px] font-bold text-[#64748B] uppercase">Order:</span>
                  <span className="px-2 py-0.5 rounded bg-white/5 text-xs text-white font-mono">
                    {link.displayOrder || 0}
                  </span>
                </div>
              </div>

              <div className="pt-4 mt-6 border-t border-white/5 flex items-center justify-between">
                <button
                  onClick={() => onToggleActive(link)}
                  className="text-xs text-[#94A3B8] hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {link.isActive ? (
                    <ToggleRight className="w-5 h-5 text-green-400" />
                  ) : (
                    <ToggleLeft className="w-5 h-5 text-[#64748B]" />
                  )}
                  <span>{link.isActive ? 'Deactivate' : 'Activate'}</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onOpenEdit(link)}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-white transition-colors cursor-pointer"
                    title="Edit Channel"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  {link.id && (
                    <button
                      onClick={() => onDelete(link.id!)}
                      className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors cursor-pointer"
                      title="Delete Channel"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
