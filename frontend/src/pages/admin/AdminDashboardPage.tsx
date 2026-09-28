import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminApi } from '../../api/client';
import { CaseStudy, Article, LeadInquiry, SocialLink, JobPosition, JobApplication } from '../../types';
import { AdminSidebar, AdminTab } from './components/AdminSidebar';
import { AdminHeader } from './components/AdminHeader';
import { AdminOverview } from './components/AdminOverview';
import { CaseStudiesManager } from './components/CaseStudiesManager';
import { ArticlesManager } from './components/ArticlesManager';
import { JobsManager } from './components/JobsManager';
import { JobApplicationsManager } from './components/JobApplicationsManager';
import { InquiriesManager } from './components/InquiriesManager';
import { SocialLinksManager } from './components/SocialLinksManager';
import { useToast } from '../../context/ToastContext';
import { X, Save, Image as ImageIcon } from 'lucide-react';
import { ImageUploader } from '../../components/common/ImageUploader';

export const AdminDashboardPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [selectedInquiry, setSelectedInquiry] = useState<LeadInquiry | null>(null);
  const [roleFilterForApplications, setRoleFilterForApplications] = useState('');

  const queryClient = useQueryClient();
  const { toast } = useToast();

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

  const { data: jobs = [] } = useQuery<JobPosition[]>({
    queryKey: ['adminJobs'],
    queryFn: () => adminApi.getAllJobs(),
  });

  const { data: applications = [] } = useQuery<JobApplication[]>({
    queryKey: ['adminApplications'],
    queryFn: () => adminApi.getAllApplications(),
  });

  // Modal States
  const [isCaseModalOpen, setIsCaseModalOpen] = useState(false);
  const [editingCase, setEditingCase] = useState<Partial<CaseStudy>>({
    title: '',
    slug: '',
    subtitle: '',
    clientName: '',
    category: 'Enterprise Solutions',
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
    authorName: 'PrabhaTech Research Team',
    category: 'AI & Enterprise Tech',
    readTime: '5 min read',
    featured: true,
  });

  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<Partial<JobPosition>>({
    title: '',
    slug: '',
    department: 'Engineering',
    location: 'Dubai, UAE',
    jobType: 'Full-time',
    experience: '3+ Years',
    description: '',
    skills: [],
    featured: false,
    isActive: true,
    displayOrder: 1,
  });
  const [skillsInput, setSkillsInput] = useState('');

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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminCaseStudies'] });
      toast.info('Case Study Deleted', 'The portfolio item has been removed.');
    },
    onError: () => toast.error('Error', 'Failed to delete case study.'),
  });

  const saveCaseMutation = useMutation({
    mutationFn: (data: Partial<CaseStudy>) => adminApi.saveCaseStudy(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminCaseStudies'] });
      setIsCaseModalOpen(false);
      toast.success('Case Study Saved', 'Portfolio changes are now live across the platform.');
    },
    onError: (err: any) => {
      toast.error('Failed to save Case Study', err.response?.data?.message || 'Check required fields.');
    },
  });

  const deleteArticleMutation = useMutation({
    mutationFn: (id: number) => adminApi.deleteArticle(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminArticles'] });
      toast.info('Article Deleted', 'The article has been permanently un-published.');
    },
    onError: () => toast.error('Error', 'Failed to delete article.'),
  });

  const saveArticleMutation = useMutation({
    mutationFn: (data: Partial<Article>) => adminApi.saveArticle(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminArticles'] });
      setIsArticleModalOpen(false);
      toast.success('Article Saved', 'Article publication updated successfully.');
    },
    onError: (err: any) => {
      toast.error('Failed to save Article', err.response?.data?.message || 'Check required fields.');
    },
  });

  const updateInquiryStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: number; status: string }) =>
      adminApi.updateInquiryStatus(id, status),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['adminInquiries'] });
      toast.success('Status Updated', `Lead inquiry status changed to ${variables.status}.`);
    },
    onError: () => toast.error('Error', 'Failed to update inquiry status.'),
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
      toast.success('Social Channel Updated', 'Social footer & channels live synchronized.');
    },
    onError: (err: any) => {
      toast.error('Failed to save Social Channel', err.response?.data?.message || 'Invalid URL or payload.');
    },
  });

  const deleteSocialMutation = useMutation({
    mutationFn: (id: number) => adminApi.deleteSocialLink(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminSocialLinks'] });
      queryClient.invalidateQueries({ queryKey: ['socialLinks'] });
      toast.info('Social Channel Removed', 'The social channel is no longer active.');
    },
    onError: () => toast.error('Error', 'Failed to delete social channel.'),
  });

  const saveJobMutation = useMutation({
    mutationFn: (data: Partial<JobPosition>) => adminApi.saveJob(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminJobs'] });
      queryClient.invalidateQueries({ queryKey: ['publicJobs'] });
      setIsJobModalOpen(false);
      toast.success('Job Role Saved', 'Open position is updated and synchronized.');
    },
    onError: (err: any) => {
      toast.error('Failed to save Job Role', err.response?.data?.message || 'Check required fields.');
    },
  });

  const deleteJobMutation = useMutation({
    mutationFn: (id: number) => adminApi.deleteJob(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminJobs'] });
      queryClient.invalidateQueries({ queryKey: ['publicJobs'] });
      toast.info('Job Role Removed', 'The position has been removed from careers.');
    },
    onError: () => toast.error('Error', 'Failed to delete job position.'),
  });

  const updateAppStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: number; status: string }) =>
      adminApi.updateApplicationStatus(id, status),
    onSuccess: (_, vars) => {
      queryClient.invalidateQueries({ queryKey: ['adminApplications'] });
      toast.success('Stage Updated', `Candidate moved to ${vars.status}.`);
    },
    onError: () => toast.error('Error', 'Failed to update application status.'),
  });

  const deleteAppMutation = useMutation({
    mutationFn: (id: number) => adminApi.deleteApplication(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminApplications'] });
      toast.info('Application Removed', 'Candidate application removed from pipeline.');
    },
    onError: () => toast.error('Error', 'Failed to delete application.'),
  });

  // Modal Triggers
  const handleQuickCreate = (type: 'case' | 'article' | 'job' | 'social') => {
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
    } else if (type === 'job') {
      setEditingJob({
        title: '',
        slug: '',
        department: 'Engineering',
        location: 'Dubai, UAE',
        jobType: 'Full-time',
        experience: '3+ Years',
        description: '',
        skills: ['TypeScript', 'React', 'Node.js'],
        featured: false,
        isActive: true,
        displayOrder: jobs.length + 1,
      });
      setSkillsInput('TypeScript, React, Node.js');
      setIsJobModalOpen(true);
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
  const newApplicationsCount = applications.filter((a) => !a.status || a.status === 'NEW').length;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex">
      {/* Collapsible Left Sidebar */}
      <AdminSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
        counts={{
          caseStudies: caseStudies.length,
          articles: articles.length,
          jobs: jobs.length,
          applications: applications.length,
          newApplications: newApplicationsCount,
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

          {activeTab === 'jobs' && (
            <JobsManager
              jobs={jobs}
              applications={applications}
              onSelectRoleFilter={(jobTitle) => {
                setRoleFilterForApplications(jobTitle);
                setActiveTab('job-applications');
              }}
              onOpenCreate={() => handleQuickCreate('job')}
              onOpenEdit={(job) => {
                setEditingJob(job);
                setSkillsInput((job.skills || []).join(', '));
                setIsJobModalOpen(true);
              }}
              onDelete={(id) => deleteJobMutation.mutate(id)}
              onToggleActive={(job) =>
                saveJobMutation.mutate({ ...job, isActive: !job.isActive })
              }
            />
          )}

          {activeTab === 'job-applications' && (
            <JobApplicationsManager
              applications={applications}
              initialRoleFilter={roleFilterForApplications}
              onUpdateStatus={(id, status) => updateAppStatusMutation.mutate({ id, status })}
              onDelete={(id) => deleteAppMutation.mutate(id)}
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto space-y-4 shadow-2xl">
            <div className="flex justify-between items-center pb-4 border-b border-slate-100">
              <h3 className="text-xl font-bold text-slate-900">
                {editingCase.id ? 'Edit Case Study' : 'Create New Case Study'}
              </h3>
              <button
                onClick={() => setIsCaseModalOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Title *</label>
                <input
                  type="text"
                  value={editingCase.title || ''}
                  onChange={(e) => {
                    const title = e.target.value;
                    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                    setEditingCase({ ...editingCase, title, slug: editingCase.id ? editingCase.slug : slug });
                  }}
                  className="w-full p-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Slug *</label>
                <input
                  type="text"
                  value={editingCase.slug || ''}
                  onChange={(e) => setEditingCase({ ...editingCase, slug: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Client Name *</label>
                <input
                  type="text"
                  value={editingCase.clientName || ''}
                  onChange={(e) => setEditingCase({ ...editingCase, clientName: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Category *</label>
                <select
                  value={editingCase.category || 'Enterprise Solutions'}
                  onChange={(e) => setEditingCase({ ...editingCase, category: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/20"
                >
                  <option value="Enterprise Solutions">Enterprise Solutions</option>
                  <option value="AI & Analytics">AI & Analytics</option>
                  <option value="Cloud Architecture">Cloud Architecture</option>
                  <option value="Mobile Engineering">Mobile Engineering</option>
                  <option value="Fintech & Banking">Fintech & Banking</option>
                </select>
              </div>
            </div>

            <ImageUploader
              label="Hero Image"
              value={editingCase.heroImageUrl || ''}
              onChange={(url) => setEditingCase({ ...editingCase, heroImageUrl: url })}
              required
            />

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Video URL (Optional)</label>
              <input
                type="text"
                value={editingCase.videoUrl || ''}
                onChange={(e) => setEditingCase({ ...editingCase, videoUrl: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/20"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Executive Summary *</label>
              <textarea
                rows={3}
                value={editingCase.summary || ''}
                onChange={(e) => setEditingCase({ ...editingCase, summary: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 text-xs resize-none focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/20"
              ></textarea>
            </div>

            <div className="flex items-center pt-2">
              <label className="flex items-center gap-2 text-xs font-semibold text-slate-800 cursor-pointer">
                <input
                  type="checkbox"
                  checked={editingCase.featured !== false}
                  onChange={(e) => setEditingCase({ ...editingCase, featured: e.target.checked })}
                  className="w-4 h-4 rounded border-slate-300 text-amber-600 focus:ring-0"
                />
                <span>Feature on Homepage Portfolio</span>
              </label>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                onClick={() => setIsCaseModalOpen(false)}
                className="py-2 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => saveCaseMutation.mutate(editingCase)}
                className="py-2 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-xs flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <Save className="w-3.5 h-3.5 text-slate-950" />
                <span>Save Case Study</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Article Modal */}
      {isArticleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto space-y-4 shadow-2xl">
            <div className="flex justify-between items-center pb-4 border-b border-slate-100">
              <h3 className="text-xl font-bold text-slate-900">
                {editingArticle.id ? 'Edit Article' : 'Create New Article'}
              </h3>
              <button
                onClick={() => setIsArticleModalOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Title *</label>
                <input
                  type="text"
                  value={editingArticle.title || ''}
                  onChange={(e) => {
                    const title = e.target.value;
                    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                    setEditingArticle({ ...editingArticle, title, slug: editingArticle.id ? editingArticle.slug : slug });
                  }}
                  className="w-full p-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Slug *</label>
                <input
                  type="text"
                  value={editingArticle.slug || ''}
                  onChange={(e) => setEditingArticle({ ...editingArticle, slug: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Author Name *</label>
                <input
                  type="text"
                  value={editingArticle.authorName || ''}
                  onChange={(e) => setEditingArticle({ ...editingArticle, authorName: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Category *</label>
                <input
                  type="text"
                  value={editingArticle.category || ''}
                  onChange={(e) => setEditingArticle({ ...editingArticle, category: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/20"
                />
              </div>
            </div>

            <ImageUploader
              label="Cover Image"
              value={editingArticle.coverImageUrl || ''}
              onChange={(url) => setEditingArticle({ ...editingArticle, coverImageUrl: url })}
              required
            />

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Excerpt / Summary *</label>
              <textarea
                rows={3}
                value={editingArticle.excerpt || ''}
                onChange={(e) => setEditingArticle({ ...editingArticle, excerpt: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 text-xs resize-none focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/20"
              ></textarea>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Full Body Content *</label>
              <textarea
                rows={6}
                value={editingArticle.content || ''}
                onChange={(e) => setEditingArticle({ ...editingArticle, content: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/20"
              ></textarea>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                onClick={() => setIsArticleModalOpen(false)}
                className="py-2 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => saveArticleMutation.mutate(editingArticle)}
                className="py-2 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-xs flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <Save className="w-3.5 h-3.5 text-slate-950" />
                <span>Save Article</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Social Modal */}
      {isSocialModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-lg p-6 sm:p-8 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center pb-4 border-b border-slate-100">
              <h3 className="text-xl font-bold text-slate-900">
                {editingSocial.id ? 'Edit Social Channel' : 'Add Social Channel'}
              </h3>
              <button
                onClick={() => setIsSocialModalOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Platform *</label>
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
                      twitter_x: '#0F172A',
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
                  className="w-full p-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/20"
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
                <label className="block text-xs font-semibold text-slate-600 mb-1">Display Name *</label>
                <input
                  type="text"
                  value={editingSocial.platformName || ''}
                  onChange={(e) => setEditingSocial({ ...editingSocial, platformName: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Target Profile URL *</label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={editingSocial.url || ''}
                  onChange={(e) => setEditingSocial({ ...editingSocial, url: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Display Order</label>
                  <input
                    type="number"
                    value={editingSocial.displayOrder || 1}
                    onChange={(e) =>
                      setEditingSocial({
                        ...editingSocial,
                        displayOrder: parseInt(e.target.value, 10) || 1,
                      })
                    }
                    className="w-full p-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/20"
                  />
                </div>

                <div className="flex items-center pt-5">
                  <label className="flex items-center gap-2 text-xs font-semibold text-slate-800 cursor-pointer">
                    <input
                  type="checkbox"
                  checked={editingSocial.isActive !== false}
                  onChange={(e) => setEditingSocial({ ...editingSocial, isActive: e.target.checked })}
                  className="w-4 h-4 rounded border-slate-300 text-amber-600 focus:ring-0"
                />
                    <span>Active Channel</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                onClick={() => setIsSocialModalOpen(false)}
                className="py-2 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => saveSocialMutation.mutate(editingSocial)}
                disabled={!editingSocial.url}
                className="py-2 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-xs flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-50"
              >
                <Save className="w-3.5 h-3.5 text-slate-950" />
                <span>Save Channel</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 4. MODAL: JOB POSITION CREATE / EDIT */}
      {/* ========================================================= */}
      {isJobModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 space-y-6 my-8 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 block">
                  Talent Acquisition
                </span>
                <h3 className="text-lg font-bold text-slate-900">
                  {editingJob.id ? 'Edit Job Opening' : 'Post New Job Opening'}
                </h3>
              </div>
              <button
                onClick={() => setIsJobModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-1 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Job Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Senior Full-Stack AI Engineer"
                    value={editingJob.title || ''}
                    onChange={(e) => {
                      const title = e.target.value;
                      const slug = title
                        .toLowerCase()
                        .replace(/[^a-z0-9]+/g, '-')
                        .replace(/(^-|-$)+/g, '');
                      setEditingJob({ ...editingJob, title, slug: editingJob.id ? editingJob.slug : slug });
                    }}
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-amber-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Slug / URL Path *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="senior-full-stack-ai-engineer"
                    value={editingJob.slug || ''}
                    onChange={(e) => setEditingJob({ ...editingJob, slug: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-amber-500 focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Department *
                  </label>
                  <select
                    value={editingJob.department || 'Engineering'}
                    onChange={(e) => setEditingJob({ ...editingJob, department: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-amber-500 focus:bg-white"
                  >
                    <option>Engineering</option>
                    <option>AI & Data</option>
                    <option>Mobile Apps</option>
                    <option>IoT & Automation</option>
                    <option>Managed Services</option>
                    <option>Sales & Business Development</option>
                    <option>Product & Design</option>
                    <option>HR & Operations</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Location *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Dubai, UAE or Remote"
                    value={editingJob.location || ''}
                    onChange={(e) => setEditingJob({ ...editingJob, location: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-amber-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Job Type *
                  </label>
                  <select
                    value={editingJob.jobType || 'Full-time'}
                    onChange={(e) => setEditingJob({ ...editingJob, jobType: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-amber-500 focus:bg-white"
                  >
                    <option>Full-time</option>
                    <option>Part-time</option>
                    <option>Contract</option>
                    <option>Internship</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Required Experience
                </label>
                <input
                  type="text"
                  placeholder="e.g. 5+ Years, Mid-Senior level"
                  value={editingJob.experience || ''}
                  onChange={(e) => setEditingJob({ ...editingJob, experience: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-amber-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Role Description & Scope *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Describe key responsibilities, deliverables, and role expectations..."
                  value={editingJob.description || ''}
                  onChange={(e) => setEditingJob({ ...editingJob, description: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-amber-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Required Skills (Comma-separated)
                </label>
                <input
                  type="text"
                  placeholder="e.g. React, Spring Boot, PostgreSQL, Docker"
                  value={skillsInput}
                  onChange={(e) => {
                    setSkillsInput(e.target.value);
                    const skillsArray = e.target.value
                      .split(',')
                      .map((s) => s.trim())
                      .filter(Boolean);
                    setEditingJob({ ...editingJob, skills: skillsArray });
                  }}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-amber-500 focus:bg-white"
                />
                {editingJob.skills && editingJob.skills.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {editingJob.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-amber-50 border border-amber-200 text-amber-800"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-100">
                <label className="flex items-center gap-2 text-xs font-semibold text-slate-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingJob.featured || false}
                    onChange={(e) => setEditingJob({ ...editingJob, featured: e.target.checked })}
                    className="w-4 h-4 rounded border-slate-300 text-amber-600 focus:ring-0"
                  />
                  <span>Mark as Featured Position</span>
                </label>

                <label className="flex items-center gap-2 text-xs font-semibold text-slate-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingJob.isActive !== false}
                    onChange={(e) => setEditingJob({ ...editingJob, isActive: e.target.checked })}
                    className="w-4 h-4 rounded border-slate-300 text-amber-600 focus:ring-0"
                  />
                  <span>Active Opening (Visible to Applicants)</span>
                </label>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                onClick={() => setIsJobModalOpen(false)}
                className="py-2 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => saveJobMutation.mutate(editingJob)}
                disabled={!editingJob.title || !editingJob.description}
                className="py-2 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-xs flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-50"
              >
                <Save className="w-3.5 h-3.5 text-slate-950" />
                <span>Save Role</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
