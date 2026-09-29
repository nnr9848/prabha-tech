package com.prabhatech.dto;

import java.time.OffsetDateTime;

public class TrashItemDto {
    private Long id;
    private String entityType; // INQUIRY, JOB_APPLICATION, ARTICLE, CASE_STUDY, JOB_POSITION
    private String title;
    private String subtitle;
    private OffsetDateTime deletedAt;
    private long daysRemaining; // Math.max(0, 30 - daysSinceDeleted)

    public TrashItemDto() {
    }

    public TrashItemDto(Long id, String entityType, String title, String subtitle, OffsetDateTime deletedAt, long daysRemaining) {
        this.id = id;
        this.entityType = entityType;
        this.title = title;
        this.subtitle = subtitle;
        this.deletedAt = deletedAt;
        this.daysRemaining = daysRemaining;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEntityType() {
        return entityType;
    }

    public void setEntityType(String entityType) {
        this.entityType = entityType;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getSubtitle() {
        return subtitle;
    }

    public void setSubtitle(String subtitle) {
        this.subtitle = subtitle;
    }

    public OffsetDateTime getDeletedAt() {
        return deletedAt;
    }

    public void setDeletedAt(OffsetDateTime deletedAt) {
        this.deletedAt = deletedAt;
    }

    public long getDaysRemaining() {
        return daysRemaining;
    }

    public void setDaysRemaining(long daysRemaining) {
        this.daysRemaining = daysRemaining;
    }
}
