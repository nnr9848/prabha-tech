package com.prabhatech.repository;

import com.prabhatech.entity.ServiceItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ServiceItemRepository extends JpaRepository<ServiceItem, Long> {
    Optional<ServiceItem> findBySlug(String slug);
    List<ServiceItem> findByIsActiveTrueOrderByDisplayOrderAsc();
}
