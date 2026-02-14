package com.example.backend.controller;

import org.springframework.web.bind.annotation.*;
import com.example.backend.entity.User;
import com.example.backend.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import java.util.List;


@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserController(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // GET all users
    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // POST create new user
    @PostMapping
    public User createUser(@RequestBody User user) {
        if (user.getPassword() != null && !user.getPassword().isBlank()) {
            String hashed = passwordEncoder.encode(user.getPassword());
            user.setPassword(hashed);
        }
        return userRepository.save(user);
    }
    
}
