-- =========================================================================
-- V7__fix_admin_password_hash.sql : Fix BCrypt password hash for admin user
-- =========================================================================

UPDATE users 
SET password_hash = '$2a$10$NFBkSnN5RmBMzq9N3px9XOviyyf3WBVksf8g7rfdbDe6DSYyjHEMW',
    updated_at = CURRENT_TIMESTAMP
WHERE username = 'admin';
