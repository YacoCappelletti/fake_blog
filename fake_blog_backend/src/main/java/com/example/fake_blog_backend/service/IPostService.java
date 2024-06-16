package com.example.fake_blog_backend.service;


import com.example.fake_blog_backend.dto.CommentDTO;
import com.example.fake_blog_backend.dto.MessageDTO;
import com.example.fake_blog_backend.dto.PostDTO;
import com.example.fake_blog_backend.dto.UserDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface IPostService {
    //public ResponseEntity<List<PostDTO>> findAll();
    ResponseEntity<Page<PostDTO>> findAll(Pageable pageable);
    public ResponseEntity<PostDTO> findById(Long id);
    public ResponseEntity<PostDTO> create(PostDTO postDTO, MultipartFile imageFile);
    public ResponseEntity<MessageDTO> delete(Long id);

    ResponseEntity<Page<PostDTO>> search(String q, Pageable pageable);

}
