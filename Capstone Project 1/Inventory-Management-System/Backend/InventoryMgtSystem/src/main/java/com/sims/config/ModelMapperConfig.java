package com.sims.config;

import org.modelmapper.ModelMapper;
import org.modelmapper.TypeMap;
import com.sims.models.Transaction;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.sims.dto.TransactionDTO;

@Configuration
public class ModelMapperConfig {

    @Bean
    public ModelMapper modelMapper() {
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration().setFieldMatchingEnabled(true)
                .setFieldAccessLevel(org.modelmapper.config.Configuration.AccessLevel.PRIVATE)
                .setMatchingStrategy(MatchingStrategies.STANDARD);

        TypeMap<Transaction, TransactionDTO> transactionMap = modelMapper.createTypeMap(Transaction.class,
                TransactionDTO.class);
        transactionMap
                .addMappings(mapper -> {
                    mapper.map(src -> src.getProduct().getName(), TransactionDTO::setProductName);
                    mapper.map(src -> src.getProduct().getPrice(), TransactionDTO::setProductPrice);
                });// ✅ Added Mapping for Price

        return modelMapper;
    }

}
