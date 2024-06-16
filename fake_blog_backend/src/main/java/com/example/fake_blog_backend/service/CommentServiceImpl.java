package com.example.fake_blog_backend.service;


import com.example.fake_blog_backend.dto.CommentDTO;
import com.example.fake_blog_backend.model.Comment;
import com.example.fake_blog_backend.repository.CommentRepository;
import com.example.fake_blog_backend.util.converter.CommentConverter;
import org.springframework.http.HttpStatus;
import org.springframework.transaction.annotation.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class CommentServiceImpl implements ICommentService {
    private static final Logger log = LoggerFactory.getLogger(CommentServiceImpl.class);

    @Autowired
    private CommentRepository repository;

    @Autowired
    private CommentConverter converter;

    @Override
    @Transactional
    public ResponseEntity<CommentDTO> create(CommentDTO commentDTO) {
        log.info("Starting create() method of the class CommentServiceImpl");
        try {
            Comment comment = converter.fromDto(commentDTO);
            Comment savedComment = repository.save(comment);

            return ResponseEntity.status(HttpStatus.CREATED).body(commentDTO);
        } catch (Exception e) {
            log.error("Error occurred while creating comment: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


    @Override
    @Transactional
    public ResponseEntity<CommentDTO> delete(Long id) {
        log.info("Starting delete() method of the class CommentServiceImpl");
        try {
            Optional<Comment> commentOptional = repository.findById(id);
            if (commentOptional.isPresent()) {
                repository.deleteById(id);
                return ResponseEntity.noContent().build();
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            log.error("Error occurred while deleting comment with id {}: {}", id, e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

    }
}
