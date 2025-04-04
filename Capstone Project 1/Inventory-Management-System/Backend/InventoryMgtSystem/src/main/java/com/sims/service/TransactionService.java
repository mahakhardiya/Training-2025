package com.sims.service;

import java.time.LocalDate;

import com.sims.dto.Response;
import com.sims.dto.TransactionRequest;
import com.sims.enums.TransactionStatus;

public interface TransactionService {
    Response purchase(TransactionRequest transactionRequest);

    Response sell(TransactionRequest transactionRequest);

    Response returnToSupplier(TransactionRequest transactionRequest);

    Response getAllTransactions(int page, int size, String filter);

    Response getAllTransactionById(Long id);

    Response getAllTransactionByMonthAndYear(int month, int year);

    Response getAllTransactionByDate(LocalDate date);

    Response updateTransactionStatus(Long transactionId, TransactionStatus status);
}
