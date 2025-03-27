package com.sims.dto;

import java.util.List;

//Category DTO is going to be used to get users inputs from our controller and save that
//When we are getting categories, we re going to be converting our entities to our category and showing data to the user

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
// during seriaization when converting java object to json, ignore the fields
// that are not null
@JsonIgnoreProperties(ignoreUnknown = true)
public class CategoryDTO {

    private Long id;

    @NotBlank(message = "Name is required")
    private String name;

    private List<ProductDTO> products;
}
