export interface MetricItem {
  label: string;
  description: string;
}

export interface CaseStudy {
  id?: number;
  slug: string;
  title: string;
  subtitle?: string;
  clientName: string;
  category: string;
  heroImageUrl: string;
  thumbnailUrl?: string;
  videoUrl?: string;
  summary: string;
  challenge?: string;
  solution?: string;
  results?: string;
  awards?: string[];
  metrics?: MetricItem[];
  tags?: string[];
  featured?: boolean;
  displayOrder?: number;
  isPublished?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface ServiceItem {
  id?: number;
  slug: string;
  title: string;
  tagline?: string;
  icon: string;
  shortDescription: string;
  fullDescription?: string;
  deliverables?: string[];
  displayOrder?: number;
  isActive?: boolean;
}

export interface Article {
  id?: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImageUrl: string;
  authorName: string;
  authorAvatar?: string;
  category: string;
  readTime?: string;
  tags?: string[];
  featured?: boolean;
  isPublished?: boolean;
  createdAt?: string;
}

export interface LeadInquiry {
  id?: number;
  fullName: string;
  email: string;
  companyName?: string;
  phoneNumber?: string;
  projectType?: string;
  budgetRange?: string;
  message: string;
  status?: string;
  createdAt?: string;
}

export interface AuthResponse {
  token: string;
  tokenType: string;
  username: string;
  fullName: string;
  role: string;
  expiresInMs: number;
}

export interface SocialLink {
  id?: number;
  platformKey: string;
  platformName: string;
  url: string;
  bgColor: string;
  displayOrder?: number;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface HeroConfig {
  id?: number;
  configKey?: string;
  subHeadline: string;
  headlinePrefix: string;
  headlineHighlight: string;
  headlineSuffix: string;
  ctaText: string;
  ctaLink: string;
  videoUrl: string;
  posterUrl: string;
  updatedAt?: string;
}


