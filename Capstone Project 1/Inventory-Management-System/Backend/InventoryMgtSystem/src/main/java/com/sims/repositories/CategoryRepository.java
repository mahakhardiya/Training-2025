package com.sims.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sims.models.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {

}
