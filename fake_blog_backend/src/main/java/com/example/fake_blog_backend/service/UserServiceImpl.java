package com.example.fake_blog_backend.service;
import com.example.fake_blog_backend.dto.UserDTO;
import com.example.fake_blog_backend.model.User;
import com.example.fake_blog_backend.repository.UserRepository;
import com.example.fake_blog_backend.util.converter.UserConverter;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Random;


@Service
@AllArgsConstructor
@NoArgsConstructor

public class UserServiceImpl implements IUserService {

    private static final Logger log = LoggerFactory.getLogger(UserServiceImpl.class);

    @Autowired
    private UserRepository userRepository;

    @Autowired
    UserConverter converter;
    @Override
    @Transactional(readOnly = true)
    public ResponseEntity<List<UserDTO>> findAll() {
        log.info("Starting findAll() method of the class UserServiceImpl");
        try {
            List<User> users = (List<User>) userRepository.findAll();
            List<UserDTO> userDTOs = new ArrayList<>();
            for (User user : users) {
                UserDTO userDTO = converter.fromEntity(user);
                userDTOs.add(userDTO);
            }
            return ResponseEntity.ok(userDTOs);
        } catch (Exception e) {
            log.error("Error occurred while fetching users: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @Override
    @Transactional(readOnly = true)
    public ResponseEntity<UserDTO> findById(Long id) {
        log.info("Starting findById() method of the class UserServiceImpl");
        try {
            Optional<User> userOptional = userRepository.findById(id);
            if (userOptional.isPresent()) {
                User user = userOptional.get();
                UserDTO userDTO = converter.fromEntity(user);
                return ResponseEntity.ok(userDTO);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            log.error("Error occurred while fetching user with id {}: {}", id, e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @Override
    @Transactional
    public ResponseEntity<UserDTO> create(UserDTO userDTO) {
        log.info("Starting create() method of the class UserServiceImpl");
        try {
            User user = converter.fromDto(userDTO);

            Random random = new Random();
            int seedNumber = random.nextInt(10) + 1;
            String seed = String.valueOf(seedNumber);

            user.setImage("https://api.dicebear.com/7.x/lorelei/svg?seed=" + seed);

            User savedUser = userRepository.save(user);
            UserDTO savedUserDTO = converter.fromEntity(savedUser);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedUserDTO);
        } catch (Exception e) {
            log.error("Error occurred while creating user: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @Override
    @Transactional
    public ResponseEntity<UserDTO> update(UserDTO userDTO, Long id) {
        log.info("Starting update() method of the class UserServiceImpl");
        try {
            Optional<User> userOptional = userRepository.findById(id);
            if (userOptional.isPresent()) {
                User user = converter.fromDto(userDTO);
                user.setId(id);
                User updatedUser = userRepository.save(user);
                UserDTO updatedUserDTO = converter.fromEntity(updatedUser);
                return ResponseEntity.ok(updatedUserDTO);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            log.error("Error occurred while updating user with id {}: {}", id, e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @Override
    @Transactional
    public ResponseEntity<UserDTO> delete(Long id) {
        log.info("Starting delete() method of the class UserServiceImpl");
        try {
            Optional<User> userOptional = userRepository.findById(id);
            if (userOptional.isPresent()) {
                userRepository.deleteById(id);
                return ResponseEntity.noContent().build();
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            log.error("Error occurred while deleting user with id {}: {}", id, e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
