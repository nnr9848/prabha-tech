-- =========================================================================
-- V4__hero_section_config.sql : Dynamic Hero Section Configuration Table
-- =========================================================================

CREATE TABLE IF NOT EXISTS hero_section_config (
    id BIGSERIAL PRIMARY KEY,
    config_key VARCHAR(50) NOT NULL UNIQUE DEFAULT 'default_hero',
    sub_headline TEXT NOT NULL,
    headline_prefix VARCHAR(150) NOT NULL,
    headline_highlight VARCHAR(150) NOT NULL,
    headline_suffix VARCHAR(150) NOT NULL,
    cta_text VARCHAR(100) NOT NULL,
    cta_link VARCHAR(255) NOT NULL,
    video_url VARCHAR(500) NOT NULL,
    poster_url VARCHAR(500) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Seed Initial Default Configuration
INSERT INTO hero_section_config (
    config_key,
    sub_headline,
    headline_prefix,
    headline_highlight,
    headline_suffix,
    cta_text,
    cta_link,
    video_url,
    poster_url
) VALUES (
    'default_hero',
    'We catalyze business growth by reimagining digital experiences that conquer complex challenges through innovation and agility.',
    'Meet the',
    'Digital Drivers',
    'of Global Disruptors',
    'Contact Our Experts',
    '/contact',
    'https://www.theuxda.com/storage/app/media/background-video/UXDA-bg-X-desktop.mp4',
    'https://www.theuxda.com/storage/app/media/background-video/UXDA-bg-X-desktop.jpg'
) ON CONFLICT (config_key) DO NOTHING;
