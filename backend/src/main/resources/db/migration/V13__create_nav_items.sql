-- =========================================================================
-- V13__create_nav_items.sql : Dynamic Navigation Menu Management
-- =========================================================================

CREATE TABLE IF NOT EXISTS nav_items (
    id BIGSERIAL PRIMARY KEY,
    label VARCHAR(100) NOT NULL,
    path VARCHAR(255) NOT NULL,
    display_order INT DEFAULT 0,
    is_external BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_nav_items_active_order ON nav_items(is_active, display_order);

-- Seed Canonical Navigation Items
INSERT INTO nav_items (label, path, display_order, is_external, is_active)
VALUES 
    ('Home', '/', 1, FALSE, TRUE),
    ('Services', '/services', 2, FALSE, TRUE),
    ('Portfolio', '/portfolio', 3, FALSE, TRUE),
    ('Industries', '/industries', 4, FALSE, TRUE),
    ('About', '/about', 5, FALSE, TRUE),
    ('Careers', '/careers', 6, FALSE, TRUE),
    ('Insights', '/insights', 7, FALSE, TRUE),
    ('Contact', '/contact', 8, FALSE, TRUE)
ON CONFLICT DO NOTHING;
