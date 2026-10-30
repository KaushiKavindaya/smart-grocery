package com.smartgrocery.service;

import com.smartgrocery.dto.AuthDtos.*;
import com.smartgrocery.entity.User;
import com.smartgrocery.repository.UserRepository;
import com.smartgrocery.security.JwtService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtService jwtService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public AuthResponse register(RegisterRequest req) {
        if (userRepository.existsByEmail(req.getEmail())) {
            throw new IllegalArgumentException("An account with this email already exists");
        }

        User user = new User(
                null,
                req.getFullName().trim(),
                req.getEmail().trim().toLowerCase(),
                passwordEncoder.encode(req.getPassword()),
                "LKR",
                1
        );

        User saved = userRepository.save(user);
        String token = jwtService.generateToken(saved.getEmail());

        return new AuthResponse(token, saved.getId(), saved.getFullName(), saved.getEmail(), saved.getCurrency());
    }

    public AuthResponse login(LoginRequest req) {
        User user = userRepository.findByEmail(req.getEmail().trim().toLowerCase())
                .orElseThrow(() -> new IllegalArgumentException("Email or password is incorrect. Check your details or reset your password."));

        if (!passwordEncoder.matches(req.getPassword(), user.getPasswordHash())) {
            throw new IllegalArgumentException("Email or password is incorrect. Check your details or reset your password.");
        }

        String token = jwtService.generateToken(user.getEmail());
        return new AuthResponse(token, user.getId(), user.getFullName(), user.getEmail(), user.getCurrency());
    }
}