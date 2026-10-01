-- =========================================================================
-- V15__expand_services_hero_image_url_to_text.sql : Expand hero_image_url to TEXT
-- Prevents "value too long for type character varying(500)" on Base64 uploads & long CDN URLs
-- =========================================================================

ALTER TABLE services ALTER COLUMN hero_image_url TYPE TEXT;
