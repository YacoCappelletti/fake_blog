package com.example.fake_blog_backend.util.converter;

import com.example.fake_blog_backend.dto.UserDTO;
import com.example.fake_blog_backend.model.User;
import org.springframework.stereotype.Component;

@Component
public class UserConverter extends AbstractConverter <User, UserDTO>{

    @Override
    public User fromDto(UserDTO dto) {
        User user = new User();
        user.setId(dto.getId());
        user.setUsername(dto.getUsername());
        user.setEmail(dto.getEmail());
        user.setImage(dto.getImage());
        user.setPosts(dto.getPosts());
        user.setLikedPosts(dto.getLikedPosts());
        user.setFollowing(dto.getFollowing());
        user.setFollowedBy(dto.getFollowedBy());
        user.setComments(dto.getComments());
        user.setRole(dto.getRole());
        return user;
    }

    @Override
    public UserDTO fromEntity(User entity) {
        UserDTO userDTO = new UserDTO();
        userDTO.setId(entity.getId());
        userDTO.setUsername(entity.getUsername());
        userDTO.setEmail(entity.getEmail());
        userDTO.setImage(entity.getImage());
        userDTO.setPosts(entity.getPosts());
        userDTO.setLikedPosts(entity.getLikedPosts());
        userDTO.setFollowing(entity.getFollowing());
        userDTO.setFollowedBy(entity.getFollowedBy());
        userDTO.setComments(entity.getComments());
        userDTO.setRole(entity.getRole());
        return userDTO;
    }
}
