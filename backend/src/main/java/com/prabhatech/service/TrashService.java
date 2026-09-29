package com.prabhatech.service;

import com.prabhatech.dto.TrashItemDto;
import com.prabhatech.entity.Article;
import com.prabhatech.entity.CaseStudy;
import com.prabhatech.entity.JobApplication;
import com.prabhatech.entity.JobPosition;
import com.prabhatech.entity.LeadInquiry;
import com.prabhatech.exception.ResourceNotFoundException;
import com.prabhatech.repository.ArticleRepository;
import com.prabhatech.repository.CaseStudyRepository;
import com.prabhatech.repository.JobApplicationRepository;
import com.prabhatech.repository.JobPositionRepository;
import com.prabhatech.repository.LeadInquiryRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.OffsetDateTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@Service
public class TrashService {

    private static final Logger log = LoggerFactory.getLogger(TrashService.class);
    private static final int RETENTION_DAYS = 30;

    private final LeadInquiryRepository leadInquiryRepository;
    private final JobApplicationRepository jobApplicationRepository;
    private final ArticleRepository articleRepository;
    private final CaseStudyRepository caseStudyRepository;
    private final JobPositionRepository jobPositionRepository;

    public TrashService(LeadInquiryRepository leadInquiryRepository,
                        JobApplicationRepository jobApplicationRepository,
                        ArticleRepository articleRepository,
                        CaseStudyRepository caseStudyRepository,
                        JobPositionRepository jobPositionRepository) {
        this.leadInquiryRepository = leadInquiryRepository;
        this.jobApplicationRepository = jobApplicationRepository;
        this.articleRepository = articleRepository;
        this.caseStudyRepository = caseStudyRepository;
        this.jobPositionRepository = jobPositionRepository;
    }

    @Transactional(readOnly = true)
    public List<TrashItemDto> getAllTrashItems() {
        List<TrashItemDto> list = new ArrayList<>();
        OffsetDateTime now = OffsetDateTime.now();

        // 1. Inquiries
        for (LeadInquiry item : leadInquiryRepository.findAllByDeletedAtIsNotNullOrderByDeletedAtDesc()) {
            list.add(new TrashItemDto(
                    item.getId(),
                    "INQUIRY",
                    item.getFullName() + (item.getCompanyName() != null ? " (" + item.getCompanyName() + ")" : ""),
                    item.getEmail() + " • " + (item.getProjectType() != null ? item.getProjectType() : "General"),
                    item.getDeletedAt(),
                    calculateRemainingDays(item.getDeletedAt(), now)
            ));
        }

        // 2. Job Applications
        for (JobApplication item : jobApplicationRepository.findAllByDeletedAtIsNotNullOrderByDeletedAtDesc()) {
            list.add(new TrashItemDto(
                    item.getId(),
                    "JOB_APPLICATION",
                    item.getFullName() + " - " + item.getJobTitle(),
                    item.getEmail() + " • " + item.getCurrentLocation() + " • " + item.getTotalExperience(),
                    item.getDeletedAt(),
                    calculateRemainingDays(item.getDeletedAt(), now)
            ));
        }

        // 3. Articles
        for (Article item : articleRepository.findAllByDeletedAtIsNotNullOrderByDeletedAtDesc()) {
            list.add(new TrashItemDto(
                    item.getId(),
                    "ARTICLE",
                    item.getTitle(),
                    item.getCategory() + " • by " + item.getAuthorName(),
                    item.getDeletedAt(),
                    calculateRemainingDays(item.getDeletedAt(), now)
            ));
        }

        // 4. Case Studies
        for (CaseStudy item : caseStudyRepository.findAllByDeletedAtIsNotNullOrderByDeletedAtDesc()) {
            list.add(new TrashItemDto(
                    item.getId(),
                    "CASE_STUDY",
                    item.getTitle(),
                    item.getClientName() + " • " + item.getCategory(),
                    item.getDeletedAt(),
                    calculateRemainingDays(item.getDeletedAt(), now)
            ));
        }

        // 5. Job Positions
        for (JobPosition item : jobPositionRepository.findAllByDeletedAtIsNotNullOrderByDeletedAtDesc()) {
            list.add(new TrashItemDto(
                    item.getId(),
                    "JOB_POSITION",
                    item.getTitle(),
                    item.getDepartment() + " • " + item.getLocation() + " • " + item.getExperience(),
                    item.getDeletedAt(),
                    calculateRemainingDays(item.getDeletedAt(), now)
            ));
        }

        // Sort descending by deletedAt
        list.sort(Comparator.comparing(TrashItemDto::getDeletedAt, Comparator.nullsLast(Comparator.reverseOrder())));
        return list;
    }

