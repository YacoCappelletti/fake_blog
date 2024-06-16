package com.example.fake_blog_backend.service;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

class JwtServiceTest {
    @Mock
    private UserDetails userDetails;

    @InjectMocks
    private JwtService jwtService;

    public JwtServiceTest() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    void getToken_WithExtraClaims_ReturnsTokenWithExtraClaims() {
        // Arrange
        Map<String, Object> extraClaims = new HashMap<>();
        extraClaims.put("key1", "value1");
        extraClaims.put("key2", "value2");

        when(userDetails.getUsername()).thenReturn("testUser");

        // Act
        String token = jwtService.getToken(extraClaims, userDetails);

        // Assert
        String username = jwtService.getUsernameFromToken(token);
        assertEquals("testUser", username);
    }

    @Test
    void isTokenValid_ValidTokenForUser_ReturnsTrue() {
        // Arrange
        when(userDetails.getUsername()).thenReturn("testUser");
        String token = jwtService.getToken(userDetails);

        // Act
        boolean isValid = jwtService.isTokenValid(token, userDetails);

        // Assert
        assertEquals(true, isValid);
    }

    @Test
    void isTokenValid_ExpiredTokenForUser_ReturnsFalse() {
        // Arrange
        when(userDetails.getUsername()).thenReturn("testUser");
        String expiredToken = generateExpiredToken("testUser");

        // Act
        boolean isValid = false;
        try {
            isValid = jwtService.isTokenValid(expiredToken, userDetails);
        } catch (ExpiredJwtException e) {
            isValid = false; // Token expirado
        }

        // Assert
        assertEquals(false, isValid);
    }

    // Helper method to generate an expired JWT token
    private String generateExpiredToken(String username) {
        Date now = new Date();
        Date expiration = new Date(now.getTime() - 3600 * 1000); // Expired 1 hour ago
        Map<String, Object> claims = new HashMap<>();
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(username)
                .setIssuedAt(now)
                .setExpiration(expiration)
                .signWith(getKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    private Key getKey() {
        byte[] keyBytes = Decoders.BASE64.decode("586E3272357538782F413F4428472B4B6250655368566B597033733676397924");
        return Keys.hmacShaKeyFor(keyBytes);
    }

}