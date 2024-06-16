package com.example.fake_blog_backend.service;

import com.example.fake_blog_backend.dto.CommentDTO;
import com.example.fake_blog_backend.dto.MessageDTO;
import com.example.fake_blog_backend.dto.UserDTO;
import org.springframework.http.ResponseEntity;

import java.util.List;


public interface IUserService {
    public ResponseEntity<List<UserDTO>> findAll();
    public ResponseEntity<UserDTO> findById(Long id);
    public ResponseEntity<UserDTO> create(UserDTO postDTO);
    public ResponseEntity<UserDTO> update(UserDTO postDTO, Long id);
    public ResponseEntity<UserDTO> delete(Long id);

}
