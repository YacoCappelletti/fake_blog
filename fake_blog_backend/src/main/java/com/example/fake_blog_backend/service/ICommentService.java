package com.example.fake_blog_backend.service;

import com.example.fake_blog_backend.dto.CommentDTO;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface ICommentService {

    public ResponseEntity<CommentDTO> create(CommentDTO commentDTO);

    public ResponseEntity<CommentDTO> delete(Long id);

}
