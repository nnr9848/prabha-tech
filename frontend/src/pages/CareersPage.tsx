import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  ArrowRight,
  MapPin,
  Briefcase,
  Clock,
  Building2,
  Users2,
  Globe2,
  Award,
  Sparkles,
  ChevronDown,
  ChevronRight,
  Code2,
  Smartphone,
  Cpu,
  Cloud,
  Headphones,
  TrendingUp,
  DollarSign,
  ShieldCheck,
  Home,
  CheckCircle2,
  GraduationCap,
  HeartHandshake,
  Trophy,
  Filter,
  X,
  Send,
} from 'lucide-react';
import { BrandButton } from '../components/common/BrandButton';

import { useQuery, useMutation } from '@tanstack/react-query';
import { publicApi } from '../api/client';
import { JobPosition, JobApplication } from '../types';

// Dynamic department icon mapper
const getDeptIcon = (dept: string) => {
  switch (dept?.toLowerCase()) {
    case 'engineering':
      return <Code2 className="w-5 h-5 text-amber-500" />;
    case 'mobile apps':
      return <Smartphone className="w-5 h-5 text-blue-500" />;
    case 'ai & data':
      return <Cpu className="w-5 h-5 text-purple-500" />;
    case 'managed services':
      return <Headphones className="w-5 h-5 text-indigo-500" />;
    case 'sales & business development':
      return <TrendingUp className="w-5 h-5 text-emerald-500" />;
    default:
      return <Cloud className="w-5 h-5 text-sky-500" />;
  }
};

