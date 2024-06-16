package com.example.fake_blog_backend.service;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.net.MalformedURLException;

public interface IImageService {
    String saveImage(MultipartFile file) throws IOException;
    Resource getImage(String fileName) throws MalformedURLException, FileNotFoundException;
    void deleteImage(String fileName) throws IOException;
}