package com.example.fake_blog_backend.service;

import com.example.fake_blog_backend.dto.AuthDTO;
import com.example.fake_blog_backend.dto.LoginDTO;
import com.example.fake_blog_backend.dto.RegisterDTO;
import com.example.fake_blog_backend.model.Role;
import com.example.fake_blog_backend.model.User;
import com.example.fake_blog_backend.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import java.util.Optional;


import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class AuthServiceTest {


    @Mock
    private UserRepository userRepository;

    @Mock
    private JwtService jwtService;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private AuthenticationManager authenticationManager;

    @InjectMocks
    private AuthService authService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    void testLogin() {
        // Arrange
        LoginDTO request = new LoginDTO();
        request.setUsername("testuser");
        request.setPassword("testpassword");


        User user = User.builder()
                .username("testuser")
                .password("testpassword")
                .role(Role.USER)
                .build();

        when(userRepository.findByUsername("testuser")).thenReturn(Optional.of(user));
        when(jwtService.getToken(any(UserDetails.class))).thenReturn("testtoken");

        // Act
        AuthDTO authDTO = authService.login(request);

        // Assert
        assertNotNull(authDTO);
        assertEquals("testtoken", authDTO.getToken());

        // Verify
        verify(authenticationManager, times(1)).authenticate(new UsernamePasswordAuthenticationToken("testuser", "testpassword"));
        verify(userRepository, times(1)).findByUsername("testuser");
        verify(jwtService, times(1)).getToken(any(UserDetails.class));
    }

    @Test
    void testRegister() {
        // Arrange
        RegisterDTO request = new RegisterDTO();
        request.setUsername("testuser");
        request.setEmail("test@example.com");
        request.setPassword("testpassword");

        User newUser = User.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .password("encodedpassword")
                .role(Role.USER)
                .build();

        when(passwordEncoder.encode("testpassword")).thenReturn("encodedpassword");
        when(userRepository.findByUsername("testuser")).thenReturn(Optional.empty());
        when(userRepository.save(any(User.class))).thenReturn(newUser);
        when(jwtService.getToken(any(UserDetails.class))).thenReturn("testtoken");

        // Act
        AuthDTO authDTO = authService.register(request);

        // Assert
        assertNotNull(authDTO);
        assertNotNull(authDTO.getToken());

        // Verify
        verify(userRepository, times(1)).save(any(User.class));
        verify(jwtService, times(1)).getToken(any(UserDetails.class));
    }
}