    @Transactional(readOnly = true)
    public long getTrashCount() {
        return leadInquiryRepository.countByDeletedAtIsNotNull()
                + jobApplicationRepository.countByDeletedAtIsNotNull()
                + articleRepository.countByDeletedAtIsNotNull()
                + caseStudyRepository.countByDeletedAtIsNotNull()
                + jobPositionRepository.countByDeletedAtIsNotNull();
    }

    @Transactional
    public void restoreItem(String entityType, Long id) {
        switch (entityType.toUpperCase()) {
            case "INQUIRY":
                LeadInquiry inquiry = leadInquiryRepository.findById(id)
                        .orElseThrow(() -> new ResourceNotFoundException("Inquiry not found: " + id));
                inquiry.setDeletedAt(null);
                leadInquiryRepository.save(inquiry);
                break;
            case "JOB_APPLICATION":
                JobApplication app = jobApplicationRepository.findById(id)
                        .orElseThrow(() -> new ResourceNotFoundException("Application not found: " + id));
                app.setDeletedAt(null);
                jobApplicationRepository.save(app);
                break;
            case "ARTICLE":
                Article article = articleRepository.findById(id)
                        .orElseThrow(() -> new ResourceNotFoundException("Article not found: " + id));
                article.setDeletedAt(null);
                articleRepository.save(article);
                break;
            case "CASE_STUDY":
                CaseStudy cs = caseStudyRepository.findById(id)
                        .orElseThrow(() -> new ResourceNotFoundException("Case study not found: " + id));
                cs.setDeletedAt(null);
                caseStudyRepository.save(cs);
                break;
            case "JOB_POSITION":
                JobPosition jp = jobPositionRepository.findById(id)
                        .orElseThrow(() -> new ResourceNotFoundException("Job position not found: " + id));
                jp.setDeletedAt(null);
                jobPositionRepository.save(jp);
                break;
            default:
                throw new IllegalArgumentException("Unknown entity type for restore: " + entityType);
        }
    }

    @Transactional
    public void purgeItem(String entityType, Long id) {
        switch (entityType.toUpperCase()) {
            case "INQUIRY":
                leadInquiryRepository.deleteById(id);
                break;
            case "JOB_APPLICATION":
                jobApplicationRepository.deleteById(id);
                break;
            case "ARTICLE":
                articleRepository.deleteById(id);
                break;
            case "CASE_STUDY":
                caseStudyRepository.deleteById(id);
                break;
            case "JOB_POSITION":
                jobPositionRepository.deleteById(id);
                break;
            default:
                throw new IllegalArgumentException("Unknown entity type for permanent purge: " + entityType);
        }
    }

    @Transactional
    public void emptyTrash() {
        for (LeadInquiry item : leadInquiryRepository.findAllByDeletedAtIsNotNullOrderByDeletedAtDesc()) {
            leadInquiryRepository.delete(item);
        }
        for (JobApplication item : jobApplicationRepository.findAllByDeletedAtIsNotNullOrderByDeletedAtDesc()) {
            jobApplicationRepository.delete(item);
        }
        for (Article item : articleRepository.findAllByDeletedAtIsNotNullOrderByDeletedAtDesc()) {
            articleRepository.delete(item);
        }
        for (CaseStudy item : caseStudyRepository.findAllByDeletedAtIsNotNullOrderByDeletedAtDesc()) {
            caseStudyRepository.delete(item);
        }
        for (JobPosition item : jobPositionRepository.findAllByDeletedAtIsNotNullOrderByDeletedAtDesc()) {
            jobPositionRepository.delete(item);
        }
        log.info("Successfully emptied entire admin trash recycle bin.");
    }

    /**
     * Daily background task running at 02:00 AM server time to permanently purge
     * items soft-deleted for more than RETENTION_DAYS (30 days).
     */
    @Scheduled(cron = "0 0 2 * * ?")
    @Transactional
    public void purgeExpiredTrashItems() {
        OffsetDateTime cutoff = OffsetDateTime.now().minusDays(RETENTION_DAYS);
        log.info("Running automatic 30-day trash purge for items deleted before {}", cutoff);
        try {
            leadInquiryRepository.deleteByDeletedAtBefore(cutoff);
            jobApplicationRepository.deleteByDeletedAtBefore(cutoff);
            articleRepository.deleteByDeletedAtBefore(cutoff);
            caseStudyRepository.deleteByDeletedAtBefore(cutoff);
            jobPositionRepository.deleteByDeletedAtBefore(cutoff);
            log.info("Automatic 30-day trash purge completed successfully.");
        } catch (Exception e) {
            log.error("Error during automatic trash purge: {}", e.getMessage(), e);
        }
    }

    private long calculateRemainingDays(OffsetDateTime deletedAt, OffsetDateTime now) {
        if (deletedAt == null) return RETENTION_DAYS;
        long daysPassed = ChronoUnit.DAYS.between(deletedAt, now);
        return Math.max(0, RETENTION_DAYS - daysPassed);
    }
}
