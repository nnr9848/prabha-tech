import React, { useState } from 'react';
import {
  Layers,
  Search,
  Plus,
  Edit,
  Trash2,
  ExternalLink,
  Star,
  Grid,
  List,
  Eye,
} from 'lucide-react';
import { CaseStudy } from '../../../types';
import { Link } from 'react-router-dom';
import { ConfirmModal } from '../../../components/common/ConfirmModal';

interface CaseStudiesManagerProps {
  caseStudies: CaseStudy[];
  onOpenCreate: () => void;
  onOpenEdit: (study: CaseStudy) => void;
  onDelete: (id: number) => void;
}

export const CaseStudiesManager: React.FC<CaseStudiesManagerProps> = ({
  caseStudies,
  onOpenCreate,
  onOpenEdit,
  onDelete,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [studyToDelete, setStudyToDelete] = useState<CaseStudy | null>(null);

  const categories = ['ALL', ...Array.from(new Set(caseStudies.map((c) => c.category)))];

  const catCounts = React.useMemo(() => {
    const res: Record<string, number> = { ALL: caseStudies.length };
    caseStudies.forEach((c) => {
      res[c.category] = (res[c.category] || 0) + 1;
    });
    return res;
  }, [caseStudies]);

  const filteredStudies = caseStudies.filter((c) => {
    const matchesSearch =
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.slug.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (c.summary && c.summary.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory = categoryFilter === 'ALL' || c.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Search & Filter Header */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by title, client, or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 text-xs placeholder:text-slate-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/20"
          />
        </div>

        <div className="flex items-center gap-3">
          {/* Category Chips with Badges */}
          <div className="flex items-center gap-1.5 overflow-x-auto">
            {categories.map((cat) => {
              const isActive = categoryFilter === cat;
              const count = catCounts[cat] ?? 0;
              return (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-amber-500 text-slate-950 shadow-xs'
                      : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300'
                  }`}
                >
                  <span>{cat === 'ALL' ? 'All Portfolio' : cat}</span>
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

          {/* View Toggle */}
          <div className="hidden sm:flex items-center p-1 rounded-xl bg-white border border-slate-200 shadow-2xs">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                viewMode === 'grid' ? 'bg-slate-100 text-slate-900' : 'text-slate-400 hover:text-slate-700'
              }`}
              title="Grid View"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                viewMode === 'table' ? 'bg-slate-100 text-slate-900' : 'text-slate-400 hover:text-slate-700'
              }`}
              title="Table View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Grid View */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStudies.map((study) => (
            <div
              key={study.id || study.slug}
              className="group rounded-2xl bg-white border border-slate-200/80 hover:border-amber-400 p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-md shadow-2xs"
            >
              <div>
                <div className="relative overflow-hidden rounded-xl mb-4 h-40 bg-slate-100">
                  <img
                    src={study.heroImageUrl}
                    alt={study.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/90 backdrop-blur-md text-amber-800 border border-slate-200 shadow-xs">
                      {study.category}
                    </span>
                    {study.featured && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500 text-slate-950 flex items-center gap-1 shadow-xs">
                        <Star className="w-3 h-3 fill-current" />
                        <span>Featured</span>
                      </span>
                    )}
                  </div>
                </div>

                <h3 className="text-base font-bold text-slate-900 mb-1 group-hover:text-amber-700 transition-colors">
                  {study.title}
                </h3>
                <p className="text-xs text-slate-500 mb-2 font-medium">Client: {study.clientName}</p>
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">{study.summary}</p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                <Link
                  to={`/cases/${study.slug}`}
                  target="_blank"
                  className="text-[11px] font-mono text-amber-700 hover:underline flex items-center gap-1 font-semibold"
                >
                  <span>/{study.slug}</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onOpenEdit(study)}
                    className="p-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200 transition-colors cursor-pointer"
                    title="Edit Case Study"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  {study.id && (
                    <button
                      onClick={() => setStudyToDelete(study)}
                      className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 transition-colors cursor-pointer"
                      title="Delete Case Study"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Table View */}
      {viewMode === 'table' && (
        <div className="rounded-2xl bg-white border border-slate-200/80 overflow-hidden shadow-2xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 text-slate-700 uppercase tracking-wider text-[11px] border-b border-slate-200">
                <tr>
                  <th className="p-4">Case Study</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Client</th>
                  <th className="p-4">Slug / Link</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredStudies.map((study) => (
                  <tr key={study.id || study.slug} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={study.heroImageUrl}
                          alt={study.title}
                          className="w-10 h-10 rounded-lg object-cover"
                        />
                        <div className="font-bold text-slate-900 max-w-xs truncate">{study.title}</div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-amber-50 text-amber-800 border border-amber-200">
                        {study.category}
                      </span>
                    </td>
                    <td className="p-4 text-slate-900 font-medium">{study.clientName}</td>
                    <td className="p-4 font-mono text-[11px] text-slate-500">/{study.slug}</td>
                    <td className="p-4">
                      {study.featured ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-300">
                          Featured
                        </span>
                      ) : (
                        <span className="text-slate-400 text-[11px]">Standard</span>
                      )}
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => onOpenEdit(study)}
                          className="p-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200 transition-colors cursor-pointer"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        {study.id && (
                          <button
                            onClick={() => setStudyToDelete(study)}
                            className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Enterprise Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={!!studyToDelete}
        onClose={() => setStudyToDelete(null)}
        onConfirm={() => {
          if (studyToDelete?.id) {
            onDelete(studyToDelete.id);
            setStudyToDelete(null);
          }
        }}
        title="Move Case Study to Trash?"
        description={`Are you sure you want to remove "${studyToDelete?.title}"? It will be un-published and kept in the Recycle Bin for 30 days before permanent deletion.`}
        confirmText="Move to Trash"
        cancelText="Cancel"
        variant="danger"
      />
    </div>
  );
};
