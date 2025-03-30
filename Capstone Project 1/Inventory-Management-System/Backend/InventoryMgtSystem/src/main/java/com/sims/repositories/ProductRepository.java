package com.sims.repositories;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.sims.models.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByNameContainingAndDescriptionContaining(String name, String description);

    List<Product> findByNameContainingOrDescriptionContaining(String input, String input2);

    // ✅ Get low-stock products
    @Query("SELECT p FROM Product p WHERE CAST(p.stockQuantity AS int) < CAST(p.lowStockThreshold AS int)")
    List<Product> findLowStockProducts();

    // ✅ Get products expiring in 7 days
    @Query("SELECT p FROM Product p WHERE p.expiryDate IS NOT NULL AND p.expiryDate <= :expiryLimit")
    List<Product> findExpiringProducts(@Param("expiryLimit") LocalDateTime expiryLimit);
}
