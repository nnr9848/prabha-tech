package com.prabhatech.uxda.controller;

import com.prabhatech.uxda.dto.ArticleDto;
import com.prabhatech.uxda.dto.CaseStudyDto;
import com.prabhatech.uxda.dto.LeadInquiryDto;
import com.prabhatech.uxda.dto.ServiceItemDto;
import com.prabhatech.uxda.service.ArticleService;
import com.prabhatech.uxda.service.CaseStudyService;
import com.prabhatech.uxda.service.LeadInquiryService;
import com.prabhatech.uxda.service.ServiceItemService;
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

    public PublicController(CaseStudyService caseStudyService,
                            ServiceItemService serviceItemService,
                            ArticleService articleService,
                            LeadInquiryService leadInquiryService) {
        this.caseStudyService = caseStudyService;
        this.serviceItemService = serviceItemService;
        this.articleService = articleService;
        this.leadInquiryService = leadInquiryService;
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
