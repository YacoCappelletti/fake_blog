package com.example.fake_blog_backend.util.converter;

import com.example.fake_blog_backend.dto.PostDTO;
import com.example.fake_blog_backend.model.Post;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

@Component
public class PostConverter extends AbstractConverter<Post, PostDTO>{
    @Autowired
    private CommentConverter commentConverter;
    @Autowired
    private UserConverter userConverter;
    @Override
    public Post fromDto(PostDTO dto) {
        Post post = new Post();
        post.setId(dto.getId());
        post.setTitle(dto.getTitle());
        post.setBody(dto.getBody());
        post.setImage(dto.getImage());
        post.setUser(userConverter.fromDto(dto.getUser()));
        post.setLikedBy(dto.getLikedBy());
        post.setComments(commentConverter.fromDto(dto.getComments()));
        return post;
    }

    @Override
    public PostDTO fromEntity(Post entity) {
        PostDTO postDTO = new PostDTO();
        postDTO.setId(entity.getId());
        postDTO.setTitle(entity.getTitle());
        postDTO.setBody(entity.getBody());
        postDTO.setImage(entity.getImage());
        postDTO.setUser(userConverter.fromEntity(entity.getUser()));
        postDTO.setLikedBy(entity.getLikedBy());
        postDTO.setComments(commentConverter.fromEntity(entity.getComments()));
        return postDTO;
    }
}
