package com.example.fake_blog_backend.controller;


import com.example.fake_blog_backend.dto.CommentDTO;
import com.example.fake_blog_backend.service.ICommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;



@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1")
public class CommentController {

    @Autowired
    private ICommentService service;

    @PostMapping("/comments")
    public ResponseEntity<CommentDTO> create(@RequestBody CommentDTO request) {
        ResponseEntity<CommentDTO> response = service.create(request);
        return response;
    }

    @DeleteMapping("/comments/{id}")
    public ResponseEntity<CommentDTO> delete (@PathVariable Long id) {
        ResponseEntity<CommentDTO> response = service.delete(id);
        return response;
    }

}
