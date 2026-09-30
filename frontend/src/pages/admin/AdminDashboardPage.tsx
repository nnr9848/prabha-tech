import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminApi } from '../../api/client';
import { CaseStudy, Article, LeadInquiry, SocialLink, JobPosition, JobApplication, ServiceItem, NavItem } from '../../types';
import { AdminSidebar, AdminTab } from './components/AdminSidebar';
import { AdminHeader } from './components/AdminHeader';
import { AdminOverview } from './components/AdminOverview';
import { ServicesManager, renderServiceIcon } from './components/ServicesManager';
import { NavItemsManager } from './components/NavItemsManager';
import { CaseStudiesManager } from './components/CaseStudiesManager';
import { ArticlesManager } from './components/ArticlesManager';
import { JobsManager } from './components/JobsManager';
import { JobApplicationsManager } from './components/JobApplicationsManager';
import { InquiriesManager } from './components/InquiriesManager';
import { SocialLinksManager } from './components/SocialLinksManager';
import { AdminTrashHub } from './components/AdminTrashHub';
import { useToast } from '../../context/ToastContext';
import { X, Save, Image as ImageIcon, ExternalLink } from 'lucide-react';
import { ImageUploader } from '../../components/common/ImageUploader';

const VALID_TABS: AdminTab[] = [
  'overview',
  'services',
  'case-studies',
  'articles',
  'jobs',
  'job-applications',
  'inquiries',
  'social-links',
  'nav-items',
  'trash',
];

