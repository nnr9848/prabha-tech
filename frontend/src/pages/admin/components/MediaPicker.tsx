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
    <div className="space-y-2 p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition-all">
      {/* Field Label & Current Status Badge */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {type === 'video' ? (
            <Video className="w-3.5 h-3.5 text-amber-600" />
          ) : (
            <ImageIcon className="w-3.5 h-3.5 text-amber-600" />
          )}
          <label className="text-[11px] font-bold text-slate-800 uppercase tracking-wider">
            {label}
          </label>
        </div>

        {isNoneSelected ? (
          <span className="text-[10px] font-semibold text-slate-400 px-2 py-0.5 rounded bg-slate-100 border border-slate-200">
            Disabled / None
          </span>
        ) : selectedPreset ? (
          <span className="text-[10px] font-semibold text-amber-800 px-2 py-0.5 rounded bg-amber-50 border border-amber-200">
            {selectedPreset.badge || 'Preset'}
          </span>
        ) : uploadedFileMetadata ? (
          <span className="text-[10px] font-semibold text-emerald-700 px-2 py-0.5 rounded bg-emerald-50 border border-emerald-200">
            Local Upload
          </span>
        ) : (
          <span className="text-[10px] font-semibold text-blue-700 px-2 py-0.5 rounded bg-blue-50 border border-blue-200">
            Custom URL
          </span>
        )}
      </div>

      {/* Compact Interactive Asset Card (Triggers Selector Drawer/Modal) */}
      <div className="flex items-center justify-between gap-3 p-2.5 rounded-xl bg-white border border-slate-200 hover:border-slate-300 transition-all shadow-2xs">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-amber-600 shrink-0 overflow-hidden">
            {isNoneSelected ? (
              <Ban className="w-4 h-4 text-slate-400" />
            ) : type === 'video' ? (
              <Play className="w-4 h-4 text-amber-600 fill-current" />
            ) : (
              <ImageIcon className="w-4 h-4 text-amber-600" />
            )}
          </div>

          <div className="min-w-0">
            <div className="text-xs font-semibold text-slate-900 truncate">
              {isNoneSelected
                ? noneLabel
                : selectedPreset
                ? selectedPreset.name
                : uploadedFileMetadata
                ? `${uploadedFileMetadata.name} (${uploadedFileMetadata.size})`
                : 'External CDN Stream'}
            </div>
            <div className="text-[10px] font-mono text-slate-400 truncate max-w-[240px]">
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
              className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
              title="Remove / Disable"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}

          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 text-xs font-semibold transition-all cursor-pointer"
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
            <div className="flex items-center p-1 rounded-xl bg-slate-100 border border-slate-200 text-xs">
              <button
                type="button"
                onClick={() => setActiveTab('presets')}
                className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                  activeTab === 'presets'
                    ? 'bg-amber-500 text-slate-950 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Gallery Presets</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('upload')}
                className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                  activeTab === 'upload'
                    ? 'bg-amber-500 text-slate-950 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <UploadCloud className="w-3.5 h-3.5" />
                <span>Upload Local</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('custom')}
                className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                  activeTab === 'custom'
                    ? 'bg-amber-500 text-slate-950 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
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
                    className={`group text-left p-2.5 rounded-xl border transition-all flex items-start gap-2.5 cursor-pointer ${
                      isNoneSelected
                        ? 'bg-amber-50 border-amber-300'
                        : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400 group-hover:text-slate-700 shrink-0">
                      <Ban className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-slate-900 block">{noneLabel}</span>
                      <p className="text-[10px] text-slate-500">Disable media and render clean backdrop</p>
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
                      className={`group text-left p-2.5 rounded-xl border transition-all flex items-start justify-between gap-2 cursor-pointer ${
                        isSelected
                          ? 'bg-amber-50 border-amber-300 shadow-xs'
                          : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-semibold text-slate-900 group-hover:text-amber-700 transition-colors truncate">
                            {preset.name}
                          </span>
                          {preset.badge && (
                            <span className="px-1.5 py-0.2 rounded text-[9px] font-bold uppercase tracking-wider bg-amber-100 text-amber-800 shrink-0">
                              {preset.badge}
                            </span>
                          )}
                        </div>
                        {preset.description && (
                          <p className="text-[10px] text-slate-500 mt-0.5 line-clamp-1">{preset.description}</p>
                        )}
                      </div>

                      <div
                        className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                          isSelected ? 'bg-amber-500 text-slate-950' : 'border border-slate-300'
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
                      ? 'border-amber-500 bg-amber-50'
                      : 'border-slate-300 hover:border-slate-400 bg-white'
                  }`}
                >
                  <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center text-amber-700">
                    {type === 'video' ? <FileVideo className="w-4 h-4" /> : <FileImage className="w-4 h-4" />}
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-slate-900">
                      Drop {type === 'video' ? 'video (.mp4, .webm)' : 'image (.png, .jpg, .webp)'} or{' '}
                      <span className="text-amber-700 underline font-bold">browse</span>
                    </p>
                    <p className="text-[10px] text-slate-500">Immediate client-side rendering for real-time live preview</p>
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
                    className="w-full p-2 rounded-xl bg-white border border-slate-200 text-slate-900 text-xs font-mono focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/20"
                  />
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="px-3 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold shrink-0 cursor-pointer shadow-xs"
                  >
                    Apply
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {helperText && <p className="text-[10px] text-slate-400 pt-0.5">{helperText}</p>}
    </div>
  );
};
