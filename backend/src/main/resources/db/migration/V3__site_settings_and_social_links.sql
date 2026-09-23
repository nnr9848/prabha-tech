-- =========================================================================
-- V3__site_settings_and_social_links.sql : Dynamic Social & Site Settings
-- =========================================================================

CREATE TABLE IF NOT EXISTS social_links (
    id BIGSERIAL PRIMARY KEY,
    platform_key VARCHAR(50) NOT NULL UNIQUE,
    platform_name VARCHAR(100) NOT NULL,
    url VARCHAR(500) NOT NULL,
    bg_color VARCHAR(150) NOT NULL,
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Seed Initial Official PrabhaTech Social Links
INSERT INTO social_links (platform_key, platform_name, url, bg_color, display_order, is_active)
VALUES
    ('linkedin', 'LinkedIn', 'https://www.linkedin.com/company/prabhatechnologies/', '#0A66C2', 1, TRUE),
    ('twitter_x', 'X (Twitter)', 'https://x.com/prabhanow', '#FFFFFF', 2, TRUE),
    ('instagram', 'Instagram', 'https://www.instagram.com/prabhatec/', 'linear-gradient(to top right, #f09433, #dc2743, #cc2366, #bc1888)', 3, TRUE),
    ('facebook', 'Facebook', 'https://www.facebook.com/PrabhaTech/', '#1877F2', 4, TRUE)
ON CONFLICT (platform_key) DO NOTHING;
