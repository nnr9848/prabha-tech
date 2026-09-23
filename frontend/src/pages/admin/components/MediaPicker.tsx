import React, { useState } from 'react';
import { Video, Image as ImageIcon, Check, Link2, Sparkles, FolderOpen, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export interface MediaPreset {
  id: string;
  name: string;
  url: string;
  thumbnailUrl?: string;
  type: 'video' | 'image';
  badge?: string;
  description?: string;
}

interface MediaPickerProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  type: 'video' | 'image';
  presets: MediaPreset[];
  helperText?: string;
  placeholder?: string;
}

export const MediaPicker: React.FC<MediaPickerProps> = ({
  label,
  value,
  onChange,
  type,
  presets,
  helperText,
  placeholder = 'Enter media URL or select from library...',
}) => {
  const [activeTab, setActiveTab] = useState<'presets' | 'custom'>('presets');
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  const selectedPreset = presets.find((p) => p.url === value);

  return (
    <div className="space-y-3 p-4 rounded-xl bg-[#090C13] border border-white/10 hover:border-white/20 transition-all">
      {/* Header & Tabs */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {type === 'video' ? (
            <Video className="w-4 h-4 text-[var(--brand-primary,#9873ff)]" />
          ) : (
            <ImageIcon className="w-4 h-4 text-[var(--brand-primary,#9873ff)]" />
          )}
          <label className="text-xs font-semibold text-white uppercase tracking-wider">
            {label}
          </label>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center p-0.5 rounded-lg bg-[#05060A] border border-white/10 text-[11px]">
          <button
            type="button"
            onClick={() => setActiveTab('presets')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md font-medium transition-all ${
              activeTab === 'presets'
                ? 'bg-[var(--brand-primary,#9873ff)]/20 text-[var(--brand-primary,#9873ff)] border border-[var(--brand-primary,#9873ff)]/30'
                : 'text-[#94A3B8] hover:text-white'
            }`}
          >
            <Sparkles className="w-3 h-3" />
            <span>Preset Library</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('custom')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md font-medium transition-all ${
              activeTab === 'custom'
                ? 'bg-[var(--brand-primary,#9873ff)]/20 text-[var(--brand-primary,#9873ff)] border border-[var(--brand-primary,#9873ff)]/30'
                : 'text-[#94A3B8] hover:text-white'
            }`}
          >
            <Link2 className="w-3 h-3" />
            <span>Custom URL</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Preset Library Cards */}
      {activeTab === 'presets' && (
        <div className="space-y-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {presets.map((preset) => {
              const isSelected = value === preset.url;
              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => onChange(preset.url)}
                  className={`group relative text-left p-3 rounded-xl border transition-all flex flex-col justify-between overflow-hidden ${
                    isSelected
                      ? 'bg-[var(--brand-primary,#9873ff)]/10 border-[var(--brand-primary,#9873ff)] shadow-[0_0_15px_rgba(152,115,255,0.2)]'
                      : 'bg-[#05070D] border-white/5 hover:border-white/20 hover:bg-[#0E121D]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 w-full mb-2">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-semibold text-white group-hover:text-[var(--brand-primary,#9873ff)] transition-colors">
                          {preset.name}
                        </span>
                        {preset.badge && (
                          <span className="px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-[var(--brand-primary,#9873ff)]/20 text-[var(--brand-primary,#9873ff)] border border-[var(--brand-primary,#9873ff)]/30">
                            {preset.badge}
                          </span>
                        )}
                      </div>
                      {preset.description && (
                        <p className="text-[11px] text-[#64748B] mt-0.5 line-clamp-1">
                          {preset.description}
                        </p>
                      )}
                    </div>

                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-all ${
                        isSelected
                          ? 'bg-[var(--brand-primary,#9873ff)] text-white'
                          : 'border border-white/20 group-hover:border-white/40'
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3" />}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[10px] font-mono text-[#475569] w-full pt-1 border-t border-white/5">
                    <span className="truncate max-w-[200px]">{preset.url}</span>
                    <span className="capitalize text-[#94A3B8]">{preset.type}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 2: Custom URL Input */}
      {activeTab === 'custom' && (
        <div className="space-y-2">
          <div className="relative">
            <input
              type="text"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder}
              className="w-full p-2.5 pl-3 pr-24 rounded-xl bg-[#05070D] border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-[var(--brand-primary,#9873ff)]/50 transition-colors"
            />
            {value && (
              <button
                type="button"
                onClick={() => onChange('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-[#94A3B8] hover:text-white px-2 py-1 rounded bg-white/5 hover:bg-white/10"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      )}

      {/* Current Active Preview Strip */}
      {value && (
        <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#05060A]/80 border border-white/5 text-xs">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-6 h-6 rounded bg-white/5 flex items-center justify-center text-[var(--brand-primary,#9873ff)] shrink-0">
              {type === 'video' ? <Play className="w-3 h-3" /> : <ImageIcon className="w-3 h-3" />}
            </div>
            <div className="truncate">
              <span className="text-[#64748B] text-[11px] block">Selected Source:</span>
              <span className="text-white font-mono text-[11px] truncate block">{value}</span>
            </div>
          </div>
          {selectedPreset && (
            <span className="shrink-0 text-[10px] font-semibold text-[var(--brand-primary,#9873ff)] px-2 py-0.5 rounded bg-[var(--brand-primary,#9873ff)]/10">
              {selectedPreset.name}
            </span>
          )}
        </div>
      )}

      {helperText && <p className="text-[11px] text-[#64748B]">{helperText}</p>}
    </div>
  );
};
