package com.prabhatech.uxda;

import com.prabhatech.uxda.entity.User;
import com.prabhatech.uxda.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class UxdaApplication {

    public static void main(String[] args) {
        SpringApplication.run(UxdaApplication.class, args);
    }

    @Bean
    public CommandLineRunner initDefaultAdmin(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            User admin = userRepository.findByUsername("admin").orElseGet(() -> {
                User newUser = new User();
                newUser.setUsername("admin");
                newUser.setEmail("admin@prabhatech.com");
                newUser.setFullName("UXDA Lead Administrator");
                newUser.setRole("ROLE_ADMIN");
                return newUser;
            });

            admin.setPasswordHash(passwordEncoder.encode("admin123"));
            userRepository.save(admin);
            System.out.println(">>> [SECURITY] Default admin initialized/synchronized with valid BCrypt hash for 'admin123'");
        };
    }
}

