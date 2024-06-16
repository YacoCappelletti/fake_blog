package com.example.fake_blog_backend.service;

import com.example.fake_blog_backend.dto.MessageDTO;
import com.example.fake_blog_backend.dto.UserDTO;
import com.example.fake_blog_backend.model.Post;
import com.example.fake_blog_backend.model.User;
import com.example.fake_blog_backend.repository.PostRepository;
import com.example.fake_blog_backend.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class LikeServiceImpl implements ILikeService{
    private static final Logger log = LoggerFactory.getLogger(LikeServiceImpl.class);

    @Autowired
    private PostRepository postRepository;
    @Autowired
    private UserRepository userRepository;

    @Override
    @Transactional
    public ResponseEntity<MessageDTO> like(UserDTO userDTO, Long id) {
        log.info("Starting like() method of the class LikeServiceImpl");
        MessageDTO messageDTO = new MessageDTO();
        try {

            User user = userRepository.findById(userDTO.getId())
                    .orElseThrow(() -> new EntityNotFoundException("User not found"));
            Post post = postRepository.findById(id)
                    .orElseThrow(() -> new EntityNotFoundException("Post not found"));


            if (post.getLikedBy().contains(user)) {
                messageDTO.setContent("User has already liked this post");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(messageDTO);
            }

            post.getLikedBy().add(user);
            postRepository.save(post);
            user.getLikedPosts().add(post);
            userRepository.save(user);

            messageDTO.setContent("User liked the post successfully");
            return ResponseEntity.ok(messageDTO);
        } catch (EntityNotFoundException e) {
            log.error("Error occurred while liking post: {}", e.getMessage());
            messageDTO.setContent(e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(messageDTO);
        } catch (Exception e) {
            log.error("Error occurred while liking post: {}", e.getMessage());
            messageDTO.setContent(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @Override
    @Transactional
    public ResponseEntity<MessageDTO> unLike(UserDTO userDTO, Long id) {
        log.info("Starting unLike() method of the class LikeServiceImpl");


        MessageDTO messageDTO = new MessageDTO();

        try {

            User user = userRepository.findById(userDTO.getId())
                    .orElseThrow(() -> new EntityNotFoundException("User not found"));
            Post post = postRepository.findById(id)
                    .orElseThrow(() -> new EntityNotFoundException("Post not found"));


            if (!post.getLikedBy().contains(user)) {
                messageDTO.setContent("User hasn't liked this post");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(messageDTO);
            }


            post.getLikedBy().remove(user);
            postRepository.save(post);

            user.getLikedPosts().remove(post);
            userRepository.save(user);

            messageDTO.setContent("User unliked the post successfully");
            return ResponseEntity.ok(messageDTO);
        } catch (EntityNotFoundException e) {
            log.error("Error occurred while unliking post: {}", e.getMessage());
            messageDTO.setContent(e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(messageDTO);
        } catch (Exception e) {

            log.error("Error occurred while unliking post: {}", e.getMessage());
            messageDTO.setContent(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


}
