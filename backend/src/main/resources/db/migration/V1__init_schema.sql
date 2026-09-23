-- =========================================================================
-- V1__init_schema.sql : Core Schema for PrabhaTech Full-Stack Platform & CMS
-- =========================================================================

-- 1. Users & RBAC for CMS Administration
CREATE TABLE IF NOT EXISTS users (
    id BIGSERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    email VARCHAR(150) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'ROLE_ADMIN',
    full_name VARCHAR(150),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Case Studies (PrabhaTech Portfolio)
CREATE TABLE IF NOT EXISTS case_studies (
    id BIGSERIAL PRIMARY KEY,
    slug VARCHAR(150) NOT NULL UNIQUE,
    title VARCHAR(255) NOT NULL,
    subtitle VARCHAR(255),
    client_name VARCHAR(150) NOT NULL,
    category VARCHAR(100) NOT NULL, -- e.g. Banking, Fintech, Crypto, Wealthtech, SaaS
    hero_image_url VARCHAR(500) NOT NULL,
    thumbnail_url VARCHAR(500),
    video_url VARCHAR(500),
    summary TEXT NOT NULL,
    challenge TEXT,
    solution TEXT,
    results TEXT,
    awards JSONB DEFAULT '[]'::jsonb,
    metrics JSONB DEFAULT '[]'::jsonb, -- e.g. [{"label": "+350%", "description": "Mobile Adoption"}]
    tags JSONB DEFAULT '[]'::jsonb,
    featured BOOLEAN DEFAULT FALSE,
    display_order INT DEFAULT 0,
    is_published BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Services / Capabilities
CREATE TABLE IF NOT EXISTS services (
    id BIGSERIAL PRIMARY KEY,
    slug VARCHAR(150) NOT NULL UNIQUE,
    title VARCHAR(255) NOT NULL,
    tagline VARCHAR(255),
    icon VARCHAR(100) NOT NULL, -- Lucide icon identifier
    short_description TEXT NOT NULL,
    full_description TEXT,
    deliverables JSONB DEFAULT '[]'::jsonb,
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Insights & Articles (Blog / Whitepapers / Methodology)
CREATE TABLE IF NOT EXISTS articles (
    id BIGSERIAL PRIMARY KEY,
    slug VARCHAR(150) NOT NULL UNIQUE,
    title VARCHAR(255) NOT NULL,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    cover_image_url VARCHAR(500) NOT NULL,
    author_name VARCHAR(150) NOT NULL,
    author_avatar VARCHAR(500),
    category VARCHAR(100) NOT NULL,
    read_time VARCHAR(50) DEFAULT '5 min read',
    tags JSONB DEFAULT '[]'::jsonb,
    featured BOOLEAN DEFAULT FALSE,
    is_published BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. Lead Inquiries / Contact Submissions
CREATE TABLE IF NOT EXISTS lead_inquiries (
    id BIGSERIAL PRIMARY KEY,
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL,
    company_name VARCHAR(150),
    phone_number VARCHAR(50),
    project_type VARCHAR(100), -- Digital Banking, Fintech App, UX Audit, Redesign
    budget_range VARCHAR(100),
    message TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'NEW', -- NEW, IN_REVIEW, CONTACTED, ARCHIVED
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_case_studies_slug ON case_studies(slug);
CREATE INDEX IF NOT EXISTS idx_case_studies_category ON case_studies(category);
CREATE INDEX IF NOT EXISTS idx_case_studies_featured ON case_studies(featured);
CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles(slug);
CREATE INDEX IF NOT EXISTS idx_articles_category ON articles(category);
CREATE INDEX IF NOT EXISTS idx_lead_inquiries_status ON lead_inquiries(status);
