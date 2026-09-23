package com.prabhatech.service;

import com.prabhatech.dto.ServiceItemDto;
import com.prabhatech.entity.ServiceItem;
import com.prabhatech.repository.ServiceItemRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ServiceItemService {

    private final ServiceItemRepository serviceItemRepository;

    public ServiceItemService(ServiceItemRepository serviceItemRepository) {
        this.serviceItemRepository = serviceItemRepository;
    }

    @Transactional(readOnly = true)
    public List<ServiceItemDto> getActiveServices() {
        return serviceItemRepository.findByIsActiveTrueOrderByDisplayOrderAsc()
                .stream().map(this::toDto).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public ServiceItemDto getBySlug(String slug) {
        return serviceItemRepository.findBySlug(slug)
                .map(this::toDto)
                .orElseThrow(() -> new RuntimeException("Service not found: " + slug));
    }

    @Transactional(readOnly = true)
    public List<ServiceItemDto> getAllServicesAdmin() {
        return serviceItemRepository.findAll().stream().map(this::toDto).collect(Collectors.toList());
    }

    @Transactional
    public ServiceItemDto saveService(ServiceItemDto dto) {
        ServiceItem entity;
        if (dto.getId() != null) {
            entity = serviceItemRepository.findById(dto.getId())
                    .orElseThrow(() -> new RuntimeException("Service not found: " + dto.getId()));
        } else {
            entity = new ServiceItem();
        }

        entity.setSlug(dto.getSlug());
        entity.setTitle(dto.getTitle());
        entity.setTagline(dto.getTagline());
        entity.setIcon(dto.getIcon());
        entity.setShortDescription(dto.getShortDescription());
        entity.setFullDescription(dto.getFullDescription());
        entity.setDeliverables(dto.getDeliverables());
        entity.setDisplayOrder(dto.getDisplayOrder() != null ? dto.getDisplayOrder() : 0);
        entity.setIsActive(dto.getIsActive() != null ? dto.getIsActive() : true);

        return toDto(serviceItemRepository.save(entity));
    }

    @Transactional
    public void deleteService(Long id) {
        serviceItemRepository.deleteById(id);
    }

    private ServiceItemDto toDto(ServiceItem entity) {
        ServiceItemDto dto = new ServiceItemDto();
        dto.setId(entity.getId());
        dto.setSlug(entity.getSlug());
        dto.setTitle(entity.getTitle());
        dto.setTagline(entity.getTagline());
        dto.setIcon(entity.getIcon());
        dto.setShortDescription(entity.getShortDescription());
        dto.setFullDescription(entity.getFullDescription());
        dto.setDeliverables(entity.getDeliverables());
        dto.setDisplayOrder(entity.getDisplayOrder());
        dto.setIsActive(entity.getIsActive());
        return dto;
    }
}
