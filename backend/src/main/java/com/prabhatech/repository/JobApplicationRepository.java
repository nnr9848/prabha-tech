package com.prabhatech.repository;

import com.prabhatech.entity.JobApplication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.OffsetDateTime;
import java.util.List;

@Repository
public interface JobApplicationRepository extends JpaRepository<JobApplication, Long> {
    List<JobApplication> findAllByDeletedAtIsNullOrderByCreatedAtDesc();
    List<JobApplication> findByStatusAndDeletedAtIsNullOrderByCreatedAtDesc(String status);
    List<JobApplication> findByJobIdAndDeletedAtIsNullOrderByCreatedAtDesc(Long jobId);
    List<JobApplication> findAllByDeletedAtIsNotNullOrderByDeletedAtDesc();
    long countByDeletedAtIsNotNull();
    void deleteByDeletedAtBefore(OffsetDateTime cutoff);
}
