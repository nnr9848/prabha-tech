-- =========================================================================
-- V2__seed_content.sql : Initial Seed Data for UXDA Agency Content
-- =========================================================================

-- Seed Default Admin (Password: 'admin123')
INSERT INTO users (username, email, password_hash, role, full_name)
VALUES (
    'admin',
    'admin@prabhatech.com',
    '$2a$10$7EqJtq98hPqEX7fNZaFWoO.8/k.Y9Eeyb8a0u2YlB5D8vQv5j7w6O',
    'ROLE_ADMIN',
    'UXDA Lead Administrator'
) ON CONFLICT (username) DO NOTHING;

-- Seed UXDA Award-Winning Case Studies
INSERT INTO case_studies (slug, title, subtitle, client_name, category, hero_image_url, thumbnail_url, video_url, summary, challenge, solution, results, awards, metrics, tags, featured, display_order)
VALUES 
(
    'cr2-digital-banking-platform',
    'BankWorld: Redefining Global ATM & Digital Banking',
    'Empowering millions of users worldwide with an intuitive next-generation banking ecosystem',
    'CR2 (Global Banking Software)',
    'Banking',
    'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80',
    'https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-screens-with-charts-and-data-31913-large.mp4',
    'UXDA engineered an omni-channel financial UX ecosystem for CR2 BankWorld, streamlining retail banking, business finance, and smart ATM transactions into a singular frictionless experience.',
    'Legacy core systems across 60+ countries with disconnected mobile, web, and physical kiosk interfaces resulting in high drop-off and user confusion.',
    'Created the Financial Experience Design (FXD) architecture connecting micro-interactions, dark-mode native aesthetics, and AI-assisted financial flows.',
    'Adopted by tier-1 banks in over 60 countries, cutting transaction friction by 47% and winning multiple international design awards.',
    '["Red Dot Award Winner", "IF Design Award", "A Design Award Platinum"]'::jsonb,
    '[{"label": "+180%", "description": "Digital Engagement"}, {"label": "60+", "description": "Countries Deployed"}, {"label": "4.9/5", "description": "User Satisfaction"}]'::jsonb,
    '["Fintech", "Omnichannel", "Design System", "ATM & Web"]'::jsonb,
    true,
    1
),
(
    'myeva-wealthtech-ai-financial-coach',
    'myEva: World''s First AI-Driven Wealth & Pension Coach',
    'Democratizing financial wellbeing and automated wealth management for enterprise workforces',
    'Wealth Wizards',
    'Wealthtech',
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    'https://assets.mixkit.co/videos/preview/mixkit-futuristic-hologram-interface-screens-32454-large.mp4',
    'Transforming complex UK pension advice and investment planning into a warm, conversational AI mentor that builds tailored financial fitness roadmaps.',
    'Intimidating financial jargon, low youth engagement with pensions, and compliance hurdles across regulated financial products.',
    'Synthesized behavioral psychology with conversational UI, gamified financial health scores, and contextual action triggers.',
    'Over £1B in pension assets guided with a 350% surge in monthly recurring active users across Fortune 500 enterprise clients.',
    '["Banking Technology Awards", "Finovate Best of Show"]'::jsonb,
    '[{"label": "£1B+", "description": "Guided Assets"}, {"label": "+350%", "description": "Active Users"}, {"label": "92%", "description": "Adoption Rate"}]'::jsonb,
    '["AI Coach", "Wealthtech", "Conversational UI", "Pensions"]'::jsonb,
    true,
    2
),
(
    'b2b-corporate-treasury-platform',
    'Next-Gen B2B Treasury & Liquidity Cloud',
    'Unlocking instantaneous cross-border multi-currency treasury operations for multinational enterprises',
    'TreasuryX',
    'Fintech',
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    'https://assets.mixkit.co/videos/preview/mixkit-network-connection-background-3179-large.mp4',
    'Eliminating spreadsheet chaos for CFOs through real-time predictive cashflow visualization, multi-tenant approvals, and automated FX hedging.',
    'Corporate treasurers navigating 15+ disconnected legacy terminal screens with slow batch processing and high error rates.',
    'Implemented modular high-density dashboards, real-time WebSocket cash position telemetry, and 1-click execution workflows.',
    'Reduced end-of-day treasury reconciliation time from 4 hours to 12 minutes with 100% audit compliance.',
    '["UX Design Awards Nominee", "Global Fintech Gold"]'::jsonb,
    '[{"label": "-95%", "description": "Reconciliation Time"}, {"label": "$40B+", "description": "Annual Volume"}, {"label": "0%", "description": "Error Rate"}]'::jsonb,
    '["B2B SaaS", "Treasury", "Real-Time Telemetry", "Enterprise"]'::jsonb,
    true,
    3
)
ON CONFLICT (slug) DO NOTHING;

