package com.moneyflow.moneyflow_backend.controller;

import com.moneyflow.moneyflow_backend.dto.DashboardSummaryResponse;
import com.moneyflow.moneyflow_backend.dto.TransactionRequest;
import com.moneyflow.moneyflow_backend.dto.TransactionResponse;
import com.moneyflow.moneyflow_backend.service.TransactionService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {

    private final TransactionService transactionService;

    public TransactionController(
            TransactionService transactionService
    ) {
        this.transactionService = transactionService;
    }

    @PostMapping
    public ResponseEntity<TransactionResponse> createTransaction(
            Authentication authentication,
            @Valid @RequestBody TransactionRequest request
    ) {
        TransactionResponse response =
                transactionService.createTransaction(
                        authentication.getName(),
                        request
                );

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    @GetMapping
    public ResponseEntity<List<TransactionResponse>> getAllTransactions(
            Authentication authentication
    ) {
        List<TransactionResponse> response =
                transactionService.getAllTransactions(
                        authentication.getName()
                );

        return ResponseEntity.ok(response);
    }

    @GetMapping("/dashboard")
    public ResponseEntity<DashboardSummaryResponse> getDashboardSummary(
            Authentication authentication
    ) {
        DashboardSummaryResponse response =
                transactionService.getDashboardSummary(
                        authentication.getName()
                );

        return ResponseEntity.ok(response);
    }

    @PutMapping("/{transactionId}")
    public ResponseEntity<TransactionResponse> updateTransaction(
            Authentication authentication,
            @PathVariable Long transactionId,
            @Valid @RequestBody TransactionRequest request
    ) {
        TransactionResponse response =
                transactionService.updateTransaction(
                        authentication.getName(),
                        transactionId,
                        request
                );

        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{transactionId}")
    public ResponseEntity<Void> deleteTransaction(
            Authentication authentication,
            @PathVariable Long transactionId
    ) {
        transactionService.deleteTransaction(
                authentication.getName(),
                transactionId
        );

        return ResponseEntity.noContent().build();
    }
}