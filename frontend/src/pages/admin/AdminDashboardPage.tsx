import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminApi } from '../../api/client';
import { useAuth } from '../../context/AuthContext';
import { CaseStudy, Article, LeadInquiry } from '../../types';
import {
  Layers,
  BookOpen,
  MessageSquare,
  Plus,
  Trash2,
  Edit,
  CheckCircle,
  Clock,
  LogOut,
  ExternalLink,
  Shield,
  Save,
  X,
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const AdminDashboardPage: React.FC = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<'case-studies' | 'articles' | 'inquiries'>('case-studies');
  const queryClient = useQueryClient();

  // Case Studies Query
  const { data: caseStudies = [] } = useQuery<CaseStudy[]>({
    queryKey: ['adminCaseStudies'],
    queryFn: () => adminApi.getAllCaseStudies(),
  });

  // Articles Query
  const { data: articles = [] } = useQuery<Article[]>({
    queryKey: ['adminArticles'],
    queryFn: () => adminApi.getAllArticles(),
  });

  // Inquiries Query
  const { data: inquiries = [] } = useQuery<LeadInquiry[]>({
    queryKey: ['adminInquiries'],
    queryFn: () => adminApi.getAllInquiries(),
  });

  // Modal State for Case Studies
  const [isCaseModalOpen, setIsCaseModalOpen] = useState(false);
  const [editingCase, setEditingCase] = useState<Partial<CaseStudy>>({
    title: '',
    slug: '',
    subtitle: '',
    clientName: '',
    category: 'Banking',
    heroImageUrl: '',
    videoUrl: '',
    summary: '',
    challenge: '',
    solution: '',
    results: '',
    featured: true,
  });

  // Modal State for Articles
  const [isArticleModalOpen, setIsArticleModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Partial<Article>>({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    coverImageUrl: '',
    authorName: 'Alex Kreger',
    category: 'Fintech Trends',
    readTime: '5 min read',
    featured: true,
  });

  // Delete Case Study Mutation
  const deleteCaseMutation = useMutation({
    mutationFn: (id: number) => adminApi.deleteCaseStudy(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['adminCaseStudies'] }),
  });

  // Save Case Study Mutation
  const saveCaseMutation = useMutation({
    mutationFn: (data: Partial<CaseStudy>) => adminApi.saveCaseStudy(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminCaseStudies'] });
      setIsCaseModalOpen(false);
    },
  });

  // Delete Article Mutation
  const deleteArticleMutation = useMutation({
    mutationFn: (id: number) => adminApi.deleteArticle(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['adminArticles'] }),
  });

  // Save Article Mutation
  const saveArticleMutation = useMutation({
    mutationFn: (data: Partial<Article>) => adminApi.saveArticle(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminArticles'] });
      setIsArticleModalOpen(false);
    },
  });

  // Update Inquiry Status Mutation
  const updateInquiryStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: number; status: string }) => adminApi.updateInquiryStatus(id, status),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['adminInquiries'] }),
  });

  return (
    <div className="min-h-screen pt-28 pb-20 px-6 sm:px-8 max-w-7xl mx-auto">
      {/* CMS Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-8 border-b border-white/10 gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#00F0FF]/15 border border-[#00F0FF]/30 text-[#00F0FF] flex items-center justify-center">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">UXDA CMS Admin Portal</h1>
            <p className="text-xs text-[#94A3B8]">Logged in as: <span className="text-[#00F0FF] font-semibold">{user?.fullName || user?.username || 'Admin'}</span></p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/"
            target="_blank"
            className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <span>View Public Site</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
          <button
            onClick={logout}
            className="px-4 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-white/10 mb-8 gap-6">
        <button
          onClick={() => setActiveTab('case-studies')}
          className={`pb-4 text-sm font-semibold flex items-center gap-2 relative transition-colors ${
            activeTab === 'case-studies' ? 'text-[#00F0FF]' : 'text-[#94A3B8] hover:text-white'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Case Studies ({caseStudies.length})</span>
          {activeTab === 'case-studies' && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#00F0FF]"></span>}
        </button>

        <button
          onClick={() => setActiveTab('articles')}
          className={`pb-4 text-sm font-semibold flex items-center gap-2 relative transition-colors ${
            activeTab === 'articles' ? 'text-[#00F0FF]' : 'text-[#94A3B8] hover:text-white'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Articles / Insights ({articles.length})</span>
          {activeTab === 'articles' && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#00F0FF]"></span>}
        </button>

        <button
          onClick={() => setActiveTab('inquiries')}
          className={`pb-4 text-sm font-semibold flex items-center gap-2 relative transition-colors ${
            activeTab === 'inquiries' ? 'text-[#00F0FF]' : 'text-[#94A3B8] hover:text-white'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>Lead Inquiries ({inquiries.length})</span>
          {activeTab === 'inquiries' && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#00F0FF]"></span>}
        </button>
      </div>

      {/* CASE STUDIES TAB */}
      {activeTab === 'case-studies' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold text-white">Manage UX Portfolio</h2>
            <button
              onClick={() => {
                setEditingCase({
                  title: '',
                  slug: '',
                  subtitle: '',
                  clientName: '',
                  category: 'Banking',
                  heroImageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1600&q=80',
                  videoUrl: '',
                  summary: '',
                  challenge: '',
                  solution: '',
                  results: '',
                  featured: true,
                });
                setIsCaseModalOpen(true);
              }}
              className="px-4 py-2 rounded-xl bg-[#00F0FF] text-black text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 hover:bg-white transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Case Study</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {caseStudies.map((study) => (
              <div key={study.id || study.slug} className="rounded-2xl bg-[#0D111A] border border-white/10 p-5 flex flex-col justify-between">
                <div>
                  <img src={study.heroImageUrl} alt={study.title} className="w-full h-36 object-cover rounded-xl mb-4" />
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#00F0FF]/15 text-[#00F0FF]">
                    {study.category}
                  </span>
                  <h3 className="text-base font-bold text-white mt-2 mb-1">{study.title}</h3>
                  <p className="text-xs text-[#64748B] mb-2">Client: {study.clientName}</p>
                  <p className="text-xs text-[#94A3B8] line-clamp-2">{study.summary}</p>
                </div>

                <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-[#64748B]">/{study.slug}</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setEditingCase(study);
                        setIsCaseModalOpen(true);
                      }}
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-white transition-colors"
                      title="Edit"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    {study.id && (
                      <button
                        onClick={() => deleteCaseMutation.mutate(study.id!)}
                        className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"
                        title="Delete"
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
      )}

      {/* ARTICLES TAB */}
      {activeTab === 'articles' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold text-white">Manage Blog & Insights</h2>
            <button
              onClick={() => {
                setEditingArticle({
                  title: '',
                  slug: '',
                  excerpt: '',
                  content: '',
                  coverImageUrl: 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&w=1200&q=80',
                  authorName: 'Alex Kreger',
                  category: 'Fintech Trends',
                  readTime: '5 min read',
                  featured: true,
                });
                setIsArticleModalOpen(true);
              }}
              className="px-4 py-2 rounded-xl bg-[#00F0FF] text-black text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 hover:bg-white transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Article</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((art) => (
              <div key={art.id || art.slug} className="rounded-2xl bg-[#0D111A] border border-white/10 p-5 flex flex-col justify-between">
                <div>
                  <img src={art.coverImageUrl} alt={art.title} className="w-full h-36 object-cover rounded-xl mb-4" />
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#00F0FF]/15 text-[#00F0FF]">
                    {art.category}
                  </span>
                  <h3 className="text-base font-bold text-white mt-2 mb-1">{art.title}</h3>
                  <p className="text-xs text-[#64748B] mb-2">By {art.authorName}</p>
                  <p className="text-xs text-[#94A3B8] line-clamp-2">{art.excerpt}</p>
                </div>

                <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-[#64748B]">/{art.slug}</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setEditingArticle(art);
                        setIsArticleModalOpen(true);
                      }}
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-white transition-colors"
                      title="Edit"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    {art.id && (
                      <button
                        onClick={() => deleteArticleMutation.mutate(art.id!)}
                        className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"
                        title="Delete"
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
      )}

      {/* LEAD INQUIRIES TAB */}
      {activeTab === 'inquiries' && (
        <div className="space-y-6">
          <h2 className="text-lg font-bold text-white">Client Project Requests & Inquiries</h2>

          <div className="rounded-2xl bg-[#0D111A] border border-white/10 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-[#94A3B8]">
                <thead className="bg-[#07090E] text-white uppercase tracking-wider text-[11px] border-b border-white/10">
                  <tr>
                    <th className="p-4">Client Name</th>
                    <th className="p-4">Contact</th>
                    <th className="p-4">Project Type</th>
                    <th className="p-4">Budget</th>
                    <th className="p-4">Message</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {inquiries.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="p-8 text-center text-sm text-[#64748B]">
                        No client inquiries received yet.
                      </td>
                    </tr>
                  ) : (
                    inquiries.map((inq) => (
                      <tr key={inq.id} className="hover:bg-white/5 transition-colors">
                        <td className="p-4 font-semibold text-white">
                          {inq.fullName}
                          {inq.companyName && <span className="block text-[11px] text-[#64748B]">{inq.companyName}</span>}
                        </td>
                        <td className="p-4">
                          <a href={`mailto:${inq.email}`} className="text-[#00F0FF] hover:underline block">{inq.email}</a>
                          {inq.phoneNumber && <span className="text-[11px] text-[#64748B]">{inq.phoneNumber}</span>}
                        </td>
                        <td className="p-4 text-white font-medium">{inq.projectType}</td>
                        <td className="p-4 text-[#00F0FF] font-semibold">{inq.budgetRange}</td>
                        <td className="p-4 max-w-xs truncate">{inq.message}</td>
                        <td className="p-4">
                          <span
                            className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                              inq.status === 'CONTACTED'
                                ? 'bg-green-500/20 text-green-400'
                                : inq.status === 'IN_REVIEW'
                                ? 'bg-yellow-500/20 text-yellow-400'
                                : 'bg-[#00F0FF]/20 text-[#00F0FF]'
                            }`}
                          >
                            {inq.status || 'NEW'}
                          </span>
                        </td>
                        <td className="p-4">
                          {inq.id && (
                            <select
                              value={inq.status || 'NEW'}
                              onChange={(e) => updateInquiryStatusMutation.mutate({ id: inq.id!, status: e.target.value })}
                              className="bg-[#07090E] border border-white/10 text-white rounded-lg p-1 text-[11px] focus:outline-none"
                            >
                              <option value="NEW">New</option>
                              <option value="IN_REVIEW">In Review</option>
                              <option value="CONTACTED">Contacted</option>
                              <option value="ARCHIVED">Archived</option>
                            </select>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* CASE STUDY EDIT MODAL */}
      {isCaseModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
          <div className="bg-[#0D111A] border border-white/10 rounded-2xl w-full max-w-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto space-y-4">
            <div className="flex justify-between items-center pb-4 border-b border-white/10">
              <h3 className="text-xl font-bold text-white">
                {editingCase.id ? 'Edit Case Study' : 'Create New Case Study'}
              </h3>
              <button onClick={() => setIsCaseModalOpen(false)} className="text-[#94A3B8] hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#94A3B8] mb-1">Title *</label>
                <input
                  type="text"
                  value={editingCase.title || ''}
                  onChange={(e) => {
                    const title = e.target.value;
                    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                    setEditingCase({ ...editingCase, title, slug: editingCase.id ? editingCase.slug : slug });
                  }}
                  className="w-full p-2.5 rounded-xl bg-[#07090E] border border-white/10 text-white text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#94A3B8] mb-1">Slug *</label>
                <input
                  type="text"
                  value={editingCase.slug || ''}
                  onChange={(e) => setEditingCase({ ...editingCase, slug: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-[#07090E] border border-white/10 text-white text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#94A3B8] mb-1">Client Name *</label>
                <input
                  type="text"
                  value={editingCase.clientName || ''}
                  onChange={(e) => setEditingCase({ ...editingCase, clientName: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-[#07090E] border border-white/10 text-white text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#94A3B8] mb-1">Category *</label>
                <select
                  value={editingCase.category || 'Banking'}
                  onChange={(e) => setEditingCase({ ...editingCase, category: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-[#07090E] border border-white/10 text-white text-xs"
                >
                  <option value="Banking">Banking</option>
                  <option value="Fintech">Fintech</option>
                  <option value="Wealthtech">Wealthtech</option>
                  <option value="Crypto">Crypto</option>
                  <option value="SaaS">SaaS</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#94A3B8] mb-1">Hero Image URL *</label>
              <input
                type="text"
                value={editingCase.heroImageUrl || ''}
                onChange={(e) => setEditingCase({ ...editingCase, heroImageUrl: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-[#07090E] border border-white/10 text-white text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#94A3B8] mb-1">Video URL (Optional)</label>
              <input
                type="text"
                value={editingCase.videoUrl || ''}
                onChange={(e) => setEditingCase({ ...editingCase, videoUrl: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-[#07090E] border border-white/10 text-white text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#94A3B8] mb-1">Executive Summary *</label>
              <textarea
                rows={3}
                value={editingCase.summary || ''}
                onChange={(e) => setEditingCase({ ...editingCase, summary: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-[#07090E] border border-white/10 text-white text-xs resize-none"
              ></textarea>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
              <button
                onClick={() => setIsCaseModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-white/10 text-white text-xs font-semibold hover:bg-white/20"
              >
                Cancel
              </button>
              <button
                onClick={() => saveCaseMutation.mutate(editingCase)}
                className="px-6 py-2 rounded-xl bg-[#00F0FF] text-black text-xs font-bold uppercase tracking-wider hover:bg-white flex items-center gap-1.5"
              >
                <Save className="w-4 h-4" />
                <span>Save Case Study</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ARTICLE EDIT MODAL */}
      {isArticleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
          <div className="bg-[#0D111A] border border-white/10 rounded-2xl w-full max-w-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto space-y-4">
            <div className="flex justify-between items-center pb-4 border-b border-white/10">
              <h3 className="text-xl font-bold text-white">
                {editingArticle.id ? 'Edit Article' : 'Create New Article'}
              </h3>
              <button onClick={() => setIsArticleModalOpen(false)} className="text-[#94A3B8] hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#94A3B8] mb-1">Title *</label>
                <input
                  type="text"
                  value={editingArticle.title || ''}
                  onChange={(e) => {
                    const title = e.target.value;
                    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                    setEditingArticle({ ...editingArticle, title, slug: editingArticle.id ? editingArticle.slug : slug });
                  }}
                  className="w-full p-2.5 rounded-xl bg-[#07090E] border border-white/10 text-white text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#94A3B8] mb-1">Slug *</label>
                <input
                  type="text"
                  value={editingArticle.slug || ''}
                  onChange={(e) => setEditingArticle({ ...editingArticle, slug: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-[#07090E] border border-white/10 text-white text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#94A3B8] mb-1">Author Name *</label>
                <input
                  type="text"
                  value={editingArticle.authorName || ''}
                  onChange={(e) => setEditingArticle({ ...editingArticle, authorName: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-[#07090E] border border-white/10 text-white text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#94A3B8] mb-1">Category *</label>
                <input
                  type="text"
                  value={editingArticle.category || ''}
                  onChange={(e) => setEditingArticle({ ...editingArticle, category: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-[#07090E] border border-white/10 text-white text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#94A3B8] mb-1">Cover Image URL *</label>
              <input
                type="text"
                value={editingArticle.coverImageUrl || ''}
                onChange={(e) => setEditingArticle({ ...editingArticle, coverImageUrl: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-[#07090E] border border-white/10 text-white text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#94A3B8] mb-1">Excerpt / Summary *</label>
              <textarea
                rows={3}
                value={editingArticle.excerpt || ''}
                onChange={(e) => setEditingArticle({ ...editingArticle, excerpt: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-[#07090E] border border-white/10 text-white text-xs resize-none"
              ></textarea>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#94A3B8] mb-1">Full Article Body *</label>
              <textarea
                rows={6}
                value={editingArticle.content || ''}
                onChange={(e) => setEditingArticle({ ...editingArticle, content: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-[#07090E] border border-white/10 text-white text-xs"
              ></textarea>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
              <button
                onClick={() => setIsArticleModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-white/10 text-white text-xs font-semibold hover:bg-white/20"
              >
                Cancel
              </button>
              <button
                onClick={() => saveArticleMutation.mutate(editingArticle)}
                className="px-6 py-2 rounded-xl bg-[#00F0FF] text-black text-xs font-bold uppercase tracking-wider hover:bg-white flex items-center gap-1.5"
              >
                <Save className="w-4 h-4" />
                <span>Save Article</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
