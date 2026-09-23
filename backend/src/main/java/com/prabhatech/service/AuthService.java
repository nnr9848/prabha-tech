package com.prabhatech.service;

import com.prabhatech.config.JwtUtils;
import com.prabhatech.dto.AuthDto;
import com.prabhatech.entity.User;
import com.prabhatech.repository.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final JwtUtils jwtUtils;
    private final AuthenticationManager authenticationManager;
    private final UserDetailsService userDetailsService;

    public AuthService(
            UserRepository userRepository,
            JwtUtils jwtUtils,
            AuthenticationManager authenticationManager,
            UserDetailsService userDetailsService
    ) {
        this.userRepository = userRepository;
        this.jwtUtils = jwtUtils;
        this.authenticationManager = authenticationManager;
        this.userDetailsService = userDetailsService;
    }

    public AuthDto.LoginResponse login(AuthDto.LoginRequest request) {
        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found: " + request.getUsername()));

        System.out.println("=== DEBUG AUTH ===");
        System.out.println("Submitted username: '" + request.getUsername() + "'");
        System.out.println("Submitted password length: " + (request.getPassword() != null ? request.getPassword().length() : 0));
        System.out.println("DB password_hash: '" + user.getPasswordHash() + "'");

        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
            );
            System.out.println("Authentication SUCCESS for: " + request.getUsername());
        } catch (Exception ex) {
            System.err.println("Authentication failed for user: " + request.getUsername() + " -> " + ex.getClass().getName() + ": " + ex.getMessage());
            throw new RuntimeException("Invalid credentials: " + ex.getMessage());
        }

        UserDetails userDetails = userDetailsService.loadUserByUsername(user.getUsername());
        String token = jwtUtils.generateToken(userDetails);

        return new AuthDto.LoginResponse(
                token,
                "Bearer",
                user.getUsername(),
                user.getFullName(),
                user.getRole(),
                jwtUtils.getExpirationMs()
        );
    }
}