export const AdminDashboardPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Read initial tab and role from URL search parameters
  const tabFromUrl = searchParams.get('tab') as AdminTab;
  const initialTab: AdminTab = VALID_TABS.includes(tabFromUrl) ? tabFromUrl : 'overview';

  const [activeTab, setActiveTabState] = useState<AdminTab>(initialTab);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedInquiry, setSelectedInquiry] = useState<LeadInquiry | null>(null);
  const [roleFilterForApplications, setRoleFilterForApplications] = useState(
    searchParams.get('role') || ''
  );

  // Sync state if URL changes (e.g. back/forward navigation)
  useEffect(() => {
    const currentUrlTab = searchParams.get('tab') as AdminTab;
    if (currentUrlTab && VALID_TABS.includes(currentUrlTab) && currentUrlTab !== activeTab) {
      setActiveTabState(currentUrlTab);
    }
    const currentUrlRole = searchParams.get('role') || '';
    if (currentUrlRole !== roleFilterForApplications) {
      setRoleFilterForApplications(currentUrlRole);
    }
  }, [searchParams]);

  // Tab switch handler that keeps URL search parameters in sync
  const handleTabChange = (tab: AdminTab, optionalRole?: string) => {
    setActiveTabState(tab);
    const newParams: Record<string, string> = {};
    if (tab !== 'overview') {
      newParams.tab = tab;
    }
    if (optionalRole !== undefined) {
      setRoleFilterForApplications(optionalRole);
      if (optionalRole) {
        newParams.role = optionalRole;
      }
    } else if (tab === 'job-applications' && roleFilterForApplications) {
      newParams.role = roleFilterForApplications;
    } else {
      setRoleFilterForApplications('');
    }
    setSearchParams(newParams, { replace: false });
  };

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

  const { data: services = [] } = useQuery<ServiceItem[]>({
    queryKey: ['adminServices'],
    queryFn: () => adminApi.getAllServices(),
  });

  const { data: socialLinks = [] } = useQuery<SocialLink[]>({
    queryKey: ['adminSocialLinks'],
    queryFn: () => adminApi.getAllSocialLinks(),
  });

  const { data: navItems = [] } = useQuery<NavItem[]>({
    queryKey: ['adminNavItems'],
    queryFn: () => adminApi.getAllNavItems(),
  });

  const { data: jobs = [] } = useQuery<JobPosition[]>({
    queryKey: ['adminJobs'],
    queryFn: () => adminApi.getAllJobs(),
  });

  const { data: applications = [] } = useQuery<JobApplication[]>({
    queryKey: ['adminApplications'],
    queryFn: () => adminApi.getAllApplications(),
  });

  const { data: trashCount = 0 } = useQuery<number>({
    queryKey: ['adminTrashCount'],
    queryFn: () => adminApi.getTrashCount(),
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

  const [isNavModalOpen, setIsNavModalOpen] = useState(false);
  const [editingNavItem, setEditingNavItem] = useState<Partial<NavItem>>({
    label: '',
    path: '',
    displayOrder: 1,
    isExternal: false,
    isActive: true,
  });

  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Partial<ServiceItem>>({
    title: '',
    slug: '',
    tagline: '',
    icon: 'Code2',
    shortDescription: '',
    fullDescription: '',
    deliverables: [],
    displayOrder: 1,
    isActive: true,
  });
  const [deliverablesInput, setDeliverablesInput] = useState('');

  // Auto-open edit modal if ?edit=<id> is present in the URL
  useEffect(() => {
    const editId = searchParams.get('edit');
    if (!editId) return;

    const idNum = Number(editId);
    if (activeTab === 'case-studies' && caseStudies.length > 0) {
      const match = caseStudies.find((c) => c.id === idNum);
      if (match) {
        setEditingCase(match);
        setIsCaseModalOpen(true);
      }
    } else if (activeTab === 'articles' && articles.length > 0) {
      const match = articles.find((a) => a.id === idNum);
      if (match) {
        setEditingArticle(match);
        setIsArticleModalOpen(true);
      }
    } else if (activeTab === 'jobs' && jobs.length > 0) {
      const match = jobs.find((j) => j.id === idNum);
      if (match) {
        setEditingJob(match);
        setSkillsInput((match.skills || []).join(', '));
        setIsJobModalOpen(true);
      }
    } else if (activeTab === 'services' && services.length > 0) {
      const match = services.find((s) => s.id === idNum);
      if (match) {
        setEditingService(match);
        setDeliverablesInput('');
        setIsServiceModalOpen(true);
      }
    }
  }, [searchParams, activeTab, caseStudies, articles, jobs, services]);

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

  const saveServiceMutation = useMutation({
    mutationFn: (data: Partial<ServiceItem>) => adminApi.saveService(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminServices'] });
      queryClient.invalidateQueries({ queryKey: ['publicServices'] });
      setIsServiceModalOpen(false);
      toast.success('Service Saved', 'Enterprise service updated and live on public site.');
    },
    onError: (err: any) => {
      toast.error('Failed to save Service', err.response?.data?.message || 'Check required fields.');
    },
  });

  const deleteServiceMutation = useMutation({
    mutationFn: (id: number) => adminApi.deleteService(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminServices'] });
      queryClient.invalidateQueries({ queryKey: ['publicServices'] });
      toast.info('Service Deleted', 'The service has been removed.');
    },
    onError: () => toast.error('Error', 'Failed to delete service.'),
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

  const deleteInquiryMutation = useMutation({
    mutationFn: (id: number) => adminApi.deleteInquiry(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminInquiries'] });
      toast.info('Inquiry Removed', 'Inquiry record permanently removed.');
    },
    onError: () => toast.error('Error', 'Failed to delete inquiry.'),
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

  const saveNavItemMutation = useMutation({
    mutationFn: (data: Partial<NavItem>) => adminApi.saveNavItem(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminNavItems'] });
      queryClient.invalidateQueries({ queryKey: ['publicNavItems'] });
      setIsNavModalOpen(false);
      toast.success('Navigation Item Saved', 'Public navbar & mobile menu updated.');
    },
    onError: (err: any) => {
      toast.error('Failed to save Menu Item', err.response?.data?.message || 'Check required fields.');
    },
  });

  const deleteNavItemMutation = useMutation({
    mutationFn: (id: number) => adminApi.deleteNavItem(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminNavItems'] });
      queryClient.invalidateQueries({ queryKey: ['publicNavItems'] });
      toast.info('Menu Item Removed', 'The navigation link has been deleted.');
    },
    onError: () => toast.error('Error', 'Failed to delete menu item.'),
  });

  const reorderNavItemsMutation = useMutation({
    mutationFn: (items: NavItem[]) => adminApi.reorderNavItems(items),
    onMutate: async (newItems: NavItem[]) => {
      await queryClient.cancelQueries({ queryKey: ['adminNavItems'] });
      const previousNav = queryClient.getQueryData<NavItem[]>(['adminNavItems']);
      queryClient.setQueryData<NavItem[]>(['adminNavItems'], newItems);
      return { previousNav };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminNavItems'] });
      queryClient.invalidateQueries({ queryKey: ['publicNavItems'] });
      toast.success('Menu Reordered', 'New navigation sequence saved and synchronized.');
    },
    onError: (_err, _vars, context) => {
      if (context?.previousNav) {
        queryClient.setQueryData(['adminNavItems'], context.previousNav);
      }
      toast.error('Reorder Failed', 'Could not save new menu order. Please try again.');
    },
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
  const handleQuickCreate = (type: 'case' | 'article' | 'job' | 'social' | 'service') => {
    if (type === 'service') {
      setEditingService({
        title: '',
        slug: '',
        tagline: '',
        icon: 'Code2',
        shortDescription: '',
        fullDescription: '',
        deliverables: ['Custom Web Applications', 'Cloud Architecture', 'API Integrations'],
        displayOrder: services.length + 1,
        isActive: true,
      });
      setDeliverablesInput('Custom Web Applications, Cloud Architecture, API Integrations');
      setIsServiceModalOpen(true);
    } else if (type === 'case') {
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
        setActiveTab={handleTabChange}
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
        isMobileOpen={isMobileMenuOpen}
        setIsMobileOpen={setIsMobileMenuOpen}
        counts={{
          services: services.length,
          caseStudies: caseStudies.length,
          articles: articles.length,
          jobs: jobs.length,
          applications: applications.length,
          newApplications: newApplicationsCount,
          inquiries: inquiries.length,
          newInquiries: newInquiriesCount,
          socialLinks: socialLinks.length,
          navItems: navItems.length,
          trash: trashCount,
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
          unreadApplicationsCount={newApplicationsCount}
          recentInquiries={inquiries.filter((i) => !i.status || i.status === 'NEW').slice(0, 5)}
          recentApplications={applications.filter((a) => !a.status || a.status === 'NEW').slice(0, 5)}
          onNavigateToInquiry={(inq) => {
            setSelectedInquiry(inq);
            handleTabChange('inquiries', undefined);
          }}
          onNavigateToApplications={() => {
            handleTabChange('job-applications', undefined);
          }}
          onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        />

        {/* Tab View Container */}
        <main className="flex-1 p-6 sm:p-8 max-w-7xl w-full mx-auto">
          {activeTab === 'overview' && (
            <AdminOverview
              caseStudies={caseStudies}
              articles={articles}
              inquiries={inquiries}
              socialLinks={socialLinks}
              onNavigateTab={(tab) => handleTabChange(tab)}
              onQuickCreate={handleQuickCreate}
              onSelectInquiry={(inq) => {
                setSelectedInquiry(inq);
                handleTabChange('inquiries');
              }}
            />
          )}

          {activeTab === 'services' && (
            <ServicesManager
              services={services}
              onOpenCreate={() => handleQuickCreate('service')}
              onOpenEdit={(service) => {
                setEditingService(service);
                setDeliverablesInput('');
                setIsServiceModalOpen(true);
              }}
              onDelete={(id) => deleteServiceMutation.mutate(id)}
              onToggleActive={(srv) =>
                saveServiceMutation.mutate({ ...srv, isActive: srv.isActive === false ? true : false })
              }
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
                handleTabChange('job-applications', jobTitle);
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
              onDelete={(id) => deleteInquiryMutation.mutate(id)}
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

          {activeTab === 'nav-items' && (
            <NavItemsManager
              navItems={navItems}
              onOpenCreate={() => {
                setEditingNavItem({
                  label: '',
                  path: '',
                  displayOrder: navItems.length + 1,
                  isExternal: false,
                  isActive: true,
                });
                setIsNavModalOpen(true);
              }}
              onOpenEdit={(item) => {
                setEditingNavItem(item);
                setIsNavModalOpen(true);
              }}
              onDelete={(id) => deleteNavItemMutation.mutate(id)}
              onToggleActive={(item) =>
                saveNavItemMutation.mutate({ ...item, isActive: item.isActive === false ? true : false })
              }
              onReorder={(items) => reorderNavItemsMutation.mutate(items)}
            />
          )}

          {activeTab === 'trash' && <AdminTrashHub />}
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

      {/* ========================================================= */}
      {/* 5. MODAL: ENTERPRISE SERVICE CREATE / EDIT (State-of-the-Art UX) */}
      {/* ========================================================= */}
      {isServiceModalOpen && (
        <div
          onClick={() => setIsServiceModalOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/60 backdrop-blur-xs cursor-pointer animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white border border-slate-200 rounded-2xl w-full max-w-2xl flex flex-col max-h-[92vh] shadow-2xl cursor-default overflow-hidden animate-in zoom-in-95 duration-200"
          >
            {/* 1. STICKY MODAL HEADER */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-white shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-600">
                  {renderServiceIcon(editingService.icon || 'Code2', 'w-5 h-5')}
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
                    {editingService.id ? `Edit Service: ${editingService.title || 'Enterprise Service'}` : 'Create New Enterprise Service'}
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Configure capabilities, technical deliverables, and public showcase parameters.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {editingService.slug && (
                  <a
                    href={`/services/${editingService.slug}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-amber-50 hover:text-amber-700 text-slate-600 text-xs font-semibold transition-colors cursor-pointer"
                    title="View live page in new tab"
                  >
                    <span>Live Page</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
                <button
                  onClick={() => setIsServiceModalOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                  title="Close Modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* 2. SCROLLABLE FORM BODY */}
            <div className="p-6 overflow-y-auto space-y-5 text-xs flex-1">
              {/* Row 1: Title & Slug */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-800 block mb-1">
                    Service Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Enterprise Software Development"
                    value={editingService.title || ''}
                    onChange={(e) => {
                      const title = e.target.value;
                      const slug = title
                        .toLowerCase()
                        .replace(/[^a-z0-9]+/g, '-')
                        .replace(/(^-|-$)+/g, '');
                      setEditingService({
                        ...editingService,
                        title,
                        slug: editingService.id ? editingService.slug : slug,
                      });
                    }}
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-amber-500 focus:bg-white focus:ring-1 focus:ring-amber-500/20 transition-all font-medium"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-semibold text-slate-800">
                      URL Slug Path <span className="text-red-500">*</span>
                    </label>
                    <span className="text-[10px] text-slate-400">Unique route</span>
                  </div>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[11px] text-slate-400 font-mono">
                      /services/
                    </span>
                    <input
                      type="text"
                      required
                      placeholder="enterprise-software"
                      value={editingService.slug || ''}
                      onChange={(e) => setEditingService({ ...editingService, slug: e.target.value })}
                      className="w-full pl-20 pr-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-mono focus:outline-none focus:border-amber-500 focus:bg-white focus:ring-1 focus:ring-amber-500/20 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Row 2: Tagline / Subtitle */}
              <div>
                <label className="text-xs font-semibold text-slate-800 block mb-1">
                  Tagline / Subtitle <span className="text-slate-400 font-normal">(Display badge on hero & overview)</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Scalable platforms, legacy modernization, and high-throughput systems"
                  value={editingService.tagline || ''}
                  onChange={(e) => setEditingService({ ...editingService, tagline: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-amber-500 focus:bg-white focus:ring-1 focus:ring-amber-500/20 transition-all"
                />
              </div>

              {/* Row 3: Icon Theme & Display Order */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-800 block mb-1">
                    Icon Theme Glyph
                  </label>
                  <select
                    value={editingService.icon || 'Code2'}
                    onChange={(e) => setEditingService({ ...editingService, icon: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-amber-500 focus:bg-white cursor-pointer"
                  >
                    <option value="Code2">⚡ Code2 (Custom Software & Full-Stack)</option>
                    <option value="Smartphone">📱 Smartphone (iOS & Android Apps)</option>
                    <option value="Cpu">🧠 Cpu (AI, Machine Learning & Analytics)</option>
                    <option value="Radio">📡 Radio (Industrial IoT & Smart Sensors)</option>
                    <option value="Box">🧊 Box (Metaverse, 3D & Digital Twins)</option>
                    <option value="Palette">🎨 Palette (UI/UX Design Systems)</option>
                    <option value="Cloud">☁️ Cloud (Cloud Architecture & DevOps)</option>
                    <option value="ShieldCheck">🛡️ ShieldCheck (Cybersecurity & Compliance)</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-800 block mb-1">
                    Display Sequence
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={editingService.displayOrder ?? 1}
                    onChange={(e) =>
                      setEditingService({ ...editingService, displayOrder: parseInt(e.target.value) || 1 })
                    }
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-amber-500 focus:bg-white"
                  />
                </div>
              </div>

              {/* Row 4: Service Cover / Hero Image Upload */}
              <div>
                <ImageUploader
                  label="Service Hero / Showcase Image"
                  value={editingService.heroImageUrl || ''}
                  onChange={(url) => setEditingService({ ...editingService, heroImageUrl: url })}
                />
              </div>

              {/* Row 4: Short Description */}
              <div>
                <label className="text-xs font-semibold text-slate-800 block mb-1">
                  Short Description <span className="text-red-500">*</span> <span className="text-slate-400 font-normal">(Executive summary for catalog cards)</span>
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="Summarize the core capability and client business value in 1-2 sentences..."
                  value={editingService.shortDescription || ''}
                  onChange={(e) => setEditingService({ ...editingService, shortDescription: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-amber-500 focus:bg-white focus:ring-1 focus:ring-amber-500/20 transition-all resize-none"
                />
              </div>

              {/* Row 5: Full Technical Scope */}
              <div>
                <label className="text-xs font-semibold text-slate-800 block mb-1">
                  Full Technical Scope & Methodologies <span className="text-slate-400 font-normal">(Displayed on dedicated service landing page)</span>
                </label>
                <textarea
                  rows={4}
                  placeholder="Provide comprehensive details about engineering architecture, methodologies, frameworks, and deployment strategies..."
                  value={editingService.fullDescription || ''}
                  onChange={(e) => setEditingService({ ...editingService, fullDescription: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-amber-500 focus:bg-white focus:ring-1 focus:ring-amber-500/20 transition-all"
                />
              </div>

              {/* Row 6: Interactive Deliverables Tag Builder */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-semibold text-slate-800">
                    Deliverables & Technical Capabilities
                  </label>
                  <span className="text-[10px] text-slate-400">
                    Type item & press Enter or comma
                  </span>
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="e.g. Cloud Native Microservices, 99.9% SLA, Zero-Trust RBAC"
                    value={deliverablesInput}
                    onChange={(e) => setDeliverablesInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ',') {
                        e.preventDefault();
                        const val = deliverablesInput.trim().replace(/^,+|,+$/g, '');
                        if (val) {
                          const currentList = editingService.deliverables || [];
                          if (!currentList.includes(val)) {
                            setEditingService({ ...editingService, deliverables: [...currentList, val] });
                          }
                          setDeliverablesInput('');
                        }
                      }
                    }}
                    className="flex-1 p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-amber-500 focus:bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const val = deliverablesInput.trim().replace(/^,+|,+$/g, '');
                      if (val) {
                        const currentList = editingService.deliverables || [];
                        if (!currentList.includes(val)) {
                          setEditingService({ ...editingService, deliverables: [...currentList, val] });
                        }
                        setDeliverablesInput('');
                      }
                    }}
                    className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
                  >
                    Add
                  </button>
                </div>

                {/* Rendered Interactive Tags */}
                {editingService.deliverables && editingService.deliverables.length > 0 ? (
                  <div className="flex flex-wrap gap-1.5 pt-2.5">
                    {editingService.deliverables.map((deliv, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-amber-500/10 border border-amber-500/30 text-amber-900 group"
                      >
                        <span>{deliv}</span>
                        <button
                          type="button"
                          onClick={() => {
                            const updated = (editingService.deliverables || []).filter((_, i) => i !== idx);
                            setEditingService({ ...editingService, deliverables: updated });
                          }}
                          className="w-3.5 h-3.5 rounded-full hover:bg-amber-600/20 inline-flex items-center justify-center text-amber-700 hover:text-amber-950 transition-colors cursor-pointer"
                        >
                          <X className="w-2.5 h-2.5" />
                        </button>
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-[11px] text-slate-400 pt-1 italic">
                    No deliverables added yet. Add key items clients will receive.
                  </p>
                )}
              </div>

              {/* Row 7: Visibility Toggle */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-slate-800 block">Service Status</span>
                  <span className="text-[11px] text-slate-500">
                    When active, this service appears in the header, capabilities strip, and service catalog.
                  </span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingService.isActive !== false}
                    onChange={(e) => setEditingService({ ...editingService, isActive: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
                </label>
              </div>
            </div>

            {/* 3. STICKY MODAL FOOTER */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 bg-slate-50/75 shrink-0">
              <div className="text-[11px] text-slate-500">
                <span className="text-red-500 font-bold">*</span> Required fields
              </div>
              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsServiceModalOpen(false)}
                  className="py-2 px-4 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 font-semibold text-xs transition-colors cursor-pointer shadow-2xs"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => saveServiceMutation.mutate(editingService)}
                  disabled={!editingService.title || !editingService.shortDescription || saveServiceMutation.isPending}
                  className="py-2 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-xs flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Save className="w-3.5 h-3.5 text-slate-950" />
                  <span>{saveServiceMutation.isPending ? 'Saving...' : 'Save Service'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Item Modal */}
      {isNavModalOpen && (
        <div
          onClick={() => setIsNavModalOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs cursor-pointer animate-in fade-in duration-150"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white border border-slate-200 rounded-2xl w-full max-w-lg p-6 sm:p-8 space-y-5 shadow-2xl cursor-default"
          >
            <div className="flex justify-between items-center pb-4 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 block">
                  Header & Navigation
                </span>
                <h3 className="text-base font-bold text-slate-900">
                  {editingNavItem.id ? 'Edit Navigation Link' : 'Add Navigation Link'}
                </h3>
              </div>
              <button
                onClick={() => setIsNavModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Menu Label *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Solutions, AI Platform, Partner"
                  value={editingNavItem.label || ''}
                  onChange={(e) => setEditingNavItem({ ...editingNavItem, label: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-amber-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Target Route / URL *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. /services, /about, or https://..."
                  value={editingNavItem.path || ''}
                  onChange={(e) => {
                    const pathVal = e.target.value;
                    const isExt = pathVal.startsWith('http://') || pathVal.startsWith('https://');
                    setEditingNavItem({
                      ...editingNavItem,
                      path: pathVal,
                      isExternal: isExt ? true : editingNavItem.isExternal,
                    });
                  }}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-mono focus:outline-none focus:border-amber-500 focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Display Order
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={editingNavItem.displayOrder ?? 1}
                    onChange={(e) =>
                      setEditingNavItem({
                        ...editingNavItem,
                        displayOrder: parseInt(e.target.value, 10) || 1,
                      })
                    }
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-amber-500 focus:bg-white"
                  />
                </div>

                <div className="flex flex-col justify-end">
                  <label className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editingNavItem.isExternal || false}
                      onChange={(e) =>
                        setEditingNavItem({ ...editingNavItem, isExternal: e.target.checked })
                      }
                      className="w-4 h-4 rounded border-slate-300 text-amber-600 focus:ring-0"
                    />
                    <span>Open in New Tab</span>
                  </label>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100">
                <label className="flex items-center gap-2 text-xs font-semibold text-slate-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingNavItem.isActive !== false}
                    onChange={(e) =>
                      setEditingNavItem({ ...editingNavItem, isActive: e.target.checked })
                    }
                    className="w-4 h-4 rounded border-slate-300 text-amber-600 focus:ring-0"
                  />
                  <span>Active Item (Visible in Header & Mobile Menu)</span>
                </label>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                onClick={() => setIsNavModalOpen(false)}
                className="py-2 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => saveNavItemMutation.mutate(editingNavItem)}
                disabled={!editingNavItem.label || !editingNavItem.path}
                className="py-2 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-xs flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-50"
              >
                <Save className="w-3.5 h-3.5 text-slate-950" />
                <span>Save Link</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
