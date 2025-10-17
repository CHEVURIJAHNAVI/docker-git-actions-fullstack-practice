package com.klef.cicd.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "habits")
public class Habit {

    @Id
    private long id;

    @Column(name = "user_id", nullable = false)
    private long userId;

    @Column(name = "title", length = 100, nullable = false)
    private String title;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "frequency", length = 20)
    private String frequency; // DAILY / WEEKLY / CUSTOM

    @Column(name = "is_good")
    private Boolean isGood; // Changed from boolean to Boolean

    // ======= Constructors =======
    public Habit() {}

    public Habit(long userId, String title, String description, String frequency, Boolean isGood) {
        this.userId = userId;
        this.title = title;
        this.description = description;
        this.frequency = frequency;
        this.isGood = isGood;
    }

    // ======= Getters and Setters =======
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getUserId() {
        return userId;
    }

    public void setUserId(long userId) {
        this.userId = userId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getFrequency() {
        return frequency;
    }

    public void setFrequency(String frequency) {
        this.frequency = frequency;
    }

    public Boolean getIsGood() { // Wrapper getter
        return isGood;
    }

    public void setIsGood(Boolean isGood) { // Wrapper setter
        this.isGood = isGood;
    }

    // ======= toString =======
    @Override
    public String toString() {
        return "Habit [id=" + id + ", userId=" + userId + ", title=" + title + ", description=" + description
                + ", frequency=" + frequency + ", isGood=" + isGood + "]";
    }
}
