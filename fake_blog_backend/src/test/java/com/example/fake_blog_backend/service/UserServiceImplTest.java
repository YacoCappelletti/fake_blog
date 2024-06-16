package com.example.fake_blog_backend.service;

import com.example.fake_blog_backend.dto.UserDTO;
import com.example.fake_blog_backend.model.User;
import com.example.fake_blog_backend.repository.UserRepository;
import com.example.fake_blog_backend.util.converter.UserConverter;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import static org.mockito.ArgumentMatchers.any;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

class UserServiceImplTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private UserConverter converter;

    @InjectMocks
    private UserServiceImpl userService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    void findAll_ReturnsAllUsers() {
        // Arrange
        List<User> users = new ArrayList<>();
        users.add(new User());
        users.add(new User());
        when(userRepository.findAll()).thenReturn(users);

        // Act
        ResponseEntity<List<UserDTO>> response = userService.findAll();

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(users.size(), response.getBody().size());
    }

    @Test
    void findById_ExistingId_ReturnsUser() {
        // Arrange
        Long id = 1L;
        User user = new User();
        when(userRepository.findById(id)).thenReturn(Optional.of(user));

        // Act
        ResponseEntity<UserDTO> response = userService.findById(id);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
    }

    @Test
    void findById_NonExistingId_ReturnsNotFound() {
        // Arrange
        Long id = 1L;
        when(userRepository.findById(id)).thenReturn(Optional.empty());

        // Act
        ResponseEntity<UserDTO> response = userService.findById(id);

        // Assert
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    }

    @Test
    void create_ValidUser_ReturnsCreated() {
        // Arrange
        UserDTO userDTO = new UserDTO();
        userDTO.setUsername("test");
        userDTO.setEmail("test@example.com");
        userDTO.setImage("test.jpg");


        User user = new User();
        when(userRepository.save(any(User.class))).thenReturn(user);
        when(converter.fromDto(userDTO)).thenReturn(user);
        when(converter.fromEntity(any(User.class))).thenReturn(userDTO);


        // Act
        ResponseEntity<UserDTO> response = userService.create(userDTO);

        // Assert
        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals(userDTO, response.getBody());
    }


    @Test
    void update_ExistingId_ReturnsUpdated() {
        // Arrange
        Long id = 1L;
        UserDTO userDTO = new UserDTO();
        User user = new User();
        when(userRepository.findById(id)).thenReturn(Optional.of(user));
        when(userRepository.save(user)).thenReturn(user);
        when(converter.fromDto(userDTO)).thenReturn(user);
        when(converter.fromEntity(any(User.class))).thenReturn(userDTO);

        // Act
        ResponseEntity<UserDTO> response = userService.update(userDTO, id);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
    }

    @Test
    void update_NonExistingId_ReturnsNotFound() {
        // Arrange
        Long id = 1L;
        UserDTO userDTO = new UserDTO();
        when(userRepository.findById(id)).thenReturn(Optional.empty());

        // Act
        ResponseEntity<UserDTO> response = userService.update(userDTO, id);

        // Assert
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    }

    @Test
    void delete_ExistingId_ReturnsNoContent() {
        // Arrange
        Long id = 1L;
        User user = new User();
        when(userRepository.findById(id)).thenReturn(Optional.of(user));

        // Act
        ResponseEntity<UserDTO> response = userService.delete(id);

        // Assert
        assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
    }

    @Test
    void delete_NonExistingId_ReturnsNotFound() {
        // Arrange
        Long id = 1L;
        when(userRepository.findById(id)).thenReturn(Optional.empty());

        // Act
        ResponseEntity<UserDTO> response = userService.delete(id);

        // Assert
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    }
}