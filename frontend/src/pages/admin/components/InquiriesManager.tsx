import React, { useState } from 'react';
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
} from 'lucide-react';
import { LeadInquiry } from '../../../types';
import { PillButton } from '../../../components/common/PillButton';

interface InquiriesManagerProps {
  inquiries: LeadInquiry[];
  onUpdateStatus: (id: number, status: string) => void;
  selectedInquiry: LeadInquiry | null;
  setSelectedInquiry: (inquiry: LeadInquiry | null) => void;
}

export const InquiriesManager: React.FC<InquiriesManagerProps> = ({
  inquiries,
  onUpdateStatus,
  selectedInquiry,
  setSelectedInquiry,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

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
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
          <input
            type="text"
            placeholder="Search by client name, email, company, or project..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0D111A] border border-white/10 text-white text-xs placeholder:text-[#64748B] focus:outline-none focus:border-[var(--brand-primary,#9873ff)]/50"
          />
        </div>

        {/* Status Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {['ALL', 'NEW', 'IN_REVIEW', 'CONTACTED', 'ARCHIVED'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                statusFilter === st
                  ? 'bg-[var(--brand-primary,#9873ff)] text-white shadow-sm'
                  : 'bg-[#0D111A] border border-white/10 text-[#94A3B8] hover:text-white hover:border-white/20'
              }`}
            >
              {st === 'ALL' ? 'All Inquiries' : st.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Main Table */}
      <div className="rounded-2xl bg-[#0D111A] border border-white/10 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#94A3B8]">
            <thead className="bg-[#07090E] text-white uppercase tracking-wider text-[11px] border-b border-white/10">
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
            <tbody className="divide-y divide-white/5">
              {filteredInquiries.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-12 text-center text-xs text-[#64748B]">
                    No inquiries found matching your filters.
                  </td>
                </tr>
              ) : (
                filteredInquiries.map((inq) => (
                  <tr
                    key={inq.id}
                    onClick={() => setSelectedInquiry(inq)}
                    className="hover:bg-white/5 transition-colors cursor-pointer group"
                  >
                    <td className="p-4">
                      <div className="font-bold text-white group-hover:text-[var(--brand-primary,#9873ff)] transition-colors">
                        {inq.fullName}
                      </div>
                      {inq.companyName && (
                        <div className="text-[11px] text-[#64748B] flex items-center gap-1 mt-0.5">
                          <Building className="w-3 h-3" />
                          <span>{inq.companyName}</span>
                        </div>
                      )}
                    </td>

                    <td className="p-4">
                      <div className="text-[#9873ff] hover:underline flex items-center gap-1">
                        <Mail className="w-3 h-3 text-[#64748B]" />
                        <span>{inq.email}</span>
                      </div>
                      {inq.phoneNumber && (
                        <div className="text-[11px] text-[#64748B] flex items-center gap-1 mt-0.5">
                          <Phone className="w-3 h-3" />
                          <span>{inq.phoneNumber}</span>
                        </div>
                      )}
                    </td>

                    <td className="p-4 text-white font-medium max-w-[200px] truncate">
                      {inq.projectType}
                    </td>

                    <td className="p-4 text-[var(--brand-primary,#9873ff)] font-mono font-semibold">
                      {inq.budgetRange}
                    </td>

                    <td className="p-4 text-[#64748B] text-[11px]">
                      {inq.createdAt ? new Date(inq.createdAt).toLocaleDateString() : 'Recent'}
                    </td>

                    <td className="p-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          inq.status === 'CONTACTED'
                            ? 'bg-green-500/15 text-green-400 border border-green-500/20'
                            : inq.status === 'IN_REVIEW'
                            ? 'bg-amber-500/15 text-amber-400 border border-amber-500/20'
                            : inq.status === 'ARCHIVED'
                            ? 'bg-slate-500/15 text-slate-400 border border-slate-500/20'
                            : 'bg-[var(--brand-primary,#9873ff)]/15 text-[var(--brand-primary,#9873ff)] border border-[var(--brand-primary,#9873ff)]/20'
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
                        className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white text-xs font-semibold transition-colors"
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
        <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-xl bg-[#0D111A] border-l border-white/10 h-full overflow-y-auto p-6 sm:p-8 space-y-6 flex flex-col justify-between shadow-2xl">
            <div className="space-y-6">
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[var(--brand-primary,#9873ff)]/15 text-[var(--brand-primary,#9873ff)] flex items-center justify-center font-bold">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">Inquiry Details</h3>
                    <p className="text-[11px] text-[#64748B]">ID #{selectedInquiry.id || 'N/A'}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedInquiry(null)}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[#94A3B8] hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Status Selector Bar */}
              <div className="p-4 rounded-xl bg-[#07090E] border border-white/10 space-y-2">
                <span className="text-[11px] font-semibold text-[#94A3B8] uppercase tracking-wider block">
                  Workflow Status Stage
                </span>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { key: 'NEW', label: 'New', color: 'border-[var(--brand-primary,#9873ff)] text-[var(--brand-primary,#9873ff)]' },
                    { key: 'IN_REVIEW', label: 'In Review', color: 'border-amber-500 text-amber-400' },
                    { key: 'CONTACTED', label: 'Contacted', color: 'border-green-500 text-green-400' },
                    { key: 'ARCHIVED', label: 'Archived', color: 'border-slate-500 text-slate-400' },
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
                            ? `bg-white/10 ${st.color} border shadow-sm`
                            : 'bg-white/5 text-[#64748B] hover:text-white border border-transparent'
                        }`}
                      >
                        {st.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Client Profile Details */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-1">
                    <span className="text-[10px] text-[#64748B] uppercase font-bold tracking-wider">Client Name</span>
                    <p className="text-sm font-bold text-white">{selectedInquiry.fullName}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-1">
                    <span className="text-[10px] text-[#64748B] uppercase font-bold tracking-wider">Organization</span>
                    <p className="text-sm font-bold text-white">{selectedInquiry.companyName || 'N/A'}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-1">
                    <span className="text-[10px] text-[#64748B] uppercase font-bold tracking-wider">Email</span>
                    <a
                      href={`mailto:${selectedInquiry.email}`}
                      className="text-xs font-bold text-[var(--brand-primary,#9873ff)] hover:underline truncate block"
                    >
                      {selectedInquiry.email}
                    </a>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-1">
                    <span className="text-[10px] text-[#64748B] uppercase font-bold tracking-wider">Phone</span>
                    <p className="text-xs font-bold text-white">{selectedInquiry.phoneNumber || 'N/A'}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-1">
                    <span className="text-[10px] text-[#64748B] uppercase font-bold tracking-wider">Project Scope</span>
                    <p className="text-xs font-bold text-white">{selectedInquiry.projectType}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-1">
                    <span className="text-[10px] text-[#64748B] uppercase font-bold tracking-wider">Estimated Budget</span>
                    <p className="text-xs font-bold text-[var(--brand-primary,#9873ff)] font-mono">{selectedInquiry.budgetRange}</p>
                  </div>
                </div>

                {/* Message Body */}
                <div className="p-4 rounded-xl bg-[#07090E] border border-white/10 space-y-2">
                  <span className="text-[10px] text-[#64748B] uppercase font-bold tracking-wider">Project Narrative & Requirements</span>
                  <p className="text-xs text-white leading-relaxed whitespace-pre-wrap">
                    {selectedInquiry.message || 'No project description attached.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Direct Email Action */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
              <PillButton
                onClick={() => setSelectedInquiry(null)}
                variant="secondary"
                size="sm"
                showDefaultIcon={false}
              >
                Close Drawer
              </PillButton>
              <a
                href={`mailto:${selectedInquiry.email}?subject=Regarding your inquiry for PrabhaTech&body=Hi ${selectedInquiry.fullName},%0D%0A%0D%0AThank you for reaching out to PrabhaTech.`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--brand-primary,#9873ff)] text-white text-xs font-bold hover:opacity-90 shadow-lg shadow-[rgba(152,115,255,0.25)] transition-all"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Direct Email Reply</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
