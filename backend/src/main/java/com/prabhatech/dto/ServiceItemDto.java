package com.prabhatech.dto;

import java.util.List;

public class ServiceItemDto {
    private Long id;
    private String slug;
    private String title;
    private String tagline;
    private String icon;
    private String shortDescription;
    private String fullDescription;
    private List<String> deliverables;
    private Integer displayOrder;
    private Boolean isActive;

    public ServiceItemDto() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getSlug() { return slug; }
    public void setSlug(String slug) { this.slug = slug; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getTagline() { return tagline; }
    public void setTagline(String tagline) { this.tagline = tagline; }
    public String getIcon() { return icon; }
    public void setIcon(String icon) { this.icon = icon; }
    public String getShortDescription() { return shortDescription; }
    public void setShortDescription(String shortDescription) { this.shortDescription = shortDescription; }
    public String getFullDescription() { return fullDescription; }
    public void setFullDescription(String fullDescription) { this.fullDescription = fullDescription; }
    public List<String> getDeliverables() { return deliverables; }
    public void setDeliverables(List<String> deliverables) { this.deliverables = deliverables; }
    public Integer getDisplayOrder() { return displayOrder; }
    public void setDisplayOrder(Integer displayOrder) { this.displayOrder = displayOrder; }
    public Boolean getIsActive() { return isActive; }
    public void setIsActive(Boolean isActive) { this.isActive = isActive; }
}
