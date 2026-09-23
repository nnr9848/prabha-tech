package com.prabhatech.uxda.service;

import com.prabhatech.uxda.dto.ArticleDto;
import com.prabhatech.uxda.entity.Article;
import com.prabhatech.uxda.repository.ArticleRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ArticleService {

    private final ArticleRepository articleRepository;

    public ArticleService(ArticleRepository articleRepository) {
        this.articleRepository = articleRepository;
    }

    @Transactional(readOnly = true)
    public List<ArticleDto> getPublishedArticles(String category) {
        List<Article> list;
        if (category != null && !category.isBlank() && !"all".equalsIgnoreCase(category)) {
            list = articleRepository.findByCategoryIgnoreCaseAndIsPublishedTrueOrderByCreatedAtDesc(category);
        } else {
            list = articleRepository.findByIsPublishedTrueOrderByCreatedAtDesc();
        }
        return list.stream().map(this::toDto).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<ArticleDto> getFeaturedArticles() {
        return articleRepository.findByFeaturedTrueAndIsPublishedTrueOrderByCreatedAtDesc()
                .stream().map(this::toDto).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public ArticleDto getBySlug(String slug) {
        return articleRepository.findBySlug(slug)
                .map(this::toDto)
                .orElseThrow(() -> new RuntimeException("Article not found: " + slug));
    }

    @Transactional(readOnly = true)
    public List<ArticleDto> getAllArticlesAdmin() {
        return articleRepository.findAll().stream().map(this::toDto).collect(Collectors.toList());
    }

    @Transactional
    public ArticleDto saveArticle(ArticleDto dto) {
        Article entity;
        if (dto.getId() != null) {
            entity = articleRepository.findById(dto.getId())
                    .orElseThrow(() -> new RuntimeException("Article not found: " + dto.getId()));
        } else {
            entity = new Article();
        }

        entity.setSlug(dto.getSlug());
        entity.setTitle(dto.getTitle());
        entity.setExcerpt(dto.getExcerpt());
        entity.setContent(dto.getContent());
        entity.setCoverImageUrl(dto.getCoverImageUrl());
        entity.setAuthorName(dto.getAuthorName());
        entity.setAuthorAvatar(dto.getAuthorAvatar());
        entity.setCategory(dto.getCategory());
        entity.setReadTime(dto.getReadTime() != null ? dto.getReadTime() : "5 min read");
        entity.setTags(dto.getTags());
        entity.setFeatured(dto.getFeatured() != null ? dto.getFeatured() : false);
        entity.setIsPublished(dto.getIsPublished() != null ? dto.getIsPublished() : true);

        return toDto(articleRepository.save(entity));
    }

    @Transactional
    public void deleteArticle(Long id) {
        articleRepository.deleteById(id);
    }

    private ArticleDto toDto(Article entity) {
        ArticleDto dto = new ArticleDto();
        dto.setId(entity.getId());
        dto.setSlug(entity.getSlug());
        dto.setTitle(entity.getTitle());
        dto.setExcerpt(entity.getExcerpt());
        dto.setContent(entity.getContent());
        dto.setCoverImageUrl(entity.getCoverImageUrl());
        dto.setAuthorName(entity.getAuthorName());
        dto.setAuthorAvatar(entity.getAuthorAvatar());
        dto.setCategory(entity.getCategory());
        dto.setReadTime(entity.getReadTime());
        dto.setTags(entity.getTags());
        dto.setFeatured(entity.getFeatured());
        dto.setIsPublished(entity.getIsPublished());
        dto.setCreatedAt(entity.getCreatedAt());
        return dto;
    }
}
