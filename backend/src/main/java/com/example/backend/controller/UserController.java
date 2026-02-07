package com.example.backend.controller;

import org.springframework.web.bind.annotation.*;
import com.example.backend.entity.User;
import com.example.backend.repository.UserRepository;
import java.util.List;


@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // GET all users
    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // POST create new user
    @PostMapping
    public User createUser(@RequestBody User user) {
        // For testing, plain password is OK; later hash with BCrypt
        return userRepository.save(user);
    }
    
}
