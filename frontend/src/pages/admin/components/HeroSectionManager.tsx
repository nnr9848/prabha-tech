import React, { useState, useEffect } from 'react';
import { HeroConfig } from '../../../types';
import { PillButton } from '../../../components/common/PillButton';
import {
  Sparkles,
  Save,
  Video,
  Image as ImageIcon,
  Type,
  Link2,
  CheckCircle2,
  RefreshCw,
  Eye,
} from 'lucide-react';
import { motion } from 'framer-motion';

interface HeroSectionManagerProps {
  heroConfig: HeroConfig | null;
  onSave: (data: Partial<HeroConfig>) => void;
  isSaving: boolean;
}

export const HeroSectionManager: React.FC<HeroSectionManagerProps> = ({
  heroConfig,
  onSave,
  isSaving,
}) => {
  const [formData, setFormData] = useState<Partial<HeroConfig>>({
    subHeadline:
      'We catalyze business growth by reimagining digital experiences that conquer complex challenges through innovation and agility.',
    headlinePrefix: 'Meet the',
    headlineHighlight: 'Digital Drivers',
    headlineSuffix: 'of Global Disruptors',
    ctaText: 'Contact Our Experts',
    ctaLink: '/contact',
    videoUrl: 'https://www.theuxda.com/storage/app/media/background-video/UXDA-bg-X-desktop.mp4',
    posterUrl: 'https://www.theuxda.com/storage/app/media/background-video/UXDA-bg-X-desktop.jpg',
  });

  const [savedFeedback, setSavedFeedback] = useState(false);

  useEffect(() => {
    if (heroConfig) {
      setFormData(heroConfig);
    }
  }, [heroConfig]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setSavedFeedback(true);
    setTimeout(() => setSavedFeedback(false), 3000);
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-[#0D111A] border border-white/10">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-white">Dynamic Hero Section CMS</h3>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[var(--brand-primary,#9873ff)]/20 text-[var(--brand-primary,#9873ff)] uppercase">
              Live Synchronized
            </span>
          </div>
          <p className="text-xs text-[#94A3B8]">
            Configure the homepage value proposition, typography, video background, and call-to-action button in real-time.
          </p>
        </div>

        <PillButton
          onClick={handleSubmit}
          disabled={isSaving}
          isLoading={isSaving}
          size="sm"
          icon={<Save className="w-3.5 h-3.5 text-[var(--brand-primary,#9873ff)] group-hover:text-white transition-colors" />}
          iconPosition="left"
          showDefaultIcon={false}
        >
          {savedFeedback ? 'Saved Successfully!' : 'Save Hero Config'}
        </PillButton>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form Editor (5 cols) */}
        <form onSubmit={handleSubmit} className="lg:col-span-5 space-y-5 rounded-2xl bg-[#0D111A] border border-white/10 p-6">
          <div className="flex items-center gap-2 pb-3 border-b border-white/10">
            <Type className="w-4 h-4 text-[var(--brand-primary,#9873ff)]" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Hero Messaging & Copy</h4>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#94A3B8] mb-1">
              Top Editorial Sub-Headline *
            </label>
            <textarea
              rows={3}
              required
              value={formData.subHeadline || ''}
              onChange={(e) => setFormData({ ...formData, subHeadline: e.target.value })}
              className="w-full p-3 rounded-xl bg-[#07090E] border border-white/10 text-white text-xs leading-relaxed resize-none focus:outline-none focus:border-[var(--brand-primary,#9873ff)]/50"
            />
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-[#94A3B8] mb-1">
                Headline Prefix Line *
              </label>
              <input
                type="text"
                required
                value={formData.headlinePrefix || ''}
                onChange={(e) => setFormData({ ...formData, headlinePrefix: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-[#07090E] border border-white/10 text-white text-xs focus:outline-none focus:border-[var(--brand-primary,#9873ff)]/50"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[var(--brand-primary,#9873ff)] mb-1">
                Headline Highlight (Brand Purple Word) *
              </label>
              <input
                type="text"
                required
                value={formData.headlineHighlight || ''}
                onChange={(e) => setFormData({ ...formData, headlineHighlight: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-[#07090E] border border-[var(--brand-primary,#9873ff)]/40 text-white text-xs focus:outline-none focus:border-[var(--brand-primary,#9873ff)]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#94A3B8] mb-1">
                Headline Suffix Line *
              </label>
              <input
                type="text"
                required
                value={formData.headlineSuffix || ''}
                onChange={(e) => setFormData({ ...formData, headlineSuffix: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-[#07090E] border border-white/10 text-white text-xs focus:outline-none focus:border-[var(--brand-primary,#9873ff)]/50"
              />
            </div>
          </div>

          <div className="pt-3 border-t border-white/10">
            <div className="flex items-center gap-2 pb-3">
              <Link2 className="w-4 h-4 text-[var(--brand-primary,#9873ff)]" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-white">Call-To-Action Button</h4>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#94A3B8] mb-1">CTA Label *</label>
                <input
                  type="text"
                  required
                  value={formData.ctaText || ''}
                  onChange={(e) => setFormData({ ...formData, ctaText: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-[#07090E] border border-white/10 text-white text-xs focus:outline-none focus:border-[var(--brand-primary,#9873ff)]/50"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#94A3B8] mb-1">Target Route *</label>
                <input
                  type="text"
                  required
                  value={formData.ctaLink || ''}
                  onChange={(e) => setFormData({ ...formData, ctaLink: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-[#07090E] border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-[var(--brand-primary,#9873ff)]/50"
                />
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-white/10">
            <div className="flex items-center gap-2 pb-3">
              <Video className="w-4 h-4 text-[var(--brand-primary,#9873ff)]" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-white">3D Hologram Video Background</h4>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-[#94A3B8] mb-1">Video Stream URL (.mp4) *</label>
                <input
                  type="url"
                  required
                  value={formData.videoUrl || ''}
                  onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-[#07090E] border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-[var(--brand-primary,#9873ff)]/50"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#94A3B8] mb-1">Fallback Poster Image URL *</label>
                <input
                  type="url"
                  required
                  value={formData.posterUrl || ''}
                  onChange={(e) => setFormData({ ...formData, posterUrl: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-[#07090E] border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-[var(--brand-primary,#9873ff)]/50"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 flex justify-end">
            <PillButton
              type="submit"
              disabled={isSaving}
              isLoading={isSaving}
              size="md"
              icon={<Save className="w-4 h-4 text-[var(--brand-primary,#9873ff)] group-hover:text-white transition-colors" />}
              iconPosition="left"
              showDefaultIcon={false}
              className="w-full"
            >
              {isSaving ? 'Saving Changes...' : 'Save & Publish Live'}
            </PillButton>
          </div>
        </form>

        {/* Right Column: Interactive Real-Time Live Preview Card (7 cols) */}
        <div className="lg:col-span-7 space-y-4 sticky top-24">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider">
              <Eye className="w-4 h-4 text-[var(--brand-primary,#9873ff)]" />
              <span>Real-Time Live Preview</span>
            </div>
            <span className="text-[11px] text-[#64748B]">Simulated Homepage Screen</span>
          </div>

          <div className="relative rounded-2xl overflow-hidden border border-white/20 bg-[#050608] shadow-2xl min-h-[480px] p-6 sm:p-10 flex flex-col justify-center">
            {/* Background Simulated Video */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
              {formData.videoUrl && (
                <video
                  key={formData.videoUrl}
                  autoPlay
                  loop
                  muted
                  playsInline
                  poster={formData.posterUrl}
                  className="w-full h-full object-cover opacity-80"
                >
                  <source src={formData.videoUrl} type="video/mp4" />
                </video>
              )}
              <div className="absolute inset-0 bg-gradient-to-r from-[#050608]/90 via-[#050608]/50 to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#050608] via-transparent to-[#050608]/60"></div>
            </div>

            {/* Live Text Overlay */}
            <div className="relative z-10 max-w-xl space-y-6">
              <p className="text-xs sm:text-sm text-white/90 font-normal leading-relaxed max-w-md">
                {formData.subHeadline || 'Editorial sub-headline preview...'}
              </p>

              <h2 className="text-2xl sm:text-4xl font-light text-white tracking-tight leading-tight">
                {formData.headlinePrefix}{' '}
                <span className="text-[var(--brand-primary,#9873ff)] font-normal">
                  {formData.headlineHighlight}
                </span>
                <br />
                {formData.headlineSuffix}
              </h2>

              <div>
                <PillButton size="md" showDefaultIcon={true}>
                  {formData.ctaText || 'Contact Us'}
                </PillButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
