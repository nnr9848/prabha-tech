package com.prabhatech.controller;

import com.prabhatech.dto.TrashItemDto;
import com.prabhatech.service.TrashService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/admin/trash")
@PreAuthorize("hasRole('ADMIN')")
public class AdminTrashController {

    private final TrashService trashService;

    public AdminTrashController(TrashService trashService) {
        this.trashService = trashService;
    }

    @GetMapping
    public ResponseEntity<List<TrashItemDto>> getAllTrashItems() {
        return ResponseEntity.ok(trashService.getAllTrashItems());
    }

    @GetMapping("/count")
    public ResponseEntity<Map<String, Long>> getTrashCount() {
        return ResponseEntity.ok(Map.of("count", trashService.getTrashCount()));
    }

    @PostMapping("/{entityType}/{id}/restore")
    public ResponseEntity<Void> restoreItem(
            @PathVariable String entityType,
            @PathVariable Long id) {
        trashService.restoreItem(entityType, id);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{entityType}/{id}/permanent")
    public ResponseEntity<Void> purgeItem(
            @PathVariable String entityType,
            @PathVariable Long id) {
        trashService.purgeItem(entityType, id);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/empty")
    public ResponseEntity<Void> emptyTrash() {
        trashService.emptyTrash();
        return ResponseEntity.noContent().build();
    }
}
