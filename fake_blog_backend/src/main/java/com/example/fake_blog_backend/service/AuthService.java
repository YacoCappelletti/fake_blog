package com.example.fake_blog_backend.service;


import com.example.fake_blog_backend.dto.AuthDTO;
import com.example.fake_blog_backend.dto.LoginDTO;
import com.example.fake_blog_backend.dto.RegisterDTO;
import com.example.fake_blog_backend.model.Role;
import com.example.fake_blog_backend.model.User;
import com.example.fake_blog_backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Random;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    public AuthDTO login(LoginDTO request) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
        User user = userRepository.findByUsername(request.getUsername()).orElseThrow();
        String token = jwtService.getToken(user);
        return AuthDTO.builder()
                .id(user.getId())
                .username(user.getUsername())
                .image(user.getImage())
                .token(token)
                .build();

    }

    @Transactional
    public AuthDTO register(RegisterDTO request) {


        try {

            Random random = new Random();
            int seedNumber = random.nextInt(10) + 1;
            String seed = String.valueOf(seedNumber);
            String userImage = "https://api.dicebear.com/7.x/lorelei/svg?seed=" + seed;


            User user = User.builder()
                    .username(request.getUsername())
                    .email(request.getEmail())
                    .image(userImage)
                    .password(passwordEncoder.encode(request.getPassword()))
                    .role(Role.USER)
                    .build();

            userRepository.save(user);

            return AuthDTO.builder()
                    .id(user.getId())
                    .username(user.getUsername())
                    .image(user.getImage())
                    .token(jwtService.getToken(user))
                    .build();
        } catch (DataIntegrityViolationException ex) {

            throw new RuntimeException("Username already exists");
        }
    }
}