package com.example.fake_blog_backend.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="comments")
public class Comment  {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String body;

    @ManyToOne
    @JsonIgnoreProperties({ "title","body","image", "user", "likedBy", "comments"})
    private Post post;

    @ManyToOne
    @JsonIgnoreProperties({"posts", "likedPosts" ,"following", "followedBy", "comments", "email", "image", "role", "authorities", "accountNonExpired", "credentialsNonExpired" ,"accountNonLocked"})
    private User user;



}
