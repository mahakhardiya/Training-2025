package com.sims.models;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "categories")
@Data
@Builder
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // auto-generates the id unique
    private Long id;

    @NotBlank(message = "Name is required")
    private String name;

    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL) // one user can have many transactions
    private List<Product> products;

    @Override
    public String toString() {
        return "User [id=" + id + ", name=" + name + "]";
    }

}
