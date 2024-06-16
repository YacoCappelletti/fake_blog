package com.example.fake_blog_backend.controller;

import com.example.fake_blog_backend.dto.MessageDTO;
import com.example.fake_blog_backend.dto.PostDTO;
import com.example.fake_blog_backend.dto.UserDTO;
import com.example.fake_blog_backend.service.IPostService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;


import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

class PostControllerTest {

    @Mock
    private IPostService postService;

    @Mock
    MultipartFile imageFile;

    @InjectMocks
    private PostController postController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    void getAll_ReturnsPostsPage() {
        // Arrange
        Page<PostDTO> postsPage = Page.empty();
        when(postService.findAll(any(PageRequest.class))).thenReturn(new ResponseEntity<>(postsPage, HttpStatus.OK));

        // Act
        ResponseEntity<Page<PostDTO>> response = postController.getAll(0, 10);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(postsPage, response.getBody());
    }

    @Test
    void getById_ReturnsPostById() {
        // Arrange
        Long postId = 1L;
        PostDTO post = new PostDTO();
        when(postService.findById(postId)).thenReturn(new ResponseEntity<>(post, HttpStatus.OK));

        // Act
        ResponseEntity<PostDTO> response = postController.getById(postId);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(post, response.getBody());
    }

    @Test
    void search_ReturnsSearchedPostsPage() {
        // Arrange
        String query = "example";
        Page<PostDTO> searchedPostsPage = Page.empty();
        when(postService.search(query, PageRequest.of(1, 10))).thenReturn(new ResponseEntity<>(searchedPostsPage, HttpStatus.OK));

        // Act
        ResponseEntity<Page<PostDTO>> response = postController.search(query, 1, 10);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(searchedPostsPage, response.getBody());
    }

    @Test
    void create_ReturnsCreatedResponse() {
        // Arrange
        String title = "Test Title";
        String body = "Test Body";
        Long userId = 1L;
        UserDTO user = new UserDTO();
        user.setId(userId);


        PostDTO postDTO = new PostDTO();
        postDTO.setTitle(title);
        postDTO.setBody(body);
        postDTO.setUser(user);

        ResponseEntity<PostDTO> expectedResponse = new ResponseEntity<>(postDTO, HttpStatus.CREATED);
        when(postService.create(any(PostDTO.class), any(MultipartFile.class))).thenReturn(expectedResponse);

        // Act
        ResponseEntity<PostDTO> actualResponse = postController.create(title, body, userId, imageFile);

        // Assert
        assertEquals(HttpStatus.CREATED, actualResponse.getStatusCode());
        assertEquals(expectedResponse.getBody(), actualResponse.getBody());

    }

    @Test
    void delete_DeletesPost() {
        // Arrange
        Long postId = 1L;
        MessageDTO messageDTO = new MessageDTO("Post deleted successfully");
        when(postService.delete(postId)).thenReturn(new ResponseEntity<>(messageDTO, HttpStatus.OK));

        // Act
        ResponseEntity<MessageDTO> response = postController.delete(postId);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(messageDTO, response.getBody());
    }
}