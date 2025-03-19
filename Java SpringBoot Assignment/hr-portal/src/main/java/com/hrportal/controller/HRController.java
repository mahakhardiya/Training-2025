package com.hrportal.controller;

import com.hrportal.model.HR;
import com.hrportal.service.HRService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/hr")
public class HRController {
    private final HRService hrService;

    public HRController(HRService hrService) {
        this.hrService = hrService;
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody HR hr) {
        if (hrService.isValidHr(hr.getEmail(), hr.getPassword())) {
            return ResponseEntity.ok("Login successful");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }
}
