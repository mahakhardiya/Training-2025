package com.hrportal.service;

import com.hrportal.repository.HRRepository;
import org.springframework.stereotype.Service;

@Service
public class HRService {
    private final HRRepository hrRepository;

    public HRService(HRRepository hrRepository) {
        this.hrRepository = hrRepository;
    }

    public boolean isValidHr(String email, String password) {
        return hrRepository.findByEmailAndPassword(email, password).isPresent();
    }
}
