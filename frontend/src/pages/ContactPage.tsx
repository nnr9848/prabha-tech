import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User,
  Mail,
  Building,
  Phone,
  MessageSquare,
  CheckCircle2,
  Globe,
  Sparkles,
  ChevronDown,
  ShieldCheck,
  Send,
  MessageCircle,
  Clock,
  ArrowRight,
} from 'lucide-react';
import { publicApi } from '../api/client';
import { LeadInquiry } from '../types';
import { PillButton } from '../components/common/PillButton';
import { SocialIconsGroup } from '../components/common/SocialIconsGroup';
import { useToast } from '../context/ToastContext';

interface CountryCode {
  name: string;
  code: string;
  flag: string;
  sample: string;
}

const POPULAR_COUNTRIES: CountryCode[] = [
  { name: 'United States', code: '+1', flag: '🇺🇸', sample: '(555) 000-0000' },
  { name: 'United Kingdom', code: '+44', flag: '🇬🇧', sample: '7911 123456' },
  { name: 'India', code: '+91', flag: '🇮🇳', sample: '98765 43210' },
  { name: 'Singapore', code: '+65', flag: '🇸🇬', sample: '8123 4567' },
  { name: 'Germany', code: '+49', flag: '🇩🇪', sample: '151 1234567' },
  { name: 'United Arab Emirates', code: '+971', flag: '🇦🇪', sample: '50 123 4567' },
  { name: 'Switzerland', code: '+41', flag: '🇨🇭', sample: '79 123 45 67' },
  { name: 'Canada', code: '+1', flag: '🇨🇦', sample: '(416) 000-0000' },
  { name: 'Australia', code: '+61', flag: '🇦🇺', sample: '412 345 678' },
  { name: 'France', code: '+33', flag: '🇫🇷', sample: '6 12 34 56 78' },
  { name: 'Netherlands', code: '+31', flag: '🇳🇱', sample: '6 12345678' },
  { name: 'Saudi Arabia', code: '+966', flag: '🇸🇦', sample: '50 123 4567' },
  { name: 'Ireland', code: '+353', flag: '🇮🇪', sample: '85 123 4567' },
  { name: 'Luxembourg', code: '+352', flag: '🇱🇺', sample: '621 123 456' },
  { name: 'Sweden', code: '+46', flag: '🇸🇪', sample: '70 123 45 67' },
  { name: 'Hong Kong', code: '+852', flag: '🇭🇰', sample: '9123 4567' },
  { name: 'Japan', code: '+81', flag: '🇯🇵', sample: '90 1234 5678' },
];

const PROJECT_TYPES = [
  'Digital Banking Platform',
  'Fintech Mobile App',
  'Wealthtech & AI Advisor',
  'Crypto & Web3 Ecosystem',
  'Fintech UX Audit & Redesign',
  'Financial Design System',
];

const BUDGET_RANGES = [
  '$25k - $50k',
  '$50k - $100k',
  '$100k - $250k',
  '$250k+',
];

const GLOBAL_PRESENCE = [
  { country: 'United States', flag: '🇺🇸', role: 'Fintech Unicorns & Neo-Banks' },
  { country: 'United Kingdom', flag: '🇬🇧', role: 'Challenger Banks & Wealth Platforms' },
  { country: 'Switzerland', flag: '🇨🇭', role: 'Private Banking & Crypto Assets' },
  { country: 'Singapore & UAE', flag: '🇸🇬', role: 'Sovereign Digital Financial Hubs' },
];

