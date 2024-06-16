package com.example.fake_blog_backend.controller;


import com.example.fake_blog_backend.dto.MessageDTO;
import com.example.fake_blog_backend.dto.UserDTO;
import com.example.fake_blog_backend.service.ILikeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1")
public class LikesController {

    @Autowired
    private ILikeService likeService;


    @PostMapping("/like/{id}")
    public ResponseEntity<MessageDTO> likePost(@RequestBody UserDTO userDTO, @PathVariable Long id ){

        ResponseEntity<MessageDTO> response = likeService.like(userDTO, id);

        return response;
    }

    @PostMapping("/unlike/{id}")
    public ResponseEntity<MessageDTO> unLikePost(@RequestBody UserDTO userDTO, @PathVariable Long id){

        ResponseEntity<MessageDTO> response = likeService.unLike(userDTO, id);

        return response;
    }

}
