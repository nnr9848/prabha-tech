import React, { useState } from 'react';
import {
  Briefcase,
  Search,
  Plus,
  Edit,
  Trash2,
  ExternalLink,
  MapPin,
  Clock,
  CheckCircle2,
  XCircle,
  Sparkles,
  Users,
} from 'lucide-react';
import { JobPosition, JobApplication } from '../../../types';
import { Link } from 'react-router-dom';
import { ConfirmModal } from '../../../components/common/ConfirmModal';

interface JobsManagerProps {
  jobs: JobPosition[];
  applications?: JobApplication[];
  onOpenCreate: () => void;
  onOpenEdit: (job: JobPosition) => void;
  onDelete: (id: number) => void;
  onToggleActive?: (job: JobPosition) => void;
  onSelectRoleFilter?: (jobTitle: string) => void;
}

export const JobsManager: React.FC<JobsManagerProps> = ({
  jobs,
  applications = [],
  onOpenCreate,
  onOpenEdit,
  onDelete,
  onToggleActive,
  onSelectRoleFilter,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'ACTIVE' | 'INACTIVE'>('ALL');
  const [jobToDelete, setJobToDelete] = useState<JobPosition | null>(null);

  const departments = ['ALL', ...Array.from(new Set(jobs.map((j) => j.department || 'Other')))];

  const deptCounts = React.useMemo(() => {
    const res: Record<string, number> = { ALL: jobs.length };
    jobs.forEach((j) => {
      const d = j.department || 'Other';
      res[d] = (res[d] || 0) + 1;
    });
    return res;
  }, [jobs]);

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (job.skills && job.skills.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase())));

    const matchesDept = departmentFilter === 'ALL' || job.department === departmentFilter;
    const matchesStatus =
      statusFilter === 'ALL' ||
      (statusFilter === 'ACTIVE' && job.isActive) ||
      (statusFilter === 'INACTIVE' && !job.isActive);

    return matchesSearch && matchesDept && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Top Controls: Search, Filters & Action Button */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search roles by title, department, skills..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 text-xs placeholder:text-slate-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/20"
          />
        </div>

        <div className="flex items-center gap-3">
          {/* Department Filter Chips with Badges */}
          <div className="flex items-center gap-1.5 overflow-x-auto">
            {departments.map((dept) => {
              const isActive = departmentFilter === dept;
              const count = deptCounts[dept] ?? 0;
              return (
                <button
                  key={dept}
                  onClick={() => setDepartmentFilter(dept)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-amber-500 text-slate-950 shadow-xs'
                      : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300'
                  }`}
                >
                  <span>{dept === 'ALL' ? 'All Roles' : dept}</span>
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                      isActive ? 'bg-slate-950/20 text-slate-950' : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          <button
            onClick={onOpenCreate}
            className="py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-xs flex items-center gap-1.5 transition-all cursor-pointer shrink-0"
          >
            <Plus className="w-3.5 h-3.5 text-slate-950" />
            <span>Post New Role</span>
          </button>
        </div>
      </div>

      {/* Roles List Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3.5 px-5">Role Title & Slug</th>
                <th className="py-3.5 px-4">Department</th>
                <th className="py-3.5 px-4">Location & Type</th>
                <th className="py-3.5 px-4">Required Experience</th>
                <th className="py-3.5 px-4">Applicants</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredJobs.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    <Briefcase className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                    No open positions found matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredJobs.map((job) => (
                  <tr key={job.id} className="hover:bg-slate-50/70 transition-colors group">
                    <td className="py-4 px-5">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-amber-50 border border-amber-200/60 flex items-center justify-center shrink-0 text-amber-700 font-bold">
                          <Briefcase className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                              {job.title}
                            </span>
                            {job.featured && (
                              <span className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-amber-50 text-amber-700 border border-amber-200">
                                Featured
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] text-slate-400 block mt-0.5">
                            /{job.slug || job.id}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-4">
                      <span className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-slate-100 text-slate-700 border border-slate-200/80">
                        {job.department}
                      </span>
                    </td>

                    <td className="py-4 px-4">
                      <div className="space-y-1">
                        <span className="flex items-center gap-1.5 text-slate-700 font-medium">
                          <MapPin className="w-3 h-3 text-slate-400" />
                          {job.location}
                        </span>
                        <span className="text-[11px] text-slate-400 block">
                          {job.jobType || 'Full-time'}
                        </span>
                      </div>
                    </td>

                    <td className="py-4 px-4">
                      <span className="flex items-center gap-1.5 text-slate-600">
                        <Clock className="w-3 h-3 text-slate-400" />
                        {job.experience || 'Not specified'}
                      </span>
                    </td>

                    {/* Applicants Metrics Badge with Quick Filter */}
                    <td className="py-4 px-4">
                      {(() => {
                        const roleApps = applications.filter(
                          (a) => (a.jobId && a.jobId === job.id) || a.jobTitle?.trim().toLowerCase() === job.title?.trim().toLowerCase()
                        );
                        const newCount = roleApps.filter((a) => !a.status || a.status === 'NEW').length;
                        const totalCount = roleApps.length;

                        return totalCount > 0 ? (
                          <button
                            type="button"
                            onClick={() => onSelectRoleFilter && onSelectRoleFilter(job.title)}
                            title={`Filter ATS applications for ${job.title}`}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-50 hover:bg-amber-100/80 text-amber-900 border border-amber-200/80 transition-all cursor-pointer shadow-2xs group/badge"
                          >
                            <Users className="w-3 h-3 text-amber-600 group-hover/badge:scale-110 transition-transform" />
                            <span>{totalCount}</span>
                            {newCount > 0 && (
                              <span className="ml-0.5 px-1.5 py-0.2 rounded-full text-[9px] font-extrabold bg-amber-500 text-white leading-tight">
                                {newCount} new
                              </span>
                            )}
                          </button>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[11px] text-slate-400 font-medium">
                            <Users className="w-3 h-3 text-slate-300" />
                            <span>0 applicants</span>
                          </span>
                        );
                      })()}
                    </td>

                    <td className="py-4 px-4">
                      {job.isActive ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3" />
                          Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-100 text-slate-500 border border-slate-200">
                          <XCircle className="w-3 h-3" />
                          Paused
                        </span>
                      )}
                    </td>

                    <td className="py-4 px-5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Link
                          to="/careers"
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                          title="View on Live Careers Page"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => onOpenEdit(job)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-amber-600 hover:bg-amber-50 transition-colors cursor-pointer"
                          title="Edit Position"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setJobToDelete(job)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                          title="Delete Position"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Enterprise Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={!!jobToDelete}
        onClose={() => setJobToDelete(null)}
        onConfirm={() => {
          if (jobToDelete?.id) {
            onDelete(jobToDelete.id);
            setJobToDelete(null);
          }
        }}
        title="Move Career Position to Trash?"
        description={`Are you sure you want to remove the job opening "${jobToDelete?.title}"? It will be removed from the careers board and kept in the Recycle Bin for 30 days before permanent deletion.`}
        confirmText="Move to Trash"
        cancelText="Keep Role"
        variant="danger"
      />
    </div>
  );
};
