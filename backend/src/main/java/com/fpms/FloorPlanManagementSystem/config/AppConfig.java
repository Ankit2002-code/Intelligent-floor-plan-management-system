package com.fpms.FloorPlanManagementSystem.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class AppConfig {
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins(
                            "https://intelligent-floor-plan-management-s.vercel.app",
                            "https://intelligent-floor-plan-mana-git-3a5156-ankits-projects-fba292c2.vercel.app",
                            "https://intelligent-floor-plan-management-system-dfdz-h1v3o58hn.vercel.app",
                            "https://intelligent-floor-plan-management-system-dfdz-i1wgrv6ed.vercel.app"
                        )
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                        .allowedHeaders("*")
                        .allowCredentials(true);
            }
        };
    }
}
