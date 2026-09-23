-- =========================================================================
-- V6__allow_nullable_hero_media.sql : Support Optional Video/Poster URLs
-- =========================================================================

ALTER TABLE hero_section_config
    ALTER COLUMN video_url DROP NOT NULL,
    ALTER COLUMN poster_url DROP NOT NULL;