export const ContactPage: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState<CountryCode>(POPULAR_COUNTRIES[0]);
  const [countryDropdownOpen, setCountryDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const [formData, setFormData] = useState<LeadInquiry>({
    fullName: '',
    email: '',
    companyName: '',
    phoneNumber: '',
    projectType: 'Digital Banking Platform',
    budgetRange: '$50k - $100k',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const filteredCountries = POPULAR_COUNTRIES.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.code.includes(searchQuery)
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const fullPhoneNumber = formData.phoneNumber
        ? `${selectedCountry.code} ${formData.phoneNumber.trim()}`
        : '';

      await publicApi.submitInquiry({
        ...formData,
        phoneNumber: fullPhoneNumber,
      });

      setIsSuccess(true);
      toast.success(
        'Strategic Assessment Requested',
        'Our financial UX lead partners will contact you within 24 hours.'
      );
    } catch (err: any) {
      toast.error(
        'Submission Failed',
        err.response?.data?.message || 'Could not send inquiry. Please try again or reach out directly.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-32 pb-24 relative overflow-hidden bg-[#050608]">
      {/* Luxury Atmospheric Background Lights */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[500px] bg-[var(--brand-primary,#9873ff)]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-[#3B82F6]/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-[1500px] mx-auto px-6 sm:px-12 lg:px-20 relative z-10">
        {/* Editorial Page Header */}
        <div className="max-w-4xl mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--brand-primary,#9873ff)]/15 border border-[var(--brand-primary,#9873ff)]/30 text-[var(--brand-primary,#9873ff)] text-xs font-bold uppercase tracking-widest mb-6"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Strategic Partnership & Consultation
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-[68px] font-light text-white tracking-[-0.03em] leading-[1.12] mb-6"
          >
            Let’s discuss your challenge and{' '}
            <span className="text-[var(--brand-primary,#9873ff)] font-normal">
              assess your UX strategy
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg sm:text-xl text-[#94A3B8] font-normal leading-relaxed max-w-2xl"
          >
            Engineered exclusively for financial institutions, tier-1 digital banks, fintech disruptors, and wealth managers demanding world-class execution.
          </motion.p>
        </div>

        {/* 2-Column Split: Interactive Enterprise Form + Direct Channel Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* LEFT: Enterprise Contact Form (7 Cols) */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl bg-[#090C14] border border-white/10 p-7 sm:p-12 shadow-2xl relative">
              <AnimatePresence mode="wait">
                {isSuccess ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5 }}
                    className="py-16 text-center space-y-6"
                  >
                    <div className="w-20 h-20 mx-auto rounded-full bg-[var(--brand-primary,#9873ff)]/20 border border-[var(--brand-primary,#9873ff)]/40 flex items-center justify-center text-[var(--brand-primary,#9873ff)] shadow-[0_0_50px_rgba(152,115,255,0.3)]">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>

                    <div className="space-y-3">
                      <h3 className="text-3xl font-extrabold text-white tracking-tight">
                        Thank you for reaching out!
                      </h3>
                      <p className="text-base text-[#94A3B8] max-w-md mx-auto leading-relaxed">
                        We have securely received your briefing. Our financial UX leadership will analyze your challenge and respond within 24 hours.
                      </p>
                    </div>

                    <div className="pt-4">
                      <PillButton
                        onClick={() => {
                          setIsSuccess(false);
                          setFormData({
                            fullName: '',
                            email: '',
                            companyName: '',
                            phoneNumber: '',
                            projectType: 'Digital Banking Platform',
                            budgetRange: '$50k - $100k',
                            message: '',
                          });
                        }}
                        variant="secondary"
                        size="md"
                      >
                        Submit Another Inquiry
                      </PillButton>
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-7">
                    {/* Row 1: Full Name & Work Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5 text-[var(--brand-primary,#9873ff)]" />
                          Your Name <span className="text-[var(--brand-primary,#9873ff)]">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          placeholder="e.g. Alexander Vance"
                          className="w-full px-4 py-3.5 rounded-xl bg-[#05060A] border border-white/10 text-white placeholder-[#64748B] text-sm focus:outline-none focus:border-[var(--brand-primary,#9873ff)] transition-colors"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                          <Mail className="w-3.5 h-3.5 text-[var(--brand-primary,#9873ff)]" />
                          Corporate Email <span className="text-[var(--brand-primary,#9873ff)]">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="alexander@bankworld.com"
                          className="w-full px-4 py-3.5 rounded-xl bg-[#05060A] border border-white/10 text-white placeholder-[#64748B] text-sm focus:outline-none focus:border-[var(--brand-primary,#9873ff)] transition-colors"
                        />
                      </div>
                    </div>

                    {/* Row 2: Company Name & Phone with Country Picker */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                          <Building className="w-3.5 h-3.5 text-[var(--brand-primary,#9873ff)]" />
                          Company / Institution
                        </label>
                        <input
                          type="text"
                          value={formData.companyName}
                          onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                          placeholder="e.g. Apex Global Bank"
                          className="w-full px-4 py-3.5 rounded-xl bg-[#05060A] border border-white/10 text-white placeholder-[#64748B] text-sm focus:outline-none focus:border-[var(--brand-primary,#9873ff)] transition-colors"
                        />
                      </div>

                      <div className="space-y-2 relative">
                        <label className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                          <Phone className="w-3.5 h-3.5 text-[var(--brand-primary,#9873ff)]" />
                          Direct Phone
                        </label>

                        <div className="flex items-center rounded-xl bg-[#05060A] border border-white/10 focus-within:border-[var(--brand-primary,#9873ff)] transition-colors">
                          {/* Country Code Trigger */}
                          <button
                            type="button"
                            onClick={() => setCountryDropdownOpen(!countryDropdownOpen)}
                            className="flex items-center gap-1.5 px-3 py-3 border-r border-white/10 hover:bg-white/5 transition-colors shrink-0"
                          >
                            <span className="text-base leading-none">{selectedCountry.flag}</span>
                            <span className="text-xs font-semibold text-white">{selectedCountry.code}</span>
                            <ChevronDown className="w-3 h-3 text-[#64748B]" />
                          </button>

                          {/* Number Input */}
                          <input
                            type="tel"
                            value={formData.phoneNumber}
                            onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                            placeholder={selectedCountry.sample}
                            className="w-full px-3.5 py-3.5 bg-transparent text-white placeholder-[#64748B] text-sm focus:outline-none"
                          />
                        </div>

                        {/* Country Selector Dropdown */}
                        {countryDropdownOpen && (
                          <div className="absolute top-full left-0 mt-2 w-72 max-h-64 overflow-y-auto rounded-xl bg-[#0D111A] border border-white/15 p-2 shadow-2xl z-50 custom-scrollbar">
                            <input
                              type="text"
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              placeholder="Search country or code..."
                              className="w-full px-3 py-2 mb-2 rounded-lg bg-[#05060A] border border-white/10 text-xs text-white placeholder-[#64748B] focus:outline-none focus:border-[var(--brand-primary,#9873ff)]"
                            />
                            <div className="space-y-1">
                              {filteredCountries.map((c, i) => (
                                <button
                                  key={i}
                                  type="button"
                                  onClick={() => {
                                    setSelectedCountry(c);
                                    setCountryDropdownOpen(false);
                                    setSearchQuery('');
                                  }}
                                  className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg hover:bg-white/5 text-left text-xs transition-colors"
                                >
                                  <span className="flex items-center gap-2 text-white">
                                    <span>{c.flag}</span>
                                    <span>{c.name}</span>
                                  </span>
                                  <span className="font-mono text-[#9873ff]">{c.code}</span>
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Row 3: Project Type Pills */}
                    <div className="space-y-3">
                      <label className="text-xs font-bold text-white uppercase tracking-wider block">
                        Project Focus / Capability Area
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {PROJECT_TYPES.map((type) => {
                          const isSelected = formData.projectType === type;
                          return (
                            <button
                              key={type}
                              type="button"
                              onClick={() => setFormData({ ...formData, projectType: type })}
                              className={`px-3.5 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                                isSelected
                                  ? 'bg-[var(--brand-primary,#9873ff)] text-black font-bold shadow-[0_0_20px_rgba(152,115,255,0.4)]'
                                  : 'bg-white/5 text-[#94A3B8] hover:text-white hover:bg-white/10 border border-white/10'
                              }`}
                            >
                              {type}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Row 4: Anticipated Budget Range */}
                    <div className="space-y-3">
                      <label className="text-xs font-bold text-white uppercase tracking-wider block">
                        Estimated Investment Range
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                        {BUDGET_RANGES.map((b) => {
                          const isSelected = formData.budgetRange === b;
                          return (
                            <button
                              key={b}
                              type="button"
                              onClick={() => setFormData({ ...formData, budgetRange: b })}
                              className={`py-2.5 px-3 rounded-xl text-xs font-semibold tracking-wide transition-all text-center ${
                                isSelected
                                  ? 'bg-[var(--brand-primary,#9873ff)] text-black font-bold shadow-[0_0_20px_rgba(152,115,255,0.4)]'
                                  : 'bg-white/5 text-[#94A3B8] hover:text-white hover:bg-white/10 border border-white/10'
                              }`}
                            >
                              {b}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Row 5: Detailed Project Challenge */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                        <MessageSquare className="w-3.5 h-3.5 text-[var(--brand-primary,#9873ff)]" />
                        Project Challenge & Vision <span className="text-[var(--brand-primary,#9873ff)]">*</span>
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Share your objectives, current architecture pain points, timeline expectations, or desired user outcomes..."
                        className="w-full px-4 py-3.5 rounded-xl bg-[#05060A] border border-white/10 text-white placeholder-[#64748B] text-sm focus:outline-none focus:border-[var(--brand-primary,#9873ff)] transition-colors resize-none leading-relaxed"
                      />
                    </div>

                    {/* Privacy Guarantee & Submit Button */}
                    <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-2 text-xs text-[#64748B]">
                        <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>Strict NDA confidentiality guaranteed.</span>
                      </div>

                      <PillButton
                        type="submit"
                        variant="primary"
                        size="lg"
                        isLoading={isSubmitting}
                      >
                        Send Request
                      </PillButton>
                    </div>
                  </form>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* RIGHT: Direct Communication Channels & Global Portfolio Sidebar (5 Cols) */}
          <div className="lg:col-span-5 space-y-8">
            {/* 1. Direct High-Touch Communication Card */}
            <div className="p-8 rounded-3xl bg-[#090C14] border border-white/10 space-y-6">
              <div className="space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[var(--brand-primary,#9873ff)]">
                  Instant Response
                </span>
                <h3 className="text-2xl font-extrabold text-white tracking-tight">
                  Direct Partner Access
                </h3>
              </div>

              <div className="space-y-4">
                {/* Email */}
                <a
                  href="mailto:info@prabhatech.com"
                  className="flex items-center gap-4 p-4 rounded-2xl bg-[#05060A] border border-white/10 hover:border-[var(--brand-primary,#9873ff)]/40 transition-all group"
                >
                  <div className="w-11 h-11 rounded-xl bg-[var(--brand-primary,#9873ff)]/15 border border-[var(--brand-primary,#9873ff)]/30 flex items-center justify-center text-[var(--brand-primary,#9873ff)] group-hover:scale-110 transition-transform">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] text-[#64748B] uppercase font-bold tracking-wider">
                      Write directly to our directors
                    </div>
                    <div className="text-sm sm:text-base font-semibold text-white group-hover:text-[var(--brand-primary,#9873ff)] transition-colors">
                      info@prabhatech.com
                    </div>
                  </div>
                </a>

                {/* WhatsApp & Call */}
                <a
                  href="https://wa.me/37120020023"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-2xl bg-[#05060A] border border-white/10 hover:border-emerald-500/40 transition-all group"
                >
                  <div className="w-11 h-11 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] text-[#64748B] uppercase font-bold tracking-wider">
                      WhatsApp Quick Response
                    </div>
                    <div className="text-sm sm:text-base font-semibold text-white group-hover:text-emerald-400 transition-colors">
                      Chat on WhatsApp
                    </div>
                  </div>
                </a>

                {/* Telephone */}
                <a
                  href="tel:+37120020023"
                  className="flex items-center gap-4 p-4 rounded-2xl bg-[#05060A] border border-white/10 hover:border-cyan-500/40 transition-all group"
                >
                  <div className="w-11 h-11 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] text-[#64748B] uppercase font-bold tracking-wider">
                      Direct Voice Line
                    </div>
                    <div className="text-sm sm:text-base font-semibold text-white group-hover:text-cyan-400 transition-colors">
                      +371 200 200 23
                    </div>
                  </div>
                </a>
              </div>

              {/* Turnaround Guarantee */}
              <div className="flex items-center gap-2 pt-2 text-xs text-[#94A3B8]">
                <Clock className="w-4 h-4 text-[var(--brand-primary,#9873ff)] shrink-0" />
                <span>Typical leadership turnaround under 6 business hours.</span>
              </div>
            </div>

            {/* 2. Global Footprint & Trusted By Tier-1 Institutions */}
            <div className="p-8 rounded-3xl bg-[#090C14] border border-white/10 space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#9873ff]">
                  Worldwide Reach
                </span>
                <Globe className="w-4 h-4 text-[#9873ff]" />
              </div>

              <div className="space-y-2">
                <h4 className="text-xl font-extrabold text-white tracking-tight">
                  Delivered to Tier-1 Leaders in 30+ Countries
                </h4>
                <p className="text-xs text-[#94A3B8] leading-relaxed">
                  PrabhaTech architects human-centered financial technology for institutions operating under the most rigorous regulatory standards.
                </p>
              </div>

              <div className="space-y-2.5">
                {GLOBAL_PRESENCE.map((g, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 rounded-xl bg-[#05060A] border border-white/5"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-lg leading-none">{g.flag}</span>
                      <span className="text-xs font-semibold text-white">{g.country}</span>
                    </div>
                    <span className="text-[11px] text-[#64748B] font-mono">{g.role}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Official Social Channels */}
            <div className="p-6 rounded-3xl bg-[#090C14] border border-white/10 space-y-4">
              <div className="text-xs font-bold uppercase tracking-wider text-white">
                Follow PrabhaTech Global Insights
              </div>
              <SocialIconsGroup />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
