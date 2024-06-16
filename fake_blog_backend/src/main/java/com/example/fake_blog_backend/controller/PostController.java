package com.example.fake_blog_backend.controller;



import com.example.fake_blog_backend.dto.MessageDTO;
import com.example.fake_blog_backend.dto.PostDTO;
import com.example.fake_blog_backend.dto.UserDTO;
import com.example.fake_blog_backend.service.IPostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


@CrossOrigin(origins = "http://yacocappelletti.es")
@RestController
@RequestMapping("/api/v1")
public class PostController {
    @Value("${app.upload.dir}")
    private String uploadDir;

    @Autowired
    private IPostService postService;



    @GetMapping("/posts")
    public ResponseEntity<Page<PostDTO>> getAll(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {
        ResponseEntity<Page<PostDTO>> response =  postService.findAll(PageRequest.of(page, size));
        return response;
    }

    @GetMapping("/posts/{id}")
    public ResponseEntity<PostDTO> getById(@PathVariable Long id) {
        ResponseEntity<PostDTO> response = postService.findById(id);
        return response;
    }
    @GetMapping("/posts/search")
    public ResponseEntity<Page<PostDTO>> search(
            @RequestParam String q,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        ResponseEntity<Page<PostDTO>> response = postService.search(q, PageRequest.of(page, size));
        return response;
    }


    @PostMapping(value = "/posts")
    public ResponseEntity<PostDTO> create(
            @RequestParam(value = "title") String title,
            @RequestParam(value = "body")  String body,
            @RequestParam(value = "userId")  Long userId,
            @RequestParam(value = "imageFile", required = false) MultipartFile imageFile) {


        UserDTO userDTO = new UserDTO();
        userDTO.setId(userId);
        PostDTO postDTO = new PostDTO();
        postDTO.setUser(userDTO);
        postDTO.setTitle(title);
        postDTO.setBody(body);

        ResponseEntity<PostDTO> response = postService.create(postDTO, imageFile);
        return response;
    }




    @DeleteMapping("/posts/{id}")
    public ResponseEntity<MessageDTO> delete (@PathVariable Long id) {
        ResponseEntity<MessageDTO> response = postService.delete(id);
        return response;
    }




}
