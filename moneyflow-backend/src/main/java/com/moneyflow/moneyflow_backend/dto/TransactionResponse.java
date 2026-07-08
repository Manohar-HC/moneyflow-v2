package com.moneyflow.moneyflow_backend.dto;

import com.moneyflow.moneyflow_backend.entity.TransactionType;

import java.math.BigDecimal;
import java.time.LocalDate;

public class TransactionResponse {

    private Long id;

    private String title;

    private BigDecimal amount;

    private TransactionType type;

    private String category;

    private LocalDate transactionDate;

    private String note;

    public TransactionResponse(
            Long id,
            String title,
            BigDecimal amount,
            TransactionType type,
            String category,
            LocalDate transactionDate,
            String note
    ) {
        this.id = id;
        this.title = title;
        this.amount = amount;
        this.type = type;
        this.category = category;
        this.transactionDate = transactionDate;
        this.note = note;
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public TransactionType getType() {
        return type;
    }

    public String getCategory() {
        return category;
    }

    public LocalDate getTransactionDate() {
        return transactionDate;
    }

    public String getNote() {
        return note;
    }
}