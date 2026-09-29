package com.prabhatech;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class PrabhaTechApplication {

    public static void main(String[] args) {
        SpringApplication.run(PrabhaTechApplication.class, args);
    }
}
