package com.prabhatech.repository;

import com.prabhatech.entity.HeroConfig;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface HeroConfigRepository extends JpaRepository<HeroConfig, Long> {
    Optional<HeroConfig> findByConfigKey(String configKey);
}
