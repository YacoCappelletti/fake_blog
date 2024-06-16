package com.example.fake_blog_backend.controller;

import com.example.fake_blog_backend.dto.MessageDTO;
import com.example.fake_blog_backend.dto.UserDTO;
import com.example.fake_blog_backend.service.ILikeService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class LikesControllerTest {

    @Mock
    private ILikeService likeService;

    @InjectMocks
    private LikesController likesController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    void likePost_ValidUserAndId_ReturnsSuccessMessage() {
        // Arrange
        UserDTO userDTO = new UserDTO();
        Long id = 1L;
        MessageDTO messageDTO = new MessageDTO("Post liked successfully");
        ResponseEntity<MessageDTO> expectedResponse = new ResponseEntity<>(messageDTO, HttpStatus.OK);
        when(likeService.like(userDTO, id)).thenReturn(expectedResponse);

        // Act
        ResponseEntity<MessageDTO> actualResponse = likesController.likePost(userDTO, id);

        // Assert
        assertEquals(expectedResponse, actualResponse);
    }

    @Test
    void unLikePost_ValidUserAndId_ReturnsSuccessMessage() {
        // Arrange
        UserDTO userDTO = new UserDTO();
        Long id = 1L;
        MessageDTO messageDTO = new MessageDTO("Post unliked successfully");
        ResponseEntity<MessageDTO> expectedResponse = new ResponseEntity<>(messageDTO, HttpStatus.OK);
        when(likeService.unLike(userDTO, id)).thenReturn(expectedResponse);

        // Act
        ResponseEntity<MessageDTO> actualResponse = likesController.unLikePost(userDTO, id);

        // Assert
        assertEquals(expectedResponse, actualResponse);
    }
}