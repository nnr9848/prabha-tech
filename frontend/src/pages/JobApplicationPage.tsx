import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import {
  User,
  Briefcase,
  FileText,
  MessageSquare,
  UploadCloud,
  CheckCircle2,
  ArrowLeft,
  X,
  File,
  ChevronDown,
} from 'lucide-react';
import { BrandButton } from '../components/common/BrandButton';

interface PositionOption {
  id: string;
  title: string;
  department: string;
}

const POSITIONS: PositionOption[] = [
  { id: 'full-stack-java-dev', title: 'Full Stack Java Developer', department: 'Engineering' },
  { id: 'react-native-mobile-dev', title: 'React Native Mobile Developer', department: 'Mobile Apps' },
  { id: 'ai-ml-engineer', title: 'AI/ML Engineer', department: 'AI & Data' },
  { id: 'devops-engineer', title: 'DevOps Engineer', department: 'Engineering' },
  { id: 'it-support-engineer', title: 'IT Support Engineer', department: 'Managed Services' },
  { id: 'business-development-executive', title: 'Business Development Executive', department: 'Sales & Business Development' },
  { id: 'ui-ux-designer', title: 'Senior UI/UX Designer', department: 'Design & Experience' },
  { id: 'cloud-solutions-architect', title: 'Cloud Solutions Architect', department: 'Engineering' },
];

const DEPARTMENTS = [
  'Engineering',
  'AI & Data',
  'Mobile Apps',
  'IoT & Automation',
  'Managed Services',
  'Sales & Business Development',
  'HR & Operations',
  'Design & Experience',
];

const LOCATIONS = [
  'Dubai, UAE',
  'Riyadh, KSA',
  'Kuwait City, Kuwait',
  'Hyderabad, India',
  'Remote',
];

const EXPERIENCE_OPTIONS = [
  'Fresh Graduate (0-1 Year)',
  '1-3 Years',
  '3-5 Years',
  '5-8 Years',
  '8+ Years',
];

const NOTICE_PERIODS = [
  'Immediate (Available Now)',
  '15 Days or less',
  '30 Days (1 Month)',
  '60 Days (2 Months)',
  '90 Days (3 Months)',
];

import { useQuery, useMutation } from '@tanstack/react-query';
import { publicApi } from '../api/client';
import { JobPosition, JobApplication } from '../types';

