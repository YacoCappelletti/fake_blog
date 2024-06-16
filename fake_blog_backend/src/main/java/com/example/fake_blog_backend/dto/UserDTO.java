package com.example.fake_blog_backend.dto;

import com.example.fake_blog_backend.model.Comment;
import com.example.fake_blog_backend.model.Post;
import com.example.fake_blog_backend.model.Role;
import com.example.fake_blog_backend.model.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import java.io.Serializable;
import java.util.List;


@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO implements Serializable {

    private Long id;
    private String username;
    private String email;
    private String image;

    @JsonIgnoreProperties({ })
    private List<Post> posts;

    @JsonIgnoreProperties({})
    private List<Post> likedPosts;

    @JsonIgnoreProperties({"likedPosts","posts","following","followedBy", "comments", "role", "enabled", "accountNonExpired", "credentialsNonExpired", "authorities","accountNonLocked"})
    private List<User> following;

    @JsonIgnoreProperties({"likedPosts","posts","following","followedBy", "comments", "role", "enabled", "accountNonExpired", "credentialsNonExpired", "authorities","accountNonLocked"})
    private List<User> followedBy;


    private List<Comment> comments;

    private Role role;

}
