package com.example.fake_blog_backend.controller;


import com.example.fake_blog_backend.dto.AuthDTO;
import com.example.fake_blog_backend.dto.LoginDTO;
import com.example.fake_blog_backend.dto.RegisterDTO;
import com.example.fake_blog_backend.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@CrossOrigin
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/auth")
public class AuthController {


    private final AuthService authService;



    @PostMapping("/login")
    public ResponseEntity<AuthDTO> login(@RequestBody LoginDTO request)
    {
        return ResponseEntity.ok(authService.login(request));
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterDTO request)
    {
        try {
            AuthDTO authDTO = authService.register(request);
            return ResponseEntity.ok(authDTO);
        } catch (RuntimeException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Username already exists");
        }
    }
}
