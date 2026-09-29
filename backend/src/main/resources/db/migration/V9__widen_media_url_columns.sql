-- =========================================================================
-- V9__widen_media_url_columns.sql : Expand URL columns to TEXT
-- Prevents "value too long for type character varying(500)" on long CDN URLs
-- =========================================================================

-- 1. Case Studies Media URLs
ALTER TABLE case_studies ALTER COLUMN hero_image_url TYPE TEXT;
ALTER TABLE case_studies ALTER COLUMN thumbnail_url TYPE TEXT;
ALTER TABLE case_studies ALTER COLUMN video_url TYPE TEXT;

-- 2. Articles Media URLs
ALTER TABLE articles ALTER COLUMN cover_image_url TYPE TEXT;
ALTER TABLE articles ALTER COLUMN author_avatar TYPE TEXT;
