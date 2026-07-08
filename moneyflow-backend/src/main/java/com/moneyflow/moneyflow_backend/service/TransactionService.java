package com.moneyflow.moneyflow_backend.service;

import com.moneyflow.moneyflow_backend.dto.DashboardSummaryResponse;
import com.moneyflow.moneyflow_backend.dto.TransactionRequest;
import com.moneyflow.moneyflow_backend.dto.TransactionResponse;
import com.moneyflow.moneyflow_backend.entity.Transaction;
import com.moneyflow.moneyflow_backend.entity.TransactionType;
import com.moneyflow.moneyflow_backend.entity.User;
import com.moneyflow.moneyflow_backend.repository.TransactionRepository;
import com.moneyflow.moneyflow_backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
public class TransactionService {

    private final TransactionRepository transactionRepository;
    private final UserRepository userRepository;

    public TransactionService(
            TransactionRepository transactionRepository,
            UserRepository userRepository
    ) {
        this.transactionRepository = transactionRepository;
        this.userRepository = userRepository;
    }

    public TransactionResponse createTransaction(
            String authenticatedEmail,
            TransactionRequest request
    ) {
        User user = getAuthenticatedUser(authenticatedEmail);

        Transaction transaction = new Transaction();

        applyTransactionRequest(transaction, request);

        transaction.setUser(user);

        Transaction savedTransaction =
                transactionRepository.save(transaction);

        return mapToResponse(savedTransaction);
    }

    public List<TransactionResponse> getAllTransactions(
            String authenticatedEmail
    ) {
        User user = getAuthenticatedUser(authenticatedEmail);

        return transactionRepository
                .findAllByUserIdOrderByTransactionDateDescIdDesc(user.getId())
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    public TransactionResponse updateTransaction(
            String authenticatedEmail,
            Long transactionId,
            TransactionRequest request
    ) {
        User user = getAuthenticatedUser(authenticatedEmail);

        Transaction transaction = transactionRepository
                .findByIdAndUserId(transactionId, user.getId())
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Transaction not found"
                        )
                );

        applyTransactionRequest(transaction, request);

        Transaction updatedTransaction =
                transactionRepository.save(transaction);

        return mapToResponse(updatedTransaction);
    }

    public void deleteTransaction(
            String authenticatedEmail,
            Long transactionId
    ) {
        User user = getAuthenticatedUser(authenticatedEmail);

        Transaction transaction = transactionRepository
                .findByIdAndUserId(transactionId, user.getId())
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Transaction not found"
                        )
                );

        transactionRepository.delete(transaction);
    }

    public DashboardSummaryResponse getDashboardSummary(
            String authenticatedEmail
    ) {
        User user = getAuthenticatedUser(authenticatedEmail);

        BigDecimal totalIncome =
                transactionRepository.sumAmountByUserIdAndType(
                        user.getId(),
                        TransactionType.INCOME
                );

        BigDecimal totalExpense =
                transactionRepository.sumAmountByUserIdAndType(
                        user.getId(),
                        TransactionType.EXPENSE
                );

        BigDecimal balance = totalIncome.subtract(totalExpense);

        return new DashboardSummaryResponse(
                totalIncome,
                totalExpense,
                balance
        );
    }

    private void applyTransactionRequest(
            Transaction transaction,
            TransactionRequest request
    ) {
        transaction.setTitle(request.getTitle().trim());
        transaction.setAmount(request.getAmount());
        transaction.setType(request.getType());
        transaction.setCategory(request.getCategory().trim());
        transaction.setTransactionDate(request.getTransactionDate());

        if (request.getNote() == null || request.getNote().isBlank()) {
            transaction.setNote(null);
        } else {
            transaction.setNote(request.getNote().trim());
        }
    }

    private User getAuthenticatedUser(String authenticatedEmail) {
        return userRepository.findByEmail(authenticatedEmail)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Authenticated user not found"
                        )
                );
    }

    private TransactionResponse mapToResponse(
            Transaction transaction
    ) {
        return new TransactionResponse(
                transaction.getId(),
                transaction.getTitle(),
                transaction.getAmount(),
                transaction.getType(),
                transaction.getCategory(),
                transaction.getTransactionDate(),
                transaction.getNote()
        );
    }
}