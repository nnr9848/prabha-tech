package com.prabhatech.service;

import com.prabhatech.dto.CaseStudyDto;
import com.prabhatech.entity.CaseStudy;
import com.prabhatech.repository.CaseStudyRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CaseStudyService {

    private final CaseStudyRepository caseStudyRepository;

    public CaseStudyService(CaseStudyRepository caseStudyRepository) {
        this.caseStudyRepository = caseStudyRepository;
    }

    @Transactional(readOnly = true)
    public List<CaseStudyDto> getPublishedCaseStudies(String category) {
        List<CaseStudy> items;
        if (category != null && !category.isBlank() && !"all".equalsIgnoreCase(category)) {
            items = caseStudyRepository.findByCategoryIgnoreCaseAndIsPublishedTrueOrderByDisplayOrderAsc(category);
        } else {
            items = caseStudyRepository.findByIsPublishedTrueOrderByDisplayOrderAsc();
        }
        return items.stream().map(this::toDto).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<CaseStudyDto> getFeaturedCaseStudies() {
        return caseStudyRepository.findByFeaturedTrueAndIsPublishedTrueOrderByDisplayOrderAsc()
                .stream().map(this::toDto).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public CaseStudyDto getBySlug(String slug) {
        return caseStudyRepository.findBySlug(slug)
                .map(this::toDto)
                .orElseThrow(() -> new RuntimeException("Case study not found for slug: " + slug));
    }

    // Admin CMS methods
    @Transactional(readOnly = true)
    public List<CaseStudyDto> getAllCaseStudiesAdmin() {
        return caseStudyRepository.findAll().stream().map(this::toDto).collect(Collectors.toList());
    }

    @Transactional
    public CaseStudyDto saveCaseStudy(CaseStudyDto dto) {
        CaseStudy entity;
        if (dto.getId() != null) {
            entity = caseStudyRepository.findById(dto.getId())
                    .orElseThrow(() -> new RuntimeException("Case study not found: " + dto.getId()));
        } else {
            entity = new CaseStudy();
        }

        entity.setSlug(dto.getSlug());
        entity.setTitle(dto.getTitle());
        entity.setSubtitle(dto.getSubtitle());
        entity.setClientName(dto.getClientName());
        entity.setCategory(dto.getCategory());
        entity.setHeroImageUrl(dto.getHeroImageUrl());
        entity.setThumbnailUrl(dto.getThumbnailUrl());
        entity.setVideoUrl(dto.getVideoUrl());
        entity.setSummary(dto.getSummary());
        entity.setChallenge(dto.getChallenge());
        entity.setSolution(dto.getSolution());
        entity.setResults(dto.getResults());
        entity.setAwards(dto.getAwards());
        entity.setMetrics(dto.getMetrics());
        entity.setTags(dto.getTags());
        entity.setFeatured(dto.getFeatured() != null ? dto.getFeatured() : false);
        entity.setDisplayOrder(dto.getDisplayOrder() != null ? dto.getDisplayOrder() : 0);
        entity.setIsPublished(dto.getIsPublished() != null ? dto.getIsPublished() : true);

        return toDto(caseStudyRepository.save(entity));
    }

    @Transactional
    public void deleteCaseStudy(Long id) {
        caseStudyRepository.deleteById(id);
    }

    private CaseStudyDto toDto(CaseStudy entity) {
        CaseStudyDto dto = new CaseStudyDto();
        dto.setId(entity.getId());
        dto.setSlug(entity.getSlug());
        dto.setTitle(entity.getTitle());
        dto.setSubtitle(entity.getSubtitle());
        dto.setClientName(entity.getClientName());
        dto.setCategory(entity.getCategory());
        dto.setHeroImageUrl(entity.getHeroImageUrl());
        dto.setThumbnailUrl(entity.getThumbnailUrl());
        dto.setVideoUrl(entity.getVideoUrl());
        dto.setSummary(entity.getSummary());
        dto.setChallenge(entity.getChallenge());
        dto.setSolution(entity.getSolution());
        dto.setResults(entity.getResults());
        dto.setAwards(entity.getAwards());
        dto.setMetrics(entity.getMetrics());
        dto.setTags(entity.getTags());
        dto.setFeatured(entity.getFeatured());
        dto.setDisplayOrder(entity.getDisplayOrder());
        dto.setIsPublished(entity.getIsPublished());
        dto.setCreatedAt(entity.getCreatedAt());
        dto.setUpdatedAt(entity.getUpdatedAt());
        return dto;
    }
}
