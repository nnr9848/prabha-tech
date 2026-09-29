import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Trash2,
  RotateCcw,
  AlertTriangle,
  Clock,
  Search,
  Filter,
  CheckCircle2,
  Sparkles,
  Inbox,
  FolderX,
} from 'lucide-react';
import { adminApi } from '../../../api/client';
import { TrashItem } from '../../../types';
import { ConfirmModal } from '../../../components/common/ConfirmModal';
import { useToast } from '../../../context/ToastContext';

type TrashFilterType = 'ALL' | 'INQUIRY' | 'JOB_APPLICATION' | 'ARTICLE' | 'CASE_STUDY' | 'JOB_POSITION';

export const AdminTrashHub: React.FC = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const [filterType, setFilterType] = useState<TrashFilterType>('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [itemToPurge, setItemToPurge] = useState<TrashItem | null>(null);
  const [isEmptyTrashModalOpen, setIsEmptyTrashModalOpen] = useState(false);

  // Fetch all trash items
  const { data: trashItems = [], isLoading, refetch } = useQuery<TrashItem[]>({
    queryKey: ['adminTrash'],
    queryFn: () => adminApi.getTrashItems(),
  });

  // Restore Mutation
  const restoreMutation = useMutation({
    mutationFn: ({ entityType, id }: { entityType: string; id: number }) =>
      adminApi.restoreTrashItem(entityType, id),
    onSuccess: (_, { entityType }) => {
      queryClient.invalidateQueries({ queryKey: ['adminTrash'] });
      queryClient.invalidateQueries({ queryKey: ['adminTrashCount'] });
      // Invalidate relevant domain queries
      queryClient.invalidateQueries({ queryKey: ['adminInquiries'] });
      queryClient.invalidateQueries({ queryKey: ['adminApplications'] });
      queryClient.invalidateQueries({ queryKey: ['adminArticles'] });
      queryClient.invalidateQueries({ queryKey: ['adminCaseStudies'] });
      queryClient.invalidateQueries({ queryKey: ['adminJobs'] });
      toast.success('Item Restored', `The ${formatEntityType(entityType).toLowerCase()} has been restored to active records.`);
    },
    onError: () => toast.error('Error', 'Failed to restore item.'),
  });

  // Purge Single Mutation
  const purgeMutation = useMutation({
    mutationFn: ({ entityType, id }: { entityType: string; id: number }) =>
      adminApi.purgeTrashItem(entityType, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminTrash'] });
      queryClient.invalidateQueries({ queryKey: ['adminTrashCount'] });
      toast.info('Item Purged', 'Item permanently removed from database.');
      setItemToPurge(null);
    },
    onError: () => toast.error('Error', 'Failed to permanently purge item.'),
  });

  // Empty Trash Mutation
  const emptyTrashMutation = useMutation({
    mutationFn: () => adminApi.emptyTrash(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminTrash'] });
      queryClient.invalidateQueries({ queryKey: ['adminTrashCount'] });
      toast.success('Trash Emptied', 'All recycle bin items permanently deleted.');
      setIsEmptyTrashModalOpen(false);
    },
    onError: () => toast.error('Error', 'Failed to empty trash.'),
  });

  const formatEntityType = (type: string) => {
    switch (type) {
      case 'INQUIRY':
        return 'Lead Inquiry';
      case 'JOB_APPLICATION':
        return 'Job Application';
      case 'ARTICLE':
        return 'Article';
      case 'CASE_STUDY':
        return 'Case Study';
      case 'JOB_POSITION':
        return 'Job Position';
      default:
        return type;
    }
  };

  const getEntityBadgeStyle = (type: string) => {
    switch (type) {
      case 'INQUIRY':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'JOB_APPLICATION':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'ARTICLE':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'CASE_STUDY':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'JOB_POSITION':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  // Counts by filter
  const counts = {
    ALL: trashItems.length,
    INQUIRY: trashItems.filter((i) => i.entityType === 'INQUIRY').length,
    JOB_APPLICATION: trashItems.filter((i) => i.entityType === 'JOB_APPLICATION').length,
    ARTICLE: trashItems.filter((i) => i.entityType === 'ARTICLE').length,
    CASE_STUDY: trashItems.filter((i) => i.entityType === 'CASE_STUDY').length,
    JOB_POSITION: trashItems.filter((i) => i.entityType === 'JOB_POSITION').length,
  };

  const filteredItems = trashItems.filter((item) => {
    const matchesFilter = filterType === 'ALL' || item.entityType === filterType;
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.subtitle.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const filterTabs: { id: TrashFilterType; label: string }[] = [
    { id: 'ALL', label: 'All Items' },
    { id: 'INQUIRY', label: 'Inquiries' },
    { id: 'JOB_APPLICATION', label: 'Applications' },
    { id: 'ARTICLE', label: 'Articles' },
    { id: 'CASE_STUDY', label: 'Case Studies' },
    { id: 'JOB_POSITION', label: 'Job Positions' },
  ];

  return (
    <div className="space-y-6">
      {/* 30-Day Retention Notice Banner */}
      <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-amber-950">
        <div className="flex items-start sm:items-center gap-3">
          <div className="p-2 rounded-xl bg-amber-100 text-amber-800 shrink-0">
            <Clock className="w-4 h-4" />
          </div>
          <div>
            <p className="font-bold text-amber-900">Automatic 30-Day Retention Policy</p>
            <p className="text-amber-800/90 text-[11px] mt-0.5">
              Items remain in the Recycle Bin for 30 days before being permanently deleted by the nightly purge task. You can restore items anytime.
            </p>
          </div>
        </div>

        {trashItems.length > 0 && (
          <button
            onClick={() => setIsEmptyTrashModalOpen(true)}
            className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold transition-colors shadow-xs cursor-pointer text-xs shrink-0"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Empty Recycle Bin ({trashItems.length})</span>
          </button>
        )}
      </div>

      {/* Filter Tabs & Search Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search deleted items by title, author, or applicant..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 text-xs placeholder:text-slate-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/20"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {filterTabs.map((tab) => {
            const isActive = filterType === tab.id;
            const count = counts[tab.id];
            return (
              <button
                key={tab.id}
                onClick={() => setFilterType(tab.id)}
                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300'
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                    isActive ? 'bg-amber-600/30 text-slate-950' : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* List of Deleted Items */}
      {isLoading ? (
        <div className="p-12 text-center text-slate-400 text-xs bg-white rounded-2xl border border-slate-200">
          Loading recycle bin items...
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 shadow-xs">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-3">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-bold text-slate-900">Recycle Bin is Empty</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
            {filterType === 'ALL'
              ? 'No soft-deleted items found across CMS, Careers, or Inquiries.'
              : `No deleted ${filterTabs.find((t) => t.id === filterType)?.label.toLowerCase()} found.`}
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="divide-y divide-slate-100">
            {filteredItems.map((item) => {
              const isUrgent = item.daysRemaining <= 5;
              return (
                <div
                  key={`${item.entityType}-${item.id}`}
                  className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/60 transition-colors"
                >
                  {/* Left: Metadata */}
                  <div className="space-y-1.5 flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${getEntityBadgeStyle(
                          item.entityType
                        )}`}
                      >
                        {formatEntityType(item.entityType)}
                      </span>

                      {/* Days Remaining Pill */}
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold border ${
                          isUrgent
                            ? 'bg-red-50 text-red-700 border-red-200 animate-pulse'
                            : 'bg-slate-50 text-slate-600 border-slate-200'
                        }`}
                      >
                        <Clock className="w-3 h-3" />
                        <span>{item.daysRemaining} days left</span>
                      </span>

                      <span className="text-[11px] text-slate-400">
                        Deleted {item.deletedAt ? new Date(item.deletedAt).toLocaleDateString() : 'recently'}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-slate-900 truncate">{item.title}</h4>
                    <p className="text-xs text-slate-500 truncate">{item.subtitle}</p>
                  </div>

                  {/* Right: Actions */}
                  <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                    <button
                      onClick={() =>
                        restoreMutation.mutate({ entityType: item.entityType, id: item.id })
                      }
                      disabled={restoreMutation.isPending}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-semibold transition-colors cursor-pointer"
                      title="Restore to active records"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Restore</span>
                    </button>

                    <button
                      onClick={() => setItemToPurge(item)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-red-50 text-slate-500 hover:text-red-700 border border-slate-200 hover:border-red-200 text-xs font-semibold transition-colors cursor-pointer"
                      title="Permanently Delete Immediately"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Purge Now</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Confirm Permanent Purge Single Item */}
      <ConfirmModal
        isOpen={!!itemToPurge}
        onClose={() => setItemToPurge(null)}
        onConfirm={() => {
          if (itemToPurge) {
            purgeMutation.mutate({ entityType: itemToPurge.entityType, id: itemToPurge.id });
          }
        }}
        title="Permanently Purge Item?"
        description={`Are you sure you want to permanently delete "${itemToPurge?.title}"? This item will be immediately erased from the database and cannot be recovered.`}
        confirmText="Purge Forever"
        cancelText="Keep in Trash"
        variant="danger"
      />

      {/* Confirm Empty All Trash */}
      <ConfirmModal
        isOpen={isEmptyTrashModalOpen}
        onClose={() => setIsEmptyTrashModalOpen(false)}
        onConfirm={() => emptyTrashMutation.mutate()}
        title="Empty Entire Recycle Bin?"
        description={`Are you sure you want to permanently delete all ${trashItems.length} items in the recycle bin? This action is irreversible and all records will be destroyed immediately.`}
        confirmText="Empty All Trash"
        cancelText="Cancel"
        variant="danger"
      />
    </div>
  );
};
