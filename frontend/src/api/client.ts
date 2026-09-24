import axios, { AxiosInstance } from 'axios';
import { CaseStudy, ServiceItem, Article, LeadInquiry, AuthResponse, SocialLink, HeroConfig } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api/v1';

// 1. Unauthenticated Public Client (Used for public pages and Login)
export const publicClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 2. Authenticated Admin Client (Used exclusively for CMS Admin operations)
export const adminClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach Authorization Bearer token to admin requests
adminClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('prabhatech_token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 Unauthorized / session expiration on admin requests
adminClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      if (window.location.pathname.startsWith('/admin') && window.location.pathname !== '/admin/login') {
        localStorage.removeItem('prabhatech_token');
        localStorage.removeItem('prabhatech_user');
      }
    }
    return Promise.reject(error);
  }
);

// ==========================================
// Public API Services
// ==========================================
export const publicApi = {
  getSocialLinks: async (): Promise<SocialLink[]> => {
    const res = await publicClient.get('/public/social-links');
    return res.data;
  },

  getCaseStudies: async (category?: string, featured?: boolean): Promise<CaseStudy[]> => {
    const params: Record<string, any> = {};
    if (category && category !== 'All') params.category = category;
    if (featured) params.featured = true;
    const res = await publicClient.get('/public/case-studies', { params });
    return res.data;
  },

  getCaseStudyBySlug: async (slug: string): Promise<CaseStudy> => {
    const res = await publicClient.get(`/public/case-studies/${slug}`);
    return res.data;
  },

  getServices: async (): Promise<ServiceItem[]> => {
    const res = await publicClient.get('/public/services');
    return res.data;
  },

  getArticleBySlug: async (slug: string): Promise<Article> => {
    const res = await publicClient.get(`/public/articles/${slug}`);
    return res.data;
  },

  getArticles: async (category?: string, featured?: boolean): Promise<Article[]> => {
    const params: Record<string, any> = {};
    if (category && category !== 'All') params.category = category;
    if (featured) params.featured = true;
    const res = await publicClient.get('/public/articles', { params });
    return res.data;
  },

  submitInquiry: async (inquiry: LeadInquiry): Promise<LeadInquiry> => {
    const res = await publicClient.post('/public/inquiries', inquiry);
    return res.data;
  },

  getHeroConfig: async (): Promise<HeroConfig> => {
    const res = await publicClient.get('/public/hero-config');
    return res.data;
  },
};

// ==========================================
// Admin CMS API Services
// ==========================================
export const adminApi = {
  // Authentication Login uses the clean unauthenticated publicClient
  login: async (credentials: { username: string; password: string }): Promise<AuthResponse> => {
    const res = await publicClient.post('/auth/login', credentials);
    return res.data;
  },

  // Hero Section CMS
  getHeroConfig: async (): Promise<HeroConfig> => {
    const res = await adminClient.get('/admin/hero-config');
    return res.data;
  },

  updateHeroConfig: async (data: Partial<HeroConfig>): Promise<HeroConfig> => {
    const res = await adminClient.put('/admin/hero-config', data);
    return res.data;
  },

  // Social Links CMS
  getAllSocialLinks: async (): Promise<SocialLink[]> => {
    const res = await adminClient.get('/admin/social-links');
    return res.data;
  },

  createSocialLink: async (data: Partial<SocialLink>): Promise<SocialLink> => {
    const res = await adminClient.post('/admin/social-links', data);
    return res.data;
  },

  updateSocialLink: async (id: number, data: Partial<SocialLink>): Promise<SocialLink> => {
    const res = await adminClient.put(`/admin/social-links/${id}`, data);
    return res.data;
  },

  deleteSocialLink: async (id: number): Promise<void> => {
    await adminClient.delete(`/admin/social-links/${id}`);
  },

  // Case Studies CMS
  getAllCaseStudies: async (): Promise<CaseStudy[]> => {
    const res = await adminClient.get('/admin/case-studies');
    return res.data;
  },

  saveCaseStudy: async (data: Partial<CaseStudy>): Promise<CaseStudy> => {
    const res = await adminClient.post('/admin/case-studies', data);
    return res.data;
  },

  deleteCaseStudy: async (id: number): Promise<void> => {
    await adminClient.delete(`/admin/case-studies/${id}`);
  },

  // Services CMS
  getAllServices: async (): Promise<ServiceItem[]> => {
    const res = await adminClient.get('/admin/services');
    return res.data;
  },

  saveService: async (data: Partial<ServiceItem>): Promise<ServiceItem> => {
    const res = await adminClient.post('/admin/services', data);
    return res.data;
  },

  deleteService: async (id: number): Promise<void> => {
    await adminClient.delete(`/admin/services/${id}`);
  },

  // Articles CMS
  getAllArticles: async (): Promise<Article[]> => {
    const res = await adminClient.get('/admin/articles');
    return res.data;
  },

  saveArticle: async (data: Partial<Article>): Promise<Article> => {
    const res = await adminClient.post('/admin/articles', data);
    return res.data;
  },

  deleteArticle: async (id: number): Promise<void> => {
    await adminClient.delete(`/admin/articles/${id}`);
  },

  // Inquiries CMS
  getAllInquiries: async (status?: string): Promise<LeadInquiry[]> => {
    const params = status ? { status } : {};
    const res = await adminClient.get('/admin/inquiries', { params });
    return res.data;
  },

  updateInquiryStatus: async (id: number, status: string): Promise<LeadInquiry> => {
    const res = await adminClient.patch(`/admin/inquiries/${id}/status`, null, {
      params: { status },
    });
    return res.data;
  },

  deleteInquiry: async (id: number): Promise<void> => {
    await adminClient.delete(`/admin/inquiries/${id}`);
  },
};

export default adminClient;


