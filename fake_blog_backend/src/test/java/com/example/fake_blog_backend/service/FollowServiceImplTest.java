package com.example.fake_blog_backend.service;

import com.example.fake_blog_backend.dto.MessageDTO;
import com.example.fake_blog_backend.dto.UserDTO;
import com.example.fake_blog_backend.model.User;
import com.example.fake_blog_backend.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class FollowServiceImplTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private FollowServiceImpl followService;



    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
    }



    @Test
    void testFollow_Successful() {
        // Arrange
        UserDTO userDTO = UserDTO.builder()
                .id(1L)
                .build();

        User follower= User.builder()
                .id(1L)
                .following(new ArrayList<User>())
                .build();

        User followedUser= User.builder()
                .id(2L)
                .followedBy(new ArrayList<User>())
                .build();

        when(userRepository.findById(1L)).thenReturn(Optional.of(follower));
        when(userRepository.findById(2L)).thenReturn(Optional.of(followedUser));
        when(userRepository.save(any(User.class))).thenReturn(followedUser);

        // Act
        ResponseEntity<MessageDTO> response = followService.follow(userDTO, 2L);

        // Assert
        assertNotNull(response);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("User started following the user successfully", response.getBody().getContent());

        // Verify
        verify(userRepository, times(1)).findById(1L);
        verify(userRepository, times(1)).findById(2L);
        verify(userRepository, times(1)).save(follower);
        verify(userRepository, times(1)).save(followedUser);
    }

    @Test
    void testFollow_UserNotFound() {
        // Arrange
        UserDTO userDTO = UserDTO.builder()
                .id(1L)
                .build();

        when(userRepository.findById(1L)).thenReturn(Optional.empty());


        // Act
        ResponseEntity<MessageDTO> response = followService.follow(userDTO, 2L);

        // Assert
        assertNotNull(response);
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertEquals("Follower not found", response.getBody().getContent());

        // Verify
        verify(userRepository, times(1)).findById(1L);
        verify(userRepository, never()).findById(2L);
        verify(userRepository, never()).save(any(User.class));
    }

    @Test
    void testFollow_UserToFollowNotFound() {
        // Arrange
        UserDTO userDTO = UserDTO.builder()
                .id(1L)
                .build();

        User follower= User.builder()
                .id(1L)
                .following(new ArrayList<User>())
                .build();

        when(userRepository.findById(1L)).thenReturn(Optional.of(follower));
        when(userRepository.findById(2L)).thenReturn(Optional.empty());

        // Act
        ResponseEntity<MessageDTO> response = followService.follow(userDTO, 2L);

        // Assert
        assertNotNull(response);
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertEquals("User to be followed not found", response.getBody().getContent());

        // Verify
        verify(userRepository, times(1)).findById(1L);
        verify(userRepository, times(1)).findById(2L);
        verify(userRepository, never()).save(any(User.class));
    }

    @Test
    void testUnFollow_Successful() {
        // Arrange
        UserDTO userDTO = UserDTO.builder()
                .id(1L)
                .build();



        User followedUser= User.builder()
                .id(2L)
                .followedBy(new ArrayList<User>())
                .build();

        User follower= User.builder()
                .id(1L)
                .following(new ArrayList<>(Collections.singletonList(followedUser)))
                .build();


        when(userRepository.findById(1L)).thenReturn(Optional.of(follower));
        when(userRepository.findById(2L)).thenReturn(Optional.of(followedUser));

        // Act
        ResponseEntity<MessageDTO> response = followService.unFollow(userDTO, 2L);

        // Assert
        assertNotNull(response);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("User unfollowed the user successfully", response.getBody().getContent());

        // Verify
        verify(userRepository, times(1)).findById(1L);
        verify(userRepository, times(1)).findById(2L);
        verify(userRepository, times(1)).save(follower);
        verify(userRepository, times(1)).save(followedUser);
    }

    @Test
    void testUnFollow_UserNotFound() {
        // Arrange
        UserDTO userDTO = UserDTO.builder()
                .id(1L)
                .build();

        when(userRepository.findById(1L)).thenReturn(Optional.empty());

        // Act
        ResponseEntity<MessageDTO> response = followService.unFollow(userDTO, 2L);

        // Assert
        assertNotNull(response);
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertEquals("Follower not found", response.getBody().getContent());

        // Verify
        verify(userRepository, times(1)).findById(1L);
        verify(userRepository, never()).findById(2L);
        verify(userRepository, never()).save(any(User.class));
    }

    @Test
    void testUnFollow_UserToUnfollowNotFound() {
        // Arrange
        UserDTO userDTO = UserDTO.builder()
                .id(1L)
                .build();

        User follower= User.builder()
                .id(1L)
                .following(new ArrayList<User>())
                .build();

        when(userRepository.findById(1L)).thenReturn(Optional.of(follower));
        when(userRepository.findById(2L)).thenReturn(Optional.empty());

        // Act
        ResponseEntity<MessageDTO> response = followService.unFollow(userDTO, 2L);

        // Assert
        assertNotNull(response);
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertEquals("User to be unfollowed not found", response.getBody().getContent());

        // Verify
        verify(userRepository, times(1)).findById(1L);
        verify(userRepository, times(1)).findById(2L);
        verify(userRepository, never()).save(any(User.class));
    }
}