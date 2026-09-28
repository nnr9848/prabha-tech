-- =========================================================================
-- V5__seed_all_prabhatech_services.sql : Canonical 8 Enterprise Services
-- =========================================================================

INSERT INTO services (slug, title, tagline, icon, short_description, full_description, deliverables, display_order, is_active)
VALUES
(
    'custom-software-development',
    'Enterprise Software Development',
    'Custom enterprise applications to streamline operations and drive digital transformation',
    'Code2',
    'Custom enterprise applications to streamline operations and drive digital transformation.',
    'From complex workflow automations to multi-tenant cloud platforms, we engineer scalable, highly secure web and desktop software systems that integrate seamlessly with legacy ERPs and modern cloud APIs.',
    '["Web Applications", "Cloud-based Solutions", "System Integration", "Ongoing Support & Maintenance"]'::jsonb,
    1,
    TRUE
),
(
    'mobile-app-development',
    'Mobile Applications',
    'User-friendly and high-performance mobile apps for Android & iOS platforms',
    'Smartphone',
    'User-friendly and high-performance mobile apps for Android & iOS platforms.',
    'We engineer native and cross-platform mobile apps built with Flutter, React Native, iOS (Swift), and Android (Kotlin) delivering fluid micro-interactions, offline resilience, and secure payment integrations.',
    '["iOS & Android Apps", "Cross-Platform Development", "UI/UX Design", "App Maintenance"]'::jsonb,
    2,
    TRUE
),
(
    'ai-analytics',
    'AI & Analytics Solutions',
    'Turn your data into intelligent insights with AI-powered solutions',
    'Cpu',
    'Turn your data into intelligent insights with AI-powered solutions.',
    'Harness predictive analytics, computer vision, natural language processing, and LLM-powered autonomous workflow agents to transform raw business data into actionable automated decisions.',
    '["AI Automation", "Predictive Analytics", "Computer Vision", "Business Intelligence Dashboards"]'::jsonb,
    3,
    TRUE
),
(
    'iiot-automation',
    'Industrial IoT & Automation',
    'Smart and connected solutions for industrial assets and facilities',
    'Radio',
    'Smart and connected solutions for industrial assets and facilities.',
    'End-to-end telemetry solutions connecting heavy machinery, fleet operations, commercial building management systems (BEMS), and smart agricultural sensor grids with real-time cloud monitoring.',
    '["Fleet Management", "Building Management (BEMS)", "Smart Gate & Access Control", "Vertical Farming Solutions"]'::jsonb,
    4,
    TRUE
),
(
    'metaverse-development',
    'Metaverse & Web3 Development',
    '3D virtual environments, digital twins, and immersive AR/VR applications',
    'Box',
    '3D virtual environments, digital twins, and immersive AR/VR applications.',
    'Immersive spatial computing, industrial digital twins, interactive 3D simulations, and Web3 virtual showrooms that engage enterprise customers in next-generation virtual environments.',
    '["Virtual Business Spaces", "Industrial Digital Twin", "VR Training & Simulation", "Metaverse Commerce & Showrooms"]'::jsonb,
    5,
    TRUE
),
(
    'managed-it-services',
    'Managed IT Services',
    'Reliable IT infrastructure and support to keep your business running smoothly',
    'Headphones',
    'Reliable IT infrastructure and support to keep your business running smoothly.',
    'Round-the-clock enterprise IT helpdesk, managed cloud server infrastructure, network architecture, AMC maintenance, on-site hardware provisioning, and guaranteed SLAs.',
    '["IT Support & AMC", "Server & Network Setup", "CCTV & Biometric Solutions", "Data Center Construction"]'::jsonb,
    6,
    TRUE
),
(
    'staffing-recruitment',
    'IT Consulting & Staffing',
    'Expert consulting and IT talent to accelerate your business growth',
    'Users2',
    'Expert consulting and IT talent to accelerate your business growth.',
    'Dedicated engineering pods, specialized contract talent, executive tech recruiting, and strategic digital transformation advisory to scale your technical capacity on demand.',
    '["IT Consultancy", "Project Management", "IT Staffing & Recruitment", "Technology Advisory"]'::jsonb,
    7,
    TRUE
)
ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    tagline = EXCLUDED.tagline,
    icon = EXCLUDED.icon,
    short_description = EXCLUDED.short_description,
    full_description = EXCLUDED.full_description,
    deliverables = EXCLUDED.deliverables,
    display_order = EXCLUDED.display_order,
    is_active = EXCLUDED.is_active,
    updated_at = CURRENT_TIMESTAMP;
