package com.example.fake_blog_backend.controller;

import com.example.fake_blog_backend.dto.UserDTO;
import com.example.fake_blog_backend.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1")
public class UserController {

    @Autowired
    private IUserService service;

    @GetMapping("/users")
    public ResponseEntity<List<UserDTO>> getAll() {

        ResponseEntity<List<UserDTO>> response = service.findAll();
        return response;
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<UserDTO> getById(@PathVariable Long id) {

        ResponseEntity<UserDTO> response = service.findById(id);
        return response;
    }

}
