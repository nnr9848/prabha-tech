package com.prabhatech.uxda.service;

import com.prabhatech.uxda.dto.SocialLinkDto;
import com.prabhatech.uxda.entity.SocialLink;
import com.prabhatech.uxda.exception.ResourceNotFoundException;
import com.prabhatech.uxda.repository.SocialLinkRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SocialLinkService {

    private final SocialLinkRepository repository;

    public SocialLinkService(SocialLinkRepository repository) {
        this.repository = repository;
    }

    @Transactional(readOnly = true)
    public List<SocialLinkDto> getActiveSocialLinks() {
        return repository.findByIsActiveTrueOrderByDisplayOrderAsc()
                .stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<SocialLinkDto> getAllSocialLinksAdmin() {
        return repository.findAllByOrderByDisplayOrderAsc()
                .stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public SocialLinkDto createSocialLink(SocialLinkDto dto) {
        SocialLink entity = new SocialLink();
        updateEntityFromDto(entity, dto);
        SocialLink saved = repository.save(entity);
        return mapToDto(saved);
    }

    @Transactional
    public SocialLinkDto updateSocialLink(Long id, SocialLinkDto dto) {
        SocialLink entity = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("SocialLink not found with id: " + id));
        updateEntityFromDto(entity, dto);
        SocialLink updated = repository.save(entity);
        return mapToDto(updated);
    }

    @Transactional
    public void deleteSocialLink(Long id) {
        if (!repository.existsById(id)) {
            throw new ResourceNotFoundException("SocialLink not found with id: " + id);
        }
        repository.deleteById(id);
    }

    private SocialLinkDto mapToDto(SocialLink entity) {
        SocialLinkDto dto = new SocialLinkDto();
        dto.setId(entity.getId());
        dto.setPlatformKey(entity.getPlatformKey());
        dto.setPlatformName(entity.getPlatformName());
        dto.setUrl(entity.getUrl());
        dto.setBgColor(entity.getBgColor());
        dto.setDisplayOrder(entity.getDisplayOrder());
        dto.setIsActive(entity.getIsActive());
        dto.setCreatedAt(entity.getCreatedAt());
        dto.setUpdatedAt(entity.getUpdatedAt());
        return dto;
    }

    private void updateEntityFromDto(SocialLink entity, SocialLinkDto dto) {
        if (dto.getPlatformKey() != null) entity.setPlatformKey(dto.getPlatformKey().toLowerCase().trim());
        if (dto.getPlatformName() != null) entity.setPlatformName(dto.getPlatformName().trim());
        if (dto.getUrl() != null) entity.setUrl(dto.getUrl().trim());
        if (dto.getBgColor() != null) entity.setBgColor(dto.getBgColor().trim());
        if (dto.getDisplayOrder() != null) entity.setDisplayOrder(dto.getDisplayOrder());
        if (dto.getIsActive() != null) entity.setIsActive(dto.getIsActive());
    }
}
