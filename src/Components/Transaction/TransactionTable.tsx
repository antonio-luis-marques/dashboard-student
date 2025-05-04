'use client';

import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
} from '@mui/material';
import { Transaction } from '@/types/Transacton';

interface TransactionTableProps {
  transactions: Transaction[];
  onRowClick: (transaction: Transaction) => void;
  maxRows?: number; // Limita o número de transações exibidas
}

const TransactionTable: React.FC<TransactionTableProps> = ({ transactions, onRowClick, maxRows }) => {
  const displayedTransactions = maxRows ? transactions.slice(0, maxRows) : transactions;

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Data</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Método</TableCell>
            <TableCell>Valor</TableCell>
            <TableCell>Cliente</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {displayedTransactions.map((transaction) => (
            <TableRow
              key={transaction.id}
              style={{ cursor: 'pointer' }}
              onClick={() => onRowClick(transaction)}
            >
              <TableCell>{transaction.id}</TableCell>
              <TableCell>{transaction.date}</TableCell>
              <TableCell>
                <Chip
                  label={transaction.status}
                  color={
                    transaction.status === 'Completo'
                      ? 'success'
                      : transaction.status === 'Pendente'
                      ? 'warning'
                      : 'error'
                  }
                />
              </TableCell>
              <TableCell>{transaction.paymentMethod}</TableCell>
              <TableCell>MT {transaction.value.toFixed(2)}</TableCell>
              <TableCell>{transaction.client || 'N/A'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TransactionTable;
