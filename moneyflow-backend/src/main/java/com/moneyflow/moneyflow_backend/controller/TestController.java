package com.moneyflow.moneyflow_backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.LinkedHashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/test")
public class TestController {

    @GetMapping("/protected")
    public ResponseEntity<Map<String, Object>> protectedEndpoint(
            Authentication authentication
    ) {
        Map<String, Object> response = new LinkedHashMap<>();

        response.put("message", "JWT protected endpoint working");
        response.put("authenticatedUser", authentication.getName());

        return ResponseEntity.ok(response);
    }
}