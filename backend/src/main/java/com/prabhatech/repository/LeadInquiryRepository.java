package com.prabhatech.repository;

import com.prabhatech.entity.LeadInquiry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.OffsetDateTime;
import java.util.List;

@Repository
public interface LeadInquiryRepository extends JpaRepository<LeadInquiry, Long> {
    List<LeadInquiry> findAllByDeletedAtIsNullOrderByCreatedAtDesc();
    List<LeadInquiry> findByStatusAndDeletedAtIsNullOrderByCreatedAtDesc(String status);
    List<LeadInquiry> findAllByDeletedAtIsNotNullOrderByDeletedAtDesc();
    long countByDeletedAtIsNotNull();
    void deleteByDeletedAtBefore(OffsetDateTime cutoff);
}
