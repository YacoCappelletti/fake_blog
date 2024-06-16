package com.example.fake_blog_backend.controller;

import com.example.fake_blog_backend.dto.MessageDTO;
import com.example.fake_blog_backend.dto.UserDTO;
import com.example.fake_blog_backend.service.IFollowService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class FollowControllerTest {

    @Mock
    private IFollowService followService;

    @InjectMocks
    private FollowController followController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    void followUser_ValidUserAndId_ReturnsSuccessMessage() {
        // Arrange
        UserDTO userDTO = new UserDTO();
        Long id = 1L;
        MessageDTO messageDTO = new MessageDTO("User followed successfully");
        ResponseEntity<MessageDTO> expectedResponse = new ResponseEntity<>(messageDTO, HttpStatus.OK);
        when(followService.follow(userDTO, id)).thenReturn(expectedResponse);

        // Act
        ResponseEntity<MessageDTO> actualResponse = followController.followUser(userDTO, id);

        // Assert
        assertEquals(expectedResponse, actualResponse);
    }

    @Test
    void unFollowUser_ValidUserAndId_ReturnsSuccessMessage() {
        // Arrange
        UserDTO userDTO = new UserDTO();
        Long id = 1L;
        MessageDTO messageDTO = new MessageDTO("User unfollowed successfully");
        ResponseEntity<MessageDTO> expectedResponse = new ResponseEntity<>(messageDTO, HttpStatus.OK);
        when(followService.unFollow(userDTO, id)).thenReturn(expectedResponse);

        // Act
        ResponseEntity<MessageDTO> actualResponse = followController.unFollowUser(userDTO, id);

        // Assert
        assertEquals(expectedResponse, actualResponse);
    }
}