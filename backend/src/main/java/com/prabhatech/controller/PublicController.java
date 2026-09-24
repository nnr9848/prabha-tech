package com.prabhatech.controller;

import com.prabhatech.dto.ArticleDto;
import com.prabhatech.dto.CaseStudyDto;
import com.prabhatech.dto.LeadInquiryDto;
import com.prabhatech.dto.ServiceItemDto;
import com.prabhatech.dto.SocialLinkDto;
import com.prabhatech.service.ArticleService;
import com.prabhatech.service.CaseStudyService;
import com.prabhatech.service.LeadInquiryService;
import com.prabhatech.service.ServiceItemService;
import com.prabhatech.service.SocialLinkService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/public")
public class PublicController {

    private final CaseStudyService caseStudyService;
    private final ServiceItemService serviceItemService;
    private final ArticleService articleService;
    private final LeadInquiryService leadInquiryService;
    private final SocialLinkService socialLinkService;
    private final com.prabhatech.service.HeroConfigService heroConfigService;

    public PublicController(CaseStudyService caseStudyService,
                            ServiceItemService serviceItemService,
                            ArticleService articleService,
                            LeadInquiryService leadInquiryService,
                            SocialLinkService socialLinkService,
                            com.prabhatech.service.HeroConfigService heroConfigService) {
        this.caseStudyService = caseStudyService;
        this.serviceItemService = serviceItemService;
        this.articleService = articleService;
        this.leadInquiryService = leadInquiryService;
        this.socialLinkService = socialLinkService;
        this.heroConfigService = heroConfigService;
    }

    // --- Hero Section Dynamic Config ---
    @GetMapping("/hero-config")
    public ResponseEntity<com.prabhatech.dto.HeroConfigDto.Response> getHeroConfig() {
        return ResponseEntity.ok()
                .cacheControl(org.springframework.http.CacheControl.maxAge(60, java.util.concurrent.TimeUnit.SECONDS).cachePublic().staleWhileRevalidate(300, java.util.concurrent.TimeUnit.SECONDS))
                .body(heroConfigService.getHeroConfig());
    }

    // --- Social Links ---
    @GetMapping("/social-links")
    public ResponseEntity<List<SocialLinkDto>> getActiveSocialLinks() {
        return ResponseEntity.ok()
                .cacheControl(org.springframework.http.CacheControl.maxAge(60, java.util.concurrent.TimeUnit.SECONDS).cachePublic().staleWhileRevalidate(300, java.util.concurrent.TimeUnit.SECONDS))
                .body(socialLinkService.getActiveSocialLinks());
    }

    // --- Case Studies ---
    @GetMapping("/case-studies")
    public ResponseEntity<List<CaseStudyDto>> getCaseStudies(
            @RequestParam(required = false) String category,
            @RequestParam(required = false, defaultValue = "false") boolean featured
    ) {
        if (featured) {
            return ResponseEntity.ok(caseStudyService.getFeaturedCaseStudies());
        }
        return ResponseEntity.ok(caseStudyService.getPublishedCaseStudies(category));
    }

    @GetMapping("/case-studies/{slug}")
    public ResponseEntity<CaseStudyDto> getCaseStudyBySlug(@PathVariable String slug) {
        return ResponseEntity.ok(caseStudyService.getBySlug(slug));
    }

    // --- Services ---
    @GetMapping("/services")
    public ResponseEntity<List<ServiceItemDto>> getServices() {
        return ResponseEntity.ok(serviceItemService.getActiveServices());
    }

    @GetMapping("/services/{slug}")
    public ResponseEntity<ServiceItemDto> getServiceBySlug(@PathVariable String slug) {
        return ResponseEntity.ok(serviceItemService.getBySlug(slug));
    }

    // --- Articles / Insights ---
    @GetMapping("/articles")
    public ResponseEntity<List<ArticleDto>> getArticles(
            @RequestParam(required = false) String category,
            @RequestParam(required = false, defaultValue = "false") boolean featured
    ) {
        if (featured) {
            return ResponseEntity.ok(articleService.getFeaturedArticles());
        }
        return ResponseEntity.ok(articleService.getPublishedArticles(category));
    }

    @GetMapping("/articles/{slug}")
    public ResponseEntity<ArticleDto> getArticleBySlug(@PathVariable String slug) {
        return ResponseEntity.ok(articleService.getBySlug(slug));
    }

    // --- Lead Inquiries / Contact ---
    @PostMapping("/inquiries")
    public ResponseEntity<LeadInquiryDto> submitInquiry(@Valid @RequestBody LeadInquiryDto dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(leadInquiryService.submitInquiry(dto));
    }
}
