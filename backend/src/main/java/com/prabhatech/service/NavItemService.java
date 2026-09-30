package com.prabhatech.service;

import com.prabhatech.dto.NavItemDto;
import com.prabhatech.entity.NavItem;
import com.prabhatech.repository.NavItemRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class NavItemService {

    private final NavItemRepository navItemRepository;

    public NavItemService(NavItemRepository navItemRepository) {
        this.navItemRepository = navItemRepository;
    }

    @Transactional(readOnly = true)
    public List<NavItemDto> getActiveNavItems() {
        return navItemRepository.findByIsActiveTrueOrderByDisplayOrderAsc()
                .stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<NavItemDto> getAllNavItemsAdmin() {
        return navItemRepository.findAllByOrderByDisplayOrderAsc()
                .stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public NavItemDto saveNavItem(NavItemDto dto) {
        NavItem entity;
        if (dto.getId() != null) {
            entity = navItemRepository.findById(dto.getId())
                    .orElseThrow(() -> new IllegalArgumentException("NavItem not found with id: " + dto.getId()));
        } else {
            entity = new NavItem();
        }

        entity.setLabel(dto.getLabel());
        entity.setPath(dto.getPath());
        entity.setDisplayOrder(dto.getDisplayOrder() != null ? dto.getDisplayOrder() : 0);
        entity.setIsExternal(dto.getIsExternal() != null ? dto.getIsExternal() : false);
        entity.setIsActive(dto.getIsActive() != null ? dto.getIsActive() : true);

        NavItem saved = navItemRepository.save(entity);
        return mapToDto(saved);
    }

    public void deleteNavItem(Long id) {
        if (!navItemRepository.existsById(id)) {
            throw new IllegalArgumentException("NavItem not found with id: " + id);
        }
        navItemRepository.deleteById(id);
    }

    private NavItemDto mapToDto(NavItem item) {
        return new NavItemDto(
                item.getId(),
                item.getLabel(),
                item.getPath(),
                item.getDisplayOrder(),
                item.getIsExternal(),
                item.getIsActive()
        );
    }
}
