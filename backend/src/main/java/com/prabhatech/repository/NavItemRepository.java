package com.prabhatech.repository;

import com.prabhatech.entity.NavItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NavItemRepository extends JpaRepository<NavItem, Long> {

    List<NavItem> findByIsActiveTrueOrderByDisplayOrderAsc();

    List<NavItem> findAllByOrderByDisplayOrderAsc();
}
