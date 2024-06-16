package com.example.fake_blog_backend.service;

import com.example.fake_blog_backend.dto.MessageDTO;
import com.example.fake_blog_backend.dto.PostDTO;
import com.example.fake_blog_backend.dto.UserDTO;
import org.springframework.http.ResponseEntity;

import java.util.List;


public interface ILikeService {

    ResponseEntity<MessageDTO> like(UserDTO userDTO, Long id);
    ResponseEntity<MessageDTO> unLike(UserDTO postDTO, Long id);

}
