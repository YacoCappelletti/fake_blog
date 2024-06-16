package com.example.fake_blog_backend.dto;

import com.example.fake_blog_backend.model.Comment;
import com.example.fake_blog_backend.model.User;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.Serializable;
import java.util.List;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PostDTO implements Serializable {

    private Long id;
    private String title;
    private String body;
    private String image;



    @JsonIgnoreProperties({"likedPosts","posts","following","followedBy", "comments", "role", "enabled", "accountNonExpired", "credentialsNonExpired", "authorities","accountNonLocked"})
    private UserDTO user;

    @JsonIgnoreProperties({"likedPosts","posts","following","followedBy", "comments", "role", "enabled", "accountNonExpired", "credentialsNonExpired", "authorities","accountNonLocked"})
    private List<User> likedBy;

    @JsonIgnoreProperties({})
    private List<CommentDTO> comments;



}
