package com.example.fake_blog_backend.service;

import com.example.fake_blog_backend.dto.MessageDTO;
import com.example.fake_blog_backend.dto.UserDTO;
import com.example.fake_blog_backend.model.Post;
import com.example.fake_blog_backend.model.User;
import com.example.fake_blog_backend.repository.PostRepository;
import com.example.fake_blog_backend.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;


import java.util.ArrayList;
import java.util.Collections;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

class LikeServiceImplTest {
    @Mock
    private PostRepository postRepository;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private LikeServiceImpl likeService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    void like_ValidUserAndPost_ReturnsSuccessMessage() {
        // Arrange
        UserDTO userDTO = UserDTO.builder()
                .id(1L)
                .build();

        User user = User.builder()
                .id(1L)
                .likedPosts(new ArrayList<>())
                .build();

        Post post = Post.builder()
                .id(1L)
                .likedBy(new ArrayList<>())
                .build();

        Long id = 1L;


        when(userRepository.findById(userDTO.getId())).thenReturn(Optional.of(user));
        when(postRepository.findById(id)).thenReturn(Optional.of(post));
        when(postRepository.save(post)).thenReturn(post);
        when(userRepository.save(user)).thenReturn(user);


        // Act
        ResponseEntity<MessageDTO> response = likeService.like(userDTO, id);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("User liked the post successfully", response.getBody().getContent());
        assertEquals(1, post.getLikedBy().size());
        assertTrue(post.getLikedBy().contains(user));
    }

    @Test
    void like_UserNotFound_ReturnsNotFoundMessage() {
        // Arrange
        UserDTO userDTO = new UserDTO();
        userDTO.setId(1L);

        when(userRepository.findById(userDTO.getId())).thenReturn(Optional.empty());

        // Act
        ResponseEntity<MessageDTO> response = likeService.like(userDTO, 1L);

        // Assert
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertEquals("User not found", response.getBody().getContent());
    }

    @Test
    void unLike_UserNotLikedPost_ReturnsBadRequestMessage() {
        // Arrange
        UserDTO userDTO = UserDTO.builder()
                .id(1L)
                .build();

        User user = User.builder()
                .id(1L)
                .likedPosts(new ArrayList<>())
                .build();

        Post post = Post.builder()
                .id(1L)
                .likedBy(new ArrayList<>())
                .build();

        Long id = 1L;


        when(userRepository.findById(userDTO.getId())).thenReturn(Optional.of(user));
        when(postRepository.findById(post.getId())).thenReturn(Optional.of(post));

        // Act
        ResponseEntity<MessageDTO> response = likeService.unLike(userDTO, post.getId());

        // Assert
        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertEquals("User hasn't liked this post", response.getBody().getContent());
    }

    @Test
    void unLike_ValidUserAndPost_ReturnsSuccessMessage() {
        // Arrange
        UserDTO userDTO = UserDTO.builder()
                .id(1L)
                .build();

        User user = User.builder()
                .id(1L)
                .likedPosts(new ArrayList<>())
                .build();

        Post post = Post.builder()
                .id(1L)
                .likedBy(new ArrayList<>())
                .build();
        Long id = 1L;

        post.getLikedBy().add(user);

        when(userRepository.findById(userDTO.getId())).thenReturn(Optional.of(user));
        when(postRepository.findById(post.getId())).thenReturn(Optional.of(post));

        // Act
        ResponseEntity<MessageDTO> response = likeService.unLike(userDTO, post.getId());

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("User unliked the post successfully", response.getBody().getContent());
        assertEquals(0, post.getLikedBy().size());
        assertFalse(post.getLikedBy().contains(user));
    }

    @Test
    void unLike_UserNotFound_ReturnsNotFoundMessage() {
        // Arrange
        UserDTO userDTO = new UserDTO();
        userDTO.setId(1L);

        when(userRepository.findById(userDTO.getId())).thenReturn(Optional.empty());

        // Act
        ResponseEntity<MessageDTO> response = likeService.unLike(userDTO, 1L);

        // Assert
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertEquals("User not found", response.getBody().getContent());
    }

    @Test
    void unLike_PostNotFound_ReturnsNotFoundMessage() {
        // Arrange
        UserDTO userDTO = UserDTO.builder()
                .id(1L)
                .build();

        User user = User.builder()
                .id(1L)
                .likedPosts(new ArrayList<>())
                .build();

        Post post = Post.builder()
                .id(1L)
                .likedBy(new ArrayList<>())
                .build();

        Long id = 1L;

        when(userRepository.findById(userDTO.getId())).thenReturn(Optional.of(user));
        when(postRepository.findById(id)).thenReturn(Optional.empty());

        // Act
        ResponseEntity<MessageDTO> response = likeService.unLike(userDTO, id);

        // Assert
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertEquals("Post not found", response.getBody().getContent());
    }

    @Test
    void unLike_UserAlreadyLikedPost_ReturnsBadRequestMessage() {
        // Arrange
        UserDTO userDTO = UserDTO.builder()
                .id(1L)
                .build();

        User user = User.builder()
                .id(1L)
                .likedPosts(new ArrayList<>())
                .build();

        Post post = Post.builder()
                .id(1L)
                .likedBy(new ArrayList<>())
                .build();
        Long id = 1L;


        when(userRepository.findById(userDTO.getId())).thenReturn(Optional.of(user));
        when(postRepository.findById(id)).thenReturn(Optional.of(post));

        // Act
        ResponseEntity<MessageDTO> response = likeService.unLike(userDTO, id);

        // Assert
        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertEquals("User hasn't liked this post", response.getBody().getContent());
    }

    @Test
    void unLike_SuccessfullyUnliked_ReturnsSuccessMessage() {
        // Arrange
        UserDTO userDTO = UserDTO.builder()
                .id(1L)
                .build();

        User user = User.builder()
                .id(1L)
                .likedPosts(new ArrayList<>())
                .build();

        Post post = Post.builder()
                .id(1L)
                .likedBy(new ArrayList<>())
                .build();
        Long id = 1L;

        post.getLikedBy().add(user);

        when(userRepository.findById(userDTO.getId())).thenReturn(Optional.of(user));
        when(postRepository.findById(1L)).thenReturn(Optional.of(post));

        // Act
        ResponseEntity<MessageDTO> response = likeService.unLike(userDTO, 1L);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("User unliked the post successfully", response.getBody().getContent());
        assertEquals(0, post.getLikedBy().size());
    }

    @Test
    void unLike_InternalServerError_ReturnsInternalServerError() {
        // Arrange
        UserDTO userDTO = new UserDTO();
        userDTO.setId(1L);

        when(userRepository.findById(userDTO.getId())).thenThrow(new RuntimeException("Internal Server Error"));

        // Act
        ResponseEntity<MessageDTO> response = likeService.unLike(userDTO, 1L);

        // Assert
        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
    }
}