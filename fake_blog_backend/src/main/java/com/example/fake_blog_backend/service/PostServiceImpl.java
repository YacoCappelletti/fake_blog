package com.example.fake_blog_backend.service;
import com.example.fake_blog_backend.dto.MessageDTO;
import com.example.fake_blog_backend.dto.PostDTO;
import com.example.fake_blog_backend.model.Post;
import com.example.fake_blog_backend.repository.CommentRepository;
import com.example.fake_blog_backend.repository.PostRepository;
import com.example.fake_blog_backend.repository.UserRepository;

import com.example.fake_blog_backend.util.converter.PostConverter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;


import java.util.Optional;



@Service
public class PostServiceImpl implements IPostService {

    private static final Logger log = LoggerFactory.getLogger(PostServiceImpl.class);

    @Autowired
    private PostRepository postRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    IImageService imageService;


    @Autowired
    private PostConverter converter;

    @Override
    @Transactional(readOnly = true)
    public ResponseEntity<Page<PostDTO>> findAll(Pageable pageable) {
        log.info("Starting findAll() method of the class PostServiceImpl");
        try {


            Sort sort = Sort.by(Sort.Direction.DESC, "id");
            Pageable sortedPageable = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), sort);
            Page<Post> postsPage = postRepository.findAll(sortedPageable);
            Page<PostDTO> postDTOsPage = postsPage.map(converter::fromEntity);
            return ResponseEntity.ok(postDTOsPage);
        } catch (Exception e) {
            log.error("Error occurred while fetching posts: {}", e.getMessage(),e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


    @Override
    @Transactional(readOnly = true)
    public ResponseEntity<PostDTO> findById(Long id) {

        log.info("Starting findById() method of the class PostServiceImpl");
        try {
            Optional<Post> postOptional = postRepository.findById(id);
            if (postOptional.isPresent()) {
                Post post = postOptional.get();
                PostDTO postDTO = converter.fromEntity(post);
                return ResponseEntity.ok(postDTO);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            log.error("Error occurred while fetching post with id {}: {}", id, e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


    @Override
    @Transactional
    public ResponseEntity<PostDTO> create(PostDTO postDTO, MultipartFile imageFile) {

        log.info("Starting create() method of the class PostServiceImpl");
        try {
            String imageName = imageService.saveImage(imageFile);

            postDTO.setImage(imageName);

            Post post = converter.fromDto(postDTO);
            Post savedPost = postRepository.save(post);
            PostDTO savedPostDTO = converter.fromEntity(savedPost);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedPostDTO);
        } catch (Exception e) {
            log.error("Error occurred while creating post: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


    @Override
    @Transactional
    public ResponseEntity<MessageDTO> delete(Long id) {

        log.info("Starting delete() method of the class PostServiceImpl");
        try {
            Optional<Post> postOptional = postRepository.findById(id);
            if (postOptional.isPresent()) {

                Post post = postOptional.get();
                String imageName = post.getImage();

                if (!imageName.startsWith("http") && !imageName.isEmpty()) {

                    imageService.deleteImage(imageName);
                }

                postRepository.deleteById(id);
                return ResponseEntity.status(HttpStatus.OK).body(new MessageDTO("Post successfully deleted"));
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            log.error("Error occurred while deleting post with id {}: {}", id, e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @Override
    public ResponseEntity<Page<PostDTO>> search(String q, Pageable pageable) {
        try {


            Sort sort = Sort.by(Sort.Direction.DESC, "id");


            Pageable sortedPageable = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), sort);

            Page<Post> searchResults = postRepository.findByTitleContaining(q, sortedPageable);

            Page<PostDTO> searchResultsDto = searchResults.map(converter::fromEntity);

            return ResponseEntity.ok(searchResultsDto);
        } catch (Exception e) {

            log.error("Error occurred while searching: {}", e.getMessage());

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }





}
