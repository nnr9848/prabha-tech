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

  const catCounts = React.useMemo(() => {
    const res: Record<string, number> = { ALL: articles.length };
    articles.forEach((a) => {
      res[a.category] = (res[a.category] || 0) + 1;
    });
    return res;
  }, [articles]);

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
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search articles by title, author, or keyword..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 text-xs placeholder:text-slate-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/20"
          />
        </div>

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
                <span>{cat === 'ALL' ? 'All Articles' : cat}</span>
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
      </div>

      {/* Grid of Articles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArticles.map((art) => (
          <div
            key={art.id || art.slug}
            className="group rounded-2xl bg-white border border-slate-200/80 hover:border-amber-400 p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-md shadow-2xs"
          >
            <div>
              <div className="relative overflow-hidden rounded-xl mb-4 h-40 bg-slate-100">
                <img
                  src={art.coverImageUrl}
                  alt={art.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2.5 left-2.5">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/90 backdrop-blur-md text-amber-800 border border-slate-200 shadow-xs">
                    {art.category}
                  </span>
                </div>
              </div>

              <h3 className="text-base font-bold text-slate-900 mb-1 group-hover:text-amber-700 transition-colors line-clamp-2">
                {art.title}
              </h3>

              <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
                <span className="flex items-center gap-1">
                  <User className="w-3 h-3 text-amber-600" />
                  <span>{art.authorName}</span>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-slate-400" />
                  <span>{art.readTime || '5 min'}</span>
                </span>
              </div>

              <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">{art.excerpt}</p>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
              <Link
                to={`/insights/${art.slug}`}
                target="_blank"
                className="text-[11px] font-mono text-amber-700 hover:underline flex items-center gap-1 font-semibold"
              >
                <span>/{art.slug}</span>
                <ExternalLink className="w-3 h-3" />
              </Link>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onOpenEdit(art)}
                  className="p-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200 transition-colors cursor-pointer"
                  title="Edit Article"
                >
                  <Edit className="w-4 h-4" />
                </button>
                {art.id && (
                  <button
                    onClick={() => onDelete(art.id!)}
                    className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 transition-colors cursor-pointer"
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