export const CareersPage: React.FC = () => {
  // Single Source of Truth: Fetch active jobs from PostgreSQL database
  const {
    data: jobs = [],
    isLoading,
    isError,
    refetch,
  } = useQuery<JobPosition[]>({
    queryKey: ['publicJobs'],
    queryFn: () => publicApi.getJobs(),
    staleTime: 1000 * 60 * 5,
  });
  // Filters State
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedDept, setSelectedDept] = useState('All Departments');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [selectedJobType, setSelectedJobType] = useState('All Types');
  const [selectedExpLevel, setSelectedExpLevel] = useState('All Levels');
  const [sortBy, setSortBy] = useState('Latest First');

  // Modal State for Apply
  const [activeApplyJob, setActiveApplyJob] = useState<JobPosition | null>(null);
  const [applySuccess, setApplySuccess] = useState(false);
  const [applyFormData, setApplyFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    experience: '',
    resumeLink: '',
    coverNote: '',
  });

  // Filtered jobs calculation
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      // Keyword
      const query = searchKeyword.toLowerCase();
      const matchKeyword =
        !searchKeyword ||
        job.title.toLowerCase().includes(query) ||
        job.description.toLowerCase().includes(query) ||
        (job.skills && job.skills.some((s) => s.toLowerCase().includes(query)));

      // Department
      const matchDept =
        selectedDept === 'All Departments' ||
        job.department.toLowerCase().includes(selectedDept.toLowerCase());

      // Location
      const matchLoc =
        selectedLocation === 'All Locations' ||
        job.location.toLowerCase().includes(selectedLocation.toLowerCase());

      // Type
      const jobTypeStr = job.jobType || 'Full-time';
      const matchType =
        selectedJobType === 'All Types' ||
        jobTypeStr.toLowerCase().includes(selectedJobType.toLowerCase());

      return matchKeyword && matchDept && matchLoc && matchType;
    });
  }, [jobs, searchKeyword, selectedDept, selectedLocation, selectedJobType]);

  // Dynamic Facets based on live database jobs
  const departmentsList = useMemo(() => {
    const map = new Map<string, number>();
    jobs.forEach((j) => {
      const dept = j.department || 'Other';
      map.set(dept, (map.get(dept) || 0) + 1);
    });
    return [
      { label: 'All Departments', count: jobs.length },
      ...Array.from(map.entries()).map(([label, count]) => ({ label, count })),
    ];
  }, [jobs]);

  const locationsList = useMemo(() => {
    const map = new Map<string, number>();
    jobs.forEach((j) => {
      const loc = j.location || 'Remote';
      map.set(loc, (map.get(loc) || 0) + 1);
    });
    return [
      { label: 'All Locations', count: jobs.length },
      ...Array.from(map.entries()).map(([label, count]) => ({ label, count })),
    ];
  }, [jobs]);

  const jobTypesList = useMemo(() => {
    const map = new Map<string, number>();
    jobs.forEach((j) => {
      const type = j.jobType || 'Full-time';
      map.set(type, (map.get(type) || 0) + 1);
    });
    return [
      { label: 'All Types', count: jobs.length },
      ...Array.from(map.entries()).map(([label, count]) => ({ label, count })),
    ];
  }, [jobs]);

  const applyMutation = useMutation({
    mutationFn: (application: JobApplication) => publicApi.applyJob(application),
    onSuccess: () => {
      setApplySuccess(true);
      setTimeout(() => {
        setApplySuccess(false);
        setActiveApplyJob(null);
        setApplyFormData({
          fullName: '',
          email: '',
          phone: '',
          experience: '',
          resumeLink: '',
          coverNote: '',
        });
      }, 3000);
    },
    onError: () => {
      alert('Failed to submit application. Please check your network and try again.');
    },
  });

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeApplyJob) return;

    applyMutation.mutate({
      jobId: activeApplyJob.id,
      jobTitle: activeApplyJob.title,
      fullName: applyFormData.fullName,
      email: applyFormData.email,
      phone: applyFormData.phone,
      experience: applyFormData.experience,
      resumeLink: applyFormData.resumeLink,
      coverNote: applyFormData.coverNote,
    });
  };

  return (
    <div className="bg-white text-slate-900 font-sans selection:bg-[#E5A93C]/30 min-h-screen">
      {/* ========================================================= */}
      {/* 1. HERO SECTION: Daylight Innovation Hub & Collaborative Team */}
      {/* ========================================================= */}
      <section className="relative pt-32 sm:pt-36 pb-16 lg:pb-24 border-b border-slate-100 overflow-hidden bg-white">
        {/* Right Collaboration Team Visual with Smooth Left Edge Fade */}
        <div 
          className="absolute right-0 top-0 bottom-0 w-full lg:w-[54%] z-0 pointer-events-none overflow-hidden"
          style={{
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.2) 15%, rgba(0,0,0,0.85) 45%, black 75%)',
            maskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.2) 15%, rgba(0,0,0,0.85) 45%, black 75%)'
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=85"
            alt="Prabha Technologies Engineering Team Collaborating"
            className="w-full h-full object-cover object-center scale-100"
          />
          {/* Edge feathering */}
          <div className="hidden lg:block absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent pointer-events-none" />
          <div className="hidden lg:block absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white to-transparent pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <span className="heading-eyebrow block">
                CAREERS AT PRABHA TECHNOLOGIES
              </span>
              <h1 className="heading-hero text-[#020E26]">
                Build a Meaningful <br />
                Career <span className="text-[#E5A93C] font-light">With Us</span>
              </h1>
              <p className="text-base sm:text-lg text-slate-600 max-w-xl font-light leading-relaxed">
                Join a team of innovators, creators and problem-solvers building AI-driven solutions for a smarter, more connected world. Grow your skills, work on global projects and make a real impact.
              </p>

              {/* Action Buttons using centralized BrandButton */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <BrandButton href="#open-positions" variant="gold" size="md">
                  Explore Open Positions
                </BrandButton>
                <BrandButton
                  href="#why-work-with-us"
                  variant="ghost"
                  size="md"
                  className="bg-white border border-slate-300 hover:border-slate-400 text-[#020E26]"
                >
                  Life at PrabhaTech
                </BrandButton>
              </div>
            </div>

            {/* Right Vignette Pill Tag */}
            <div className="lg:col-span-5 flex justify-end">
              <div className="relative w-full max-w-xs rounded-2xl bg-[#000B1E]/80 backdrop-blur-md border border-white/10 p-5 shadow-2xl text-white">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-[#E5A93C]" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#E5A93C]">
                    AI Innovation Hub
                  </span>
                </div>
                <h3 className="text-lg font-light leading-tight mb-2 text-white">
                  People. Ideas. <br />
                  <span className="font-medium text-[#E5A93C]">Technology.</span> <br />
                  <span className="text-slate-300">A Better Tomorrow.</span>
                </h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. STATS & VALUE PROPOSITION STRIP (5 Elevating Pillars) */}
      {/* ========================================================= */}
      <section className="border-b border-slate-100 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 divide-y md:divide-y-0 md:divide-x divide-slate-100 py-6 sm:py-8">
            {/* Stat 1 */}
            <div className="flex flex-col items-center text-center p-4">
              <Users2 className="w-6 h-6 text-[#E5A93C] mb-2" />
              <span className="text-2xl sm:text-3xl font-bold text-[#020E26]">80+</span>
              <span className="text-xs text-slate-500 font-medium mt-0.5">Team Members</span>
            </div>

            {/* Stat 2 */}
            <div className="flex flex-col items-center text-center p-4">
              <Globe2 className="w-6 h-6 text-[#E5A93C] mb-2" />
              <span className="text-2xl sm:text-3xl font-bold text-[#020E26]">100+</span>
              <span className="text-xs text-slate-500 font-medium mt-0.5">Projects Delivered</span>
            </div>

            {/* Stat 3 */}
            <div className="flex flex-col items-center text-center p-4">
              <Building2 className="w-6 h-6 text-[#E5A93C] mb-2" />
              <span className="text-2xl sm:text-3xl font-bold text-[#020E26]">5</span>
              <span className="text-xs text-slate-500 font-medium mt-0.5">Global Locations</span>
              <span className="text-[10px] text-slate-400 mt-0.5">UAE | KSA | Kuwait | India</span>
            </div>

            {/* Stat 4 */}
            <div className="flex flex-col items-center text-center p-4">
              <Award className="w-6 h-6 text-[#E5A93C] mb-2" />
              <span className="text-2xl sm:text-3xl font-bold text-[#020E26]">10+</span>
              <span className="text-xs text-slate-500 font-medium mt-0.5">Years of Innovation</span>
            </div>

            {/* Stat 5 */}
            <div className="flex flex-col items-center text-center p-4 col-span-2 md:col-span-1">
              <TrendingUp className="w-6 h-6 text-[#E5A93C] mb-2" />
              <span className="text-xl sm:text-2xl font-bold text-[#020E26]">Continuous</span>
              <span className="text-xs text-slate-500 font-medium mt-0.5">Learning & Growth</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. OPEN POSITIONS & FACETED SEARCH SECTION */}
      {/* ========================================================= */}
      <section id="open-positions" className="py-14 sm:py-20 bg-slate-50/60 border-b border-slate-100">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
          {/* Top Quick Search & Filter Controls Bar */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-sm mb-8">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
              {/* Keyword Search */}
              <div className="md:col-span-4 relative flex items-center bg-slate-50 rounded-xl px-3.5 py-2.5 border border-slate-200 focus-within:border-[#E5A93C] focus-within:bg-white transition-all">
                <Search className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
                <input
                  type="text"
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  placeholder="Search jobs by title, keyword or department..."
                  className="w-full bg-transparent text-xs sm:text-sm text-slate-800 placeholder-slate-400 outline-none"
                />
              </div>

              {/* Department Dropdown */}
              <div className="md:col-span-2 relative">
                <select
                  value={selectedDept}
                  onChange={(e) => setSelectedDept(e.target.value)}
                  className="w-full appearance-none bg-slate-50 rounded-xl px-3.5 py-2.5 text-xs text-slate-700 border border-slate-200 focus:border-[#E5A93C] focus:bg-white outline-none cursor-pointer pr-8"
                >
                  {departmentsList.map((d) => (
                    <option key={d.label} value={d.label}>
                      {d.label} ({d.count})
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-3.5 pointer-events-none" />
              </div>

              {/* Location Dropdown */}
              <div className="md:col-span-2 relative">
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full appearance-none bg-slate-50 rounded-xl px-3.5 py-2.5 text-xs text-slate-700 border border-slate-200 focus:border-[#E5A93C] focus:bg-white outline-none cursor-pointer pr-8"
                >
                  {locationsList.map((l) => (
                    <option key={l.label} value={l.label}>
                      {l.label} ({l.count})
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-3.5 pointer-events-none" />
              </div>

              {/* Job Type Dropdown */}
              <div className="md:col-span-2 relative">
                <select
                  value={selectedJobType}
                  onChange={(e) => setSelectedJobType(e.target.value)}
                  className="w-full appearance-none bg-slate-50 rounded-xl px-3.5 py-2.5 text-xs text-slate-700 border border-slate-200 focus:border-[#E5A93C] focus:bg-white outline-none cursor-pointer pr-8"
                >
                  {jobTypesList.map((t) => (
                    <option key={t.label} value={t.label}>
                      {t.label} ({t.count})
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-3.5 pointer-events-none" />
              </div>

              {/* Search Submit Action Button */}
              <div className="md:col-span-2">
                <BrandButton
                  type="button"
                  variant="dark"
                  size="sm"
                  showArrow={false}
                  className="w-full h-[40px] text-xs"
                >
                  Search Jobs
                </BrandButton>
              </div>
            </div>
          </div>

          {/* Main 2-Column Section: Left Faceted Sidebar + Right Job Feed */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Sidebar Filter Column */}
            <div className="lg:col-span-3 space-y-6">
              {/* Departments Filter */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#020E26]">Departments</h4>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </div>
                <div className="space-y-2 text-xs text-slate-600">
                  {departmentsList.map((dept) => {
                    const isChecked = selectedDept === dept.label;
                    return (
                      <label
                        key={dept.label}
                        onClick={() => setSelectedDept(dept.label)}
                        className="flex items-center justify-between cursor-pointer hover:text-[#020E26] py-1"
                      >
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => {}}
                            className="rounded text-[#E5A93C] focus:ring-[#E5A93C]"
                          />
                          <span className={isChecked ? 'font-semibold text-[#020E26]' : ''}>{dept.label}</span>
                        </div>
                        <span className="text-[11px] text-slate-400">({dept.count})</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Locations Filter */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#020E26]">Locations</h4>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </div>
                <div className="space-y-2 text-xs text-slate-600">
                  {locationsList.map((loc) => {
                    const isChecked = selectedLocation === loc.label;
                    return (
                      <label
                        key={loc.label}
                        onClick={() => setSelectedLocation(loc.label)}
                        className="flex items-center justify-between cursor-pointer hover:text-[#020E26] py-1"
                      >
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => {}}
                            className="rounded text-[#E5A93C] focus:ring-[#E5A93C]"
                          />
                          <span className={isChecked ? 'font-semibold text-[#020E26]' : ''}>{loc.label}</span>
                        </div>
                        <span className="text-[11px] text-slate-400">({loc.count})</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Job Type Filter */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#020E26]">Job Type</h4>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </div>
                <div className="space-y-2 text-xs text-slate-600">
                  {jobTypesList.map((type) => {
                    const isChecked = selectedJobType === type.label;
                    return (
                      <label
                        key={type.label}
                        onClick={() => setSelectedJobType(type.label)}
                        className="flex items-center justify-between cursor-pointer hover:text-[#020E26] py-1"
                      >
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => {}}
                            className="rounded text-[#E5A93C] focus:ring-[#E5A93C]"
                          />
                          <span className={isChecked ? 'font-semibold text-[#020E26]' : ''}>{type.label}</span>
                        </div>
                        <span className="text-[11px] text-slate-400">({type.count})</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Job Positions List Column */}
            <div className="lg:col-span-9 space-y-4">
              {/* Positions Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-200/80">
                <h3 className="text-base sm:text-lg font-bold text-[#020E26]">
                  Open Positions <span className="text-slate-400 font-normal">({filteredJobs.length})</span>
                </h3>

                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span>Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-transparent font-medium text-[#020E26] outline-none cursor-pointer"
                  >
                    <option>Latest First</option>
                    <option>Most Relevant</option>
                  </select>
                </div>
              </div>

              {/* Jobs Cards Feed */}
              {isLoading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((n) => (
                    <div
                      key={n}
                      className="bg-white rounded-2xl p-6 border border-slate-200/80 animate-pulse flex flex-col sm:flex-row items-start justify-between gap-5"
                    >
                      <div className="flex items-start gap-4 w-full">
                        <div className="w-12 h-12 rounded-xl bg-slate-100 shrink-0" />
                        <div className="space-y-3 w-full max-w-lg">
                          <div className="h-5 bg-slate-100 rounded w-1/3" />
                          <div className="h-3 bg-slate-100 rounded w-1/2" />
                          <div className="h-10 bg-slate-100 rounded w-full" />
                        </div>
                      </div>
                      <div className="w-24 h-9 bg-slate-100 rounded-md shrink-0" />
                    </div>
                  ))}
                </div>
              ) : isError ? (
                <div className="bg-white rounded-2xl p-10 text-center border border-red-100 shadow-sm">
                  <p className="text-sm text-red-600 mb-3">Failed to load open positions from server.</p>
                  <button
                    onClick={() => refetch()}
                    className="px-4 py-2 rounded-md bg-[#020E26] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#E5A93C] hover:text-[#000B1E] transition-colors cursor-pointer"
                  >
                    Retry Loading
                  </button>
                </div>
              ) : filteredJobs.length === 0 ? (
                <div className="bg-white rounded-2xl p-12 text-center border border-slate-200/90 shadow-sm">
                  <p className="text-sm text-slate-500 mb-3">No positions found matching your criteria.</p>
                  <button
                    onClick={() => {
                      setSearchKeyword('');
                      setSelectedDept('All Departments');
                      setSelectedLocation('All Locations');
                      setSelectedJobType('All Types');
                    }}
                    className="px-4 py-2 rounded-md bg-[#020E26] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#E5A93C] hover:text-[#000B1E] transition-colors cursor-pointer"
                  >
                    Reset All Filters
                  </button>
                </div>
              ) : (
                filteredJobs.map((job) => (
                  <div
                    key={job.id}
                    className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 hover:border-slate-300 hover:shadow-lg transition-all duration-300 flex flex-col sm:flex-row items-start justify-between gap-5 group"
                  >
                    <div className="flex items-start gap-4">
                      {/* Dept Icon Box */}
                      <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 shadow-xs">
                        {getDeptIcon(job.department)}
                      </div>

                      {/* Content */}
                      <div className="space-y-2">
                        <div className="flex flex-wrap items-center gap-2.5">
                          <h4 className="text-base sm:text-lg font-bold text-[#020E26] group-hover:text-[#E5A93C] transition-colors">
                            {job.title}
                          </h4>
                          {job.featured && (
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-50 text-amber-600 border border-amber-200">
                              Featured
                            </span>
                          )}
                        </div>

                        {/* Meta Tags */}
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
                          <span className="flex items-center gap-1.5">
                            <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                            {job.department}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-slate-400" />
                            {job.location}
                          </span>
                          {job.experience && (
                            <span className="flex items-center gap-1.5">
                              <Clock className="w-3.5 h-3.5 text-slate-400" />
                              {job.experience}
                            </span>
                          )}
                          <span className="flex items-center gap-1.5 font-medium text-slate-600">
                            {job.jobType || 'Full-time'}
                          </span>
                        </div>

                        <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed">
                          {job.description}
                        </p>

                        {/* Skills Pill Badges */}
                        {job.skills && job.skills.length > 0 && (
                          <div className="flex flex-wrap items-center gap-1.5 pt-1">
                            {job.skills.map((skill) => (
                              <span
                                key={skill}
                                className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-slate-50 border border-slate-200/70 text-slate-600"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Right Apply Action using BrandButton */}
                    <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto shrink-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100 gap-3">
                      <span className="text-[11px] text-slate-400 font-medium">
                        {job.jobType || 'Full-time'}
                      </span>
                      <button
                        type="button"
                        onClick={() => setActiveApplyJob(job)}
                        className="px-4 py-2 rounded-md bg-[#020E26] hover:bg-[#E5A93C] hover:text-[#000B1E] text-white text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-sm cursor-pointer"
                      >
                        Apply Now
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 4. WHY WORK WITH PRABHATECH (8 Benefit Tiles) */}
      {/* ========================================================= */}
      <section id="why-work-with-us" className="py-16 sm:py-24 bg-white border-b border-slate-100">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#020E26]">
              Why Work With PrabhaTech
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-light mt-2">
              Empowering our people with flexible benefits, global opportunities, and continuous learning.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
            {[
              { icon: <DollarSign className="w-5 h-5 text-blue-600" />, title: 'Competitive', sub: 'Salary' },
              { icon: <ShieldCheck className="w-5 h-5 text-blue-600" />, title: 'Health', sub: 'Insurance' },
              { icon: <Home className="w-5 h-5 text-blue-600" />, title: 'Flexible', sub: 'Work Model' },
              { icon: <TrendingUp className="w-5 h-5 text-blue-600" />, title: 'Professional', sub: 'Growth' },
              { icon: <Globe2 className="w-5 h-5 text-blue-600" />, title: 'Global', sub: 'Exposure' },
              { icon: <GraduationCap className="w-5 h-5 text-blue-600" />, title: 'Learning', sub: '& Certifications' },
              { icon: <HeartHandshake className="w-5 h-5 text-blue-600" />, title: 'Team', sub: 'Activities' },
              { icon: <Trophy className="w-5 h-5 text-blue-600" />, title: 'Performance', sub: 'Rewards' },
            ].map((benefit, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-white border border-slate-200/80 p-5 flex flex-col items-center text-center hover:border-slate-300 hover:shadow-md transition-all duration-200"
              >
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center mb-3">
                  {benefit.icon}
                </div>
                <span className="text-xs font-bold text-[#020E26]">{benefit.title}</span>
                <span className="text-[11px] text-slate-500 font-medium">{benefit.sub}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 5. OUR HIRING PROCESS (5-Step Chronological Journey) */}
      {/* ========================================================= */}
      <section className="py-16 sm:py-20 bg-slate-50/50 border-b border-slate-100">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
          <div className="mb-10">
            <span className="heading-eyebrow block">
              OUR HIRING PROCESS
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
            {[
              {
                step: '01',
                title: 'Apply Online',
                desc: 'Submit your application through our careers page.',
                icon: <Send className="w-4 h-4 text-blue-600" />,
              },
              {
                step: '02',
                title: 'Screening',
                desc: 'We review your profile and shortlist candidates.',
                icon: <Search className="w-4 h-4 text-blue-600" />,
              },
              {
                step: '03',
                title: 'Interview',
                desc: 'Technical and HR interviews.',
                icon: <Users2 className="w-4 h-4 text-blue-600" />,
              },
              {
                step: '04',
                title: 'Offer',
                desc: 'Receive your offer and complete onboarding.',
                icon: <Award className="w-4 h-4 text-blue-600" />,
              },
              {
                step: '05',
                title: 'Join Us',
                desc: 'Start your journey at PrabhaTech.',
                icon: <Sparkles className="w-4 h-4 text-blue-600" />,
              },
            ].map((p, idx) => (
              <div
                key={p.step}
                className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between relative group hover:border-slate-300 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xl font-bold text-slate-300 group-hover:text-[#E5A93C] transition-colors">
                      {p.step}
                    </span>
                    <div className="w-7 h-7 rounded-full bg-blue-50 flex items-center justify-center">
                      {p.icon}
                    </div>
                  </div>
                  <h4 className="text-sm font-bold text-[#020E26] mb-1.5">{p.title}</h4>
                  <p className="text-xs text-slate-500 font-light leading-relaxed">{p.desc}</p>
                </div>

                {idx < 4 && (
                  <div className="hidden md:flex absolute -right-3.5 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-white border border-slate-200 items-center justify-center text-slate-400">
                    <ArrowRight className="w-3 h-3" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 6. LIFE AT PRABHATECH: HEAR FROM OUR TEAM */}
      {/* ========================================================= */}
      <section className="py-16 sm:py-24 bg-white border-b border-slate-100">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
          <div className="mb-10">
            <span className="heading-eyebrow block">
              LIFE AT PRABHATECH
            </span>
            <h2 className="text-2xl sm:text-3xl font-light text-[#020E26] mt-1">
              Hear From <span className="font-semibold text-[#020E26]">Our Team</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Testimonial 1 */}
            <div className="bg-slate-50/60 rounded-2xl p-6 border border-slate-200/80 shadow-xs flex items-start gap-4">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80"
                alt="Anjali R."
                className="w-14 h-14 rounded-full object-cover shrink-0 border-2 border-white shadow-xs"
              />
              <div className="space-y-2">
                <p className="text-xs text-slate-600 italic leading-relaxed">
                  &ldquo;PrabhaTech gives me the opportunity to work on global projects and learn new technologies every day.&rdquo;
                </p>
                <div>
                  <h4 className="text-xs font-bold text-[#020E26]">Anjali R.</h4>
                  <span className="text-[11px] text-slate-400">Software Developer</span>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-slate-50/60 rounded-2xl p-6 border border-slate-200/80 shadow-xs flex items-start gap-4">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
                alt="Sameer K."
                className="w-14 h-14 rounded-full object-cover shrink-0 border-2 border-white shadow-xs"
              />
              <div className="space-y-2">
                <p className="text-xs text-slate-600 italic leading-relaxed">
                  &ldquo;A great team, supportive leadership and real opportunities to grow. Proud to be part of PrabhaTech.&rdquo;
                </p>
                <div>
                  <h4 className="text-xs font-bold text-[#020E26]">Sameer K.</h4>
                  <span className="text-[11px] text-slate-400">AI Engineer</span>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-slate-50/60 rounded-2xl p-6 border border-slate-200/80 shadow-xs flex items-start gap-4">
              <img
                src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80"
                alt="Fatima S."
                className="w-14 h-14 rounded-full object-cover shrink-0 border-2 border-white shadow-xs"
              />
              <div className="space-y-2">
                <p className="text-xs text-slate-600 italic leading-relaxed">
                  &ldquo;The work culture, flexibility and learning opportunities make it an amazing place to build a career.&rdquo;
                </p>
                <div>
                  <h4 className="text-xs font-bold text-[#020E26]">Fatima S.</h4>
                  <span className="text-[11px] text-slate-400">Project Manager</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 7. BOTTOM DUBAI NIGHT SKYLINE CTA BANNER */}
      {/* ========================================================= */}
      <section className="relative py-20 bg-[#000B1E] text-white overflow-hidden">
        {/* Right Dubai Night Skyline with Smooth Left Fade */}
        <div 
          className="absolute right-0 top-0 bottom-0 w-full lg:w-[60%] z-0 pointer-events-none overflow-hidden"
          style={{
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 50%)',
            maskImage: 'linear-gradient(to right, transparent 0%, black 50%)'
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1600&q=85"
            alt="Dubai Skyline Night"
            className="w-full h-full object-cover object-bottom opacity-50"
          />
        </div>

        <div className="relative z-10 max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-4">
              <h2 className="text-2xl sm:text-4xl font-light text-white leading-tight">
                Be Part of a Team <br />
                <span className="font-semibold text-white">Building a Smarter Tomorrow.</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 font-light max-w-lg leading-relaxed">
                Explore exciting career opportunities and grow with Prabha Technologies.
              </p>
              <div className="pt-2">
                <BrandButton href="#open-positions" variant="gold" size="md">
                  Explore Open Positions
                </BrandButton>
              </div>
            </div>

            {/* Right Mini Stat Strip */}
            <div className="lg:col-span-5 flex flex-wrap items-center gap-4 lg:justify-end">
              <div className="rounded-xl bg-white/10 backdrop-blur-md px-4 py-3 border border-white/10 text-center min-w-[90px]">
                <Users2 className="w-4 h-4 text-[#E5A93C] mx-auto mb-1" />
                <span className="text-base font-bold text-white block">80+</span>
                <span className="text-[10px] text-slate-300 uppercase">Team Members</span>
              </div>

              <div className="rounded-xl bg-white/10 backdrop-blur-md px-4 py-3 border border-white/10 text-center min-w-[90px]">
                <Globe2 className="w-4 h-4 text-[#E5A93C] mx-auto mb-1" />
                <span className="text-base font-bold text-white block">100+</span>
                <span className="text-[10px] text-slate-300 uppercase">Projects</span>
              </div>

              <div className="rounded-xl bg-white/10 backdrop-blur-md px-4 py-3 border border-white/10 text-center min-w-[90px]">
                <Building2 className="w-4 h-4 text-[#E5A93C] mx-auto mb-1" />
                <span className="text-base font-bold text-white block">4</span>
                <span className="text-[10px] text-slate-300 uppercase">Countries</span>
              </div>

              <div className="rounded-xl bg-white/10 backdrop-blur-md px-4 py-3 border border-white/10 text-center min-w-[90px]">
                <Award className="w-4 h-4 text-[#E5A93C] mx-auto mb-1" />
                <span className="text-base font-bold text-white block">10+</span>
                <span className="text-[10px] text-slate-300 uppercase">Years</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 8. JOB APPLICATION MODAL DIALOG */}
      {/* ========================================================= */}
      {activeApplyJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200">
            <button
              onClick={() => setActiveApplyJob(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-900 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="mb-6">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#E5A93C] block mb-1">
                APPLICATION FORM
              </span>
              <h3 className="text-xl font-bold text-[#020E26]">
                Apply for {activeApplyJob.title}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                {activeApplyJob.department} • {activeApplyJob.location}
              </p>
            </div>

            {applySuccess ? (
              <div className="py-8 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
                <h4 className="text-base font-bold text-[#020E26]">Application Submitted!</h4>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Thank you for applying. Our talent acquisition team will review your profile and reach out shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleApplySubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={applyFormData.fullName}
                    onChange={(e) => setApplyFormData({ ...applyFormData, fullName: e.target.value })}
                    placeholder="Enter your full name"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 outline-none focus:border-[#E5A93C] focus:bg-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={applyFormData.email}
                      onChange={(e) => setApplyFormData({ ...applyFormData, email: e.target.value })}
                      placeholder="name@company.com"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 outline-none focus:border-[#E5A93C] focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">Phone Number</label>
                    <input
                      type="tel"
                      required
                      value={applyFormData.phone}
                      onChange={(e) => setApplyFormData({ ...applyFormData, phone: e.target.value })}
                      placeholder="+971 50..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 outline-none focus:border-[#E5A93C] focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">LinkedIn / Portfolio / Resume URL</label>
                  <input
                    type="url"
                    required
                    value={applyFormData.resumeLink}
                    onChange={(e) => setApplyFormData({ ...applyFormData, resumeLink: e.target.value })}
                    placeholder="https://linkedin.com/in/... or drive link"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 outline-none focus:border-[#E5A93C] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Cover Note / Why PrabhaTech?</label>
                  <textarea
                    rows={3}
                    value={applyFormData.coverNote}
                    onChange={(e) => setApplyFormData({ ...applyFormData, coverNote: e.target.value })}
                    placeholder="Briefly describe your relevant experience..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 outline-none focus:border-[#E5A93C] focus:bg-white"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={applyMutation.isPending}
                    className="w-full py-3 rounded-md bg-[#E5A93C] hover:bg-[#D4972B] active:scale-95 text-[#000B1E] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-sm hover:shadow cursor-pointer disabled:opacity-60"
                  >
                    <span>{applyMutation.isPending ? 'Submitting...' : 'Submit Application'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
