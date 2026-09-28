-- =========================================================================
-- V6__create_and_seed_job_positions.sql : Job Positions & Career Openings
-- =========================================================================

CREATE TABLE IF NOT EXISTS job_positions (
    id BIGSERIAL PRIMARY KEY,
    slug VARCHAR(150) NOT NULL UNIQUE,
    title VARCHAR(255) NOT NULL,
    department VARCHAR(100) NOT NULL,
    location VARCHAR(150) NOT NULL,
    experience VARCHAR(100) NOT NULL,
    job_type VARCHAR(100) NOT NULL DEFAULT 'Full-time',
    description TEXT NOT NULL,
    skills JSONB DEFAULT '[]'::jsonb,
    featured BOOLEAN DEFAULT FALSE,
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_job_positions_slug ON job_positions(slug);
CREATE INDEX IF NOT EXISTS idx_job_positions_department ON job_positions(department);
CREATE INDEX IF NOT EXISTS idx_job_positions_is_active ON job_positions(is_active);

INSERT INTO job_positions (slug, title, department, location, experience, job_type, description, skills, featured, display_order, is_active)
VALUES
(
    'full-stack-java-dev',
    'Full Stack Java Developer',
    'Engineering',
    'Dubai, UAE',
    '3-6 Years',
    'Full-time',
    'Build and maintain enterprise web applications using Java Spring Boot, microservices architecture, and React.',
    '["Java", "Spring Boot", "React", "REST API", "Microservices", "PostgreSQL"]'::jsonb,
    TRUE,
    1,
    TRUE
),
(
    'react-native-mobile-dev',
    'React Native Mobile Developer',
    'Mobile Apps',
    'Hyderabad, India / Remote',
    '2-5 Years',
    'Full-time',
    'Develop cross-platform mobile applications for Android and iOS with fluid micro-interactions and offline resilience.',
    '["React Native", "TypeScript", "Mobile UI/UX", "API Integration", "Redux"]'::jsonb,
    FALSE,
    2,
    TRUE
),
(
    'ai-ml-engineer',
    'AI/ML Engineer',
    'AI & Data',
    'Dubai, UAE',
    '3-7 Years',
    'Full-time',
    'Work on computer vision models, predictive telemetry pipelines, LLM agentic workflows, and enterprise data platforms.',
    '["Python", "Machine Learning", "LLM", "Data Engineering", "TensorFlow", "FastAPI"]'::jsonb,
    TRUE,
    3,
    TRUE
),
(
    'devops-engineer',
    'DevOps Engineer',
    'Engineering',
    'Riyadh, KSA',
    '3-6 Years',
    'Full-time',
    'Manage multi-region CI/CD pipelines, containerized Kubernetes clusters, cloud security governance, and deployment automation.',
    '["AWS", "Docker", "Kubernetes", "Terraform", "CI/CD", "Linux"]'::jsonb,
    FALSE,
    4,
    TRUE
),
(
    'it-support-engineer',
    'IT Support Engineer',
    'Managed Services',
    'Dubai, UAE',
    '1-3 Years',
    'Full-time',
    'Provide technical support, server maintenance, SLA governance, and equipment management for multinational enterprise clients.',
    '["Windows Server", "Networking", "Hardware", "Troubleshooting", "Active Directory"]'::jsonb,
    FALSE,
    5,
    TRUE
),
(
    'business-development-executive',
    'Business Development Executive',
    'Sales & Business Development',
    'UAE / KSA',
    '3-6 Years',
    'Full-time',
    'Drive new business opportunities, structure enterprise IT solutions, and build long-term technology partnerships across the GCC.',
    '["IT Solutions", "SaaS", "Enterprise Sales", "Client Management", "GCC Market"]'::jsonb,
    FALSE,
    6,
    TRUE
)
ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    department = EXCLUDED.department,
    location = EXCLUDED.location,
    experience = EXCLUDED.experience,
    job_type = EXCLUDED.job_type,
    description = EXCLUDED.description,
    skills = EXCLUDED.skills,
    featured = EXCLUDED.featured,
    display_order = EXCLUDED.display_order,
    is_active = EXCLUDED.is_active,
    updated_at = CURRENT_TIMESTAMP;
