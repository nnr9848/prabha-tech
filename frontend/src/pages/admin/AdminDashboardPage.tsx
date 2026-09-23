import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminApi } from '../../api/client';
import { CaseStudy, Article, LeadInquiry, SocialLink } from '../../types';
import { AdminSidebar, AdminTab } from './components/AdminSidebar';
import { AdminHeader } from './components/AdminHeader';
import { AdminOverview } from './components/AdminOverview';
import { CaseStudiesManager } from './components/CaseStudiesManager';
import { ArticlesManager } from './components/ArticlesManager';
import { InquiriesManager } from './components/InquiriesManager';
import { SocialLinksManager } from './components/SocialLinksManager';
import { PillButton } from '../../components/common/PillButton';
import { X, Save, Image as ImageIcon } from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [selectedInquiry, setSelectedInquiry] = useState<LeadInquiry | null>(null);

  const queryClient = useQueryClient();

  // Queries
  const { data: caseStudies = [] } = useQuery<CaseStudy[]>({
    queryKey: ['adminCaseStudies'],
    queryFn: () => adminApi.getAllCaseStudies(),
  });

  const { data: articles = [] } = useQuery<Article[]>({
    queryKey: ['adminArticles'],
    queryFn: () => adminApi.getAllArticles(),
  });

  const { data: inquiries = [] } = useQuery<LeadInquiry[]>({
    queryKey: ['adminInquiries'],
    queryFn: () => adminApi.getAllInquiries(),
  });

  const { data: socialLinks = [] } = useQuery<SocialLink[]>({
    queryKey: ['adminSocialLinks'],
    queryFn: () => adminApi.getAllSocialLinks(),
  });

  // Modal States
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

  const [isSocialModalOpen, setIsSocialModalOpen] = useState(false);
  const [editingSocial, setEditingSocial] = useState<Partial<SocialLink>>({
    platformKey: 'linkedin',
    platformName: 'LinkedIn',
    url: '',
    bgColor: '#0A66C2',
    displayOrder: 1,
    isActive: true,
  });

  // Mutations
  const deleteCaseMutation = useMutation({
    mutationFn: (id: number) => adminApi.deleteCaseStudy(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['adminCaseStudies'] }),
  });

  const saveCaseMutation = useMutation({
    mutationFn: (data: Partial<CaseStudy>) => adminApi.saveCaseStudy(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminCaseStudies'] });
      setIsCaseModalOpen(false);
    },
  });

  const deleteArticleMutation = useMutation({
    mutationFn: (id: number) => adminApi.deleteArticle(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['adminArticles'] }),
  });

  const saveArticleMutation = useMutation({
    mutationFn: (data: Partial<Article>) => adminApi.saveArticle(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminArticles'] });
      setIsArticleModalOpen(false);
    },
  });

  const updateInquiryStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: number; status: string }) =>
      adminApi.updateInquiryStatus(id, status),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['adminInquiries'] }),
  });

  const saveSocialMutation = useMutation({
    mutationFn: (data: Partial<SocialLink>) => {
      if (data.id) {
        return adminApi.updateSocialLink(data.id, data);
      }
      return adminApi.createSocialLink(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminSocialLinks'] });
      queryClient.invalidateQueries({ queryKey: ['socialLinks'] });
      setIsSocialModalOpen(false);
    },
  });

  const deleteSocialMutation = useMutation({
    mutationFn: (id: number) => adminApi.deleteSocialLink(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminSocialLinks'] });
      queryClient.invalidateQueries({ queryKey: ['socialLinks'] });
    },
  });

  // Modal Triggers
  const handleQuickCreate = (type: 'case' | 'article' | 'social') => {
    if (type === 'case') {
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
    } else if (type === 'article') {
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
    } else if (type === 'social') {
      setEditingSocial({
        platformKey: 'linkedin',
        platformName: 'LinkedIn',
        url: '',
        bgColor: '#0A66C2',
        displayOrder: socialLinks.length + 1,
        isActive: true,
      });
      setIsSocialModalOpen(true);
    }
  };

  const newInquiriesCount = inquiries.filter((i) => !i.status || i.status === 'NEW').length;

  return (
    <div className="min-h-screen bg-[#07090E] text-white flex">
      {/* Collapsible Left Sidebar */}
      <AdminSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
        counts={{
          caseStudies: caseStudies.length,
          articles: articles.length,
          inquiries: inquiries.length,
          newInquiries: newInquiriesCount,
          socialLinks: socialLinks.length,
        }}
      />

      {/* Main Content Area */}
      <div
        className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${
          isSidebarCollapsed ? 'md:pl-20' : 'md:pl-64'
        }`}
      >
        {/* Sticky Top Bar */}
        <AdminHeader
          activeTab={activeTab}
          onQuickCreate={handleQuickCreate}
          unreadInquiriesCount={newInquiriesCount}
        />

        {/* Tab View Container */}
        <main className="flex-1 p-6 sm:p-8 max-w-7xl w-full mx-auto">
          {activeTab === 'overview' && (
            <AdminOverview
              caseStudies={caseStudies}
              articles={articles}
              inquiries={inquiries}
              socialLinks={socialLinks}
              onNavigateTab={(tab) => setActiveTab(tab)}
              onQuickCreate={handleQuickCreate}
              onSelectInquiry={(inq) => {
                setSelectedInquiry(inq);
                setActiveTab('inquiries');
              }}
            />
          )}

          {activeTab === 'case-studies' && (
            <CaseStudiesManager
              caseStudies={caseStudies}
              onOpenCreate={() => handleQuickCreate('case')}
              onOpenEdit={(study) => {
                setEditingCase(study);
                setIsCaseModalOpen(true);
              }}
              onDelete={(id) => deleteCaseMutation.mutate(id)}
            />
          )}

          {activeTab === 'articles' && (
            <ArticlesManager
              articles={articles}
              onOpenCreate={() => handleQuickCreate('article')}
              onOpenEdit={(art) => {
                setEditingArticle(art);
                setIsArticleModalOpen(true);
              }}
              onDelete={(id) => deleteArticleMutation.mutate(id)}
            />
          )}

          {activeTab === 'inquiries' && (
            <InquiriesManager
              inquiries={inquiries}
              onUpdateStatus={(id, status) => updateInquiryStatusMutation.mutate({ id, status })}
              selectedInquiry={selectedInquiry}
              setSelectedInquiry={setSelectedInquiry}
            />
          )}

          {activeTab === 'social-links' && (
            <SocialLinksManager
              socialLinks={socialLinks}
              onOpenCreate={() => handleQuickCreate('social')}
              onOpenEdit={(link) => {
                setEditingSocial(link);
                setIsSocialModalOpen(true);
              }}
              onDelete={(id) => deleteSocialMutation.mutate(id)}
              onToggleActive={(link) =>
                saveSocialMutation.mutate({ ...link, isActive: !link.isActive })
              }
            />
          )}
        </main>
      </div>

      {/* Case Study Modal */}
      {isCaseModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0D111A] border border-white/10 rounded-2xl w-full max-w-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto space-y-4 shadow-2xl">
            <div className="flex justify-between items-center pb-4 border-b border-white/10">
              <h3 className="text-xl font-bold text-white">
                {editingCase.id ? 'Edit Case Study' : 'Create New Case Study'}
              </h3>
              <button
                onClick={() => setIsCaseModalOpen(false)}
                className="p-1 rounded-lg hover:bg-white/10 text-[#94A3B8] hover:text-white"
              >
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
                  className="w-full p-2.5 rounded-xl bg-[#07090E] border border-white/10 text-white text-xs focus:outline-none focus:border-[var(--brand-primary,#9873ff)]/50"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#94A3B8] mb-1">Slug *</label>
                <input
                  type="text"
                  value={editingCase.slug || ''}
                  onChange={(e) => setEditingCase({ ...editingCase, slug: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-[#07090E] border border-white/10 text-white text-xs focus:outline-none focus:border-[var(--brand-primary,#9873ff)]/50"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#94A3B8] mb-1">Client Name *</label>
                <input
                  type="text"
                  value={editingCase.clientName || ''}
                  onChange={(e) => setEditingCase({ ...editingCase, clientName: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-[#07090E] border border-white/10 text-white text-xs focus:outline-none focus:border-[var(--brand-primary,#9873ff)]/50"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#94A3B8] mb-1">Category *</label>
                <select
                  value={editingCase.category || 'Banking'}
                  onChange={(e) => setEditingCase({ ...editingCase, category: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-[#07090E] border border-white/10 text-white text-xs focus:outline-none focus:border-[var(--brand-primary,#9873ff)]/50"
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
                className="w-full p-2.5 rounded-xl bg-[#07090E] border border-white/10 text-white text-xs focus:outline-none focus:border-[var(--brand-primary,#9873ff)]/50"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#94A3B8] mb-1">Video URL (Optional)</label>
              <input
                type="text"
                value={editingCase.videoUrl || ''}
                onChange={(e) => setEditingCase({ ...editingCase, videoUrl: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-[#07090E] border border-white/10 text-white text-xs focus:outline-none focus:border-[var(--brand-primary,#9873ff)]/50"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#94A3B8] mb-1">Executive Summary *</label>
              <textarea
                rows={3}
                value={editingCase.summary || ''}
                onChange={(e) => setEditingCase({ ...editingCase, summary: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-[#07090E] border border-white/10 text-white text-xs resize-none focus:outline-none focus:border-[var(--brand-primary,#9873ff)]/50"
              ></textarea>
            </div>

            <div className="flex items-center pt-2">
              <label className="flex items-center gap-2 text-xs font-semibold text-white cursor-pointer">
                <input
                  type="checkbox"
                  checked={editingCase.featured !== false}
                  onChange={(e) => setEditingCase({ ...editingCase, featured: e.target.checked })}
                  className="w-4 h-4 rounded bg-[#07090E] border-white/20 text-[var(--brand-primary,#9873ff)] focus:ring-0"
                />
                <span>Feature on Homepage Portfolio</span>
              </label>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
              <PillButton
                onClick={() => setIsCaseModalOpen(false)}
                variant="secondary"
                size="sm"
                showDefaultIcon={false}
              >
                Cancel
              </PillButton>
              <PillButton
                onClick={() => saveCaseMutation.mutate(editingCase)}
                size="sm"
                icon={<Save className="w-4 h-4 text-[var(--brand-primary,#9873ff)] group-hover:text-white transition-colors" />}
                iconPosition="left"
                showDefaultIcon={false}
              >
                Save Case Study
              </PillButton>
            </div>
          </div>
        </div>
      )}

      {/* Article Modal */}
      {isArticleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0D111A] border border-white/10 rounded-2xl w-full max-w-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto space-y-4 shadow-2xl">
            <div className="flex justify-between items-center pb-4 border-b border-white/10">
              <h3 className="text-xl font-bold text-white">
                {editingArticle.id ? 'Edit Article' : 'Create New Article'}
              </h3>
              <button
                onClick={() => setIsArticleModalOpen(false)}
                className="p-1 rounded-lg hover:bg-white/10 text-[#94A3B8] hover:text-white"
              >
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
                  className="w-full p-2.5 rounded-xl bg-[#07090E] border border-white/10 text-white text-xs focus:outline-none focus:border-[var(--brand-primary,#9873ff)]/50"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#94A3B8] mb-1">Slug *</label>
                <input
                  type="text"
                  value={editingArticle.slug || ''}
                  onChange={(e) => setEditingArticle({ ...editingArticle, slug: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-[#07090E] border border-white/10 text-white text-xs focus:outline-none focus:border-[var(--brand-primary,#9873ff)]/50"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#94A3B8] mb-1">Author Name *</label>
                <input
                  type="text"
                  value={editingArticle.authorName || ''}
                  onChange={(e) => setEditingArticle({ ...editingArticle, authorName: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-[#07090E] border border-white/10 text-white text-xs focus:outline-none focus:border-[var(--brand-primary,#9873ff)]/50"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#94A3B8] mb-1">Category *</label>
                <input
                  type="text"
                  value={editingArticle.category || ''}
                  onChange={(e) => setEditingArticle({ ...editingArticle, category: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-[#07090E] border border-white/10 text-white text-xs focus:outline-none focus:border-[var(--brand-primary,#9873ff)]/50"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#94A3B8] mb-1">Cover Image URL *</label>
              <input
                type="text"
                value={editingArticle.coverImageUrl || ''}
                onChange={(e) => setEditingArticle({ ...editingArticle, coverImageUrl: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-[#07090E] border border-white/10 text-white text-xs focus:outline-none focus:border-[var(--brand-primary,#9873ff)]/50"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#94A3B8] mb-1">Excerpt / Summary *</label>
              <textarea
                rows={3}
                value={editingArticle.excerpt || ''}
                onChange={(e) => setEditingArticle({ ...editingArticle, excerpt: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-[#07090E] border border-white/10 text-white text-xs resize-none focus:outline-none focus:border-[var(--brand-primary,#9873ff)]/50"
              ></textarea>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#94A3B8] mb-1">Full Body Content *</label>
              <textarea
                rows={6}
                value={editingArticle.content || ''}
                onChange={(e) => setEditingArticle({ ...editingArticle, content: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-[#07090E] border border-white/10 text-white text-xs focus:outline-none focus:border-[var(--brand-primary,#9873ff)]/50"
              ></textarea>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
              <PillButton
                onClick={() => setIsArticleModalOpen(false)}
                variant="secondary"
                size="sm"
                showDefaultIcon={false}
              >
                Cancel
              </PillButton>
              <PillButton
                onClick={() => saveArticleMutation.mutate(editingArticle)}
                size="sm"
                icon={<Save className="w-4 h-4 text-[var(--brand-primary,#9873ff)] group-hover:text-white transition-colors" />}
                iconPosition="left"
                showDefaultIcon={false}
              >
                Save Article
              </PillButton>
            </div>
          </div>
        </div>
      )}

      {/* Social Modal */}
      {isSocialModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0D111A] border border-white/10 rounded-2xl w-full max-w-lg p-6 sm:p-8 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center pb-4 border-b border-white/10">
              <h3 className="text-xl font-bold text-white">
                {editingSocial.id ? 'Edit Social Channel' : 'Add Social Channel'}
              </h3>
              <button
                onClick={() => setIsSocialModalOpen(false)}
                className="p-1 rounded-lg hover:bg-white/10 text-[#94A3B8] hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#94A3B8] mb-1">Platform *</label>
                <select
                  value={editingSocial.platformKey || 'linkedin'}
                  onChange={(e) => {
                    const key = e.target.value;
                    const nameMap: Record<string, string> = {
                      linkedin: 'LinkedIn',
                      twitter_x: 'X (Twitter)',
                      instagram: 'Instagram',
                      facebook: 'Facebook',
                      youtube: 'YouTube',
                      github: 'GitHub',
                    };
                    const colorMap: Record<string, string> = {
                      linkedin: '#0A66C2',
                      twitter_x: '#FFFFFF',
                      instagram: 'linear-gradient(to top right, #f09433, #dc2743, #cc2366, #bc1888)',
                      facebook: '#1877F2',
                      youtube: '#FF0000',
                      github: '#24292e',
                    };
                    setEditingSocial({
                      ...editingSocial,
                      platformKey: key,
                      platformName: nameMap[key] || key,
                      bgColor: colorMap[key] || '#0A66C2',
                    });
                  }}
                  className="w-full p-2.5 rounded-xl bg-[#07090E] border border-white/10 text-white text-xs focus:outline-none focus:border-[var(--brand-primary,#9873ff)]/50"
                >
                  <option value="linkedin">LinkedIn</option>
                  <option value="twitter_x">X (Twitter)</option>
                  <option value="instagram">Instagram</option>
                  <option value="facebook">Facebook</option>
                  <option value="youtube">YouTube</option>
                  <option value="github">GitHub</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#94A3B8] mb-1">Display Name *</label>
                <input
                  type="text"
                  value={editingSocial.platformName || ''}
                  onChange={(e) => setEditingSocial({ ...editingSocial, platformName: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-[#07090E] border border-white/10 text-white text-xs focus:outline-none focus:border-[var(--brand-primary,#9873ff)]/50"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#94A3B8] mb-1">Target Profile URL *</label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={editingSocial.url || ''}
                  onChange={(e) => setEditingSocial({ ...editingSocial, url: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-[#07090E] border border-white/10 text-white text-xs focus:outline-none focus:border-[var(--brand-primary,#9873ff)]/50"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#94A3B8] mb-1">Display Order</label>
                  <input
                    type="number"
                    value={editingSocial.displayOrder || 1}
                    onChange={(e) =>
                      setEditingSocial({
                        ...editingSocial,
                        displayOrder: parseInt(e.target.value, 10) || 1,
                      })
                    }
                    className="w-full p-2.5 rounded-xl bg-[#07090E] border border-white/10 text-white text-xs focus:outline-none focus:border-[var(--brand-primary,#9873ff)]/50"
                  />
                </div>

                <div className="flex items-center pt-5">
                  <label className="flex items-center gap-2 text-xs font-semibold text-white cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editingSocial.isActive !== false}
                      onChange={(e) => setEditingSocial({ ...editingSocial, isActive: e.target.checked })}
                      className="w-4 h-4 rounded bg-[#07090E] border-white/20 text-[var(--brand-primary,#9873ff)] focus:ring-0"
                    />
                    <span>Active Channel</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
              <PillButton
                onClick={() => setIsSocialModalOpen(false)}
                variant="secondary"
                size="sm"
                showDefaultIcon={false}
              >
                Cancel
              </PillButton>
              <PillButton
                onClick={() => saveSocialMutation.mutate(editingSocial)}
                disabled={!editingSocial.url}
                size="sm"
                icon={<Save className="w-4 h-4 text-[var(--brand-primary,#9873ff)] group-hover:text-white transition-colors" />}
                iconPosition="left"
                showDefaultIcon={false}
              >
                Save Channel
              </PillButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
