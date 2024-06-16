package com.example.fake_blog_backend.controller;


import com.example.fake_blog_backend.dto.MessageDTO;
import com.example.fake_blog_backend.dto.UserDTO;
import com.example.fake_blog_backend.service.IFollowService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1")
public class FollowController {

    @Autowired
    private IFollowService followService;


    @PostMapping("/follow/{id}")
    public ResponseEntity<MessageDTO> followUser(@RequestBody UserDTO userDTO, @PathVariable Long id){

        ResponseEntity<MessageDTO> response = followService.follow(userDTO, id);

        return response;
    }

    @PostMapping("/unfollow/{id}")
    public ResponseEntity<MessageDTO> unFollowUser(@RequestBody  UserDTO userDTO, @PathVariable Long id){

        ResponseEntity<MessageDTO> response = followService.unFollow(userDTO, id);

        return response;
    }


}
