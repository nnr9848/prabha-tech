package com.prabhatech.service;

import com.prabhatech.dto.JobApplicationDto;
import com.prabhatech.entity.JobApplication;
import com.prabhatech.exception.ResourceNotFoundException;
import com.prabhatech.repository.JobApplicationRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class JobApplicationService {

    private final JobApplicationRepository repository;

    public JobApplicationService(JobApplicationRepository repository) {
        this.repository = repository;
    }

    @Transactional
    public JobApplicationDto submitApplication(JobApplicationDto dto) {
        JobApplication application = new JobApplication();
        application.setJobId(dto.getJobId());
        application.setJobTitle(dto.getJobTitle());
        application.setFullName(dto.getFullName());
        application.setEmail(dto.getEmail());
        application.setPhone(dto.getPhone());
        application.setCurrentLocation(dto.getCurrentLocation());
        application.setTotalExperience(dto.getTotalExperience());
        application.setCurrentCompany(dto.getCurrentCompany());
        application.setCurrentDesignation(dto.getCurrentDesignation());
        application.setExpectedSalary(dto.getExpectedSalary());
        application.setNoticePeriod(dto.getNoticePeriod());
        application.setResumeFileName(dto.getResumeFileName());
        application.setResumeLink(dto.getResumeLink());
        application.setCoverNote(dto.getCoverNote());
        application.setStatus("NEW");

        JobApplication saved = repository.save(application);
        return toDto(saved);
    }

    @Transactional(readOnly = true)
    public List<JobApplicationDto> getAllApplications(String status) {
        List<JobApplication> list;
        if (status != null && !status.equalsIgnoreCase("ALL")) {
            list = repository.findByStatusAndDeletedAtIsNullOrderByCreatedAtDesc(status.toUpperCase());
        } else {
            list = repository.findAllByDeletedAtIsNullOrderByCreatedAtDesc();
        }
        return list.stream().map(this::toDto).collect(Collectors.toList());
    }

    @Transactional
    public JobApplicationDto updateStatus(Long id, String status) {
        JobApplication application = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Job application not found with ID: " + id));
        application.setStatus(status.toUpperCase());
        return toDto(repository.save(application));
    }

    @Transactional
    public void deleteApplication(Long id) {
        JobApplication application = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Job application not found with ID: " + id));
        application.setDeletedAt(OffsetDateTime.now());
        repository.save(application);
    }

    private JobApplicationDto toDto(JobApplication entity) {
        JobApplicationDto dto = new JobApplicationDto();
        dto.setId(entity.getId());
        dto.setJobId(entity.getJobId());
        dto.setJobTitle(entity.getJobTitle());
        dto.setFullName(entity.getFullName());
        dto.setEmail(entity.getEmail());
        dto.setPhone(entity.getPhone());
        dto.setCurrentLocation(entity.getCurrentLocation());
        dto.setTotalExperience(entity.getTotalExperience());
        dto.setCurrentCompany(entity.getCurrentCompany());
        dto.setCurrentDesignation(entity.getCurrentDesignation());
        dto.setExpectedSalary(entity.getExpectedSalary());
        dto.setNoticePeriod(entity.getNoticePeriod());
        dto.setResumeFileName(entity.getResumeFileName());
        dto.setResumeLink(entity.getResumeLink());
        dto.setCoverNote(entity.getCoverNote());
        dto.setStatus(entity.getStatus());
        dto.setCreatedAt(entity.getCreatedAt());
        return dto;
    }
}
