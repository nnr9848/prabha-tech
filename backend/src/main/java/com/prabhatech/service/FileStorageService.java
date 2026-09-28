package com.prabhatech.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

@Service
public class FileStorageService {

    private static final Logger log = LoggerFactory.getLogger(FileStorageService.class);

    private final Path uploadLocation;

    private static final List<String> ALLOWED_EXTENSIONS = Arrays.asList(".pdf", ".doc", ".docx");
    private static final long MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB

    public FileStorageService(@Value("${app.upload.dir:uploads/resumes}") String uploadDir) {
        this.uploadLocation = Paths.get(uploadDir).toAbsolutePath().normalize();
        try {
            Files.createDirectories(this.uploadLocation);
            log.info("Initialized FileStorageService at: {}", this.uploadLocation);
        } catch (IOException ex) {
            throw new RuntimeException("Could not initialize file storage directory: " + this.uploadLocation, ex);
        }
    }

    public String storeResume(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("Cannot store empty file.");
        }

        if (file.getSize() > MAX_FILE_SIZE_BYTES) {
            throw new IllegalArgumentException("File size exceeds 5MB limit.");
        }

        String originalFilename = StringUtils.cleanPath(file.getOriginalFilename() != null ? file.getOriginalFilename() : "resume.pdf");
        String extension = "";
        int dotIndex = originalFilename.lastIndexOf('.');
        if (dotIndex >= 0) {
            extension = originalFilename.substring(dotIndex).toLowerCase();
        }

        if (!ALLOWED_EXTENSIONS.contains(extension)) {
            throw new IllegalArgumentException("Invalid file type (" + extension + "). Only PDF, DOC, and DOCX are allowed.");
        }

        // Sanitize base name (alphanumeric and dashes only)
        String baseName = originalFilename.substring(0, dotIndex > 0 ? dotIndex : originalFilename.length())
                .replaceAll("[^a-zA-Z0-9_-]", "_");
        if (baseName.length() > 30) {
            baseName = baseName.substring(0, 30);
        }

        // Safe unique file name: <uuid-first-8>-<sanitized-base-name><extension>
        String storedFilename = UUID.randomUUID().toString().substring(0, 8) + "-" + baseName + extension;

        try {
            Path targetPath = this.uploadLocation.resolve(storedFilename).normalize();
            // Guard against path traversal
            if (!targetPath.startsWith(this.uploadLocation)) {
                throw new SecurityException("Cannot store file outside target directory: " + storedFilename);
            }

            try (InputStream inputStream = file.getInputStream()) {
                Files.copy(inputStream, targetPath, StandardCopyOption.REPLACE_EXISTING);
            }

            log.info("Successfully stored resume: {} (original: {})", storedFilename, originalFilename);
            return storedFilename;
        } catch (IOException ex) {
            throw new RuntimeException("Failed to store file: " + storedFilename, ex);
        }
    }

    public Resource loadAsResource(String filename) {
        try {
            String sanitizedFilename = Paths.get(filename).getFileName().toString();
            Path filePath = this.uploadLocation.resolve(sanitizedFilename).normalize();

            if (!filePath.startsWith(this.uploadLocation)) {
                throw new SecurityException("Access denied to file outside storage: " + filename);
            }

            Resource resource = new UrlResource(filePath.toUri());
            if (resource.exists() && resource.isReadable()) {
                return resource;
            } else {
                throw new RuntimeException("File not found or unreadable: " + filename);
            }
        } catch (MalformedURLException ex) {
            throw new RuntimeException("Error resolving file path: " + filename, ex);
        }
    }
}
