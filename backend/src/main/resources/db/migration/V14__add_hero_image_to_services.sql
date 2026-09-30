-- =========================================================================
-- V14__add_hero_image_to_services.sql : Add Hero Image support to Services
-- =========================================================================

ALTER TABLE services 
ADD COLUMN IF NOT EXISTS hero_image_url VARCHAR(500);

-- Backfill existing services with canonical imagery so the database is the Single Source of Truth
UPDATE services 
SET hero_image_url = 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80'
WHERE slug = 'financial-ux-engineering';

UPDATE services 
SET hero_image_url = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80'
WHERE slug = 'fintech-digital-transformation';

UPDATE services 
SET hero_image_url = 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80'
WHERE slug = 'ux-audit-optimization';

UPDATE services 
SET hero_image_url = '/assets/images/enterprise-software.png'
WHERE slug = 'custom-software-development';

UPDATE services 
SET hero_image_url = 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80'
WHERE slug = 'mobile-app-development';

UPDATE services 
SET hero_image_url = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80'
WHERE slug = 'ai-analytics';

UPDATE services 
SET hero_image_url = '/assets/images/indistrial-iot.jpg'
WHERE slug = 'iiot-automation';

UPDATE services 
SET hero_image_url = 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=1200&q=80'
WHERE slug = 'metaverse-development';

UPDATE services 
SET hero_image_url = 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80'
WHERE slug = 'managed-it-services';

UPDATE services 
SET hero_image_url = 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80'
WHERE slug = 'staffing-recruitment';
