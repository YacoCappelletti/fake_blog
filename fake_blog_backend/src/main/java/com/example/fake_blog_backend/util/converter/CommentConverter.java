package com.example.fake_blog_backend.util.converter;

import com.example.fake_blog_backend.dto.CommentDTO;
import com.example.fake_blog_backend.model.Comment;
import org.springframework.stereotype.Component;


@Component
public class CommentConverter extends AbstractConverter <Comment, CommentDTO>{
    @Override
    public Comment fromDto(CommentDTO dto) {
        Comment comment = new Comment();
        comment.setId(dto.getId());
        comment.setBody(dto.getBody());
        comment.setPost(dto.getPost());
        comment.setUser(dto.getUser());
        return comment;
    }

    @Override
    public CommentDTO fromEntity(Comment entity) {
        CommentDTO commentDTO = new CommentDTO();
        commentDTO.setId(entity.getId());
        commentDTO.setBody(entity.getBody());
        commentDTO.setPost(entity.getPost());
        commentDTO.setUser(entity.getUser());
        return commentDTO;
    }
}
