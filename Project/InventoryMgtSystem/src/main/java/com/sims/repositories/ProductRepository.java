package com.sims.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sims.models.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByNameContainingAndDescriptionContaining(String name, String description);

    List<Product> findByNameContainingOrDescriptionContaining(String input, String input2);
}
