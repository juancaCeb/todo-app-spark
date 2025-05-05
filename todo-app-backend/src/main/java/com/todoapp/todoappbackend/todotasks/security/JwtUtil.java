package com.todoapp.todoappbackend.todotasks.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;

/**
 * Utility class for handling JSON Web Tokens (JWT) in a Spring Security context.
 * This class provides methods for generating, validating, and extracting information
 * from JWT tokens, which are essential for stateless authentication.
 *
 * <p>Purpose:</p>
 * <ul>
 *     <li>Facilitates secure communication between the client and server by using JWTs.</li>
 *     <li>Enables stateless authentication, eliminating the need for server-side session storage.</li>
 *     <li>Ensures token integrity and authenticity using a secret key for signing.</li>
 * </ul>
 *
 * <p>Key Features:</p>
 * <ul>
 *     <li>Generates JWT tokens with expiration times.</li>
 *     <li>Validates tokens to ensure they are not tampered with or expired.</li>
 *     <li>Extracts claims (e.g., username) from tokens for authentication purposes.</li>
 * </ul>
 *
 * <p>Dependencies:</p>
 * <ul>
 *     <li>JJWT library for JWT operations.</li>
 *     <li>Base64-encoded secret key for signing tokens using the HS256 algorithm.</li>
 * </ul>
 */
@Component
public class JwtUtil {

    // Base64-encoded 256-bit key for signing JWTs (HS256 algorithm)
    private static final String SECRET_KEY_BASE64 = "3kWZzVoM1F+gKslg64IWKm6C5dUkMNFL6ICmYP5NDS8=";

    private final SecretKey secretKey = Keys.hmacShaKeyFor(Decoders.BASE64.decode(SECRET_KEY_BASE64));

    /**
     * Extracts the username (subject) from the given JWT token.
     *
     * @param token The JWT token.
     * @return The username (subject) contained in the token.
     */
    public String extractUsername(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(secretKey)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    /**
     * Validates the given JWT token to ensure it is not expired or tampered with.
     *
     * @param token The JWT token to validate.
     * @return True if the token is valid, false otherwise.
     */
    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder()
                    .setSigningKey(secretKey)
                    .build()
                    .parseClaimsJws(token);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            return false;
        }
    }

    /**
     * Generates a static JWT token for testing or demonstration purposes.
     *
     * @return A JWT token with a fixed subject and expiration time.
     */
    public String generateStaticToken() {
        return Jwts.builder()
                .setSubject("static-user")
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24)) // 24 hours
                .signWith(secretKey, SignatureAlgorithm.HS256)
                .compact();
    }
}