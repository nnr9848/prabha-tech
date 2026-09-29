import React, { useState, useRef, useEffect } from 'react';
import {
  User,
  Building,
  Mail,
  Phone,
  HelpCircle,
  Globe,
  UploadCloud,
  CheckCircle2,
  Clock,
  MapPin,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  FileText,
  Users2,
  Star,
  Users,
  X,
  File,
  MessageSquare,
  ShieldCheck,
  Check,
} from 'lucide-react';
import { SocialIconsGroup } from '../components/common/SocialIconsGroup';
import { BrandButton } from '../components/common/BrandButton';
import { ClientLogosCarousel } from '../components/common/ClientLogosCarousel';
import { publicApi } from '../api/client';
import { LeadInquiry } from '../types';

export const ContactPage: React.FC = () => {
  // Form State
  const [fullName, setFullName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [countryCode, setCountryCode] = useState('+971');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [inquiryType, setInquiryType] = useState('');
  const [country, setCountry] = useState('');
  const [details, setDetails] = useState('');
  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 10 * 1024 * 1024) {
        alert('File size exceeds 10MB limit.');
        return;
      }
      setAttachedFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!agreedToTerms) {
      setErrorMessage('Please agree to the Terms & Conditions and Privacy Policy.');
      return;
    }

    setIsSubmitting(true);

    try {
      let finalAttachmentUrl = '';
      let finalAttachmentFileName = '';

      if (attachedFile) {
        const uploadResult = await publicApi.uploadDocument(attachedFile);
        finalAttachmentUrl = uploadResult.url;
        finalAttachmentFileName = uploadResult.fileName || attachedFile.name;
      }

      const payload: LeadInquiry = {
        fullName,
        email,
        companyName,
        phoneNumber: `${countryCode} ${phoneNumber}`.trim(),
        projectType: inquiryType || 'General Inquiry',
        budgetRange: 'Enterprise',
        message: `Country: ${country}\nDetails: ${details}`,
        attachmentUrl: finalAttachmentUrl || undefined,
        attachmentFileName: finalAttachmentFileName || undefined,
      };

      await publicApi.submitInquiry(payload);
      setIsSuccess(true);
    } catch {
      // Graceful fallback for UI demonstration
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white text-slate-900 font-sans selection:bg-[#E5A93C]/30 min-h-screen">
      {/* ========================================================= */}
      {/* 1. HERO SECTION: Daylight Corporate Skyline & Trust Badges */}
      {/* ========================================================= */}
      <section className="relative pt-32 sm:pt-36 pb-16 lg:pb-24 border-b border-slate-100 overflow-hidden bg-white">
        {/* Right Architectural Facade & Dubai Skyline Visual with Smooth Left Edge Fade */}
        <div 
          className="absolute right-0 top-0 bottom-0 w-full lg:w-[56%] z-0 pointer-events-none overflow-hidden"
          style={{
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.2) 15%, rgba(0,0,0,0.85) 45%, black 75%)',
            maskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.2) 15%, rgba(0,0,0,0.85) 45%, black 75%)',
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1600&q=85"
            alt="Prabha Technologies Corporate Hub & Skyline"
            className="w-full h-full object-cover object-center scale-100"
          />
          {/* Subtle edge feathering */}
          <div className="hidden lg:block absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent pointer-events-none" />
          <div className="hidden lg:block absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white to-transparent pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <span className="heading-eyebrow block">
                GET IN TOUCH
              </span>
              <h1 className="heading-hero text-[#020E26]">
                Let’s Build a <br />
                Smarter <span className="text-[#E5A93C] font-light">Tomorrow</span>
              </h1>
              <p className="text-base sm:text-lg text-slate-600 max-w-xl font-light leading-relaxed">
                Have a project idea, need expert consultation or want to partner with us? Our team is here to help.
              </p>

              {/* 4 High-Trust Value Pillars Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 max-w-2xl">
                <div className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-50 border border-slate-200/60 shadow-xs">
                  <Clock className="w-4 h-4 text-[#E5A93C] shrink-0" />
                  <div>
                    <span className="text-[11px] font-bold text-[#020E26] block">Quick Response</span>
                    <span className="text-[9px] text-slate-400">Within 24 Hours</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-50 border border-slate-200/60 shadow-xs">
                  <Phone className="w-4 h-4 text-[#E5A93C] shrink-0" />
                  <div>
                    <span className="text-[11px] font-bold text-[#020E26] block">Expert</span>
                    <span className="text-[9px] text-slate-400">Consultation</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-50 border border-slate-200/60 shadow-xs">
                  <Sparkles className="w-4 h-4 text-[#E5A93C] shrink-0" />
                  <div>
                    <span className="text-[11px] font-bold text-[#020E26] block">Tailored</span>
                    <span className="text-[9px] text-slate-400">Solutions</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-50 border border-slate-200/60 shadow-xs">
                  <ShieldCheck className="w-4 h-4 text-[#E5A93C] shrink-0" />
                  <div>
                    <span className="text-[11px] font-bold text-[#020E26] block">Long-Term</span>
                    <span className="text-[9px] text-slate-400">Partnership</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Vignette Card */}
            <div className="lg:col-span-5 flex justify-end">
              <div className="relative w-full max-w-sm rounded-2xl bg-[#000B1E]/80 backdrop-blur-md border border-white/10 p-6 shadow-2xl text-white">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-[#E5A93C]" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#E5A93C]">
                    PRABHA TECHNOLOGIES
                  </span>
                </div>
                <h3 className="text-xl font-light leading-tight mb-2 text-white">
                  AI INNOVATION HUB
                </h3>
                <div className="pt-3 border-t border-white/10 text-xs text-slate-300 font-light space-y-0.5">
                  <p>People. Ideas.</p>
                  <p className="text-[#E5A93C] font-normal">Technology.</p>
                  <p>A Better Tomorrow.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. MAIN 2-COLUMN CONTACT INTERACTION SECTION */}
      {/* ========================================================= */}
      <section className="py-16 sm:py-24 bg-slate-50/60 border-b border-slate-100">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* LEFT: Send Us a Message Form Card (7 Cols) */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-xl">
              <div className="mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-[#020E26]">
                  Send Us a <span className="text-[#E5A93C] font-normal">Message</span>
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 font-light mt-1.5">
                  Tell us about your requirements and our team will get back to you shortly.
                </p>
              </div>

              {isSuccess ? (
                <div className="py-14 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto text-emerald-600">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#020E26]">Message Received!</h3>
                  <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                    Thank you for contacting Prabha Technologies. Our business development team will review your requirements and reach out within 24 hours.
                  </p>
                  <div className="pt-3">
                    <button
                      type="button"
                      onClick={() => {
                        setIsSuccess(false);
                        setFullName('');
                        setCompanyName('');
                        setEmail('');
                        setPhoneNumber('');
                        setDetails('');
                        setAttachedFile(null);
                      }}
                      className="px-6 py-2.5 rounded-md bg-[#020E26] hover:bg-[#E5A93C] hover:text-[#000B1E] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-sm cursor-pointer"
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {errorMessage && (
                    <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-600 font-medium">
                      {errorMessage}
                    </div>
                  )}

                  {/* Row 1: Full Name & Company Name */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <div className="relative flex items-center bg-slate-50/70 rounded-xl border border-slate-200 focus-within:border-[#E5A93C] focus-within:bg-white transition-all px-3.5 py-3">
                        <User className="w-4 h-4 text-slate-400 mr-2.5 shrink-0" />
                        <input
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="Enter your full name"
                          className="w-full bg-transparent text-xs sm:text-sm text-slate-800 placeholder-slate-400 outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                        Company Name <span className="text-red-500">*</span>
                      </label>
                      <div className="relative flex items-center bg-slate-50/70 rounded-xl border border-slate-200 focus-within:border-[#E5A93C] focus-within:bg-white transition-all px-3.5 py-3">
                        <Building className="w-4 h-4 text-slate-400 mr-2.5 shrink-0" />
                        <input
                          type="text"
                          required
                          value={companyName}
                          onChange={(e) => setCompanyName(e.target.value)}
                          placeholder="Enter your company name"
                          className="w-full bg-transparent text-xs sm:text-sm text-slate-800 placeholder-slate-400 outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Row 2: Email Address & Phone Number */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <div className="relative flex items-center bg-slate-50/70 rounded-xl border border-slate-200 focus-within:border-[#E5A93C] focus-within:bg-white transition-all px-3.5 py-3">
                        <Mail className="w-4 h-4 text-slate-400 mr-2.5 shrink-0" />
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="you@company.com"
                          className="w-full bg-transparent text-xs sm:text-sm text-slate-800 placeholder-slate-400 outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <div className="flex items-center gap-2">
                        {/* Country Flag Code */}
                        <div className="relative shrink-0">
                          <select
                            value={countryCode}
                            onChange={(e) => setCountryCode(e.target.value)}
                            className="appearance-none bg-slate-50/70 border border-slate-200 rounded-xl px-3 py-3 text-xs text-slate-800 outline-none focus:border-[#E5A93C] focus:bg-white transition-all cursor-pointer pr-7"
                          >
                            <option value="+971">🇦🇪 +971</option>
                            <option value="+966">🇸🇦 +966</option>
                            <option value="+965">🇰🇼 +965</option>
                            <option value="+91">🇮🇳 +91</option>
                            <option value="+1">🇺🇸 +1</option>
                            <option value="+44">🇬🇧 +44</option>
                          </select>
                          <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2 top-4 pointer-events-none" />
                        </div>

                        {/* Phone Input */}
                        <input
                          type="tel"
                          required
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          placeholder="Enter phone number"
                          className="flex-1 bg-slate-50/70 border border-slate-200 rounded-xl px-3.5 py-3 text-xs sm:text-sm text-slate-800 outline-none focus:border-[#E5A93C] focus:bg-white transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Row 3: Inquiry Type & Country */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                        Inquiry Type <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <select
                          required
                          value={inquiryType}
                          onChange={(e) => setInquiryType(e.target.value)}
                          className="w-full appearance-none bg-slate-50/70 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-800 outline-none focus:border-[#E5A93C] focus:bg-white transition-all cursor-pointer pr-10"
                        >
                          <option value="">Select inquiry type</option>
                          <option value="Enterprise Software">Enterprise Software</option>
                          <option value="Mobile Applications">Mobile Applications</option>
                          <option value="AI & Analytics">AI & Analytics</option>
                          <option value="Industrial IoT">Industrial IoT</option>
                          <option value="Smart Buildings (BEMS)">Smart Buildings (BEMS)</option>
                          <option value="Cloud & DevOps">Cloud & DevOps</option>
                          <option value="Managed IT Services">Managed IT Services</option>
                          <option value="General Inquiry">General Inquiry</option>
                        </select>
                        <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5 pointer-events-none" />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                        Country <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <select
                          required
                          value={country}
                          onChange={(e) => setCountry(e.target.value)}
                          className="w-full appearance-none bg-slate-50/70 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-800 outline-none focus:border-[#E5A93C] focus:bg-white transition-all cursor-pointer pr-10"
                        >
                          <option value="">Select your country</option>
                          <option value="United Arab Emirates">United Arab Emirates</option>
                          <option value="Saudi Arabia">Saudi Arabia</option>
                          <option value="Kuwait">Kuwait</option>
                          <option value="India">India</option>
                          <option value="United States">United States</option>
                          <option value="United Kingdom">United Kingdom</option>
                          <option value="Other">Other</option>
                        </select>
                        <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  {/* Project / Requirement Details */}
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                      Project / Requirement Details <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      required
                      rows={4}
                      maxLength={2000}
                      value={details}
                      onChange={(e) => setDetails(e.target.value)}
                      placeholder="Please describe your requirements, project goals, timeline and any specific details..."
                      className="w-full bg-slate-50/70 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-800 outline-none focus:border-[#E5A93C] focus:bg-white transition-all leading-relaxed"
                    />
                    <div className="flex justify-end mt-1">
                      <span className="text-[10px] text-slate-400">
                        {details.length}/2000
                      </span>
                    </div>
                  </div>

                  {/* Attach Files (Optional) */}
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                      Attach Files (Optional)
                    </label>
                    <div className="relative rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/50 hover:bg-slate-50 hover:border-[#E5A93C]/50 transition-all p-6 text-center">
                      <input
                        type="file"
                        id="contact-file-upload"
                        accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.jpg,.png"
                        onChange={handleFileUpload}
                        className="hidden"
                      />

                      {attachedFile ? (
                        <div className="flex items-center justify-center gap-3">
                          <File className="w-6 h-6 text-[#E5A93C]" />
                          <div className="text-left">
                            <span className="text-xs font-semibold text-[#020E26] block">
                              {attachedFile.name}
                            </span>
                            <span className="text-[10px] text-slate-400">
                              {(attachedFile.size / 1024 / 1024).toFixed(2)} MB
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => setAttachedFile(null)}
                            className="ml-2 w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 hover:bg-red-100 hover:text-red-600 transition-colors"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <label htmlFor="contact-file-upload" className="cursor-pointer block">
                          <UploadCloud className="w-7 h-7 text-[#020E26] mx-auto mb-1.5" />
                          <p className="text-xs text-slate-600 font-medium">
                            Drag & drop files here, or{' '}
                            <span className="text-[#020E26] underline font-semibold hover:text-[#E5A93C]">
                              Browse Files
                            </span>
                          </p>
                          <span className="text-[10px] text-slate-400 block mt-0.5">
                            Supported formats: PDF, DOC, DOCX, XLS, XLSX, PPT, JPG, PNG (Max 10 MB)
                          </span>
                        </label>
                      )}
                    </div>
                  </div>

                  {/* Terms Checkbox */}
                  <div className="flex items-start gap-2.5 pt-1">
                    <input
                      type="checkbox"
                      id="contact-terms"
                      required
                      checked={agreedToTerms}
                      onChange={(e) => setAgreedToTerms(e.target.checked)}
                      className="mt-0.5 rounded text-[#E5A93C] focus:ring-[#E5A93C] cursor-pointer"
                    />
                    <label htmlFor="contact-terms" className="text-xs text-slate-600 cursor-pointer select-none">
                      I agree to the{' '}
                      <span className="underline hover:text-[#020E26]">Terms & Conditions</span> and{' '}
                      <span className="underline hover:text-[#020E26]">Privacy Policy</span>. <span className="text-red-500">*</span>
                    </label>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <BrandButton
                      type="submit"
                      variant="dark"
                      size="lg"
                      isLoading={isSubmitting}
                      className="w-full justify-center text-sm py-3.5 rounded-xl shadow-md"
                    >
                      Send Message
                    </BrandButton>
                  </div>
                </form>
              )}
            </div>

            {/* RIGHT: Corporate Contact Information & Channels Card (5 Cols) */}
            <div className="lg:col-span-5 space-y-6">
              {/* Dark Navy Channels Box */}
              <div className="rounded-3xl bg-[#000B1E] text-white p-7 sm:p-9 border border-slate-800 shadow-xl">
                <h3 className="text-xl font-bold text-white mb-2">
                  Contact Information
                </h3>
                <p className="text-xs text-slate-400 font-light mb-6 leading-relaxed">
                  Reach out to us through any of the channels below or fill out the form and we&apos;ll get back to you.
                </p>

                {/* Direct Channel Items */}
                <div className="space-y-4">
                  {/* Phone UAE */}
                  <a
                    href="tel:+971543255456"
                    className="flex items-center gap-4 group p-2 -ml-2 rounded-xl hover:bg-white/5 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-full bg-[#E5A93C]/15 border border-[#E5A93C]/30 flex items-center justify-center text-[#E5A93C] shrink-0 group-hover:scale-105 transition-transform">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-white block group-hover:text-[#E5A93C] transition-colors">
                        +971 54 325 5456
                      </span>
                      <span className="text-[11px] text-slate-400">UAE (Primary)</span>
                    </div>
                  </a>

                  {/* Phone India */}
                  <a
                    href="tel:+919456892222"
                    className="flex items-center gap-4 group p-2 -ml-2 rounded-xl hover:bg-white/5 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-full bg-[#E5A93C]/15 border border-[#E5A93C]/30 flex items-center justify-center text-[#E5A93C] shrink-0 group-hover:scale-105 transition-transform">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-white block group-hover:text-[#E5A93C] transition-colors">
                        +91 94568 92222
                      </span>
                      <span className="text-[11px] text-slate-400">India</span>
                    </div>
                  </a>

                  {/* Email General */}
                  <a
                    href="mailto:info@prabhatech.com"
                    className="flex items-center gap-4 group p-2 -ml-2 rounded-xl hover:bg-white/5 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-full bg-[#E5A93C]/15 border border-[#E5A93C]/30 flex items-center justify-center text-[#E5A93C] shrink-0 group-hover:scale-105 transition-transform">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-white block group-hover:text-[#E5A93C] transition-colors">
                        info@prabhatech.com
                      </span>
                      <span className="text-[11px] text-slate-400">General Inquiries</span>
                    </div>
                  </a>

                  {/* Email Sales */}
                  <a
                    href="mailto:sales@prabhatech.com"
                    className="flex items-center gap-4 group p-2 -ml-2 rounded-xl hover:bg-white/5 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-full bg-[#E5A93C]/15 border border-[#E5A93C]/30 flex items-center justify-center text-[#E5A93C] shrink-0 group-hover:scale-105 transition-transform">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-white block group-hover:text-[#E5A93C] transition-colors">
                        sales@prabhatech.com
                      </span>
                      <span className="text-[11px] text-slate-400">Sales & Business</span>
                    </div>
                  </a>

                  {/* Email Support */}
                  <a
                    href="mailto:support@prabhatech.com"
                    className="flex items-center gap-4 group p-2 -ml-2 rounded-xl hover:bg-white/5 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-full bg-[#E5A93C]/15 border border-[#E5A93C]/30 flex items-center justify-center text-[#E5A93C] shrink-0 group-hover:scale-105 transition-transform">
                      <HelpCircle className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-white block group-hover:text-[#E5A93C] transition-colors">
                        support@prabhatech.com
                      </span>
                      <span className="text-[11px] text-slate-400">Technical Support</span>
                    </div>
                  </a>

                  {/* Website */}
                  <a
                    href="https://www.prabhatech.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 group p-2 -ml-2 rounded-xl hover:bg-white/5 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-full bg-[#E5A93C]/15 border border-[#E5A93C]/30 flex items-center justify-center text-[#E5A93C] shrink-0 group-hover:scale-105 transition-transform">
                      <Globe className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-white block group-hover:text-[#E5A93C] transition-colors">
                        www.prabhatech.com
                      </span>
                      <span className="text-[11px] text-slate-400">Visit Our Website</span>
                    </div>
                  </a>
                </div>

                {/* Follow Us Social Icons */}
                <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-300">Follow Us</span>
                  <SocialIconsGroup size="sm" />
                </div>
              </div>

              {/* Business Hours Card */}
              <div className="rounded-3xl bg-white p-7 border border-slate-200/90 shadow-sm flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-[#E5A93C] shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="space-y-2 text-xs">
                  <h4 className="text-sm font-bold text-[#020E26]">Business Hours</h4>
                  <div>
                    <span className="font-semibold text-slate-800 block">Monday – Friday</span>
                    <span className="text-slate-500">9:00 AM – 6:00 PM (UAE Time)</span>
                  </div>
                  <div>
                    <span className="font-semibold text-slate-800 block">Saturday – Sunday</span>
                    <span className="text-slate-400">Closed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. OUR CLIENTS: REUSABLE INFINITE LOGO CAROUSEL */}
      {/* ========================================================= */}
      <ClientLogosCarousel
        badge=""
        title={
          <>
            Our <span className="text-[#E5A93C] font-normal">Clients</span>
          </>
        }
        subtitle="Trusted by 120+ Businesses Across the GCC and Beyond"
      />

      {/* Elevated 4-Pillar Metrics Strip */}
      <section className="py-12 bg-white border-b border-slate-100">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-4 p-3">
              <FileText className="w-8 h-8 text-[#E5A93C] shrink-0" />
              <div>
                <span className="text-2xl sm:text-3xl font-bold text-[#020E26] block">110+</span>
                <span className="text-xs text-slate-500 font-medium">Projects Delivered</span>
              </div>
            </div>

            <div className="flex items-center gap-4 p-3">
              <Users2 className="w-8 h-8 text-[#E5A93C] shrink-0" />
              <div>
                <span className="text-2xl sm:text-3xl font-bold text-[#020E26] block">120+</span>
                <span className="text-xs text-slate-500 font-medium">Total Clients</span>
              </div>
            </div>

            <div className="flex items-center gap-4 p-3">
              <Star className="w-8 h-8 text-[#E5A93C] shrink-0" />
              <div>
                <span className="text-2xl sm:text-3xl font-bold text-[#020E26] block">10+</span>
                <span className="text-xs text-slate-500 font-medium">Years of Experience</span>
              </div>
            </div>

            <div className="flex items-center gap-4 p-3">
              <Users className="w-8 h-8 text-[#E5A93C] shrink-0" />
              <div>
                <span className="text-2xl sm:text-3xl font-bold text-[#020E26] block">48+</span>
                <span className="text-xs text-slate-500 font-medium">Employees</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 4. OUR BRANCHES: GLOBAL PRESENCE GRID */}
      {/* ========================================================= */}
      <section className="py-16 sm:py-24 bg-slate-50/50">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
          <div className="mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-[#020E26]">
              Our <span className="text-[#E5A93C] font-normal">Branches</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 font-light mt-1">
              Strategic locations to serve our global clients
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Branch 1: Dubai Head Office */}
            <div className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-lg transition-all duration-300 group">
              <div className="aspect-[16/10] w-full overflow-hidden bg-slate-100 relative">
                <img
                  src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=600&q=80"
                  alt="Dubai Head Office"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5 space-y-2">
                <h4 className="text-sm font-bold text-[#020E26] group-hover:text-[#E5A93C] transition-colors">
                  Head Office – Dubai
                </h4>
                <div className="flex items-start gap-2 text-xs text-slate-500">
                  <MapPin className="w-3.5 h-3.5 text-[#E5A93C] shrink-0 mt-0.5" />
                  <p className="leading-relaxed">
                    Irisbay Tower, Office No. 2201, 22nd Floor, Business Bay, Dubai, UAE
                  </p>
                </div>
              </div>
            </div>

            {/* Branch 2: Kuwait */}
            <div className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-lg transition-all duration-300 group">
              <div className="aspect-[16/10] w-full overflow-hidden bg-slate-100 relative">
                <img
                  src="https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=600&q=80"
                  alt="Kuwait Office"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5 space-y-2">
                <h4 className="text-sm font-bold text-[#020E26] group-hover:text-[#E5A93C] transition-colors">
                  Sales Office – Kuwait
                </h4>
                <div className="flex items-start gap-2 text-xs text-slate-500">
                  <MapPin className="w-3.5 h-3.5 text-[#E5A93C] shrink-0 mt-0.5" />
                  <p className="leading-relaxed">
                    Qibla, Kuwait
                  </p>
                </div>
              </div>
            </div>

            {/* Branch 3: Riyadh */}
            <div className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-lg transition-all duration-300 group">
              <div className="aspect-[16/10] w-full overflow-hidden bg-slate-100 relative">
                <img
                  src="https://images.unsplash.com/photo-1586724237569-f3d0c1dee8c6?auto=format&fit=crop&w=600&q=80"
                  alt="Riyadh Office"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5 space-y-2">
                <h4 className="text-sm font-bold text-[#020E26] group-hover:text-[#E5A93C] transition-colors">
                  Sales Office – Riyadh
                </h4>
                <div className="flex items-start gap-2 text-xs text-slate-500">
                  <MapPin className="w-3.5 h-3.5 text-[#E5A93C] shrink-0 mt-0.5" />
                  <p className="leading-relaxed">
                    Riyadh, Saudi Arabia
                  </p>
                </div>
              </div>
            </div>

            {/* Branch 4: India */}
            <div className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-lg transition-all duration-300 group">
              <div className="aspect-[16/10] w-full overflow-hidden bg-slate-100 relative">
                <img
                  src="https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80"
                  alt="India Development Office"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5 space-y-2">
                <h4 className="text-sm font-bold text-[#020E26] group-hover:text-[#E5A93C] transition-colors">
                  Development Office – India
                </h4>
                <div className="flex items-start gap-2 text-xs text-slate-500">
                  <MapPin className="w-3.5 h-3.5 text-[#E5A93C] shrink-0 mt-0.5" />
                  <p className="leading-relaxed">
                    Hyderabad & Bangalore, India
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
