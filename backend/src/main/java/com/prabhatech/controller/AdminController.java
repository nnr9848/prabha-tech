package com.prabhatech.controller;

import com.prabhatech.dto.*;
import com.prabhatech.service.ArticleService;
import com.prabhatech.service.CaseStudyService;
import com.prabhatech.service.LeadInquiryService;
import com.prabhatech.service.ServiceItemService;
import com.prabhatech.service.SocialLinkService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/admin")
public class AdminController {

    private final CaseStudyService caseStudyService;
    private final ServiceItemService serviceItemService;
    private final ArticleService articleService;
    private final LeadInquiryService leadInquiryService;
    private final SocialLinkService socialLinkService;

    public AdminController(CaseStudyService caseStudyService,
                           ServiceItemService serviceItemService,
                           ArticleService articleService,
                           LeadInquiryService leadInquiryService,
                           SocialLinkService socialLinkService) {
        this.caseStudyService = caseStudyService;
        this.serviceItemService = serviceItemService;
        this.articleService = articleService;
        this.leadInquiryService = leadInquiryService;
        this.socialLinkService = socialLinkService;
    }

    // --- Social Links CMS ---
    @GetMapping("/social-links")
    public ResponseEntity<List<SocialLinkDto>> getAllSocialLinks() {
        return ResponseEntity.ok(socialLinkService.getAllSocialLinksAdmin());
    }

    @PostMapping("/social-links")
    public ResponseEntity<SocialLinkDto> createSocialLink(@Valid @RequestBody SocialLinkDto dto) {
        return ResponseEntity.ok(socialLinkService.createSocialLink(dto));
    }

    @PutMapping("/social-links/{id}")
    public ResponseEntity<SocialLinkDto> updateSocialLink(@PathVariable Long id, @Valid @RequestBody SocialLinkDto dto) {
        return ResponseEntity.ok(socialLinkService.updateSocialLink(id, dto));
    }

    @DeleteMapping("/social-links/{id}")
    public ResponseEntity<Void> deleteSocialLink(@PathVariable Long id) {
        socialLinkService.deleteSocialLink(id);
        return ResponseEntity.noContent().build();
    }

    // --- Case Studies CMS ---
    @GetMapping("/case-studies")
    public ResponseEntity<List<CaseStudyDto>> getAllCaseStudies() {
        return ResponseEntity.ok(caseStudyService.getAllCaseStudiesAdmin());
    }

    @PostMapping("/case-studies")
    public ResponseEntity<CaseStudyDto> saveCaseStudy(@Valid @RequestBody CaseStudyDto dto) {
        return ResponseEntity.ok(caseStudyService.saveCaseStudy(dto));
    }

    @DeleteMapping("/case-studies/{id}")
    public ResponseEntity<Void> deleteCaseStudy(@PathVariable Long id) {
        caseStudyService.deleteCaseStudy(id);
        return ResponseEntity.noContent().build();
    }

    // --- Services CMS ---
    @GetMapping("/services")
    public ResponseEntity<List<ServiceItemDto>> getAllServices() {
        return ResponseEntity.ok(serviceItemService.getAllServicesAdmin());
    }

    @PostMapping("/services")
    public ResponseEntity<ServiceItemDto> saveService(@Valid @RequestBody ServiceItemDto dto) {
        return ResponseEntity.ok(serviceItemService.saveService(dto));
    }

    @DeleteMapping("/services/{id}")
    public ResponseEntity<Void> deleteService(@PathVariable Long id) {
        serviceItemService.deleteService(id);
        return ResponseEntity.noContent().build();
    }

    // --- Articles CMS ---
    @GetMapping("/articles")
    public ResponseEntity<List<ArticleDto>> getAllArticles() {
        return ResponseEntity.ok(articleService.getAllArticlesAdmin());
    }

    @PostMapping("/articles")
    public ResponseEntity<ArticleDto> saveArticle(@Valid @RequestBody ArticleDto dto) {
        return ResponseEntity.ok(articleService.saveArticle(dto));
    }

    @DeleteMapping("/articles/{id}")
    public ResponseEntity<Void> deleteArticle(@PathVariable Long id) {
        articleService.deleteArticle(id);
        return ResponseEntity.noContent().build();
    }

    // --- Lead Inquiries CMS ---
    @GetMapping("/inquiries")
    public ResponseEntity<List<LeadInquiryDto>> getAllInquiries(@RequestParam(required = false) String status) {
        return ResponseEntity.ok(leadInquiryService.getAllInquiriesAdmin(status));
    }

    @PatchMapping("/inquiries/{id}/status")
    public ResponseEntity<LeadInquiryDto> updateInquiryStatus(
            @PathVariable Long id,
            @RequestParam String status
    ) {
        return ResponseEntity.ok(leadInquiryService.updateStatus(id, status));
    }

    @DeleteMapping("/inquiries/{id}")
    public ResponseEntity<Void> deleteInquiry(@PathVariable Long id) {
        leadInquiryService.deleteInquiry(id);
        return ResponseEntity.noContent().build();
    }
}
