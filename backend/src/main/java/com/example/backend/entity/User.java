package com.example.backend.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String username;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(name = "created_at")
    private LocalDateTime created_at;

    @Column(name = "updated_at")
    private LocalDateTime updated_at;

    @Column(name = "last_login")
    private LocalDateTime last_login;

    public User() {}

    public User(String username, String email, String password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }

     @PrePersist
    protected void onCreate() {
        created_at = LocalDateTime.now();
        updated_at = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updated_at = LocalDateTime.now();
    }

    // Getters and Setters

    public Long getId() {return id;}

    public String getUsername() {return username; }
    public void setUsername(String username) {this.username = username; }

    public String getEmail() {return email; }
    public void setEmail(String email) {this.email = email; } 

    public String getPassword () {return password; }
    public void setPassword(String password) {this.password = password; }

    public LocalDateTime getCreated_at () {return created_at; }
    public void setCreated_at (LocalDateTime created_at) {this.created_at = created_at; }

    public LocalDateTime getUpdated_at () {return updated_at; }
    public void setUpdated_at (LocalDateTime updated_at) {this.updated_at = updated_at; }

    public LocalDateTime getLast_login () {return last_login; }
    public void setLast_login (LocalDateTime last_login) {this.last_login = last_login; }
}