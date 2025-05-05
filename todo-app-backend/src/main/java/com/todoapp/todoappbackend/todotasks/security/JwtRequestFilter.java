package com.todoapp.todoappbackend.todotasks.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;

/**
 * Custom filter for processing JWT-based authentication in a Spring Security context.
 * This filter intercepts incoming HTTP requests, validates the JWT token, and sets the
 * authentication in the SecurityContext if the token is valid.
 *
 * <p>Key points:</p>
 * <ul>
 *     <li>Extends {@link OncePerRequestFilter} to ensure the filter is executed once per request.</li>
 *     <li>Validates the JWT token using the {@link JwtUtil} utility class.</li>
 *     <li>Sets the authenticated user in the {@link SecurityContextHolder} if the token is valid.</li>
 *     <li>Excludes specific endpoints (e.g., `/token`) from authentication checks.</li>
 * </ul>
 *
 * <p>Dependencies:</p>
 * <ul>
 *     <li>Spring Security for authentication and context management.</li>
 *     <li>Jakarta Servlet API for request and response handling.</li>
 * </ul>
 */
@Component
public class JwtRequestFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;

    /**
     * Constructor to inject the {@link JwtUtil} dependency.
     *
     * @param jwtUtil Utility class for JWT operations such as validation and extraction.
     */
    public JwtRequestFilter(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    /**
     * Filters incoming HTTP requests to validate JWT tokens and set authentication.
     *
     * @param request  The HTTP request.
     * @param response The HTTP response.
     * @param chain    The filter chain to pass the request/response to the next filter.
     * @throws ServletException If an error occurs during request processing.
     * @throws IOException      If an I/O error occurs during request processing.
     */
    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain chain) throws ServletException, IOException {

        String path = request.getRequestURI();

        // Skip authentication for the token generation endpoint
        if ("/token".equals(path)) {
            chain.doFilter(request, response);
            return;
        }

        // Extract the Authorization header
        final String authHeader = request.getHeader("Authorization");

        // Validate the JWT token if present
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String jwt = authHeader.substring(7);

            if (jwtUtil.validateToken(jwt)) {
                String username = jwtUtil.extractUsername(jwt);

                // Create an authentication token and set it in the SecurityContext
                UsernamePasswordAuthenticationToken auth =
                        new UsernamePasswordAuthenticationToken(username, null, Collections.emptyList());

                auth.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(auth);
            }
        }

        // Continue with the filter chain
        chain.doFilter(request, response);
    }
}