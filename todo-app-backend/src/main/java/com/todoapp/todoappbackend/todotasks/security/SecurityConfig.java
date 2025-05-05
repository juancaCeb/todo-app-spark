package com.todoapp.todoappbackend.todotasks.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

/**
 * Configuration class for Spring Security.
 * This class defines the security settings for the application, including CORS, CSRF,
 * session management, and JWT-based authentication.
 *
 * <p>Purpose:</p>
 * <ul>
 *     <li>Secures the application by enforcing authentication and authorization rules.</li>
 *     <li>Integrates the {@link JwtRequestFilter} for processing JWT tokens.</li>
 *     <li>Configures CORS to allow communication between the frontend and backend.</li>
 * </ul>
 *
 * <p>Key Features:</p>
 * <ul>
 *     <li>Disables CSRF protection for stateless REST APIs.</li>
 *     <li>Enforces stateless session management using JWT tokens.</li>
 *     <li>Permits unauthenticated access to specific endpoints (e.g., `/token`).</li>
 *     <li>Applies the {@link JwtRequestFilter} before the {@link UsernamePasswordAuthenticationFilter}.</li>
 * </ul>
 */
@Configuration
public class SecurityConfig {

    private final JwtRequestFilter jwtRequestFilter;

    /**
     * Constructor to inject the {@link JwtRequestFilter}.
     *
     * @param jwtRequestFilter The custom filter for processing JWT tokens.
     */
    public SecurityConfig(JwtRequestFilter jwtRequestFilter) {
        this.jwtRequestFilter = jwtRequestFilter;
    }

    /**
     * Configures the security filter chain for the application.
     *
     * @param http The {@link HttpSecurity} object for configuring security settings.
     * @return The configured {@link SecurityFilterChain}.
     * @throws Exception If an error occurs during configuration.
     */
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors(Customizer.withDefaults()) // Configures CORS with default settings
                .csrf(csrf -> csrf.disable()) // Disables CSRF protection for stateless APIs
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/token").permitAll() // Allows unauthenticated access to /token
                        .anyRequest().authenticated() // Requires authentication for all other endpoints
                )
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS) // Enforces stateless session management
                )
                .addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class); // Adds the JWT filter

        return http.build();
    }

    /**
     * Configures CORS settings for the application.
     *
     * @return The {@link CorsConfigurationSource} with the configured CORS settings.
     */
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(List.of("http://localhost:8080")); // Allows requests from the frontend
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS")); // Permits specific HTTP methods
        config.setAllowedHeaders(List.of("*")); // Allows all request headers
        config.setExposedHeaders(List.of("tasks-count")); // Exposes custom headers in the response
        config.setAllowCredentials(true); // Allows credentials (e.g., cookies, Authorization header)

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config); // Applies CORS settings to all endpoints
        return source;
    }
}