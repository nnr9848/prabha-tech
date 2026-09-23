import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { publicApi } from '../../api/client';
import { LeadInquiry } from '../../types';
import { Send, CheckCircle2, ShieldCheck, Mail, Building, Phone, User, MessageSquare } from 'lucide-react';
import { PillButton } from '../common/PillButton';
import { useToast } from '../../context/ToastContext';

export const InquirySection: React.FC = () => {
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
  const [errorMessage, setErrorMessage] = useState('');

  const projectTypes = [
    'Digital Banking Platform',
    'Fintech Mobile App',
    'Wealthtech & AI Coach',
    'Crypto & Web3 Interface',
    'Fintech UX Audit',
  ];

  const budgetRanges = [
    '$25k - $50k',
    '$50k - $100k',
    '$100k - $250k',
    '$250k+',
  ];

  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      await publicApi.submitInquiry(formData);
      setIsSuccess(true);
      toast.success('Consultation Request Submitted', 'Our financial UX architects will contact you within 24 hours.');
      setFormData({
        fullName: '',
        email: '',
        companyName: '',
        phoneNumber: '',
        projectType: 'Digital Banking Platform',
        budgetRange: '$50k - $100k',
        message: '',
      });
    } catch (err: any) {
      const msg = err.response?.data?.message || 'Failed to submit inquiry. Please try again.';
      setErrorMessage(msg);
      toast.error('Submission Failed', msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-28 relative z-10 bg-[#030508] border-t border-white/8">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Left Info */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#9873ff] mb-3">
                Start Your Digital Transformation
              </div>
              <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-5">
                Let's Architect the Future of Your Financial Product
              </h2>
              <p className="text-base text-[#94A3B8] leading-relaxed font-normal">
                Whether you're launching a disruptive fintech unicorn or modernizing a tier-1 banking ecosystem, our senior UX architects are ready to guide your journey.
              </p>
            </div>

            <div className="space-y-4 pt-6 border-t border-white/8">
              <div className="flex items-center gap-3 text-sm text-[#94A3B8] font-medium">
                <ShieldCheck className="w-5 h-5 text-[#9873ff]" />
                <span>Strict Non-Disclosure Agreement (NDA) Guarantee</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-[#94A3B8] font-medium">
                <CheckCircle2 className="w-5 h-5 text-[#9873ff]" />
                <span>Direct Executive Consultation within 24 Hours</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-[#94A3B8] font-medium">
                <Mail className="w-5 h-5 text-[#9873ff]" />
                <a href="mailto:info@prabhatech.com" className="text-white hover:text-[#9873ff] transition-colors">
                  info@prabhatech.com
                </a>
              </div>
            </div>
          </div>

          {/* Right Form Card */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-8 sm:p-10 rounded-2xl bg-[#0B101D] border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.8)] relative"
            >
              {isSuccess ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#9873ff]/10 border border-[#9873ff]/30 text-[#9873ff] flex items-center justify-center mx-auto shadow-lg">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-white">Inquiry Received Successfully!</h3>
                  <p className="text-sm text-[#94A3B8] max-w-md mx-auto font-normal">
                    Thank you for reaching out to PrabhaTech. Our senior financial UX strategists will review your specifications and connect within 24 hours.
                  </p>
                  <PillButton
                    onClick={() => setIsSuccess(false)}
                    variant="secondary"
                    size="sm"
                    className="mt-4"
                  >
                    Submit Another Request
                  </PillButton>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {errorMessage && (
                    <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs">
                      {errorMessage}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Full Name */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#94A3B8] mb-2">
                        Full Name *
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-[#64748B] absolute left-3.5 top-3.5" />
                        <input
                          type="text"
                          required
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          placeholder="e.g. Alex Morgan"
                          className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#030508] border border-white/10 text-white placeholder-[#64748B] focus:border-[#9873ff] focus:outline-none text-sm transition-colors"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#94A3B8] mb-2">
                        Corporate Email *
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-[#64748B] absolute left-3.5 top-3.5" />
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="alex@bankgroup.com"
                          className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#030508] border border-white/10 text-white placeholder-[#64748B] focus:border-[#9873ff] focus:outline-none text-sm transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Company */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#94A3B8] mb-2">
                        Company Name
                      </label>
                      <div className="relative">
                        <Building className="w-4 h-4 text-[#64748B] absolute left-3.5 top-3.5" />
                        <input
                          type="text"
                          value={formData.companyName}
                          onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                          placeholder="Fintech Corp"
                          className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#030508] border border-white/10 text-white placeholder-[#64748B] focus:border-[#9873ff] focus:outline-none text-sm transition-colors"
                        />
                      </div>
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#94A3B8] mb-2">
                        Phone Number
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-[#64748B] absolute left-3.5 top-3.5" />
                        <input
                          type="text"
                          value={formData.phoneNumber}
                          onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                          placeholder="+1 (555) 000-0000"
                          className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#030508] border border-white/10 text-white placeholder-[#64748B] focus:border-[#9873ff] focus:outline-none text-sm transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Project Type */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#94A3B8] mb-2">
                      Primary Project Focus
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {projectTypes.map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setFormData({ ...formData, projectType: type })}
                          className={`p-2.5 rounded-xl text-xs font-medium border text-left transition-all ${
                            formData.projectType === type
                              ? 'bg-[#9873ff]/15 border-[#9873ff] text-[#9873ff]'
                              : 'bg-[#030508] border-white/10 text-[#94A3B8] hover:border-white/20'
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Budget Range */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#94A3B8] mb-2">
                      Estimated Project Budget
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {budgetRanges.map((range) => (
                        <button
                          key={range}
                          type="button"
                          onClick={() => setFormData({ ...formData, budgetRange: range })}
                          className={`p-2.5 rounded-xl text-xs font-medium border text-center transition-all ${
                            formData.budgetRange === range
                              ? 'bg-[#9873ff]/15 border-[#9873ff] text-[#9873ff]'
                              : 'bg-[#030508] border-white/10 text-[#94A3B8] hover:border-white/20'
                          }`}
                        >
                          {range}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#94A3B8] mb-2">
                      Project Goals & Context *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Describe your product challenges, current timeline, and target goals..."
                      className="w-full p-4 rounded-xl bg-[#030508] border border-white/10 text-white placeholder-[#64748B] focus:border-[#9873ff] focus:outline-none text-sm transition-colors resize-none"
                    ></textarea>
                  </div>

                  <PillButton
                    type="submit"
                    disabled={isSubmitting}
                    isLoading={isSubmitting}
                    size="lg"
                    className="w-full"
                    icon={<Send className="w-4 h-4 text-[#9873ff] group-hover:text-white transition-colors" />}
                  >
                    Submit Project Consultation
                  </PillButton>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

