package com.example.fake_blog_backend.service;

import com.example.fake_blog_backend.dto.MessageDTO;
import com.example.fake_blog_backend.dto.UserDTO;
import com.example.fake_blog_backend.model.User;
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
public class FollowServiceImpl implements IFollowService{

    private static final Logger log = LoggerFactory.getLogger(FollowServiceImpl.class);

    @Autowired
    private UserRepository userRepository;

    @Override
    @Transactional
    public ResponseEntity<MessageDTO> follow(UserDTO userDTO, Long id) {

        log.info("Starting follow() method of the class FollowServiceImpl");


        MessageDTO messageDTO = new MessageDTO();

        try {

            User follower = userRepository.findById(userDTO.getId())
                    .orElseThrow(() -> new EntityNotFoundException("Follower not found"));

            User followedUser = userRepository.findById(id)
                    .orElseThrow(() -> new EntityNotFoundException("User to be followed not found"));


            if (follower.getFollowing().contains(followedUser) ) {

                messageDTO.setContent("User is already following this user");

            }
            else {
                follower.getFollowing().add(followedUser);
                userRepository.save(follower);

                followedUser.getFollowedBy().add(follower);
                userRepository.save(followedUser);

                messageDTO.setContent("User started following the user successfully");
            }

            return ResponseEntity.ok(messageDTO);

        } catch (EntityNotFoundException e) {

            log.error("Error occurred while following user: {}", e.getMessage());
            messageDTO.setContent(e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(messageDTO);

        } catch (Exception e) {

            log.error("Error occurred while following user: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @Override
    @Transactional
    public ResponseEntity<MessageDTO> unFollow(UserDTO userDTO, Long id) {

        log.info("Starting unFollow() method of the class FollowServiceImpl");
        MessageDTO messageDTO = new MessageDTO();

        try {

            User follower = userRepository.findById(userDTO.getId())
                    .orElseThrow(() -> new EntityNotFoundException("Follower not found"));

            User followedUser = userRepository.findById(id)
                    .orElseThrow(() -> new EntityNotFoundException("User to be unfollowed not found"));

            if (!follower.getFollowing().contains(followedUser)) {

                messageDTO.setContent("User is not following this user");

                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(messageDTO);

            }


            follower.getFollowing().remove(followedUser);
            userRepository.save(follower);

            followedUser.getFollowedBy().remove(followedUser);
            userRepository.save(followedUser);

            messageDTO.setContent("User unfollowed the user successfully");

            return ResponseEntity.ok(messageDTO);

        } catch (EntityNotFoundException e) {

            log.error("Error occurred while unfollowing user: {}", e.getMessage());
            messageDTO.setContent(e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(messageDTO);

        } catch (Exception e) {

            log.error("Error occurred while unfollowing user: {}", e.getMessage());

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();

        }
    }
}
