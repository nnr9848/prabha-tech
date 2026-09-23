import React, { useState } from 'react';
import {
  BookOpen,
  Search,
  Plus,
  Edit,
  Trash2,
  ExternalLink,
  User,
  Clock,
} from 'lucide-react';
import { Article } from '../../../types';
import { PillButton } from '../../../components/common/PillButton';
import { Link } from 'react-router-dom';

interface ArticlesManagerProps {
  articles: Article[];
  onOpenCreate: () => void;
  onOpenEdit: (article: Article) => void;
  onDelete: (id: number) => void;
}

export const ArticlesManager: React.FC<ArticlesManagerProps> = ({
  articles,
  onOpenCreate,
  onOpenEdit,
  onDelete,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');

  const categories = ['ALL', ...Array.from(new Set(articles.map((a) => a.category)))];

  const filteredArticles = articles.filter((art) => {
    const matchesSearch =
      art.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      art.authorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      art.slug.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (art.excerpt && art.excerpt.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory = categoryFilter === 'ALL' || art.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Search & Category Filter */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
          <input
            type="text"
            placeholder="Search articles by title, author, or keyword..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0D111A] border border-white/10 text-white text-xs placeholder:text-[#64748B] focus:outline-none focus:border-[var(--brand-primary,#9873ff)]/50"
          />
        </div>

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
      </div>

      {/* Grid of Articles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArticles.map((art) => (
          <div
            key={art.id || art.slug}
            className="group rounded-2xl bg-[#0D111A] border border-white/10 hover:border-[var(--brand-primary,#9873ff)]/40 p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-xl"
          >
            <div>
              <div className="relative overflow-hidden rounded-xl mb-4 h-40 bg-[#07090E]">
                <img
                  src={art.coverImageUrl}
                  alt={art.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2.5 left-2.5">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#07090E]/80 backdrop-blur-md text-[var(--brand-primary,#9873ff)] border border-white/10">
                    {art.category}
                  </span>
                </div>
              </div>

              <h3 className="text-base font-bold text-white mb-1 group-hover:text-[var(--brand-primary,#9873ff)] transition-colors line-clamp-2">
                {art.title}
              </h3>

              <div className="flex items-center gap-3 text-xs text-[#64748B] mb-3">
                <span className="flex items-center gap-1">
                  <User className="w-3 h-3 text-[var(--brand-primary,#9873ff)]" />
                  <span>{art.authorName}</span>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-[#64748B]" />
                  <span>{art.readTime || '5 min'}</span>
                </span>
              </div>

              <p className="text-xs text-[#94A3B8] line-clamp-3 leading-relaxed">{art.excerpt}</p>
            </div>

            <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between">
              <Link
                to={`/insights/${art.slug}`}
                target="_blank"
                className="text-[11px] font-mono text-[var(--brand-primary,#9873ff)] hover:underline flex items-center gap-1"
              >
                <span>/{art.slug}</span>
                <ExternalLink className="w-3 h-3" />
              </Link>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onOpenEdit(art)}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-white transition-colors cursor-pointer"
                  title="Edit Article"
                >
                  <Edit className="w-4 h-4" />
                </button>
                {art.id && (
                  <button
                    onClick={() => onDelete(art.id!)}
                    className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors cursor-pointer"
                    title="Delete Article"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
