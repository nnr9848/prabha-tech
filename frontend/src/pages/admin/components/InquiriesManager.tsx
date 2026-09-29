import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  MessageSquare,
  Search,
  Mail,
  Phone,
  Building,
  Calendar,
  DollarSign,
  Send,
  X,
  CheckCircle2,
  Clock,
  Archive,
  Filter,
  FileText,
  Image as ImageIcon,
  ExternalLink,
  Trash2,
  RotateCcw,
} from 'lucide-react';
import { LeadInquiry } from '../../../types';

interface InquiriesManagerProps {
  inquiries: LeadInquiry[];
  onUpdateStatus: (id: number, status: string) => void;
  onDelete?: (id: number) => void;
  selectedInquiry: LeadInquiry | null;
  setSelectedInquiry: (inquiry: LeadInquiry | null) => void;
}

export const InquiriesManager: React.FC<InquiriesManagerProps> = ({
  inquiries,
  onUpdateStatus,
  onDelete,
  selectedInquiry,
  setSelectedInquiry,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlStatus = searchParams.get('status');

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>(urlStatus || 'ALL');

  // Once inquiries finish loading from network, if no explicit URL param was provided and there are NEW items, auto-select NEW
  useEffect(() => {
    if (!urlStatus && inquiries.length > 0) {
      const hasNew = inquiries.some((i) => !i.status || i.status === 'NEW');
      if (hasNew) {
        setStatusFilter('NEW');
      }
    }
  }, [inquiries.length, urlStatus]);

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

  const statuses = [
    { key: 'ALL', label: 'All Inquiries' },
    { key: 'NEW', label: 'New' },
    { key: 'IN_REVIEW', label: 'In Review' },
    { key: 'CONTACTED', label: 'Contacted' },
    { key: 'ARCHIVED', label: 'Archived' },
  ];

  // Calculate counts for each stage
  const counts = React.useMemo(() => {
    const res: Record<string, number> = {
      ALL: inquiries.length,
      NEW: 0,
      IN_REVIEW: 0,
      CONTACTED: 0,
      ARCHIVED: 0,
    };
    inquiries.forEach((inq) => {
      const st = inq.status || 'NEW';
      if (res[st] !== undefined) {
        res[st] += 1;
      }
    });
    return res;
  }, [inquiries]);

  const filteredInquiries = inquiries.filter((inq) => {
    const matchesSearch =
      inq.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inq.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (inq.companyName && inq.companyName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (inq.projectType && inq.projectType.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus =
      statusFilter === 'ALL' ||
      (statusFilter === 'NEW' && (!inq.status || inq.status === 'NEW')) ||
      inq.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by client name, email, company, or project..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 text-xs placeholder:text-slate-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/20"
          />
        </div>

        {/* Status Filter Chips with Badges */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {statuses.map(({ key, label }) => {
            const isActive = statusFilter === key;
            const count = counts[key] ?? 0;
            return (
              <button
                key={key}
                onClick={() => handleStatusFilterChange(key)}
                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300'
                }`}
              >
                <span>{label}</span>
                <span
                  className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full transition-colors ${
                    isActive
                      ? 'bg-slate-950/20 text-slate-950'
                      : key === 'NEW' && count > 0
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

      {/* Main Table */}
      <div className="rounded-2xl bg-white border border-slate-200/80 overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-slate-700 uppercase tracking-wider text-[11px] border-b border-slate-200">
              <tr>
                <th className="p-4">Client / Company</th>
                <th className="p-4">Contact Info</th>
                <th className="p-4">Project Scope</th>
                <th className="p-4">Budget</th>
                <th className="p-4">Submission Date</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredInquiries.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-12 text-center text-xs text-slate-400">
                    No inquiries found matching your filters.
                  </td>
                </tr>
              ) : (
                filteredInquiries.map((inq) => (
                  <tr
                    key={inq.id}
                    onClick={() => setSelectedInquiry(inq)}
                    className="hover:bg-slate-50 transition-colors cursor-pointer group"
                  >
                    <td className="p-4">
                      <div className="font-bold text-slate-900 group-hover:text-amber-700 transition-colors">
                        {inq.fullName}
                      </div>
                      {inq.companyName && (
                        <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                          <Building className="w-3 h-3 text-slate-400" />
                          <span>{inq.companyName}</span>
                        </div>
                      )}
                    </td>

                    <td className="p-4">
                      <div className="text-amber-700 hover:underline flex items-center gap-1 font-medium">
                        <Mail className="w-3 h-3 text-slate-400" />
                        <span>{inq.email}</span>
                      </div>
                      {inq.phoneNumber && (
                        <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                          <Phone className="w-3 h-3 text-slate-400" />
                          <span>{inq.phoneNumber}</span>
                        </div>
                      )}
                    </td>

                    <td className="p-4 text-slate-900 font-medium max-w-[200px] truncate">
                      {inq.projectType}
                    </td>

                    <td className="p-4 text-amber-700 font-mono font-semibold">
                      {inq.budgetRange}
                    </td>

                    <td className="p-4 text-slate-500 text-[11px]">
                      {inq.createdAt ? new Date(inq.createdAt).toLocaleDateString() : 'Recent'}
                    </td>

                    <td className="p-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          inq.status === 'CONTACTED'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : inq.status === 'IN_REVIEW'
                            ? 'bg-amber-50 text-amber-700 border border-amber-200'
                            : inq.status === 'ARCHIVED'
                            ? 'bg-slate-100 text-slate-600 border border-slate-200'
                            : 'bg-amber-100 text-amber-800 border border-amber-300'
                        }`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                        <span>{inq.status || 'NEW'}</span>
                      </span>
                    </td>

                    <td className="p-4 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedInquiry(inq);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
                      >
                        Inspect
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Slide-over Inspection Drawer */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="w-full max-w-xl bg-white border-l border-slate-200 h-full overflow-y-auto p-6 sm:p-8 space-y-6 flex flex-col justify-between shadow-2xl">
            <div className="space-y-6">
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">Inquiry Details</h3>
                    <p className="text-[11px] text-slate-400">ID #{selectedInquiry.id || 'N/A'}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedInquiry(null)}
                  className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Status Selector Bar */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="text-[11px] font-semibold text-slate-600 uppercase tracking-wider block">
                  Workflow Status Stage
                </span>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { key: 'NEW', label: 'New', color: 'border-amber-500 text-amber-700' },
                    { key: 'IN_REVIEW', label: 'In Review', color: 'border-blue-500 text-blue-700' },
                    { key: 'CONTACTED', label: 'Contacted', color: 'border-emerald-500 text-emerald-700' },
                    { key: 'ARCHIVED', label: 'Archived', color: 'border-slate-300 text-slate-600' },
                  ].map((st) => {
                    const isCurrent = (selectedInquiry.status || 'NEW') === st.key;
                    return (
                      <button
                        key={st.key}
                        onClick={() => {
                          if (selectedInquiry.id) {
                            onUpdateStatus(selectedInquiry.id, st.key);
                            setSelectedInquiry({ ...selectedInquiry, status: st.key });
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

              {/* Archive / Restoration Helper Callout */}
              {selectedInquiry.status === 'ARCHIVED' && (
                <div className="p-3.5 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-between gap-3 text-xs text-slate-700">
                  <div className="flex items-center gap-2">
                    <Archive className="w-4 h-4 text-slate-500 shrink-0" />
                    <span>This inquiry is archived and preserved in history.</span>
                  </div>
                  <button
                    onClick={() => {
                      if (selectedInquiry.id) {
                        onUpdateStatus(selectedInquiry.id, 'IN_REVIEW');
                        setSelectedInquiry({ ...selectedInquiry, status: 'IN_REVIEW' });
                      }
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white border border-slate-200 text-slate-800 font-bold hover:bg-slate-50 shadow-2xs cursor-pointer shrink-0"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-amber-600" />
                    <span>Reopen Inquiry</span>
                  </button>
                </div>
              )}

              {/* Client Profile Details */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                    <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Client Name</span>
                    <p className="text-sm font-bold text-slate-900">{selectedInquiry.fullName}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                    <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Organization</span>
                    <p className="text-sm font-bold text-slate-900">{selectedInquiry.companyName || 'N/A'}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                    <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Email</span>
                    <a
                      href={`mailto:${selectedInquiry.email}`}
                      className="text-xs font-bold text-amber-700 hover:underline truncate block"
                    >
                      {selectedInquiry.email}
                    </a>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                    <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Phone</span>
                    <p className="text-xs font-bold text-slate-900">{selectedInquiry.phoneNumber || 'N/A'}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                    <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Project Scope</span>
                    <p className="text-xs font-bold text-slate-900">{selectedInquiry.projectType}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                    <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Estimated Budget</span>
                    <p className="text-xs font-bold text-amber-700 font-mono">{selectedInquiry.budgetRange}</p>
                  </div>
                </div>

                {/* Message Body */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Project Narrative & Requirements</span>
                  <p className="text-xs text-slate-800 leading-relaxed whitespace-pre-wrap">
                    {selectedInquiry.message || 'No project description attached.'}
                  </p>
                </div>

                {/* Attached Project Document / RFP */}
                {selectedInquiry.attachmentUrl && (
                  <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 space-y-2">
                    <span className="text-[10px] text-amber-800 uppercase font-bold tracking-wider block">
                      Attached Project Specification / RFP
                    </span>
                    <div className="flex items-center justify-between gap-3 bg-white p-3 rounded-xl border border-amber-200/80 shadow-2xs">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                          {selectedInquiry.attachmentFileName?.toLowerCase().match(/\.(jpg|jpeg|png|webp)$/) ? (
                            <ImageIcon className="w-4 h-4" />
                          ) : (
                            <FileText className="w-4 h-4" />
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-slate-900 truncate">
                            {selectedInquiry.attachmentFileName || 'Attached Document'}
                          </p>
                          <p className="text-[10px] text-slate-400">Client Attachment</p>
                        </div>
                      </div>
                      <a
                        href={selectedInquiry.attachmentUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold transition-all shrink-0 cursor-pointer shadow-2xs"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>View / Download</span>
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Actions Footer */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedInquiry(null)}
                  className="py-2 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors cursor-pointer"
                >
                  Close Drawer
                </button>
                {onDelete && selectedInquiry.id && (
                  <button
                    onClick={() => {
                      if (selectedInquiry.id && window.confirm(`Permanently delete inquiry from ${selectedInquiry.fullName}? This cannot be undone.`)) {
                        onDelete(selectedInquiry.id);
                        setSelectedInquiry(null);
                      }
                    }}
                    className="py-2 px-3 rounded-xl border border-rose-200 hover:bg-rose-50 text-rose-600 font-semibold text-xs transition-colors cursor-pointer inline-flex items-center gap-1.5"
                    title="Permanently Delete Inquiry"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete</span>
                  </button>
                )}
              </div>
              <a
                href={`mailto:${selectedInquiry.email}?subject=Regarding your inquiry for Prabha Technologies&body=Hi ${selectedInquiry.fullName},%0D%0A%0D%0AThank you for reaching out to Prabha Technologies.`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold shadow-xs transition-all"
              >
                <Send className="w-3.5 h-3.5 text-slate-950" />
                <span>Direct Email Reply</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
