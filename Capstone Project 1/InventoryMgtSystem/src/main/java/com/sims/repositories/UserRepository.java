package com.sims.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sims.models.User;

public interface UserRepository extends JpaRepository<User, Long> {
    // method to search a user by its email
    Optional<User> findByEmail(String email);
}