-- Seed Services
INSERT INTO services (slug, title, tagline, icon, short_description, full_description, deliverables, display_order)
VALUES
(
    'financial-ux-engineering',
    'Financial UX & UI Design',
    'Designing world-class financial interfaces that captivate users and drive conversions',
    'Layers',
    'We engineer state-of-the-art mobile banking, web platforms, and wealthtech dashboards that turn complex finance into effortless, delightful journeys.',
    'From deep user research and customer journey mapping to high-fidelity design systems, interactive prototypes, and production-ready handoffs.',
    '["Fintech UX Audit", "Customer Journey Maps", "Design System & Tokens", "Hi-Fi Prototyping", "Motion & Micro-interactions"]'::jsonb,
    1
),
(
    'fintech-digital-transformation',
    'Fintech Product Strategy & Architecture',
    'Unifying business vision, regulatory compliance, and cutting-edge tech',
    'Compass',
    'Guiding tier-1 banks and fintech unicorns through holistic product evolution, competitive disruption, and human-centered architecture.',
    'Strategic roadmap planning, AI-feature discovery, feature prioritization matrices, and engineering enablement.',
    '["Product Vision Roadmap", "Competitive Fintech Benchmark", "Information Architecture", "AI Integration Strategy"]'::jsonb,
    2
),
(
    'ux-audit-optimization',
    'Fintech UX Audit & Optimization',
    'Pinpointing friction, drop-offs, and untapped revenue in your existing products',
    'Zap',
    'In-depth forensic UX analysis across your mobile apps and web platforms with actionable recommendations to skyrocket onboarding and retention.',
    'Heuristic evaluations, funnel drop-off diagnostics, usability testing with real financial consumers, and rapid win execution plans.',
    '["Heuristic Evaluation Report", "Friction Heatmaps", "Accessibility Compliance Audit", "Conversion Rate Optimization Plan"]'::jsonb,
    3
)
ON CONFLICT (slug) DO NOTHING;

-- Seed Articles / Insights
INSERT INTO articles (slug, title, excerpt, content, cover_image_url, author_name, author_avatar, category, read_time, featured)
VALUES
(
    '10-fintech-design-trends-2026',
    'Top 10 Fintech Design Trends That Are Transforming Banking in 2026',
    'Discover how spatial financial experiences, ambient AI agents, and hyper-personalized interfaces are redefining customer loyalty.',
    'The financial industry is undergoing its most radical transformation yet. As Gen Z and digital-native businesses demand consumer-grade experiences in banking, traditional interfaces are giving way to contextual intelligence, adaptive dark interfaces, and conversational financial companions...',
    'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&w=1200&q=80',
    'Alex Kreger',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    'Fintech Trends',
    '6 min read',
    true
),
(
    'why-traditional-banking-apps-fail',
    'Why 70% of Banking Digital Transformations Fail and How UX Solves It',
    'A deep dive into the systemic architectural and design flaws holding back legacy banking institutions from true digital disruption.',
    'When financial institutions digitize legacy paper forms without rethinking customer psychology, the result is high abandonment and frustration. Financial Experience Design (FXD) shifts the focus from feature bloat to emotional value and cognitive ease...',
    'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80',
    'Linda Zaikovska',
    'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
    'Strategy',
    '8 min read',
    true
)
ON CONFLICT (slug) DO NOTHING;
