package com.prabhatech.repository;

import com.prabhatech.entity.JobPosition;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface JobPositionRepository extends JpaRepository<JobPosition, Long> {
    List<JobPosition> findByIsActiveTrueAndDeletedAtIsNullOrderByDisplayOrderAscCreatedAtDesc();
    List<JobPosition> findAllByDeletedAtIsNullOrderByDisplayOrderAscCreatedAtDesc();
    Optional<JobPosition> findBySlugAndDeletedAtIsNull(String slug);
    List<JobPosition> findAllByDeletedAtIsNotNullOrderByDeletedAtDesc();
    long countByDeletedAtIsNotNull();
    void deleteByDeletedAtBefore(OffsetDateTime cutoff);
}
