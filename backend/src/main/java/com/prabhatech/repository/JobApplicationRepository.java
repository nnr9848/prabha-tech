package com.prabhatech.repository;

import com.prabhatech.entity.JobApplication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobApplicationRepository extends JpaRepository<JobApplication, Long> {
    List<JobApplication> findAllByOrderByCreatedAtDesc();
    List<JobApplication> findByStatusOrderByCreatedAtDesc(String status);
    List<JobApplication> findByJobIdOrderByCreatedAtDesc(Long jobId);
}
