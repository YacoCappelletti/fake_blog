package com.example.fake_blog_backend.controller;

import com.example.fake_blog_backend.dto.CommentDTO;
import com.example.fake_blog_backend.service.ICommentService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

class CommentControllerTest {

    @Mock
    private ICommentService commentService;

    @InjectMocks
    private CommentController commentController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    void create_ValidComment_ReturnsCreated() {
        // Arrange
        CommentDTO request = new CommentDTO();
        ResponseEntity<CommentDTO> expectedResponse = new ResponseEntity<>(request, HttpStatus.CREATED);
        when(commentService.create(request)).thenReturn(expectedResponse);

        // Act
        ResponseEntity<CommentDTO> actualResponse = commentController.create(request);

        // Assert
        assertEquals(expectedResponse, actualResponse);
    }

    @Test
    void delete_ValidCommentId_ReturnsNoContent() {
        // Arrange
        Long id = 1L;
        ResponseEntity<CommentDTO> expectedResponse = new ResponseEntity<>(HttpStatus.NO_CONTENT);
        when(commentService.delete(id)).thenReturn(expectedResponse);

        // Act
        ResponseEntity<CommentDTO> actualResponse = commentController.delete(id);

        // Assert
        assertEquals(expectedResponse, actualResponse);
    }
}