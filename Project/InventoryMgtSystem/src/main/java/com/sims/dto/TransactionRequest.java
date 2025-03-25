package com.sims.dto;

import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TransactionRequest {

    @Positive(message = "Product Id is required")
    private Long productId;

    @Positive(message = "Quantity Id is required")
    private Integer quantity;

    private Long supplierId;

    private String description;

    private String note;
}
