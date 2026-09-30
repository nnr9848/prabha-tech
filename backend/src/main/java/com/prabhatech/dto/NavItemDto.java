package com.prabhatech.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class NavItemDto {

    private Long id;

    @NotBlank(message = "Label is required")
    @Size(max = 100, message = "Label cannot exceed 100 characters")
    private String label;

    @NotBlank(message = "Path is required")
    @Size(max = 255, message = "Path cannot exceed 255 characters")
    private String path;

    private Integer displayOrder = 0;

    private Boolean isExternal = false;

    private Boolean isActive = true;

    public NavItemDto() {}

    public NavItemDto(Long id, String label, String path, Integer displayOrder, Boolean isExternal, Boolean isActive) {
        this.id = id;
        this.label = label;
        this.path = path;
        this.displayOrder = displayOrder;
        this.isExternal = isExternal;
        this.isActive = isActive;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public Integer getDisplayOrder() {
        return displayOrder;
    }

    public void setDisplayOrder(Integer displayOrder) {
        this.displayOrder = displayOrder;
    }

    public Boolean getIsExternal() {
        return isExternal;
    }

    public void setIsExternal(Boolean isExternal) {
        this.isExternal = isExternal;
    }

    public Boolean getIsActive() {
        return isActive;
    }

    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }
}
