package com.moneyflow.moneyflow_backend.controller;

import com.moneyflow.moneyflow_backend.dto.LoginRequest;
import com.moneyflow.moneyflow_backend.dto.LoginResponse;
import com.moneyflow.moneyflow_backend.dto.RegisterRequest;
import com.moneyflow.moneyflow_backend.entity.User;
import com.moneyflow.moneyflow_backend.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.LinkedHashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<Map<String, Object>> register(
            @Valid @RequestBody RegisterRequest request
    ) {
        User user = authService.register(request);

        Map<String, Object> response = new LinkedHashMap<>();
        response.put("message", "User registered successfully");
        response.put("id", user.getId());
        response.put("name", user.getName());
        response.put("email", user.getEmail());

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(
            @Valid @RequestBody LoginRequest request
    ) {
        LoginResponse response = authService.login(request);

        return ResponseEntity.ok(response);
    }
}