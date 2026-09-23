-- =========================================================================
-- V5__update_hero_video_to_local_asset.sql : Update Hero Video to Local Self-Hosted Path
-- =========================================================================

UPDATE hero_section_config
SET 
    video_url = '/assets/video/hero-bg.mp4',
    poster_url = 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80',
    updated_at = CURRENT_TIMESTAMP
WHERE config_key = 'default_hero';
