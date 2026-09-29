-- =========================================================================
-- V12__add_soft_delete_and_trash_system.sql : Enterprise Soft Delete & Trash
-- Enables safe 30-day reversible deletion and centralized trash hub
-- =========================================================================

-- 1. Lead Inquiries
ALTER TABLE lead_inquiries
    ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMP WITH TIME ZONE NULL;

CREATE INDEX IF NOT EXISTS idx_lead_inquiries_deleted_at ON lead_inquiries(deleted_at);

-- 2. Job Applications
ALTER TABLE job_applications
    ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMP WITH TIME ZONE NULL;

CREATE INDEX IF NOT EXISTS idx_job_applications_deleted_at ON job_applications(deleted_at);

-- 3. Articles & Insights
ALTER TABLE articles
    ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMP WITH TIME ZONE NULL;

CREATE INDEX IF NOT EXISTS idx_articles_deleted_at ON articles(deleted_at);

-- 4. Case Studies Portfolio
ALTER TABLE case_studies
    ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMP WITH TIME ZONE NULL;

CREATE INDEX IF NOT EXISTS idx_case_studies_deleted_at ON case_studies(deleted_at);

-- 5. Job Openings / Positions
ALTER TABLE job_positions
    ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMP WITH TIME ZONE NULL;

CREATE INDEX IF NOT EXISTS idx_job_positions_deleted_at ON job_positions(deleted_at);
