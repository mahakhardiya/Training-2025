package com.hrportal.repository;

import com.hrportal.model.HR;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HRRepository extends JpaRepository<HR, Long> {
    Optional<HR> findByEmailAndPassword(String email, String password);
}
