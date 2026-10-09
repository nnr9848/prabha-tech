import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminApi } from '../../../api/client';
import { HeroConfig } from '../../../types';
import { useToast } from '../../../context/ToastContext';
import {
  Video,
  UploadCloud,
  Save,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Eye,
  Sparkles,
  Link as LinkIcon,
  HelpCircle,
  FileVideo,
  Image as ImageIcon
} from 'lucide-react';

export const HeroSectionManager: React.FC = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const [formData, setFormData] = useState<Partial<HeroConfig>>({
    subHeadline: '',
    headlinePrefix: '',
    headlineHighlight: '',
    headlineSuffix: '',
    ctaText: '',
    ctaLink: '',
    videoUrl: '',
    posterUrl: '',
  });

  const [isUploadingVideo, setIsUploadingVideo] = useState(false);
  const [isUploadingPoster, setIsUploadingPoster] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const videoFileInputRef = React.useRef<HTMLInputElement>(null);
  const posterFileInputRef = React.useRef<HTMLInputElement>(null);

  // Load existing Hero Configuration from backend
  const { data: heroConfig, isLoading } = useQuery<HeroConfig>({
    queryKey: ['adminHeroConfig'],
    queryFn: () => adminApi.getHeroConfig(),
  });

  // Sync state once data arrives
  React.useEffect(() => {
    if (heroConfig) {
      setFormData({
        subHeadline: heroConfig.subHeadline || '',
        headlinePrefix: heroConfig.headlinePrefix || '',
        headlineHighlight: heroConfig.headlineHighlight || '',
        headlineSuffix: heroConfig.headlineSuffix || '',
        ctaText: heroConfig.ctaText || '',
        ctaLink: heroConfig.ctaLink || '',
        videoUrl: heroConfig.videoUrl || '',
        posterUrl: heroConfig.posterUrl || '',
      });
    }
  }, [heroConfig]);

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: (data: Partial<HeroConfig>) => adminApi.updateHeroConfig(data),
    onSuccess: (updated) => {
      queryClient.setQueryData(['adminHeroConfig'], updated);
      queryClient.invalidateQueries({ queryKey: ['homepageHeroConfig'] });
      toast.success('Updated Hero Configuration', 'Hero section & video configuration updated successfully!');
    },
    onError: (err: any) => {
      const msg = err.response?.data?.message || 'Failed to update hero configuration';
      toast.error('Update Failed', msg);
    },
  });

  const handleVideoUpload = async (file: File) => {
    setUploadError(null);
    if (!file.type.startsWith('video/')) {
      setUploadError('Please select a valid video file (.mp4 or .webm)');
      return;
    }
    if (file.size > 50 * 1024 * 1024) {
      setUploadError('Video file exceeds the 50MB size limit.');
      return;
    }

    try {
      setIsUploadingVideo(true);
      const res = await adminApi.uploadHeroMedia(file);
      setFormData((prev) => ({ ...prev, videoUrl: res.url }));
      toast.success('Video Uploaded', `Video uploaded successfully: ${res.fileName}`);
    } catch (err: any) {
      const msg = err.response?.data?.message || 'Video upload failed. Check file size & connection.';
      setUploadError(msg);
      toast.error('Upload Error', msg);
    } finally {
      setIsUploadingVideo(false);
    }
  };

  const handlePosterUpload = async (file: File) => {
    setUploadError(null);
    if (!file.type.startsWith('image/')) {
      setUploadError('Please select a valid image file (.jpg, .png, or .webp)');
      return;
    }
    if (file.size > 15 * 1024 * 1024) {
      setUploadError('Poster image exceeds the 15MB size limit.');
      return;
    }

    try {
      setIsUploadingPoster(true);
      const res = await adminApi.uploadHeroMedia(file);
      setFormData((prev) => ({ ...prev, posterUrl: res.url }));
      toast.success('Poster Uploaded', `Poster image uploaded successfully: ${res.fileName}`);
    } catch (err: any) {
      const msg = err.response?.data?.message || 'Poster upload failed.';
      setUploadError(msg);
      toast.error('Upload Error', msg);
    } finally {
      setIsUploadingPoster(false);
    }
  };

  const handleResetToDefaultVideo = () => {
    setFormData((prev) => ({
      ...prev,
      videoUrl: '', // Blank will automatically use the default robotics warehouse video
      posterUrl: '',
    }));
    toast.info('Default Video Selected', 'Reset to default robotics video. Click "Save Changes" to apply.');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateMutation.mutate(formData);
  };

  const currentPreviewVideo = formData.videoUrl?.trim() || '/assets/video/hero-bg.mp4';
  const isUsingDefaultVideo = !formData.videoUrl?.trim();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-[#E5A93C] border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-3">
            <span className="p-2.5 rounded-xl bg-amber-500/10 text-[#E5A93C]">
              <Video className="w-6 h-6" />
            </span>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Hero Section & Video CMS</h1>
              <p className="text-sm text-slate-500 mt-0.5">
                Manage the homepage background video, poster placeholder, headlines, and call-to-action.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleResetToDefaultVideo}
            className="inline-flex items-center gap-2 px-3.5 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
          >
            <RotateCcw className="w-4 h-4 text-slate-500" />
            Reset to Default Video
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={updateMutation.isPending}
            className="inline-flex items-center gap-2 px-5 py-2 text-sm font-semibold text-slate-950 bg-[#E5A93C] hover:bg-[#d4972e] rounded-lg shadow-sm transition-colors disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {updateMutation.isPending ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      {uploadError && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 flex items-start gap-3 text-red-700">
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <div className="text-sm font-medium">{uploadError}</div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Media Video & Poster Controls (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Live Video Preview Card */}
          <div className="bg-slate-900 rounded-2xl p-5 border border-slate-800 shadow-xl overflow-hidden">
            <div className="flex items-center justify-between mb-3 text-white">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <Eye className="w-4 h-4 text-[#E5A93C]" />
                Live Video Preview
              </div>
              <span className="text-xs px-2.5 py-1 rounded-full font-mono bg-white/10 text-slate-300">
                {isUsingDefaultVideo ? 'Default Robotics Video (/assets/video/hero-bg.mp4)' : 'Custom CMS Video'}
              </span>
            </div>

            <div className="relative aspect-video rounded-xl overflow-hidden bg-black border border-white/10">
              <video
                key={currentPreviewVideo}
                autoPlay
                muted
                loop
                playsInline
                controls
                poster={formData.posterUrl?.trim() || undefined}
                className="w-full h-full object-cover"
              >
                <source src={currentPreviewVideo} type="video/mp4" />
              </video>
            </div>

            <p className="text-xs text-slate-400 mt-3 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#E5A93C]" />
              The hero video loops automatically with sound muted on the public homepage.
            </p>
          </div>

          {/* Upload Video Section */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-slate-900 flex items-center gap-2">
                  <FileVideo className="w-4 h-4 text-[#E5A93C]" />
                  Hero Background Video
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Upload an MP4 / WebM file (up to 50MB) or enter an external video URL.
                </p>
              </div>
            </div>

            {/* Hidden Video File Input */}
            <input
              ref={videoFileInputRef}
              type="file"
              accept="video/mp4,video/webm"
              className="hidden"
              onChange={(e) => {
                if (e.target.files?.[0]) handleVideoUpload(e.target.files[0]);
              }}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => videoFileInputRef.current?.click()}
                disabled={isUploadingVideo}
                className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-slate-300 hover:border-[#E5A93C] rounded-xl text-slate-700 hover:text-slate-900 bg-slate-50 hover:bg-amber-500/5 font-medium text-sm transition-colors disabled:opacity-50"
              >
                <UploadCloud className="w-4 h-4 text-[#E5A93C]" />
                {isUploadingVideo ? 'Uploading Video...' : 'Upload Video File'}
              </button>

              <div className="relative">
                <input
                  type="text"
                  placeholder="Or paste video URL (e.g. /assets/video/...)"
                  value={formData.videoUrl || ''}
                  onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                  className="w-full h-full px-3.5 py-2.5 text-xs font-mono bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E5A93C]/30 focus:border-[#E5A93C]"
                />
              </div>
            </div>

            <div className="text-[11px] text-slate-500 flex items-center gap-1.5 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
              <span>
                <strong>Fallback Protection:</strong> If left empty, the site automatically serves the high-performance robotics warehouse video.
              </span>
            </div>
          </div>

          {/* Optional Poster Image Section */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-slate-900 flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-[#E5A93C]" />
                  Video Poster Image (Optional)
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Shown before playback begins. Best practice: leave blank or match Frame 0 of the video.
                </p>
              </div>
            </div>

            <input
              ref={posterFileInputRef}
              type="file"
              accept="image/png,image/jpeg,image/webp"
              className="hidden"
              onChange={(e) => {
                if (e.target.files?.[0]) handlePosterUpload(e.target.files[0]);
              }}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => posterFileInputRef.current?.click()}
                disabled={isUploadingPoster}
                className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-slate-300 hover:border-[#E5A93C] rounded-xl text-slate-700 hover:text-slate-900 bg-slate-50 hover:bg-amber-500/5 font-medium text-sm transition-colors disabled:opacity-50"
              >
                <UploadCloud className="w-4 h-4 text-[#E5A93C]" />
                {isUploadingPoster ? 'Uploading Poster...' : 'Upload Poster Image'}
              </button>

              <div className="relative">
                <input
                  type="text"
                  placeholder="Or paste poster URL..."
                  value={formData.posterUrl || ''}
                  onChange={(e) => setFormData({ ...formData, posterUrl: e.target.value })}
                  className="w-full h-full px-3.5 py-2.5 text-xs font-mono bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E5A93C]/30 focus:border-[#E5A93C]"
                />
              </div>
            </div>

            {formData.posterUrl && (
              <div className="flex items-center justify-between text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                <span className="truncate max-w-[80%] font-mono">{formData.posterUrl}</span>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, posterUrl: '' })}
                  className="text-red-600 hover:text-red-700 font-semibold"
                >
                  Clear Poster
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Hero Section Copy & CTA (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-5">
            <h3 className="font-semibold text-slate-900 flex items-center gap-2 pb-3 border-b border-slate-100">
              <Sparkles className="w-4 h-4 text-[#E5A93C]" />
              Hero Typography & CTA
            </h3>

            {/* Sub-headline / Badge */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Top Badge / Tagline
              </label>
              <textarea
                rows={2}
                value={formData.subHeadline || ''}
                onChange={(e) => setFormData({ ...formData, subHeadline: e.target.value })}
                className="w-full px-3.5 py-2 text-sm bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E5A93C]/30 focus:border-[#E5A93C]"
                placeholder="e.g. AI-POWERED TECHNOLOGY FOR A BRIGHTER TOMORROW"
              />
            </div>

            {/* Headline Prefix */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Headline Prefix (Line 1)
              </label>
              <input
                type="text"
                value={formData.headlinePrefix || ''}
                onChange={(e) => setFormData({ ...formData, headlinePrefix: e.target.value })}
                className="w-full px-3.5 py-2 text-sm bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E5A93C]/30 focus:border-[#E5A93C]"
                placeholder="e.g. Engineering"
              />
            </div>

            {/* Headline Highlight */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Headline Highlight (Line 2)
              </label>
              <input
                type="text"
                value={formData.headlineHighlight || ''}
                onChange={(e) => setFormData({ ...formData, headlineHighlight: e.target.value })}
                className="w-full px-3.5 py-2 text-sm bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E5A93C]/30 focus:border-[#E5A93C]"
                placeholder="e.g. Intelligent"
              />
            </div>

            {/* Headline Suffix */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Headline Suffix (Gold Line 3)
              </label>
              <input
                type="text"
                value={formData.headlineSuffix || ''}
                onChange={(e) => setFormData({ ...formData, headlineSuffix: e.target.value })}
                className="w-full px-3.5 py-2 text-sm bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E5A93C]/30 focus:border-[#E5A93C]"
                placeholder="e.g. Digital Experiences"
              />
            </div>

            {/* CTA Button Text */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                CTA Button Text
              </label>
              <input
                type="text"
                value={formData.ctaText || ''}
                onChange={(e) => setFormData({ ...formData, ctaText: e.target.value })}
                className="w-full px-3.5 py-2 text-sm bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E5A93C]/30 focus:border-[#E5A93C]"
                placeholder="e.g. EXPLORE OUR SOLUTIONS"
              />
            </div>

            {/* CTA Link Target */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                CTA Link URL
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.ctaLink || ''}
                  onChange={(e) => setFormData({ ...formData, ctaLink: e.target.value })}
                  className="w-full pl-9 pr-3.5 py-2 text-sm bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E5A93C]/30 focus:border-[#E5A93C]"
                  placeholder="/portfolio"
                />
                <LinkIcon className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={updateMutation.isPending}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold text-slate-950 bg-[#E5A93C] hover:bg-[#d4972e] shadow-sm transition-all disabled:opacity-50 mt-4"
            >
              <Save className="w-4 h-4" />
              {updateMutation.isPending ? 'Saving Hero Configuration...' : 'Save All Changes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
