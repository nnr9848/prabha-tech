-- =========================================================================
-- V10__standardize_url_columns.sql : Standardize all URL columns to TEXT
-- Prevents length overflow errors across all enterprise entities
-- =========================================================================

-- 1. Social Links URL
ALTER TABLE social_links ALTER COLUMN url TYPE TEXT;

-- 2. Hero Section Media URLs
ALTER TABLE hero_section_config ALTER COLUMN video_url TYPE TEXT;
ALTER TABLE hero_section_config ALTER COLUMN poster_url TYPE TEXT;
