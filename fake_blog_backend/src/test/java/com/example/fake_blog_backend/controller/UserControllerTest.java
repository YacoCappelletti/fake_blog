package com.example.fake_blog_backend.controller;

import com.example.fake_blog_backend.dto.UserDTO;
import com.example.fake_blog_backend.service.IUserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

class UserControllerTest {

    @Mock
    private IUserService userService;

    @InjectMocks
    private UserController userController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    void getAll_Valid_ReturnsOkResponse() {
        // Arrange
        List<UserDTO> userDTOList = new ArrayList<>();
        ResponseEntity<List<UserDTO>> expectedResponse = ResponseEntity.ok(userDTOList);

        when(userService.findAll()).thenReturn(expectedResponse);

        // Act
        ResponseEntity<List<UserDTO>> response = userController.getAll();

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(userDTOList, response.getBody());
    }

    @Test
    void getById_ValidId_ReturnsOkResponse() {
        // Arrange
        Long userId = 1L;
        UserDTO userDTO = new UserDTO();
        ResponseEntity<UserDTO> expectedResponse = ResponseEntity.ok(userDTO);

        when(userService.findById(userId)).thenReturn(expectedResponse);

        // Act
        ResponseEntity<UserDTO> response = userController.getById(userId);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(userDTO, response.getBody());
    }
}