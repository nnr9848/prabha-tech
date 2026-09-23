package com.prabhatech.uxda.repository;

import com.prabhatech.uxda.entity.LeadInquiry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LeadInquiryRepository extends JpaRepository<LeadInquiry, Long> {
    List<LeadInquiry> findAllByOrderByCreatedAtDesc();
    List<LeadInquiry> findByStatusOrderByCreatedAtDesc(String status);
}
