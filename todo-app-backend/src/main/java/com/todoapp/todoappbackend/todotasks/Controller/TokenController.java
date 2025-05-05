package com.todoapp.todoappbackend.todotasks.Controller;

import com.todoapp.todoappbackend.todotasks.security.JwtUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TokenController{

    private final JwtUtil jwtUtil;

    public TokenController(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @CrossOrigin(origins = "http://localhost:8080")
    @GetMapping("/token")
    public ResponseEntity<String> getToken() {
        String token = jwtUtil.generateStaticToken();
        return ResponseEntity.ok(token);
    }

}
