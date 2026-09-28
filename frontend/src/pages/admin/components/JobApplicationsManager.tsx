import React, { useState } from 'react';
import {
  Users,
  Search,
  ExternalLink,
  Mail,
  Phone,
  Clock,
  Briefcase,
  FileText,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Eye,
  X,
} from 'lucide-react';
import { JobApplication } from '../../../types';

interface JobApplicationsManagerProps {
  applications: JobApplication[];
  onUpdateStatus: (id: number, status: string) => void;
  onDelete: (id: number) => void;
}

const STATUS_CONFIG: Record<
  string,
  { label: string; bg: string; text: string; border: string }
> = {
  NEW: { label: 'New', bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
  REVIEWING: { label: 'In Review', bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' },
  SHORTLISTED: { label: 'Shortlisted', bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' },
  REJECTED: { label: 'Archived / Rejected', bg: 'bg-slate-100', text: 'text-slate-600', border: 'border-slate-200' },
  HIRED: { label: 'Hired', bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
};

export const JobApplicationsManager: React.FC<JobApplicationsManagerProps> = ({
  applications,
  onUpdateStatus,
  onDelete,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedApp, setSelectedApp] = useState<JobApplication | null>(null);

  const statuses = ['ALL', 'NEW', 'REVIEWING', 'SHORTLISTED', 'REJECTED'];

  const filtered = applications.filter((app) => {
    const matchesSearch =
      app.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (app.phone && app.phone.includes(searchTerm));

    const matchesStatus = statusFilter === 'ALL' || app.status === statusFilter;
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

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto">
          {statuses.map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                statusFilter === st
                  ? 'bg-amber-500 text-slate-950 shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300'
              }`}
            >
              {st === 'ALL' ? 'All Applicants' : STATUS_CONFIG[st]?.label || st}
            </button>
          ))}
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
                    <tr key={app.id} className="hover:bg-slate-50/70 transition-colors group">
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

                      <td className="py-4 px-4 text-slate-600">
                        {app.experience || 'Not specified'}
                      </td>

                      <td className="py-4 px-4">
                        <select
                          value={app.status || 'NEW'}
                          onChange={(e) => app.id && onUpdateStatus(app.id, e.target.value)}
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
                        <div className="flex items-center justify-end gap-1.5">
                          <a
                            href={app.resumeLink}
                            target="_blank"
                            rel="noreferrer"
                            className="p-1.5 rounded-lg text-slate-500 hover:text-amber-600 hover:bg-amber-50 transition-colors cursor-pointer"
                            title="Open Resume / Portfolio"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                          <button
                            onClick={() => setSelectedApp(app)}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
                            title="View Full Profile"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              if (app.id && window.confirm(`Remove application from ${app.fullName}?`)) {
                                onDelete(app.id);
                              }
                            }}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                            title="Delete Record"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Candidate Profile Drawer / Modal */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 block">
                  Candidate Dossier
                </span>
                <h3 className="text-lg font-bold text-slate-900">{selectedApp.fullName}</h3>
                <p className="text-xs text-slate-500 mt-0.5">Applied for {selectedApp.jobTitle}</p>
              </div>
              <button
                onClick={() => setSelectedApp(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs text-slate-600">
              <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                <div>
                  <span className="text-[10px] text-slate-400 font-semibold uppercase block">Email Address</span>
                  <span className="font-medium text-slate-900 break-all">{selectedApp.email}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-semibold uppercase block">Phone</span>
                  <span className="font-medium text-slate-900">{selectedApp.phone || 'N/A'}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-semibold uppercase block">Experience</span>
                  <span className="font-medium text-slate-900">{selectedApp.experience || 'N/A'}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-semibold uppercase block">Applied Date</span>
                  <span className="font-medium text-slate-900">
                    {selectedApp.createdAt ? new Date(selectedApp.createdAt).toLocaleDateString() : 'Recent'}
                  </span>
                </div>
              </div>

              <div>
                <span className="text-[10px] text-slate-400 font-semibold uppercase block mb-1">
                  Resume / Portfolio Link
                </span>
                <a
                  href={selectedApp.resumeLink}
                  target="_blank"
                  rel="noreferrer"
                  className="text-amber-600 hover:underline flex items-center gap-1 font-medium break-all"
                >
                  <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                  <span>{selectedApp.resumeLink}</span>
                </a>
              </div>

              {selectedApp.coverNote && (
                <div>
                  <span className="text-[10px] text-slate-400 font-semibold uppercase block mb-1">
                    Candidate Cover Note
                  </span>
                  <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl leading-relaxed whitespace-pre-wrap">
                    {selectedApp.coverNote}
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-between items-center pt-3 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500">Stage:</span>
                <select
                  value={selectedApp.status || 'NEW'}
                  onChange={(e) => {
                    const newStatus = e.target.value;
                    if (selectedApp.id) {
                      onUpdateStatus(selectedApp.id, newStatus);
                      setSelectedApp({ ...selectedApp, status: newStatus as any });
                    }
                  }}
                  className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 border border-slate-200 text-slate-800"
                >
                  <option value="NEW">New</option>
                  <option value="REVIEWING">In Review</option>
                  <option value="SHORTLISTED">Shortlisted</option>
                  <option value="HIRED">Hired</option>
                  <option value="REJECTED">Archived</option>
                </select>
              </div>

              <button
                onClick={() => setSelectedApp(null)}
                className="py-1.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
