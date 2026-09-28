package com.prabhatech.entity;

import jakarta.persistence.*;
import java.time.OffsetDateTime;

@Entity
@Table(name = "job_applications")
public class JobApplication {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "job_id")
    private Long jobId;

    @Column(name = "job_title", nullable = false)
    private String jobTitle;

    @Column(name = "full_name", nullable = false)
    private String fullName;

    @Column(name = "email", nullable = false)
    private String email;

    @Column(name = "phone")
    private String phone;

    @Column(name = "current_location")
    private String currentLocation;

    @Column(name = "total_experience")
    private String totalExperience;

    @Column(name = "current_company")
    private String currentCompany;

    @Column(name = "current_designation")
    private String currentDesignation;

    @Column(name = "expected_salary")
    private String expectedSalary;

    @Column(name = "notice_period")
    private String noticePeriod;

    @Column(name = "resume_file_name")
    private String resumeFileName;

    @Column(name = "resume_link", columnDefinition = "TEXT")
    private String resumeLink;

    @Column(name = "cover_note", columnDefinition = "TEXT")
    private String coverNote;

    @Column(name = "status", nullable = false)
    private String status = "NEW"; // NEW, REVIEWING, SHORTLISTED, REJECTED, HIRED

    @Column(name = "created_at", insertable = false, updatable = false)
    private OffsetDateTime createdAt;

    @Column(name = "updated_at")
    private OffsetDateTime updatedAt;

    public JobApplication() {}

    @PrePersist
    protected void onCreate() {
        if (createdAt == null) createdAt = OffsetDateTime.now();
        if (updatedAt == null) updatedAt = OffsetDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = OffsetDateTime.now();
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getJobId() { return jobId; }
    public void setJobId(Long jobId) { this.jobId = jobId; }

    public String getJobTitle() { return jobTitle; }
    public void setJobTitle(String jobTitle) { this.jobTitle = jobTitle; }

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getCurrentLocation() { return currentLocation; }
    public void setCurrentLocation(String currentLocation) { this.currentLocation = currentLocation; }

    public String getTotalExperience() { return totalExperience; }
    public void setTotalExperience(String totalExperience) { this.totalExperience = totalExperience; }

    public String getCurrentCompany() { return currentCompany; }
    public void setCurrentCompany(String currentCompany) { this.currentCompany = currentCompany; }

    public String getCurrentDesignation() { return currentDesignation; }
    public void setCurrentDesignation(String currentDesignation) { this.currentDesignation = currentDesignation; }

    public String getExpectedSalary() { return expectedSalary; }
    public void setExpectedSalary(String expectedSalary) { this.expectedSalary = expectedSalary; }

    public String getNoticePeriod() { return noticePeriod; }
    public void setNoticePeriod(String noticePeriod) { this.noticePeriod = noticePeriod; }

    public String getResumeFileName() { return resumeFileName; }
    public void setResumeFileName(String resumeFileName) { this.resumeFileName = resumeFileName; }

    public String getResumeLink() { return resumeLink; }
    public void setResumeLink(String resumeLink) { this.resumeLink = resumeLink; }

    public String getCoverNote() { return coverNote; }
    public void setCoverNote(String coverNote) { this.coverNote = coverNote; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public OffsetDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(OffsetDateTime createdAt) { this.createdAt = createdAt; }

    public OffsetDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(OffsetDateTime updatedAt) { this.updatedAt = updatedAt; }
}
