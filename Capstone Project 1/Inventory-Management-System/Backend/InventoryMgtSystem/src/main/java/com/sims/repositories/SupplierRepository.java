package com.sims.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sims.models.Supplier;

public interface SupplierRepository extends JpaRepository<Supplier, Long> {

}
