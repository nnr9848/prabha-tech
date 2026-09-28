package com.prabhatech.service;

import com.prabhatech.dto.JobPositionDto;
import com.prabhatech.entity.JobPosition;
import com.prabhatech.repository.JobPositionRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class JobPositionService {

    private final JobPositionRepository jobPositionRepository;

    public JobPositionService(JobPositionRepository jobPositionRepository) {
        this.jobPositionRepository = jobPositionRepository;
    }

    @Transactional(readOnly = true)
    public List<JobPositionDto> getActiveJobsPublic() {
        return jobPositionRepository.findByIsActiveTrueOrderByDisplayOrderAscCreatedAtDesc()
                .stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<JobPositionDto> getAllJobsAdmin() {
        return jobPositionRepository.findAllByOrderByDisplayOrderAscCreatedAtDesc()
                .stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public JobPositionDto saveJob(JobPositionDto dto) {
        JobPosition entity;
        if (dto.getId() != null) {
            entity = jobPositionRepository.findById(dto.getId())
                    .orElse(new JobPosition());
        } else if (dto.getSlug() != null) {
            entity = jobPositionRepository.findBySlug(dto.getSlug())
                    .orElse(new JobPosition());
        } else {
            entity = new JobPosition();
        }

        entity.setSlug(dto.getSlug());
        entity.setTitle(dto.getTitle());
        entity.setDepartment(dto.getDepartment());
        entity.setLocation(dto.getLocation());
        entity.setExperience(dto.getExperience());
        entity.setJobType(dto.getJobType() != null ? dto.getJobType() : "Full-time");
        entity.setDescription(dto.getDescription());
        entity.setSkills(dto.getSkills());
        entity.setFeatured(dto.getFeatured() != null ? dto.getFeatured() : false);
        entity.setDisplayOrder(dto.getDisplayOrder() != null ? dto.getDisplayOrder() : 0);
        entity.setIsActive(dto.getIsActive() != null ? dto.getIsActive() : true);

        JobPosition saved = jobPositionRepository.save(entity);
        return mapToDto(saved);
    }

    @Transactional
    public void deleteJob(Long id) {
        jobPositionRepository.deleteById(id);
    }

    private JobPositionDto mapToDto(JobPosition entity) {
        JobPositionDto dto = new JobPositionDto();
        dto.setId(entity.getId());
        dto.setSlug(entity.getSlug());
        dto.setTitle(entity.getTitle());
        dto.setDepartment(entity.getDepartment());
        dto.setLocation(entity.getLocation());
        dto.setExperience(entity.getExperience());
        dto.setJobType(entity.getJobType());
        dto.setDescription(entity.getDescription());
        dto.setSkills(entity.getSkills());
        dto.setFeatured(entity.getFeatured());
        dto.setDisplayOrder(entity.getDisplayOrder());
        dto.setIsActive(entity.getIsActive());
        dto.setCreatedAt(entity.getCreatedAt());
        return dto;
    }
}
