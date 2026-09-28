import React, { useState, useRef } from 'react';
import { UploadCloud, Image as ImageIcon, Link as LinkIcon, X, Check, AlertCircle } from 'lucide-react';

interface ImageUploaderProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  required?: boolean;
}

// Curated brand assets readily available in the workspace
const PRESET_BRAND_ASSETS = [
  { name: 'Super App Platform', url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80' },
  { name: 'AI Fleet Management', url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80' },
  { name: 'BigAuction Exchange', url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80' },
  { name: 'Grecha AI HRMS', url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80' },
  { name: 'AI Camera Vision', url: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1200&q=80' },
  { name: 'BEMS Smart Building', url: '/assets/images/glass-office-building.jpeg' },
  { name: 'Insurance CRM', url: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80' },
  { name: 'Wefyx IT Support', url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80' },
  { name: 'Smart Gate Cloud', url: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1200&q=80' },
  { name: 'Vertical Farming IoT', url: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=1200&q=80' },
  { name: 'Rewards & Loyalty', url: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80' },
  { name: 'Blink Financial Pay', url: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80' },
  { name: 'Dubai Skyline Panorama', url: '/assets/images/dubai-hero-rings.jpg' },
  { name: 'Enterprise Devices', url: '/assets/images/enterprise-software.png' },
];

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  label,
  value,
  onChange,
  required = false,
}) => {
  const [activeTab, setActiveTab] = useState<'upload' | 'url' | 'presets'>('upload');
  const [urlInput, setUrlInput] = useState(value || '');
  const [imageError, setImageError] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync internal state when prop changes
  React.useEffect(() => {
    setUrlInput(value || '');
    setImageError(false);
  }, [value]);

  const handleApplyUrl = (newUrl: string) => {
    setImageError(false);
    onChange(newUrl);
  };

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file (PNG, JPG, WebP, SVG)');
      return;
    }
    // Convert to high-performance Data URL for instant preview & storage
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      if (dataUrl) {
        setImageError(false);
        onChange(dataUrl);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-semibold text-slate-700">
          {label} {required && <span className="text-amber-600">*</span>}
        </label>
        <span className="text-[11px] text-slate-400">16:9 Landscape Recommended</span>
      </div>

      <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-3 space-y-3">
        {/* Live Visual Preview Section */}
        {value ? (
          <div className="relative rounded-lg overflow-hidden border border-slate-200 bg-slate-900 group">
            <div className="aspect-[16/8] max-h-44 w-full flex items-center justify-center overflow-hidden bg-slate-950">
              {imageError ? (
                <div className="p-6 text-center text-slate-400 flex flex-col items-center gap-1.5">
                  <AlertCircle className="w-5 h-5 text-rose-500" />
                  <span className="text-xs font-medium text-rose-300">Image failed to load</span>
                  <span className="text-[10px] text-slate-500 max-w-xs truncate">{value}</span>
                </div>
              ) : (
                <img
                  src={value}
                  alt="Hero Preview"
                  onError={() => setImageError(true)}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              )}
            </div>

            {/* Overlay Info & Clear Button */}
            <div className="absolute top-2 right-2 flex items-center gap-1.5">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-950/80 text-white backdrop-blur-xs border border-white/10">
                Active Preview
              </span>
              <button
                type="button"
                onClick={() => onChange('')}
                className="w-6 h-6 rounded-md bg-rose-600 hover:bg-rose-700 text-white flex items-center justify-center shadow-xs transition-colors cursor-pointer"
                title="Remove Image"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ) : (
          <div className="aspect-[16/7] max-h-36 rounded-lg border-2 border-dashed border-slate-200 bg-white flex flex-col items-center justify-center text-center p-4 text-slate-400">
            <ImageIcon className="w-8 h-8 text-slate-300 mb-1" />
            <span className="text-xs font-medium text-slate-600">No Image Selected</span>
            <span className="text-[11px] text-slate-400">Choose an upload method below to preview</span>
          </div>
        )}

        {/* Input Selector Mode Tabs */}
        <div className="flex rounded-lg bg-slate-200/70 p-1 text-xs">
          <button
            type="button"
            onClick={() => setActiveTab('upload')}
            className={`flex-1 py-1.5 rounded-md font-semibold text-center transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'upload'
                ? 'bg-white text-slate-900 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <UploadCloud className="w-3.5 h-3.5" />
            <span>Upload File</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('url')}
            className={`flex-1 py-1.5 rounded-md font-semibold text-center transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'url'
                ? 'bg-white text-slate-900 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <LinkIcon className="w-3.5 h-3.5" />
            <span>Paste URL</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('presets')}
            className={`flex-1 py-1.5 rounded-md font-semibold text-center transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'presets'
                ? 'bg-white text-slate-900 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Brand Presets</span>
          </button>
        </div>

        {/* Tab 1: Drag-and-Drop Local File Upload */}
        {activeTab === 'upload' && (
          <div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  handleFile(e.target.files[0]);
                }
              }}
            />
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`rounded-lg border-2 border-dashed p-4 text-center cursor-pointer transition-colors ${
                isDragging
                  ? 'border-amber-500 bg-amber-500/10'
                  : 'border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50'
              }`}
            >
              <UploadCloud className="w-6 h-6 text-slate-400 mx-auto mb-1" />
              <div className="text-xs font-semibold text-slate-800">
                Drag & drop image here, or <span className="text-amber-600 underline">Browse</span>
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">
                PNG, JPG, WebP, SVG up to 10MB
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Custom CDN / Web Image URL */}
        {activeTab === 'url' && (
          <div className="flex gap-2">
            <input
              type="url"
              placeholder="https://example.com/image.jpg"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleApplyUrl(urlInput);
                }
              }}
              className="flex-1 px-3 py-2 rounded-lg bg-white border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/20"
            />
            <button
              type="button"
              onClick={() => handleApplyUrl(urlInput)}
              className="px-4 py-2 rounded-lg bg-[#020E26] hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
            >
              Apply
            </button>
          </div>
        )}

        {/* Tab 3: Brand Asset Library Presets */}
        {activeTab === 'presets' && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-48 overflow-y-auto pr-1">
            {PRESET_BRAND_ASSETS.map((asset) => {
              const isSelected = value === asset.url;
              return (
                <button
                  key={asset.url}
                  type="button"
                  onClick={() => onChange(asset.url)}
                  className={`group relative rounded-md overflow-hidden border text-left transition-all p-1 bg-white cursor-pointer ${
                    isSelected
                      ? 'border-amber-500 ring-2 ring-amber-500/30'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="aspect-[16/9] w-full bg-slate-100 rounded overflow-hidden relative mb-1">
                    <img
                      src={asset.url}
                      alt={asset.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    {isSelected && (
                      <div className="absolute inset-0 bg-amber-500/30 flex items-center justify-center">
                        <Check className="w-4 h-4 text-white drop-shadow" />
                      </div>
                    )}
                  </div>
                  <div className="text-[10px] font-semibold text-slate-700 truncate px-0.5">
                    {asset.name}
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
