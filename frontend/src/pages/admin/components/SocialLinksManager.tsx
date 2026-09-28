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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-white border border-slate-200/80 shadow-2xs">
        <div className="space-y-1">
          <h3 className="text-base font-bold text-slate-900">Dynamic Social Channels CMS</h3>
          <p className="text-xs text-slate-500">
            Configure and manage the social channels that render in the Navigation Bar, Mobile Drawer, and Footer.
          </p>
        </div>
        <button
          onClick={onOpenCreate}
          className="py-2 px-3.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-xs flex items-center gap-1.5 transition-all cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5 text-slate-950" />
          <span>Add Channel</span>
        </button>
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
              className="group rounded-2xl bg-white border border-slate-200/80 hover:border-amber-400 p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-md shadow-2xs"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div
                    style={bgStyle}
                    className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform"
                  >
                    {platform.icon}
                  </div>
                  <span
                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      link.isActive
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-red-50 text-red-600 border border-red-200'
                    }`}
                  >
                    {link.isActive ? 'Active' : 'Disabled'}
                  </span>
                </div>

                <h4 className="text-base font-bold text-slate-900 mb-1">{link.platformName}</h4>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-amber-700 hover:underline font-mono break-all line-clamp-1 flex items-center gap-1 font-medium"
                >
                  <span>{link.url}</span>
                  <ExternalLink className="w-3 h-3 shrink-0" />
                </a>

                <div className="flex items-center gap-2 mt-4">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Order:</span>
                  <span className="px-2 py-0.5 rounded bg-slate-100 text-xs text-slate-700 font-mono">
                    {link.displayOrder || 0}
                  </span>
                </div>
              </div>

              <div className="pt-4 mt-6 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => onToggleActive(link)}
                  className="text-xs text-slate-600 hover:text-slate-900 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {link.isActive ? (
                    <ToggleRight className="w-5 h-5 text-emerald-600" />
                  ) : (
                    <ToggleLeft className="w-5 h-5 text-slate-400" />
                  )}
                  <span>{link.isActive ? 'Deactivate' : 'Activate'}</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onOpenEdit(link)}
                    className="p-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200 transition-colors cursor-pointer"
                    title="Edit Channel"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  {link.id && (
                    <button
                      onClick={() => onDelete(link.id!)}
                      className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 transition-colors cursor-pointer"
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
