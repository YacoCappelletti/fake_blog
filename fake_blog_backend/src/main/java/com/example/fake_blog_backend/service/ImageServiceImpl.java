package com.example.fake_blog_backend.service;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;


@Service
public class ImageServiceImpl implements IImageService {

    @Value("${app.upload.dir}")
    private String uploadDir;

    public String saveImage(MultipartFile file) throws IOException {

        String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
        Path filePath = Paths.get(uploadDir + File.separator + fileName);
        Files.copy(file.getInputStream(), filePath);
        return fileName;
    }

    public Resource getImage(String fileName) throws MalformedURLException, FileNotFoundException {
        Path filePath = Paths.get(uploadDir + File.separator + fileName);
        Resource resource = new UrlResource(filePath.toUri());
        if (resource.exists() && resource.isReadable()) {
            return resource;
        } else {
            throw new FileNotFoundException("The image could not be found or is not readable: " + fileName);
        }
    }

    public void deleteImage(String fileName) throws IOException {
        Path filePath = Paths.get(uploadDir + File.separator + fileName);
        Files.deleteIfExists(filePath);
    }
}
