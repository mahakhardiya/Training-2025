package com.sims.service.impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.sims.dto.Response;
import com.sims.dto.TransactionDTO;
import com.sims.dto.TransactionRequest;
import com.sims.enums.TransactionStatus;
import com.sims.enums.TransactionType;
import com.sims.exceptions.NameValueRequiredException;
import com.sims.exceptions.NotFoundException;
import com.sims.models.Product;
import com.sims.models.Supplier;
import com.sims.models.Transaction;
import com.sims.models.User;
import com.sims.repositories.ProductRepository;
import com.sims.repositories.SupplierRepository;
import com.sims.repositories.TransactionRepository;
import com.sims.service.TransactionService;
import com.sims.service.UserService;
import com.sims.specification.TransactionFilter;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class TransactionServiceImpl implements TransactionService {

        private final TransactionRepository transactionRepository;
        private final ProductRepository productRepository;
        private final SupplierRepository supplierRepository;
        private final UserService userService;
        private final ModelMapper modelMapper;

        @Override
        public Response purchase(TransactionRequest transactionRequest) {

                Long productId = transactionRequest.getProductId();
                Long supplierId = transactionRequest.getSupplierId();
                Integer quantity = transactionRequest.getQuantity();

                if (supplierId == null)
                        throw new NameValueRequiredException("Supplier Id is Required");

                Product product = productRepository.findById(productId)
                                .orElseThrow(() -> new NotFoundException("Product Not Found"));

                Supplier supplier = supplierRepository.findById(supplierId)
                                .orElseThrow(() -> new NotFoundException("Supplier Not Found"));

                User user = userService.getCurrentLoggedInUser();

                // update the stock quantity and re-save
                product.setStockQuantity(product.getStockQuantity() + quantity);
                productRepository.save(product);

                // create a transaction
                Transaction transaction = Transaction.builder()
                                .transactionType(TransactionType.PURCHASE)
                                .status(TransactionStatus.COMPLETED)
                                .product(product)
                                .user(user)
                                .supplier(supplier)
                                .totalProducts(quantity)
                                .totalPrice(product.getPrice().multiply(BigDecimal.valueOf(quantity)))
                                .description(transactionRequest.getDescription())
                                .note(transactionRequest.getNote())
                                .build();

                transactionRepository.save(transaction);
                return Response.builder()
                                .status(200)
                                .message("Purchase Made successfully")
                                .build();

        }

        @Override
        public Response sell(TransactionRequest transactionRequest) {

                Long productId = transactionRequest.getProductId();
                Integer quantity = transactionRequest.getQuantity();

                Product product = productRepository.findById(productId)
                                .orElseThrow(() -> new NotFoundException("Product Not Found"));

                User user = userService.getCurrentLoggedInUser();

                // update the stock quantity and re-save
                product.setStockQuantity(product.getStockQuantity() - quantity);
                productRepository.save(product);

                // create a transaction
                Transaction transaction = Transaction.builder()
                                .transactionType(TransactionType.SALE)
                                .status(TransactionStatus.COMPLETED)
                                .product(product)
                                .user(user)
                                .totalProducts(quantity)
                                .totalPrice(product.getPrice().multiply(BigDecimal.valueOf(quantity)))
                                .description(transactionRequest.getDescription())
                                .note(transactionRequest.getNote())
                                .build();

                transactionRepository.save(transaction);
                return Response.builder()
                                .status(200)
                                .message("Product Sale successfully made")
                                .build();

        }

        @Override
        public Response returnToSupplier(TransactionRequest transactionRequest) {

                Long productId = transactionRequest.getProductId();
                Long supplierId = transactionRequest.getSupplierId();
                Integer quantity = transactionRequest.getQuantity();

                if (supplierId == null)
                        throw new NameValueRequiredException("Supplier Id is Required");

                Product product = productRepository.findById(productId)
                                .orElseThrow(() -> new NotFoundException("Product Not Found"));

                User user = userService.getCurrentLoggedInUser();

                // update the stock quantity and re-save
                product.setStockQuantity(product.getStockQuantity() - quantity);
                productRepository.save(product);

                // create a transaction
                Transaction transaction = Transaction.builder()
                                .transactionType(TransactionType.RETURN_TO_SUPPLIER)
                                .status(TransactionStatus.PROCESSING)
                                .product(product)
                                .user(user)
                                .totalProducts(quantity)
                                .totalPrice(BigDecimal.ZERO)
                                .description(transactionRequest.getDescription())
                                .note(transactionRequest.getNote())
                                .build();

                transactionRepository.save(transaction);

                return Response.builder()
                                .status(200)
                                .message("Product Returned in progress")
                                .build();

        }

        @Override
        public Response getAllTransactions(int page, int size, String filter) {
                Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "id"));

                // Use the Transaction specification
                Specification<Transaction> spec = TransactionFilter.byFilter(filter);
                Page<Transaction> transactionPage = transactionRepository.findAll(spec, pageable);

                List<TransactionDTO> transactionDTOS = modelMapper.map(transactionPage.getContent(),
                                new TypeToken<List<TransactionDTO>>() {
                                }.getType());

                transactionDTOS.forEach(transactionDTO -> {
                        if (transactionDTO.getProduct() != null) {
                                transactionDTO.setProductName(transactionDTO.getProduct().getName());
                                transactionDTO.setProductPrice(transactionDTO.getProduct().getPrice()); // ✅ BigDecimal
                                                                                                        // remains
                        } else {
                                transactionDTO.setProductName("N/A");
                                transactionDTO.setProductPrice(BigDecimal.ZERO); // ✅ Use BigDecimal.ZERO instead of 0.0
                        }

                        transactionDTO.setUser(null);
                        transactionDTO.setProduct(null);
                        transactionDTO.setSupplier(null);

                });

                return Response.builder()
                                .status(200)
                                .message("success")
                                .transactions(transactionDTOS)
                                .totalElements(transactionPage.getTotalElements())
                                .totalPages(transactionPage.getTotalPages())
                                .build();
        }

        @Override
        public Response getAllTransactionById(Long id) {

                Transaction transaction = transactionRepository.findById(id)
                                .orElseThrow(() -> new NotFoundException("Transaction Not Found"));

                TransactionDTO transactionDTO = modelMapper.map(transaction, TransactionDTO.class);

                transactionDTO.setProductName(
                                transaction.getProduct() != null ? transaction.getProduct().getName() : "N/A"); // ✅ Add
                                                                                                                // Product
                                                                                                                // Name

                transactionDTO.getUser().setTransactions(null);

                return Response.builder()
                                .status(200)
                                .message("success")
                                .transaction(transactionDTO)
                                .build();
        }

        @Override
        public Response getAllTransactionByMonthAndYear(int month, int year) {
                List<Transaction> transactions = transactionRepository
                                .findAll(TransactionFilter.byMonthAndYear(month, year));

                List<TransactionDTO> transactionDTOS = modelMapper.map(transactions,
                                new TypeToken<List<TransactionDTO>>() {
                                }.getType());

                transactionDTOS.forEach(transactionDTO -> {
                        transactionDTO.setUser(null);
                        transactionDTO.setProduct(null);
                        transactionDTO.setSupplier(null);
                });

                return Response.builder()
                                .status(200)
                                .message("success")
                                .transactions(transactionDTOS)
                                .build();
        }

        @Override
        public Response getAllTransactionByDate(LocalDate date) {
                List<Transaction> transactions = transactionRepository
                                .findAll(TransactionFilter.byExactDate(date));

                List<TransactionDTO> transactionDTOS = modelMapper.map(transactions,
                                new TypeToken<List<TransactionDTO>>() {
                                }.getType());

                transactionDTOS.forEach(transactionDTO -> {
                        transactionDTO.setUser(null);
                        transactionDTO.setProduct(null);
                        transactionDTO.setSupplier(null);
                });

                return Response.builder()
                                .status(200)
                                .message("success")
                                .transactions(transactionDTOS)
                                .build();
        }

        @Override
        public Response updateTransactionStatus(Long transactionId, TransactionStatus status) {

                Transaction existingTransaction = transactionRepository.findById(transactionId)
                                .orElseThrow(() -> new NotFoundException("Transaction Not Found"));

                existingTransaction.setStatus(status);
                existingTransaction.setUpdateAt(LocalDateTime.now());

                transactionRepository.save(existingTransaction);

                return Response.builder()
                                .status(200)
                                .message("Transaction Status Successfully Updated")
                                .build();

        }

}
