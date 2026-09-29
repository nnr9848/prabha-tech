package com.prabhatech.repository;

import com.prabhatech.entity.Article;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface ArticleRepository extends JpaRepository<Article, Long> {
    Optional<Article> findBySlugAndDeletedAtIsNull(String slug);
    List<Article> findAllByDeletedAtIsNullOrderByCreatedAtDesc();
    List<Article> findByIsPublishedTrueAndDeletedAtIsNullOrderByCreatedAtDesc();
    List<Article> findByFeaturedTrueAndIsPublishedTrueAndDeletedAtIsNullOrderByCreatedAtDesc();
    List<Article> findByCategoryIgnoreCaseAndIsPublishedTrueAndDeletedAtIsNullOrderByCreatedAtDesc(String category);
    List<Article> findAllByDeletedAtIsNotNullOrderByDeletedAtDesc();
    long countByDeletedAtIsNotNull();
    void deleteByDeletedAtBefore(OffsetDateTime cutoff);
}
