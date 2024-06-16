package com.example.fake_blog_backend.service;

import com.example.fake_blog_backend.dto.CommentDTO;
import com.example.fake_blog_backend.model.Comment;
import com.example.fake_blog_backend.repository.CommentRepository;
import com.example.fake_blog_backend.util.converter.CommentConverter;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class CommentServiceImplTest {

    @Mock
    private CommentRepository repository;

    @Mock
    private CommentConverter converter;

    @InjectMocks
    private CommentServiceImpl commentService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);

        CommentDTO commentDTO = new CommentDTO();
        Comment comment = new Comment();
        Long id = 1L;

        Optional<Comment> commentOptional = Optional.of(new Comment());

        when(converter.fromDto(commentDTO)).thenReturn(comment);
        when(repository.save(comment)).thenReturn(comment);
        when(repository.findById(id)).thenReturn(commentOptional);

    }



    @Test
    void create_ShouldReturnCreatedResponse() {
        // Arrange
        CommentDTO commentDTO = new CommentDTO();

        // Act
        ResponseEntity<CommentDTO> responseEntity = commentService.create(commentDTO);

        // Assert
        assertEquals(HttpStatus.CREATED, responseEntity.getStatusCode());
        assertEquals(commentDTO, responseEntity.getBody());

        // Verify
        verify(converter, times(1)).fromDto(commentDTO);
        verify(repository, times(1)).save(any());
    }

    @Test
    void delete_ShouldReturnNoContentResponse() {
        // Act
        ResponseEntity<CommentDTO> responseEntity = commentService.delete(1L);

        // Assert
        assertEquals(HttpStatus.NO_CONTENT, responseEntity.getStatusCode());

        // Verify
        verify(repository, times(1)).findById(1L);
        verify(repository, times(1)).deleteById(1L);
    }

    @Test
    void delete_ShouldReturnNotFoundResponse_WhenCommentNotFound() {
        // Arrange
        Long id = 2L;
        Optional<Comment> commentOptional = Optional.empty();
        when(repository.findById(id)).thenReturn(commentOptional);

        // Act
        ResponseEntity<CommentDTO> responseEntity = commentService.delete(id);

        // Assert
        assertEquals(HttpStatus.NOT_FOUND, responseEntity.getStatusCode());

        // Verify
        verify(repository, times(1)).findById(id);
        verify(repository, never()).deleteById(id);
    }
}