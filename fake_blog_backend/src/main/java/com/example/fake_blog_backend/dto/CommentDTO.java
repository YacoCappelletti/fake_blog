package com.example.fake_blog_backend.dto;

import com.example.fake_blog_backend.model.Post;
import com.example.fake_blog_backend.model.User;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class CommentDTO implements Serializable {


    private Long id;
    private String body;
    @JsonIgnoreProperties({"user","followedBy", "following","likedPosts","comments", "likedBy","title", "body", "image"})
    private Post post;
    @JsonIgnoreProperties({
            "email",
            "password",
            "posts",
            "likedPosts",
            "following",
            "followedBy",
            "comments",
            "image",
            "role",
            "enabled",
            "authorities",
            "accountNonExpired",
            "credentialsNonExpired",
            "accountNonLocked"})
    private User user;


    public void setContent(String s) {
    }
}
