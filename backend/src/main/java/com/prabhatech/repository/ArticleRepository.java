package com.prabhatech.repository;

import com.prabhatech.entity.Article;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ArticleRepository extends JpaRepository<Article, Long> {
    Optional<Article> findBySlug(String slug);
    List<Article> findByIsPublishedTrueOrderByCreatedAtDesc();
    List<Article> findByFeaturedTrueAndIsPublishedTrueOrderByCreatedAtDesc();
    List<Article> findByCategoryIgnoreCaseAndIsPublishedTrueOrderByCreatedAtDesc(String category);
}
