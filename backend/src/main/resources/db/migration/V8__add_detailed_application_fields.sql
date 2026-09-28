-- V8: Add enterprise application fields to job_applications table
ALTER TABLE job_applications
    ADD COLUMN IF NOT EXISTS current_location VARCHAR(150),
    ADD COLUMN IF NOT EXISTS total_experience VARCHAR(100),
    ADD COLUMN IF NOT EXISTS current_company VARCHAR(200),
    ADD COLUMN IF NOT EXISTS current_designation VARCHAR(150),
    ADD COLUMN IF NOT EXISTS expected_salary VARCHAR(100),
    ADD COLUMN IF NOT EXISTS notice_period VARCHAR(100),
    ADD COLUMN IF NOT EXISTS resume_file_name VARCHAR(255);
