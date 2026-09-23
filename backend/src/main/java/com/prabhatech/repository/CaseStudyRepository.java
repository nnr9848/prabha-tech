package com.prabhatech.repository;

import com.prabhatech.entity.CaseStudy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CaseStudyRepository extends JpaRepository<CaseStudy, Long> {
    Optional<CaseStudy> findBySlug(String slug);
    List<CaseStudy> findByIsPublishedTrueOrderByDisplayOrderAsc();
    List<CaseStudy> findByFeaturedTrueAndIsPublishedTrueOrderByDisplayOrderAsc();
    List<CaseStudy> findByCategoryIgnoreCaseAndIsPublishedTrueOrderByDisplayOrderAsc(String category);
}
