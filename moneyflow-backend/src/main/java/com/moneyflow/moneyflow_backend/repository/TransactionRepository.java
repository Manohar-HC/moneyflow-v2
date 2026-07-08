package com.moneyflow.moneyflow_backend.repository;

import com.moneyflow.moneyflow_backend.entity.Transaction;
import com.moneyflow.moneyflow_backend.entity.TransactionType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

public interface TransactionRepository
        extends JpaRepository<Transaction, Long> {

    List<Transaction> findAllByUserIdOrderByTransactionDateDescIdDesc(
            Long userId
    );

    Optional<Transaction> findByIdAndUserId(
            Long id,
            Long userId
    );

    @Query("""
            SELECT COALESCE(SUM(t.amount), 0)
            FROM Transaction t
            WHERE t.user.id = :userId
            AND t.type = :type
            """)
    BigDecimal sumAmountByUserIdAndType(
            @Param("userId") Long userId,
            @Param("type") TransactionType type
    );
}