package com.example.fake_blog_backend.service;


import com.example.fake_blog_backend.dto.MessageDTO;
import com.example.fake_blog_backend.dto.PostDTO;
import com.example.fake_blog_backend.model.Post;
import com.example.fake_blog_backend.repository.PostRepository;
import com.example.fake_blog_backend.repository.UserRepository;
import com.example.fake_blog_backend.util.converter.PostConverter;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.data.domain.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;


import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class PostServiceImplTest {
    @Mock
    private PostRepository postRepository;

    @Mock
    private MultipartFile imageFile;

    @Mock
    private IImageService imageService;

    @Mock
    private IUserService userService;

    @Mock
    private UserRepository userRepository;
    @InjectMocks
    private PostServiceImpl postService;

    @Mock
    private PostConverter postConverter = new PostConverter();

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    void findAll_ReturnsPageOfPostDTO() {
        // Arrange
        List<Post> posts = new ArrayList<>();
        posts.add(new Post());
        Page<Post> page = new PageImpl<>(posts);
        when(postRepository.findAll(any(Pageable.class))).thenReturn(page);

        List<PostDTO> postDTOs = new ArrayList<>();
        postDTOs.add(new PostDTO());
        Page<PostDTO> expectedPage = new PageImpl<>(postDTOs);
        when(postConverter.fromEntity(any(Post.class))).thenReturn(new PostDTO());

        // Act
        ResponseEntity<Page<PostDTO>> responseEntity = postService.findAll(PageRequest.of(0, 10));

        // Assert
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(expectedPage, responseEntity.getBody());

    }
    @Test
    void findAll_ErrorFetchingPosts_ReturnsInternalServerError() {
        // Arrange
        Pageable pageable = Pageable.ofSize(10).withPage(0);
        when(postRepository.findAll(any(Pageable.class))).thenThrow(new RuntimeException("Error fetching posts"));

        // Act
        ResponseEntity<Page<PostDTO>> responseEntity = postService.findAll(PageRequest.of(0, 10));

        // Assert
        assertNotNull(responseEntity);
        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, responseEntity.getStatusCode());
    }



    @Test
    void findById_ReturnsPostDTO() {
        // Arrange
        Long postId = 1L;
        Post post = new Post();
        post.setId(postId);
        when(postRepository.findById(postId)).thenReturn(Optional.of(post));

        PostDTO expectedPostDTO = new PostDTO();
        expectedPostDTO.setId(postId);
        when(postConverter.fromEntity(post)).thenReturn(expectedPostDTO);

        // Act
        ResponseEntity<PostDTO> responseEntity = postService.findById(postId);

        // Assert
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(expectedPostDTO, responseEntity.getBody());

    }



    @Test
    void create_ReturnsPostDTO() throws IOException {
        // Arrange
        PostDTO postDTO = new PostDTO();
        Post savedPost = new Post();
        savedPost.setId(1L);
        when(imageService.saveImage(any(MultipartFile.class))).thenReturn("test_image_jpg");
        when(postRepository.save(any(Post.class))).thenReturn(savedPost);


        when(postConverter.fromDto(postDTO)).thenReturn(savedPost);
        when(postConverter.fromEntity(savedPost)).thenReturn(postDTO);

        // Act
        ResponseEntity<PostDTO> responseEntity = postService.create(postDTO, imageFile);

        // Assert
        assertEquals(HttpStatus.CREATED, responseEntity.getStatusCode());
        assertEquals(postDTO, responseEntity.getBody());

    }

    @Test
    void create_ImageServiceThrowsIOException_ReturnsInternalServerError() throws IOException {
        // Arrange
        PostDTO postDTO = new PostDTO();
        MultipartFile imageFile = mock(MultipartFile.class);
        when(imageService.saveImage(imageFile)).thenThrow(new IOException("Error saving image"));

        // Act
        ResponseEntity<PostDTO> responseEntity = postService.create(postDTO, imageFile);

        // Assert
        assertNotNull(responseEntity);
        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, responseEntity.getStatusCode());
    }

    /*
    @Test
    void create_ErrorSavingPost_ReturnsInternalServerError() throws IOException {
        // Arrange
        PostDTO postDTO = new PostDTO();
        MultipartFile imageFile = mock(MultipartFile.class);
        String imageName = "test_image.jpg";
        when(imageService.saveImage(imageFile)).thenReturn(imageName);
        when(postRepository.save(any(Post.class))).thenThrow(new RuntimeException("Error saving post"));

        // Act
        ResponseEntity<PostDTO> responseEntity = postService.create(postDTO, imageFile);

        // Assert
        assertNotNull(responseEntity);
        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, responseEntity.getStatusCode());
    }

     */

    @Test
    void delete_ReturnsMessageDTO() {
        // Arrange
        Long postId = 1L;
        Post post = new Post();
        post.setId(postId);
        post.setImage("test_image.jpg");
        when(postRepository.findById(postId)).thenReturn(Optional.of(post));
        doNothing().when(postRepository).deleteById(postId);

        // Act
        ResponseEntity<MessageDTO> responseEntity = postService.delete(postId);

        // Assert
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals("Post successfully deleted", responseEntity.getBody().getContent());

    }
    @Test
    void delete_PostNotFound_ReturnsNotFound() throws IOException {
        // Arrange
        Long postId = 1L;
        when(postRepository.findById(postId)).thenReturn(Optional.empty());

        // Act
        ResponseEntity<MessageDTO> responseEntity = postService.delete(postId);

        // Assert
        assertNotNull(responseEntity);
        assertEquals(HttpStatus.NOT_FOUND, responseEntity.getStatusCode());
        verify(postRepository, times(1)).findById(postId);
        verify(postRepository, never()).deleteById(anyLong());
        verify(imageService, never()).deleteImage(anyString());
    }

    @Test
    void delete_ErrorDeletingImage_ReturnsInternalServerError() throws IOException {
        // Arrange
        Long postId = 1L;
        String imageName = "test_image.jpg";
        Post post = new Post();
        post.setImage(imageName);
        when(postRepository.findById(postId)).thenReturn(Optional.of(post));
        doThrow(new IOException("Error deleting image")).when(imageService).deleteImage(imageName);

        // Act
        ResponseEntity<MessageDTO> responseEntity = postService.delete(postId);

        // Assert
        assertNotNull(responseEntity);
        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, responseEntity.getStatusCode());
        verify(postRepository, times(1)).findById(postId);
        verify(postRepository, never()).deleteById(anyLong());
        verify(imageService, times(1)).deleteImage(imageName);
    }

    @Test
    void delete_ErrorDeletingPost_ReturnsInternalServerError() throws IOException {
        // Arrange
        Long postId = 1L;
        String imageName = "test_image.jpg";
        Post post = new Post();
        post.setImage(imageName);
        when(postRepository.findById(postId)).thenReturn(Optional.of(post));
        doNothing().when(imageService).deleteImage(imageName);
        doThrow(new RuntimeException("Error deleting post")).when(postRepository).deleteById(postId);

        // Act
        ResponseEntity<MessageDTO> responseEntity = postService.delete(postId);

        // Assert
        assertNotNull(responseEntity);
        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, responseEntity.getStatusCode());
        verify(postRepository, times(1)).findById(postId);
        verify(postRepository, times(1)).deleteById(postId);
        verify(imageService, times(1)).deleteImage(imageName);
    }

    @Test
    void findById_NonExistingPost_ReturnsNotFound() {
        // Arrange
        Long postId = 1L;
        when(postRepository.findById(postId)).thenReturn(Optional.empty());

        // Act
        ResponseEntity<PostDTO> responseEntity = postService.findById(postId);

        // Assert
        assertNotNull(responseEntity);
        assertEquals(HttpStatus.NOT_FOUND, responseEntity.getStatusCode());
    }

    @Test
    void findById_ErrorFetchingPost_ReturnsInternalServerError() {
        // Arrange
        Long postId = 1L;
        when(postRepository.findById(postId)).thenThrow(new RuntimeException("Error fetching post"));

        // Act
        ResponseEntity<PostDTO> responseEntity = postService.findById(postId);

        // Assert
        assertNotNull(responseEntity);
        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, responseEntity.getStatusCode());
    }

    @Test
    void search_ReturnsPageOfPostDTO() {
        // Arrange
        String query = "example";
        List<Post> posts = new ArrayList<>();
        posts.add(new Post());
        Page<Post> page = new PageImpl<>(posts);
        when(postRepository.findByTitleContaining(eq(query), any(PageRequest.class))).thenReturn(page);

        List<PostDTO> postDTOs = new ArrayList<>();
        postDTOs.add(new PostDTO());
        Page<PostDTO> expectedPage = new PageImpl<>(postDTOs);
        when(postConverter.fromEntity(any(Post.class))).thenReturn(new PostDTO());

        // Act
        ResponseEntity<Page<PostDTO>> responseEntity = postService.search(query, PageRequest.of(0, 10));

        // Assert
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(expectedPage, responseEntity.getBody());

    }
    @Test
    void search_ExceptionThrown_ReturnsInternalServerError() {
        // Arrange
        String query = "test";
        Pageable pageable = Pageable.unpaged();
        when(postRepository.findByTitleContaining(eq(query), any(Pageable.class)))
                .thenThrow(new RuntimeException("Error searching posts"));

        // Act
        ResponseEntity<Page<PostDTO>> responseEntity = postService.search(query, pageable);

        // Assert
        assertNotNull(responseEntity);
        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, responseEntity.getStatusCode());
    }
    @Test
    void search_EmptyResult_ReturnsEmptyPage() {
        // Arrange
        String query = "non_existing_query";
        Pageable pageable = PageRequest.of(0, 10);
        Page<Post> emptyPage = new PageImpl<>(Collections.emptyList());

        when(postRepository.findByTitleContaining(anyString(), any(Pageable.class))).thenReturn(emptyPage);

        // Act
        ResponseEntity<Page<PostDTO>> responseEntity = postService.search(query, pageable);

        // Assert
        assertNotNull(responseEntity);
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertTrue(responseEntity.getBody().isEmpty());
    }

}

