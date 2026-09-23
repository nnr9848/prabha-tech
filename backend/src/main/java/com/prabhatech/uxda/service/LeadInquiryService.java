package com.prabhatech.uxda.service;

import com.prabhatech.uxda.dto.LeadInquiryDto;
import com.prabhatech.uxda.entity.LeadInquiry;
import com.prabhatech.uxda.repository.LeadInquiryRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class LeadInquiryService {

    private final LeadInquiryRepository leadInquiryRepository;

    public LeadInquiryService(LeadInquiryRepository leadInquiryRepository) {
        this.leadInquiryRepository = leadInquiryRepository;
    }

    @Transactional
    public LeadInquiryDto submitInquiry(LeadInquiryDto dto) {
        LeadInquiry entity = new LeadInquiry();
        entity.setFullName(dto.getFullName());
        entity.setEmail(dto.getEmail());
        entity.setCompanyName(dto.getCompanyName());
        entity.setPhoneNumber(dto.getPhoneNumber());
        entity.setProjectType(dto.getProjectType());
        entity.setBudgetRange(dto.getBudgetRange());
        entity.setMessage(dto.getMessage());
        entity.setStatus("NEW");

        return toDto(leadInquiryRepository.save(entity));
    }

    @Transactional(readOnly = true)
    public List<LeadInquiryDto> getAllInquiriesAdmin(String status) {
        List<LeadInquiry> list;
        if (status != null && !status.isBlank() && !"ALL".equalsIgnoreCase(status)) {
            list = leadInquiryRepository.findByStatusOrderByCreatedAtDesc(status.toUpperCase());
        } else {
            list = leadInquiryRepository.findAllByOrderByCreatedAtDesc();
        }
        return list.stream().map(this::toDto).collect(Collectors.toList());
    }

    @Transactional
    public LeadInquiryDto updateStatus(Long id, String status) {
        LeadInquiry entity = leadInquiryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Lead inquiry not found: " + id));
        entity.setStatus(status.toUpperCase());
        return toDto(leadInquiryRepository.save(entity));
    }

    @Transactional
    public void deleteInquiry(Long id) {
        leadInquiryRepository.deleteById(id);
    }

    private LeadInquiryDto toDto(LeadInquiry entity) {
        LeadInquiryDto dto = new LeadInquiryDto();
        dto.setId(entity.getId());
        dto.setFullName(entity.getFullName());
        dto.setEmail(entity.getEmail());
        dto.setCompanyName(entity.getCompanyName());
        dto.setPhoneNumber(entity.getPhoneNumber());
        dto.setProjectType(entity.getProjectType());
        dto.setBudgetRange(entity.getBudgetRange());
        dto.setMessage(entity.getMessage());
        dto.setStatus(entity.getStatus());
        dto.setCreatedAt(entity.getCreatedAt());
        return dto;
    }
}
