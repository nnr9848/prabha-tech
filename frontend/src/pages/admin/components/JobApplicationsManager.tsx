import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Users,
  Search,
  ExternalLink,
  Mail,
  Phone,
  Briefcase,
  FileText,
  Trash2,
  X,
  Send,
  Building,
  MapPin,
  Calendar,
  Clock,
  DollarSign,
  Award,
  Archive,
  RotateCcw,
} from 'lucide-react';
import { JobApplication } from '../../../types';
import { ConfirmModal } from '../../../components/common/ConfirmModal';

interface JobApplicationsManagerProps {
  applications: JobApplication[];
  initialRoleFilter?: string;
  onUpdateStatus: (id: number, status: string) => void;
  onDelete: (id: number) => void;
}

const STATUS_CONFIG: Record<
  string,
  { label: string; bg: string; text: string; border: string; barColor: string }
> = {
  NEW: { label: 'New', bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', barColor: 'border-blue-500 text-blue-700' },
  REVIEWING: { label: 'In Review', bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', barColor: 'border-amber-500 text-amber-700' },
  SHORTLISTED: { label: 'Shortlisted', bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', barColor: 'border-emerald-500 text-emerald-700' },
  HIRED: { label: 'Hired', bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200', barColor: 'border-purple-500 text-purple-700' },
  REJECTED: { label: 'Archived', bg: 'bg-slate-100', text: 'text-slate-600', border: 'border-slate-200', barColor: 'border-slate-300 text-slate-600' },
};

const resolveResumeUrl = (link?: string) => {
  if (!link) return '#';
  if (link.startsWith('http://') || link.startsWith('https://')) {
    return link;
  }
  return link.startsWith('/') ? link : `/${link}`;
};

export const JobApplicationsManager: React.FC<JobApplicationsManagerProps> = ({
  applications,
  initialRoleFilter = '',
  onUpdateStatus,
  onDelete,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlStatus = searchParams.get('status');

  const [searchTerm, setSearchTerm] = useState(initialRoleFilter);
  const [statusFilter, setStatusFilter] = useState<string>(urlStatus || 'ALL');
  const [selectedApp, setSelectedApp] = useState<JobApplication | null>(null);
  const [appToDelete, setAppToDelete] = useState<JobApplication | null>(null);

  // Once applications finish loading, if no explicit URL param was provided and there are NEW items, auto-select NEW
  useEffect(() => {
    if (!urlStatus && applications.length > 0) {
      const hasNew = applications.some((a) => !a.status || a.status === 'NEW');
      if (hasNew) {
        setStatusFilter('NEW');
      }
    }
  }, [applications.length, urlStatus]);

  const handleStatusFilterChange = (st: string) => {
    setStatusFilter(st);
    const newParams = new URLSearchParams(searchParams);
    if (st === 'ALL') {
      newParams.delete('status');
    } else {
      newParams.set('status', st);
    }
    setSearchParams(newParams, { replace: true });
  };

  const statuses = ['ALL', 'NEW', 'REVIEWING', 'SHORTLISTED', 'HIRED', 'REJECTED'];

  // Calculate counts for each stage
  const counts = React.useMemo(() => {
    const res: Record<string, number> = {
      ALL: applications.length,
      NEW: 0,
      REVIEWING: 0,
      SHORTLISTED: 0,
      HIRED: 0,
      REJECTED: 0,
    };
    applications.forEach((app) => {
      const st = app.status || 'NEW';
      if (res[st] !== undefined) {
        res[st] += 1;
      }
    });
    return res;
  }, [applications]);

  const filtered = applications.filter((app) => {
    const matchesSearch =
      app.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (app.phone && app.phone.includes(searchTerm));

    const matchesStatus =
      statusFilter === 'ALL' ||
      (statusFilter === 'NEW' && (!app.status || app.status === 'NEW')) ||
      app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header Search & Filter */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search candidates by name, email, or role..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 text-xs placeholder:text-slate-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/20"
          />
        </div>

        {/* Filter Pills with Live Badges */}
        <div className="flex items-center gap-1.5 overflow-x-auto">
          {statuses.map((st) => {
            const isActive = statusFilter === st;
            const count = counts[st] ?? 0;
            return (
              <button
                key={st}
                onClick={() => handleStatusFilterChange(st)}
                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300'
                }`}
              >
                <span>{st === 'ALL' ? 'All Applicants' : STATUS_CONFIG[st]?.label || st}</span>
                <span
                  className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full transition-colors ${
                    isActive
                      ? 'bg-slate-950/20 text-slate-950'
                      : st === 'NEW' && count > 0
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Applications Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3.5 px-5">Candidate</th>
                <th className="py-3.5 px-4">Applied Role</th>
                <th className="py-3.5 px-4">Experience</th>
                <th className="py-3.5 px-4">Stage / Status</th>
                <th className="py-3.5 px-4">Applied On</th>
                <th className="py-3.5 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    <Users className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                    No candidates found matching your filter criteria.
                  </td>
                </tr>
              ) : (
                filtered.map((app) => {
                  const badge = STATUS_CONFIG[app.status || 'NEW'] || STATUS_CONFIG.NEW;
                  return (
                    <tr
                      key={app.id}
                      onClick={() => setSelectedApp(app)}
                      className="hover:bg-slate-50 transition-colors cursor-pointer group"
                    >
                      <td className="py-4 px-5">
                        <div className="space-y-0.5">
                          <span className="font-bold text-slate-900 group-hover:text-amber-600 transition-colors block">
                            {app.fullName}
                          </span>
                          <div className="flex items-center gap-3 text-[11px] text-slate-400">
                            <span className="flex items-center gap-1">
                              <Mail className="w-3 h-3" />
                              {app.email}
                            </span>
                            {app.phone && (
                              <span className="flex items-center gap-1">
                                <Phone className="w-3 h-3" />
                                {app.phone}
                              </span>
                            )}
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-4">
                        <span className="font-medium text-slate-800">
                          {app.jobTitle}
                        </span>
                      </td>

                      <td className="py-4 px-4 text-slate-600 font-medium">
                        {app.totalExperience || app.experience || 'Not specified'}
                      </td>

                      <td className="py-4 px-4">
                        <select
                          value={app.status || 'NEW'}
                          onClick={(e) => e.stopPropagation()}
                          onChange={(e) => {
                            e.stopPropagation();
                            if (app.id) onUpdateStatus(app.id, e.target.value);
                          }}
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold border outline-none cursor-pointer ${badge.bg} ${badge.text} ${badge.border}`}
                        >
                          <option value="NEW">New</option>
                          <option value="REVIEWING">In Review</option>
                          <option value="SHORTLISTED">Shortlisted</option>
                          <option value="HIRED">Hired</option>
                          <option value="REJECTED">Archived</option>
                        </select>
                      </td>

                      <td className="py-4 px-4 text-slate-400 text-[11px]">
                        {app.createdAt ? new Date(app.createdAt).toLocaleDateString() : 'Recent'}
                      </td>

                      <td className="py-4 px-5 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedApp(app);
                          }}
                          className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
                        >
                          Inspect
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Slide-over Inspection Drawer */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="w-full max-w-xl bg-white border-l border-slate-200 h-full overflow-y-auto p-6 sm:p-8 space-y-6 flex flex-col justify-between shadow-2xl">
            <div className="space-y-6">
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">{selectedApp.fullName}</h3>
                    <p className="text-[11px] text-slate-500">
                      Applied for <span className="font-semibold text-slate-700">{selectedApp.jobTitle}</span> &bull; ID #{selectedApp.id || 'N/A'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedApp(null)}
                  className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Status Selector Bar */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="text-[11px] font-semibold text-slate-600 uppercase tracking-wider block">
                  Application Stage
                </span>
                <div className="grid grid-cols-5 gap-1.5">
                  {[
                    { key: 'NEW', label: 'New', color: 'border-blue-500 text-blue-700' },
                    { key: 'REVIEWING', label: 'Reviewing', color: 'border-amber-500 text-amber-700' },
                    { key: 'SHORTLISTED', label: 'Shortlist', color: 'border-emerald-500 text-emerald-700' },
                    { key: 'HIRED', label: 'Hired', color: 'border-purple-500 text-purple-700' },
                    { key: 'REJECTED', label: 'Archived', color: 'border-slate-300 text-slate-600' },
                  ].map((st) => {
                    const isCurrent = (selectedApp.status || 'NEW') === st.key;
                    return (
                      <button
                        key={st.key}
                        onClick={() => {
                          if (selectedApp.id) {
                            onUpdateStatus(selectedApp.id, st.key);
                            setSelectedApp({ ...selectedApp, status: st.key as any });
                          }
                        }}
                        className={`py-2 px-1 rounded-lg text-xs font-bold transition-all text-center cursor-pointer ${
                          isCurrent
                            ? `bg-white ${st.color} border shadow-xs`
                            : 'bg-white/60 text-slate-500 hover:text-slate-900 border border-transparent'
                        }`}
                      >
                        {st.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Archive / Restoration Callout */}
              {selectedApp.status === 'REJECTED' && (
                <div className="p-3.5 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-between gap-3 text-xs text-slate-700">
                  <div className="flex items-center gap-2">
                    <Archive className="w-4 h-4 text-slate-500 shrink-0" />
                    <span>This candidate is archived in your talent pool.</span>
                  </div>
                  <button
                    onClick={() => {
                      if (selectedApp.id) {
                        onUpdateStatus(selectedApp.id, 'REVIEWING');
                        setSelectedApp({ ...selectedApp, status: 'REVIEWING' as any });
                      }
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white border border-slate-200 text-slate-800 font-bold hover:bg-slate-50 shadow-2xs cursor-pointer shrink-0"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-amber-600" />
                    <span>Reopen Candidate</span>
                  </button>
                </div>
              )}

              {/* Candidate Info Grid */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                    <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider flex items-center gap-1">
                      <Mail className="w-3 h-3 text-slate-400" /> Email Address
                    </span>
                    <a
                      href={`mailto:${selectedApp.email}`}
                      className="text-xs font-bold text-amber-700 hover:underline break-all block"
                    >
                      {selectedApp.email}
                    </a>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                    <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider flex items-center gap-1">
                      <Phone className="w-3 h-3 text-slate-400" /> Phone Number
                    </span>
                    <p className="text-xs font-bold text-slate-900">{selectedApp.phone || 'N/A'}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                    <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-400" /> Current Location
                    </span>
                    <p className="text-xs font-bold text-slate-900">{selectedApp.currentLocation || 'N/A'}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                    <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider flex items-center gap-1">
                      <Award className="w-3 h-3 text-slate-400" /> Total Experience
                    </span>
                    <p className="text-xs font-bold text-slate-900">
                      {selectedApp.totalExperience || selectedApp.experience || 'N/A'}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                    <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider flex items-center gap-1">
                      <Building className="w-3 h-3 text-slate-400" /> Current Organization
                    </span>
                    <p className="text-xs font-bold text-slate-900">{selectedApp.currentCompany || 'N/A'}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                    <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider flex items-center gap-1">
                      <Briefcase className="w-3 h-3 text-slate-400" /> Current Designation
                    </span>
                    <p className="text-xs font-bold text-slate-900">{selectedApp.currentDesignation || 'N/A'}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                    <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider flex items-center gap-1">
                      <DollarSign className="w-3 h-3 text-slate-400" /> Expected Salary
                    </span>
                    <p className="text-xs font-bold text-amber-700 font-mono">{selectedApp.expectedSalary || 'N/A'}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                    <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" /> Notice Period
                    </span>
                    <p className="text-xs font-bold text-slate-900">{selectedApp.noticePeriod || 'N/A'}</p>
                  </div>
                </div>

                {/* Attached Resume / Portfolio Card */}
                <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 space-y-2">
                  <span className="text-[10px] text-amber-800 uppercase font-bold tracking-wider block">
                    Candidate Resume & Credentials
                  </span>
                  <div className="flex items-center justify-between gap-3 bg-white p-3 rounded-xl border border-amber-200/80 shadow-2xs">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-slate-900 truncate">
                          {selectedApp.resumeFileName || 'Resume Document'}
                        </p>
                        <p className="text-[10px] text-slate-400">Attached Portfolio / CV</p>
                      </div>
                    </div>
                    <a
                      href={resolveResumeUrl(selectedApp.resumeLink)}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold transition-all shrink-0 cursor-pointer shadow-2xs"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>View / Download</span>
                    </a>
                  </div>
                </div>

                {/* Candidate Cover Note */}
                {selectedApp.coverNote && (
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                    <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">
                      Candidate Cover Note
                    </span>
                    <p className="text-xs text-slate-800 leading-relaxed whitespace-pre-wrap">
                      {selectedApp.coverNote}
                    </p>
                  </div>
                )}

                {/* Metadata info */}
                <div className="flex items-center justify-between text-[11px] text-slate-400 px-1">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    Applied: {selectedApp.createdAt ? new Date(selectedApp.createdAt).toLocaleDateString() : 'Recent'}
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Actions Footer */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedApp(null)}
                  className="py-2 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors cursor-pointer"
                >
                  Close Drawer
                </button>
                <button
                  onClick={() => setAppToDelete(selectedApp)}
                  className="py-2 px-3 rounded-xl border border-rose-200 hover:bg-rose-50 text-rose-600 font-semibold text-xs transition-colors cursor-pointer inline-flex items-center gap-1.5"
                  title="Delete Application Record"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete</span>
                </button>
              </div>

              <a
                href={`mailto:${selectedApp.email}?subject=Regarding your application for ${encodeURIComponent(selectedApp.jobTitle)} at Prabha Technologies&body=Hi ${encodeURIComponent(selectedApp.fullName)},%0D%0A%0D%0AThank you for applying for the ${encodeURIComponent(selectedApp.jobTitle)} role at Prabha Technologies.`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold shadow-xs transition-all"
              >
                <Send className="w-3.5 h-3.5 text-slate-950" />
                <span>Direct Email Candidate</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Enterprise Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={!!appToDelete}
        onClose={() => setAppToDelete(null)}
        onConfirm={() => {
          if (appToDelete?.id) {
            onDelete(appToDelete.id);
            if (selectedApp?.id === appToDelete.id) {
              setSelectedApp(null);
            }
            setAppToDelete(null);
          }
        }}
        title="Permanently Remove Application?"
        description={`Are you sure you want to permanently delete the application record for ${appToDelete?.fullName || 'this candidate'} for the "${appToDelete?.jobTitle || 'role'}"? This action cannot be undone.`}
        confirmText="Delete Application"
        cancelText="Keep Candidate"
        variant="danger"
      />
    </div>
  );
};

