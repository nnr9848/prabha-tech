package com.prabhatech.dto;

import jakarta.validation.constraints.NotBlank;
import java.time.ZonedDateTime;

public class HeroConfigDto {

    public static class Response {
        private Long id;
        private String configKey;
        private String subHeadline;
        private String headlinePrefix;
        private String headlineHighlight;
        private String headlineSuffix;
        private String ctaText;
        private String ctaLink;
        private String videoUrl;
        private String posterUrl;
        private ZonedDateTime updatedAt;

        public Response() {}

        public Response(Long id, String configKey, String subHeadline, String headlinePrefix, String headlineHighlight, String headlineSuffix, String ctaText, String ctaLink, String videoUrl, String posterUrl, ZonedDateTime updatedAt) {
            this.id = id;
            this.configKey = configKey;
            this.subHeadline = subHeadline;
            this.headlinePrefix = headlinePrefix;
            this.headlineHighlight = headlineHighlight;
            this.headlineSuffix = headlineSuffix;
            this.ctaText = ctaText;
            this.ctaLink = ctaLink;
            this.videoUrl = videoUrl;
            this.posterUrl = posterUrl;
            this.updatedAt = updatedAt;
        }

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
        public ZonedDateTime getUpdatedAt() { return updatedAt; }
        public void setUpdatedAt(ZonedDateTime updatedAt) { this.updatedAt = updatedAt; }
    }

    public static class Request {
        @NotBlank(message = "Sub-headline is required")
        private String subHeadline;

        @NotBlank(message = "Headline prefix is required")
        private String headlinePrefix;

        @NotBlank(message = "Headline highlight is required")
        private String headlineHighlight;

        @NotBlank(message = "Headline suffix is required")
        private String headlineSuffix;

        @NotBlank(message = "CTA text is required")
        private String ctaText;

        @NotBlank(message = "CTA link is required")
        private String ctaLink;

        private String videoUrl;

        private String posterUrl;

        public Request() {}

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
    }
}