export const JobApplicationPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const preselectedJobParam = searchParams.get('job');

  // Intelligent Exit: return to previous page position if in history, else fallback to /careers
  const handleExit = () => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate('/careers');
    }
  };

  // Keyboard accessibility: press Escape to exit
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleExit();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Live positions from PostgreSQL database
  const { data: dbJobs = [] } = useQuery<JobPosition[]>({
    queryKey: ['publicJobs'],
    queryFn: () => publicApi.getJobs(),
  });

  // Dynamic Departments from Live Jobs
  const dynamicDepartments = Array.from(new Set(dbJobs.map((j) => j.department || 'Engineering')));

  // Form State
  const [selectedPosition, setSelectedPosition] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [countryCode, setCountryCode] = useState('+971');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [location, setLocation] = useState('');
  const [totalExperience, setTotalExperience] = useState('');
  const [currentCompany, setCurrentCompany] = useState('');
  const [currentDesignation, setCurrentDesignation] = useState('');
  const [expectedSalary, setExpectedSalary] = useState('');
  const [noticePeriod, setNoticePeriod] = useState('');
  const [coverLetter, setCoverLetter] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Pre-fill position & department from URL query
  useEffect(() => {
    if (preselectedJobParam && dbJobs.length > 0) {
      const match = dbJobs.find(
        (p) =>
          p.slug === preselectedJobParam ||
          String(p.id) === preselectedJobParam ||
          p.title.toLowerCase() === preselectedJobParam.toLowerCase()
      );
      if (match) {
        setSelectedPosition(match.title);
        setSelectedDepartment(match.department);
      }
    }
  }, [preselectedJobParam, dbJobs]);

  // When position changes, automatically sync department
  const handlePositionChange = (posTitle: string) => {
    setSelectedPosition(posTitle);
    const match = dbJobs.find((p) => p.title === posTitle);
    if (match) {
      setSelectedDepartment(match.department);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      validateAndSetFile(file);
    }
  };

  const validateAndSetFile = (file: File) => {
    const validExtensions = ['.pdf', '.doc', '.docx'];
    const lowerName = file.name.toLowerCase();
    const isValidExt = validExtensions.some((ext) => lowerName.endsWith(ext));

    if (!isValidExt) {
      alert('Please upload a valid document format (.pdf, .doc, or .docx).');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('File size exceeds 5MB limit. Please upload a smaller file.');
      return;
    }
    setResumeFile(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const [isUploading, setIsUploading] = useState(false);

  const applyMutation = useMutation({
    mutationFn: (application: JobApplication) => publicApi.applyJob(application),
    onSuccess: () => {
      setIsSuccess(true);
    },
    onError: (err: any) => {
      setErrorMessage(
        err.response?.data?.message || 'Failed to submit application. Please check your details and try again.'
      );
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!selectedPosition) {
      setErrorMessage('Please select a position applied for.');
      return;
    }
    if (!selectedDepartment) {
      setErrorMessage('Please select a department.');
      return;
    }
    if (!agreedToTerms) {
      setErrorMessage('Please agree to the Terms & Conditions and Privacy Policy.');
      return;
    }

    const matchedJob = dbJobs.find((j) => j.title === selectedPosition);

    try {
      let finalResumeLink = '';
      let finalResumeFileName = resumeFile?.name || '';

      if (resumeFile) {
        setIsUploading(true);
        const uploadResult = await publicApi.uploadResume(resumeFile);
        finalResumeLink = uploadResult.url;
        finalResumeFileName = uploadResult.fileName || resumeFile.name;
        setIsUploading(false);
      }

      applyMutation.mutate({
        jobId: matchedJob?.id,
        jobTitle: selectedPosition,
        fullName,
        email,
        phone: `${countryCode} ${phoneNumber}`.trim(),
        currentLocation: location,
        totalExperience,
        experience: totalExperience,
        currentCompany,
        currentDesignation,
        expectedSalary,
        noticePeriod,
        resumeFileName: finalResumeFileName,
        resumeLink: finalResumeLink,
        coverNote: coverLetter,
      });
    } catch (err: any) {
      setIsUploading(false);
      setErrorMessage(
        err.response?.data?.message || 'Failed to upload resume file. Please ensure it is a valid PDF or DOC/DOCX under 5MB.'
      );
    }
  };

  return (
    <div className="bg-slate-50/60 text-slate-900 font-sans selection:bg-[#E5A93C]/30 min-h-screen pt-28 sm:pt-36 pb-20 sm:pb-28">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Back Link calling handleExit */}
        <div className="mb-6">
          <button
            type="button"
            onClick={handleExit}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-[#020E26] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Open Positions</span>
          </button>
        </div>

        {/* Main Application Card */}
        <div className="relative bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden p-6 sm:p-10 lg:p-12">
          {/* Card Top-Right Close Button calling handleExit */}
          <button
            type="button"
            onClick={handleExit}
            title="Back to Open Positions"
            aria-label="Back to Open Positions"
            className="absolute top-6 sm:top-8 right-6 sm:right-8 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-[#020E26] flex items-center justify-center transition-all shadow-xs group cursor-pointer"
          >
            <X className="w-4 h-4 transition-transform group-hover:scale-110" />
          </button>

          {/* Header */}
          <div className="mb-8 pb-6 border-b border-slate-100 pr-12">
            <span className="heading-eyebrow block">
              CAREERS AT PRABHA TECHNOLOGIES
            </span>
            <h1 className="text-2xl sm:text-4xl font-light text-[#020E26] mt-1.5 leading-tight">
              Apply for a <span className="font-semibold text-[#E5A93C]">Position</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-light mt-1">
              Fill in your details and submit your application. We&apos;ll get back to you soon.
            </p>
          </div>

          {isSuccess ? (
            <div className="py-16 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto text-emerald-600">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-[#020E26]">Application Received!</h2>
              <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                Thank you for applying for the <span className="font-semibold text-[#020E26]">{selectedPosition}</span> role. Our talent acquisition team will review your qualifications and reach out via email shortly.
              </p>
              <div className="pt-4">
                <BrandButton to="/careers" variant="gold" size="md">
                  Explore More Roles
                </BrandButton>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              {errorMessage && (
                <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-600 font-medium">
                  {errorMessage}
                </div>
              )}

              {/* Role Selection (2 Columns) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Position Applied For */}
                <div>
                  <label className="text-xs font-semibold text-[#020E26] block mb-1.5">
                    Position Applied For <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      required
                      value={selectedPosition}
                      onChange={(e) => handlePositionChange(e.target.value)}
                      className="w-full appearance-none bg-slate-50/70 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-800 outline-none focus:border-[#E5A93C] focus:bg-white transition-all cursor-pointer pr-10"
                    >
                      <option value="">Select Position</option>
                      {dbJobs.map((pos) => (
                        <option key={pos.id || pos.slug} value={pos.title}>
                          {pos.title}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5 pointer-events-none" />
                  </div>
                </div>

                {/* Department */}
                <div>
                  <label className="text-xs font-semibold text-[#020E26] block mb-1.5">
                    Department <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      required
                      value={selectedDepartment}
                      onChange={(e) => setSelectedDepartment(e.target.value)}
                      className="w-full appearance-none bg-slate-50/70 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-800 outline-none focus:border-[#E5A93C] focus:bg-white transition-all cursor-pointer pr-10"
                    >
                      <option value="">Select Department</option>
                      {dynamicDepartments.map((dept) => (
                        <option key={dept} value={dept}>
                          {dept}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* ========================================================= */}
              {/* SECTION 1: Personal Information */}
              {/* ========================================================= */}
              <div>
                <div className="flex items-center gap-2 pb-3 mb-4 border-b border-slate-100">
                  <User className="w-4 h-4 text-[#020E26]" />
                  <h3 className="text-sm font-bold text-[#020E26]">Personal Information</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Full Name */}
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Enter your full name"
                      className="w-full bg-slate-50/70 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-800 outline-none focus:border-[#E5A93C] focus:bg-white transition-all"
                    />
                  </div>

                  {/* Email Address */}
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full bg-slate-50/70 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-800 outline-none focus:border-[#E5A93C] focus:bg-white transition-all"
                    />
                  </div>

                  {/* Phone Number with Country Code */}
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <div className="flex items-center gap-2">
                      {/* Country Flag Selector */}
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
                        placeholder="Enter your phone number"
                        className="flex-1 bg-slate-50/70 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-800 outline-none focus:border-[#E5A93C] focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  {/* Current Location */}
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                      Current Location <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <select
                        required
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="w-full appearance-none bg-slate-50/70 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-800 outline-none focus:border-[#E5A93C] focus:bg-white transition-all cursor-pointer pr-10"
                      >
                        <option value="">Select your location</option>
                        {LOCATIONS.map((loc) => (
                          <option key={loc} value={loc}>
                            {loc}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5 pointer-events-none" />
                    </div>
                  </div>
                </div>
              </div>

              {/* ========================================================= */}
              {/* SECTION 2: Professional Information */}
              {/* ========================================================= */}
              <div>
                <div className="flex items-center gap-2 pb-3 mb-4 border-b border-slate-100">
                  <Briefcase className="w-4 h-4 text-[#020E26]" />
                  <h3 className="text-sm font-bold text-[#020E26]">Professional Information</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Total Experience */}
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                      Total Experience <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <select
                        required
                        value={totalExperience}
                        onChange={(e) => setTotalExperience(e.target.value)}
                        className="w-full appearance-none bg-slate-50/70 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-800 outline-none focus:border-[#E5A93C] focus:bg-white transition-all cursor-pointer pr-10"
                      >
                        <option value="">Select total experience</option>
                        {EXPERIENCE_OPTIONS.map((exp) => (
                          <option key={exp} value={exp}>
                            {exp}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5 pointer-events-none" />
                    </div>
                  </div>

                  {/* Current Company */}
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                      Current Company
                    </label>
                    <input
                      type="text"
                      value={currentCompany}
                      onChange={(e) => setCurrentCompany(e.target.value)}
                      placeholder="Enter your current company name"
                      className="w-full bg-slate-50/70 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-800 outline-none focus:border-[#E5A93C] focus:bg-white transition-all"
                    />
                  </div>

                  {/* Current Designation */}
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                      Current Designation <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={currentDesignation}
                      onChange={(e) => setCurrentDesignation(e.target.value)}
                      placeholder="Enter your current designation"
                      className="w-full bg-slate-50/70 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-800 outline-none focus:border-[#E5A93C] focus:bg-white transition-all"
                    />
                  </div>

                  {/* Expected Salary (AED) */}
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                      Expected Salary (AED)
                    </label>
                    <input
                      type="text"
                      value={expectedSalary}
                      onChange={(e) => setExpectedSalary(e.target.value)}
                      placeholder="Enter your expected salary (AED)"
                      className="w-full bg-slate-50/70 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-800 outline-none focus:border-[#E5A93C] focus:bg-white transition-all"
                    />
                  </div>

                  {/* Notice Period */}
                  <div className="md:col-span-2">
                    <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                      Notice Period <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <select
                        required
                        value={noticePeriod}
                        onChange={(e) => setNoticePeriod(e.target.value)}
                        className="w-full appearance-none bg-slate-50/70 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-800 outline-none focus:border-[#E5A93C] focus:bg-white transition-all cursor-pointer pr-10"
                      >
                        <option value="">Select notice period</option>
                        {NOTICE_PERIODS.map((period) => (
                          <option key={period} value={period}>
                            {period}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5 pointer-events-none" />
                    </div>
                  </div>
                </div>
              </div>

              {/* ========================================================= */}
              {/* SECTION 3: Resume / CV */}
              {/* ========================================================= */}
              <div>
                <div className="flex items-center gap-2 pb-3 mb-4 border-b border-slate-100">
                  <FileText className="w-4 h-4 text-[#020E26]" />
                  <h3 className="text-sm font-bold text-[#020E26]">Resume / CV</h3>
                </div>

                <div
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  className="relative rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/50 hover:bg-slate-50 hover:border-[#E5A93C]/50 transition-all p-8 text-center"
                >
                  <input
                    type="file"
                    id="resume-file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileUpload}
                    className="hidden"
                  />

                  {resumeFile ? (
                    <div className="flex items-center justify-center gap-3">
                      <File className="w-6 h-6 text-[#E5A93C]" />
                      <div className="text-left">
                        <span className="text-xs font-semibold text-[#020E26] block">
                          {resumeFile.name}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          {(resumeFile.size / 1024 / 1024).toFixed(2)} MB
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setResumeFile(null)}
                        className="ml-2 w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 hover:bg-red-100 hover:text-red-600 transition-colors"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <label htmlFor="resume-file" className="cursor-pointer block">
                      <UploadCloud className="w-8 h-8 text-[#020E26] mx-auto mb-2" />
                      <p className="text-xs sm:text-sm text-slate-600 font-medium">
                        Drag & drop your resume here, or{' '}
                        <span className="text-[#020E26] underline font-semibold hover:text-[#E5A93C]">
                          Browse Files
                        </span>
                      </p>
                      <span className="text-[11px] text-slate-400 block mt-1">
                        Supported formats: PDF, DOC, DOCX (Max 5 MB)
                      </span>
                    </label>
                  )}
                </div>
              </div>

              {/* ========================================================= */}
              {/* SECTION 4: Additional Information */}
              {/* ========================================================= */}
              <div>
                <div className="flex items-center gap-2 pb-3 mb-4 border-b border-slate-100">
                  <MessageSquare className="w-4 h-4 text-[#020E26]" />
                  <h3 className="text-sm font-bold text-[#020E26]">Additional Information</h3>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                    Cover Letter (Optional)
                  </label>
                  <textarea
                    rows={4}
                    maxLength={1000}
                    value={coverLetter}
                    onChange={(e) => setCoverLetter(e.target.value)}
                    placeholder="Tell us why you're the right fit for this position..."
                    className="w-full bg-slate-50/70 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-800 outline-none focus:border-[#E5A93C] focus:bg-white transition-all leading-relaxed"
                  />
                  <div className="flex justify-end mt-1">
                    <span className="text-[10px] text-slate-400">
                      {coverLetter.length}/1000
                    </span>
                  </div>
                </div>
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-start gap-2.5 pt-2">
                <input
                  type="checkbox"
                  id="terms"
                  required
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="mt-0.5 rounded text-[#E5A93C] focus:ring-[#E5A93C] cursor-pointer"
                />
                <label htmlFor="terms" className="text-xs text-slate-600 cursor-pointer select-none">
                  I agree to the{' '}
                  <span className="underline hover:text-[#020E26]">Terms & Conditions</span> and{' '}
                  <span className="underline hover:text-[#020E26]">Privacy Policy</span>.
                </label>
              </div>

              {/* Action Buttons Row: Submit & Cancel */}
              <div className="pt-4 flex flex-col-reverse sm:flex-row items-center gap-3">
                <BrandButton
                  type="button"
                  onClick={handleExit}
                  variant="ghost"
                  size="lg"
                  showArrow={false}
                  className="w-full sm:w-auto text-slate-500 hover:text-slate-800 hover:bg-slate-100 py-3.5 px-6 rounded-xl border border-slate-200/80"
                >
                  Cancel
                </BrandButton>

                <BrandButton
                  type="submit"
                  variant="dark"
                  size="lg"
                  isLoading={applyMutation.isPending || isUploading}
                  className="w-full sm:flex-1 justify-center text-sm py-4 rounded-xl"
                >
                  {isUploading ? 'Uploading Resume...' : applyMutation.isPending ? 'Submitting Application...' : 'Submit Application'}
                </BrandButton>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
