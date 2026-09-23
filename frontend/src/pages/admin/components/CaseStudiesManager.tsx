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
import { PillButton } from '../../../components/common/PillButton';
import { Link } from 'react-router-dom';

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

  const categories = ['ALL', ...Array.from(new Set(caseStudies.map((c) => c.category)))];

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
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
          <input
            type="text"
            placeholder="Search by title, client, or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0D111A] border border-white/10 text-white text-xs placeholder:text-[#64748B] focus:outline-none focus:border-[var(--brand-primary,#9873ff)]/50"
          />
        </div>

        <div className="flex items-center gap-3">
          {/* Category Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  categoryFilter === cat
                    ? 'bg-[var(--brand-primary,#9873ff)] text-white'
                    : 'bg-[#0D111A] border border-white/10 text-[#94A3B8] hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* View Toggle */}
          <div className="hidden sm:flex items-center p-1 rounded-xl bg-[#0D111A] border border-white/10">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'grid' ? 'bg-white/10 text-white' : 'text-[#64748B] hover:text-white'
              }`}
              title="Grid View"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'table' ? 'bg-white/10 text-white' : 'text-[#64748B] hover:text-white'
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
              className="group rounded-2xl bg-[#0D111A] border border-white/10 hover:border-[var(--brand-primary,#9873ff)]/40 p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-xl"
            >
              <div>
                <div className="relative overflow-hidden rounded-xl mb-4 h-40 bg-[#07090E]">
                  <img
                    src={study.heroImageUrl}
                    alt={study.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#07090E]/80 backdrop-blur-md text-[var(--brand-primary,#9873ff)] border border-white/10">
                      {study.category}
                    </span>
                    {study.featured && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-yellow-400 text-black flex items-center gap-1 shadow-md">
                        <Star className="w-3 h-3 fill-current" />
                        <span>Featured</span>
                      </span>
                    )}
                  </div>
                </div>

                <h3 className="text-base font-bold text-white mb-1 group-hover:text-[var(--brand-primary,#9873ff)] transition-colors">
                  {study.title}
                </h3>
                <p className="text-xs text-[#64748B] mb-2 font-medium">Client: {study.clientName}</p>
                <p className="text-xs text-[#94A3B8] line-clamp-2 leading-relaxed">{study.summary}</p>
              </div>

              <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between">
                <Link
                  to={`/cases/${study.slug}`}
                  target="_blank"
                  className="text-[11px] font-mono text-[var(--brand-primary,#9873ff)] hover:underline flex items-center gap-1"
                >
                  <span>/{study.slug}</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onOpenEdit(study)}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-white transition-colors cursor-pointer"
                    title="Edit Case Study"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  {study.id && (
                    <button
                      onClick={() => onDelete(study.id!)}
                      className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors cursor-pointer"
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
        <div className="rounded-2xl bg-[#0D111A] border border-white/10 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-[#94A3B8]">
              <thead className="bg-[#07090E] text-white uppercase tracking-wider text-[11px] border-b border-white/10">
                <tr>
                  <th className="p-4">Case Study</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Client</th>
                  <th className="p-4">Slug / Link</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredStudies.map((study) => (
                  <tr key={study.id || study.slug} className="hover:bg-white/5 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={study.heroImageUrl}
                          alt={study.title}
                          className="w-10 h-10 rounded-lg object-cover"
                        />
                        <div className="font-bold text-white max-w-xs truncate">{study.title}</div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-[var(--brand-primary,#9873ff)]/15 text-[var(--brand-primary,#9873ff)]">
                        {study.category}
                      </span>
                    </td>
                    <td className="p-4 text-white font-medium">{study.clientName}</td>
                    <td className="p-4 font-mono text-[11px] text-[#64748B]">/{study.slug}</td>
                    <td className="p-4">
                      {study.featured ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-yellow-400/20 text-yellow-400">
                          Featured
                        </span>
                      ) : (
                        <span className="text-[#64748B] text-[11px]">Standard</span>
                      )}
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => onOpenEdit(study)}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-white transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        {study.id && (
                          <button
                            onClick={() => onDelete(study.id!)}
                            className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"
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
    </div>
  );
};
