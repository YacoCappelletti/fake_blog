package com.example.fake_blog_backend.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name="posts")
public class Post  {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    @Column(columnDefinition = "TEXT")
    private String body;
    private String image;

    @ManyToOne
    @JsonIgnoreProperties({"posts" , "likedPosts", "following", "followedBy", "comments", "role", "enabled", "authorities","accountNonLocked","accountNonExpired","credentialsNonExpired", "image", "email"})
    private User user;

    @ManyToMany(mappedBy = "likedPosts")
    @JsonIgnoreProperties({"posts" , "likedPosts", "following", "followedBy", "comments", "role", "enabled", "authorities","accountNonLocked","accountNonExpired","credentialsNonExpired","email","image"})
    private List<User> likedBy;


    @OneToMany(mappedBy = "post")

    private List<Comment> comments;



}
