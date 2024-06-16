package com.example.fake_blog_backend.controller;

import com.example.fake_blog_backend.dto.AuthDTO;
import com.example.fake_blog_backend.dto.CommentDTO;
import com.example.fake_blog_backend.dto.LoginDTO;
import com.example.fake_blog_backend.dto.RegisterDTO;
import com.example.fake_blog_backend.model.Comment;
import com.example.fake_blog_backend.service.AuthService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

class AuthControllerTest {

    @Mock
    private AuthService authService;

    @InjectMocks
    private AuthController authController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    void login_ValidLoginRequest_ReturnsAuthToken() {
        // Arrange
        LoginDTO loginDTO = new LoginDTO();
        loginDTO.setUsername("testUser");
        loginDTO.setPassword("password");

        AuthDTO authDTO = new AuthDTO();
        authDTO.setToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0ZXN0VXNlciIsImlhdCI6MTY0ODk0NzQ1MCwiZXhwIjoxNjQ4OTUxMDUwfQ.P7_9dRzRne3Nm6PSI3M4Hs-sTvmvFsvtzyfz_Q5zSMo");

        when(authService.login(loginDTO)).thenReturn(authDTO);

        // Act
        ResponseEntity<AuthDTO> response = authController.login(loginDTO);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(authDTO, response.getBody());
    }
/*
    @Test
    void register_ValidRegisterRequest_ReturnsAuthToken() {
        // Arrange
        RegisterDTO registerDTO = new RegisterDTO();
        registerDTO.setUsername("testUser");
        registerDTO.setEmail("test@example.com");
        registerDTO.setPassword("password");

        AuthDTO authDTO = new AuthDTO();
        authDTO.setToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0ZXN0VXNlciIsImlhdCI6MTY0ODk0NzQ1MCwiZXhwIjoxNjQ4OTUxMDUwfQ.P7_9dRzRne3Nm6PSI3M4Hs-sTvmvFsvtzyfz_Q5zSMo");

        when(authService.register(registerDTO)).thenReturn(authDTO);

        // Act
        ResponseEntity<AuthDTO> response = authController.register(registerDTO);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(authDTO, response.getBody());
    }

 */

    @Test
    void login_ValidLogin_ReturnsOk() {
        // Arrange
        LoginDTO request = new LoginDTO("username", "password");
        AuthDTO expectedResponse = new AuthDTO(1L,"username", "image","token");
        when(authService.login(request)).thenReturn(expectedResponse);

        // Act
        ResponseEntity<AuthDTO> actualResponse = authController.login(request);

        // Assert
        assertEquals(HttpStatus.OK, actualResponse.getStatusCode());
        assertEquals(expectedResponse, actualResponse.getBody());
    }

    @Test
    void register_ValidRegistration_ReturnsOk() {
        // Arrange
        RegisterDTO request = new RegisterDTO("username", "password", "email", "image");
        AuthDTO expectedResponse = new AuthDTO(1L,"username", "image","token");
        when(authService.register(request)).thenReturn(expectedResponse);

        // Act
        ResponseEntity<?> actualResponse = authController.register(request);

        // Assert
        assertEquals(HttpStatus.OK, actualResponse.getStatusCode());
        assertEquals(expectedResponse, actualResponse.getBody());
    }

    @Test
    void register_ExistingUsername_ReturnsBadRequest() {
        // Arrange
        RegisterDTO request = new RegisterDTO("existingUsername", "password", "email", "image");
        when(authService.register(request)).thenThrow(new RuntimeException("Username already exists"));

        // Act
        ResponseEntity<?> actualResponse = authController.register(request);

        // Assert
        assertEquals(HttpStatus.BAD_REQUEST, actualResponse.getStatusCode());
        assertEquals("Username already exists", actualResponse.getBody());
    }
}