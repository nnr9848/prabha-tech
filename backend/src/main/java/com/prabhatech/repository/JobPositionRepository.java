package com.prabhatech.repository;

import com.prabhatech.entity.JobPosition;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface JobPositionRepository extends JpaRepository<JobPosition, Long> {
    List<JobPosition> findByIsActiveTrueOrderByDisplayOrderAscCreatedAtDesc();
    List<JobPosition> findAllByOrderByDisplayOrderAscCreatedAtDesc();
    Optional<JobPosition> findBySlug(String slug);
}
