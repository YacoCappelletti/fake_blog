package com.example.fake_blog_backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication(exclude =  {DataSourceAutoConfiguration.class })
@EnableAutoConfiguration
public class FakeBlogBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(FakeBlogBackendApplication.class, args);
	}

}
