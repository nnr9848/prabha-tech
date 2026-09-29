-- =========================================================================
-- V11__add_inquiry_attachment_support.sql : Add Document / RFP Attachments to Inquiries
-- Allows clients to attach RFPs, architectural diagrams, screenshots, or briefs
-- =========================================================================

ALTER TABLE lead_inquiries
    ADD COLUMN IF NOT EXISTS attachment_url TEXT,
    ADD COLUMN IF NOT EXISTS attachment_file_name VARCHAR(255);
