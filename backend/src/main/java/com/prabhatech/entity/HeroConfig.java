package com.prabhatech.entity;

import jakarta.persistence.*;
import java.time.ZonedDateTime;

@Entity
@Table(name = "hero_section_config")
public class HeroConfig {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "config_key", nullable = false, unique = true, length = 50)
    private String configKey = "default_hero";

    @Column(name = "sub_headline", nullable = false, columnDefinition = "TEXT")
    private String subHeadline;

    @Column(name = "headline_prefix", nullable = false, length = 150)
    private String headlinePrefix;

    @Column(name = "headline_highlight", nullable = false, length = 150)
    private String headlineHighlight;

    @Column(name = "headline_suffix", nullable = false, length = 150)
    private String headlineSuffix;

    @Column(name = "cta_text", nullable = false, length = 100)
    private String ctaText;

    @Column(name = "cta_link", nullable = false, length = 255)
    private String ctaLink;

    @Column(name = "video_url", nullable = false, length = 500)
    private String videoUrl;

    @Column(name = "poster_url", nullable = false, length = 500)
    private String posterUrl;

    @Column(name = "created_at")
    private ZonedDateTime createdAt;

    @Column(name = "updated_at")
    private ZonedDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = ZonedDateTime.now();
        this.updatedAt = ZonedDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = ZonedDateTime.now();
    }

    public HeroConfig() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getConfigKey() { return configKey; }
    public void setConfigKey(String configKey) { this.configKey = configKey; }

    public String getSubHeadline() { return subHeadline; }
    public void setSubHeadline(String subHeadline) { this.subHeadline = subHeadline; }

    public String getHeadlinePrefix() { return headlinePrefix; }
    public void setHeadlinePrefix(String headlinePrefix) { this.headlinePrefix = headlinePrefix; }

    public String getHeadlineHighlight() { return headlineHighlight; }
    public void setHeadlineHighlight(String headlineHighlight) { this.headlineHighlight = headlineHighlight; }

    public String getHeadlineSuffix() { return headlineSuffix; }
    public void setHeadlineSuffix(String headlineSuffix) { this.headlineSuffix = headlineSuffix; }

    public String getCtaText() { return ctaText; }
    public void setCtaText(String ctaText) { this.ctaText = ctaText; }

    public String getCtaLink() { return ctaLink; }
    public void setCtaLink(String ctaLink) { this.ctaLink = ctaLink; }

    public String getVideoUrl() { return videoUrl; }
    public void setVideoUrl(String videoUrl) { this.videoUrl = videoUrl; }

    public String getPosterUrl() { return posterUrl; }
    public void setPosterUrl(String posterUrl) { this.posterUrl = posterUrl; }

    public ZonedDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(ZonedDateTime createdAt) { this.createdAt = createdAt; }

    public ZonedDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(ZonedDateTime updatedAt) { this.updatedAt = updatedAt; }
}
