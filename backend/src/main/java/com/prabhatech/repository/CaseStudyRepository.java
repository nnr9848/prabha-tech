package com.prabhatech.repository;

import com.prabhatech.entity.CaseStudy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface CaseStudyRepository extends JpaRepository<CaseStudy, Long> {
    Optional<CaseStudy> findBySlugAndDeletedAtIsNull(String slug);
    List<CaseStudy> findAllByDeletedAtIsNullOrderByDisplayOrderAsc();
    List<CaseStudy> findByIsPublishedTrueAndDeletedAtIsNullOrderByDisplayOrderAsc();
    List<CaseStudy> findByFeaturedTrueAndIsPublishedTrueAndDeletedAtIsNullOrderByDisplayOrderAsc();
    List<CaseStudy> findByCategoryIgnoreCaseAndIsPublishedTrueAndDeletedAtIsNullOrderByDisplayOrderAsc(String category);
    List<CaseStudy> findAllByDeletedAtIsNotNullOrderByDeletedAtDesc();
    long countByDeletedAtIsNotNull();
    void deleteByDeletedAtBefore(OffsetDateTime cutoff);
}
