package com.example.fake_blog_backend.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;
import org.springframework.web.multipart.MultipartFile;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class ImageServiceImplTest {

    @Mock
    private Path mockPath;

    @Mock
    private InputStream mockInputStream;

    @Mock
    private Resource mockResource;

    @InjectMocks
    private ImageServiceImpl imageService;

    @Mock
    Files files;
    @Mock
    File file;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    /*
    @Test
    void saveImage_ReturnsFileName() throws IOException {
        // Arrange
        MultipartFile file = new MockMultipartFile("test.jpg", new byte[0]);
        String expectedFileName = UUID.randomUUID().toString() + "_test.jpg";
        Path mockPath = mock(Path.class);


        when(Paths.get(any(String.class))).thenReturn(mockPath);
        doNothing().when(Files.copy(any(InputStream.class), any(Path.class)));

        // Act
        String fileName = imageService.saveImage(file);

        // Assert
        assertNotNull(fileName);
        assertTrue(fileName.endsWith(".jpg"));
    }

     */
}