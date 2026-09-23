import React, { useState, useRef } from 'react';
import {
  Video,
  Image as ImageIcon,
  Check,
  Link2,
  Sparkles,
  UploadCloud,
  FileVideo,
  FileImage,
  X,
  Play,
  Layers,
  Ban,
  ChevronDown,
} from 'lucide-react';
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
  allowNone?: boolean;
  noneLabel?: string;
  helperText?: string;
  placeholder?: string;
}

export const MediaPicker: React.FC<MediaPickerProps> = ({
  label,
  value,
  onChange,
  type,
  presets,
  allowNone = true,
  noneLabel = 'None (Pure Dark Gradient)',
  helperText,
  placeholder = 'Enter media URL or select from library...',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'presets' | 'upload' | 'custom'>('presets');
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFileMetadata, setUploadedFileMetadata] = useState<{
    name: string;
    size: string;
  } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const selectedPreset = presets.find((p) => p.url === value);
  const isNoneSelected = !value || value.trim() === '';

  // Handle local file selection with instant client-side blob object URL
  const handleFileProcess = (file: File) => {
    if (!file) return;

    if (type === 'video' && !file.type.startsWith('video/')) {
      alert('Please upload a valid video file (.mp4, .webm).');
      return;
    }
    if (type === 'image' && !file.type.startsWith('image/')) {
      alert('Please upload a valid image file (.jpg, .png, .webp).');
      return;
    }

    const blobUrl = URL.createObjectURL(file);
    const sizeInMB = (file.size / (1024 * 1024)).toFixed(2) + ' MB';

    setUploadedFileMetadata({
      name: file.name,
      size: sizeInMB,
    });

    onChange(blobUrl);
    setIsOpen(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileProcess(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="space-y-2 p-3.5 rounded-xl bg-[#090C13] border border-white/10 hover:border-white/20 transition-all">
      {/* Field Label & Current Status Badge */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {type === 'video' ? (
            <Video className="w-3.5 h-3.5 text-[var(--brand-primary,#9873ff)]" />
          ) : (
            <ImageIcon className="w-3.5 h-3.5 text-[var(--brand-primary,#9873ff)]" />
          )}
          <label className="text-[11px] font-bold text-white uppercase tracking-wider">
            {label}
          </label>
        </div>

        {isNoneSelected ? (
          <span className="text-[10px] font-semibold text-[#64748B] px-2 py-0.5 rounded bg-white/5 border border-white/5">
            Disabled / None
          </span>
        ) : selectedPreset ? (
          <span className="text-[10px] font-semibold text-[var(--brand-primary,#9873ff)] px-2 py-0.5 rounded bg-[var(--brand-primary,#9873ff)]/15 border border-[var(--brand-primary,#9873ff)]/25">
            {selectedPreset.badge || 'Preset'}
          </span>
        ) : uploadedFileMetadata ? (
          <span className="text-[10px] font-semibold text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/15 border border-emerald-500/25">
            Local Upload
          </span>
        ) : (
          <span className="text-[10px] font-semibold text-cyan-400 px-2 py-0.5 rounded bg-cyan-500/15 border border-cyan-500/25">
            Custom URL
          </span>
        )}
      </div>

      {/* Compact Interactive Asset Card (Triggers Selector Drawer/Modal) */}
      <div className="flex items-center justify-between gap-3 p-2.5 rounded-xl bg-[#05060A] border border-white/10 hover:border-white/20 transition-all">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[var(--brand-primary,#9873ff)] shrink-0 overflow-hidden">
            {isNoneSelected ? (
              <Ban className="w-4 h-4 text-[#64748B]" />
            ) : type === 'video' ? (
              <Play className="w-4 h-4 text-[var(--brand-primary,#9873ff)] fill-current" />
            ) : (
              <ImageIcon className="w-4 h-4 text-[var(--brand-primary,#9873ff)]" />
            )}
          </div>

          <div className="min-w-0">
            <div className="text-xs font-semibold text-white truncate">
              {isNoneSelected
                ? noneLabel
                : selectedPreset
                ? selectedPreset.name
                : uploadedFileMetadata
                ? `${uploadedFileMetadata.name} (${uploadedFileMetadata.size})`
                : 'External CDN Stream'}
            </div>
            <div className="text-[10px] font-mono text-[#64748B] truncate max-w-[240px]">
              {isNoneSelected ? 'No media rendered' : value}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          {!isNoneSelected && allowNone && (
            <button
              type="button"
              onClick={() => {
                setUploadedFileMetadata(null);
                onChange('');
              }}
              className="p-1.5 rounded-lg text-[#64748B] hover:text-red-400 hover:bg-red-500/10 transition-colors"
              title="Remove / Disable"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}

          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--brand-primary,#9873ff)]/15 hover:bg-[var(--brand-primary,#9873ff)]/25 text-[var(--brand-primary,#9873ff)] border border-[var(--brand-primary,#9873ff)]/30 text-xs font-semibold transition-all"
          >
            <span>{isNoneSelected ? 'Choose Media' : 'Change Asset'}</span>
            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </div>

      {/* Expandable Selector Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden pt-2 space-y-3"
          >
            {/* 3-Way Tab Switcher */}
            <div className="flex items-center p-1 rounded-xl bg-[#05060A] border border-white/10 text-xs">
              <button
                type="button"
                onClick={() => setActiveTab('presets')}
                className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg font-medium transition-all ${
                  activeTab === 'presets'
                    ? 'bg-[var(--brand-primary,#9873ff)] text-white shadow-md'
                    : 'text-[#94A3B8] hover:text-white'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Gallery Presets</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('upload')}
                className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg font-medium transition-all ${
                  activeTab === 'upload'
                    ? 'bg-[var(--brand-primary,#9873ff)] text-white shadow-md'
                    : 'text-[#94A3B8] hover:text-white'
                }`}
              >
                <UploadCloud className="w-3.5 h-3.5" />
                <span>Upload Local</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('custom')}
                className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg font-medium transition-all ${
                  activeTab === 'custom'
                    ? 'bg-[var(--brand-primary,#9873ff)] text-white shadow-md'
                    : 'text-[#94A3B8] hover:text-white'
                }`}
              >
                <Link2 className="w-3.5 h-3.5" />
                <span>Custom URL</span>
              </button>
            </div>

            {/* TAB 1: Gallery Presets Grid (Including "None" Option) */}
            {activeTab === 'presets' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[300px] overflow-y-auto pr-1 custom-scrollbar">
                {/* None Option */}
                {allowNone && (
                  <button
                    type="button"
                    onClick={() => {
                      setUploadedFileMetadata(null);
                      onChange('');
                      setIsOpen(false);
                    }}
                    className={`group text-left p-2.5 rounded-xl border transition-all flex items-start gap-2.5 ${
                      isNoneSelected
                        ? 'bg-[var(--brand-primary,#9873ff)]/15 border-[var(--brand-primary,#9873ff)]'
                        : 'bg-[#05070D] border-white/5 hover:border-white/20'
                    }`}
                  >
                    <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center text-[#64748B] group-hover:text-white shrink-0">
                      <Ban className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-white block">{noneLabel}</span>
                      <p className="text-[10px] text-[#64748B]">Disable media and render dark gradient</p>
                    </div>
                  </button>
                )}

                {/* Preset Cards */}
                {presets.map((preset) => {
                  const isSelected = value === preset.url;
                  return (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => {
                        setUploadedFileMetadata(null);
                        onChange(preset.url);
                        setIsOpen(false);
                      }}
                      className={`group text-left p-2.5 rounded-xl border transition-all flex items-start justify-between gap-2 ${
                        isSelected
                          ? 'bg-[var(--brand-primary,#9873ff)]/15 border-[var(--brand-primary,#9873ff)] shadow-[0_0_12px_rgba(152,115,255,0.2)]'
                          : 'bg-[#05070D] border-white/5 hover:border-white/20 hover:bg-[#0E121D]'
                      }`}
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-semibold text-white group-hover:text-[var(--brand-primary,#9873ff)] transition-colors truncate">
                            {preset.name}
                          </span>
                          {preset.badge && (
                            <span className="px-1.5 py-0.2 rounded text-[9px] font-bold uppercase tracking-wider bg-[var(--brand-primary,#9873ff)]/20 text-[var(--brand-primary,#9873ff)] shrink-0">
                              {preset.badge}
                            </span>
                          )}
                        </div>
                        {preset.description && (
                          <p className="text-[10px] text-[#64748B] mt-0.5 line-clamp-1">{preset.description}</p>
                        )}
                      </div>

                      <div
                        className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                          isSelected ? 'bg-[var(--brand-primary,#9873ff)] text-white' : 'border border-white/20'
                        }`}
                      >
                        {isSelected && <Check className="w-2.5 h-2.5" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {/* TAB 2: Drag & Drop File Upload */}
            {activeTab === 'upload' && (
              <div className="space-y-2">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      handleFileProcess(e.target.files[0]);
                    }
                  }}
                  accept={type === 'video' ? 'video/mp4,video/webm' : 'image/jpeg,image/png,image/webp'}
                  className="hidden"
                />

                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                  }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border border-dashed rounded-xl p-5 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-2 ${
                    isDragging
                      ? 'border-[var(--brand-primary,#9873ff)] bg-[var(--brand-primary,#9873ff)]/15'
                      : 'border-white/15 hover:border-white/30 bg-[#05070D]'
                  }`}
                >
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-[var(--brand-primary,#9873ff)]">
                    {type === 'video' ? <FileVideo className="w-4 h-4" /> : <FileImage className="w-4 h-4" />}
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-white">
                      Drop {type === 'video' ? 'video (.mp4, .webm)' : 'image (.png, .jpg, .webp)'} or{' '}
                      <span className="text-[var(--brand-primary,#9873ff)] underline">browse</span>
                    </p>
                    <p className="text-[10px] text-[#64748B]">Immediate client-side rendering for real-time live preview</p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: Custom Stream URL */}
            {activeTab === 'custom' && (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={value}
                    onChange={(e) => {
                      setUploadedFileMetadata(null);
                      onChange(e.target.value);
                    }}
                    placeholder={placeholder}
                    className="w-full p-2 rounded-xl bg-[#05070D] border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-[var(--brand-primary,#9873ff)]/50"
                  />
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="px-3 py-2 rounded-xl bg-[var(--brand-primary,#9873ff)] text-white text-xs font-semibold shrink-0"
                  >
                    Apply
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {helperText && <p className="text-[10px] text-[#64748B] pt-0.5">{helperText}</p>}
    </div>
  );
};
