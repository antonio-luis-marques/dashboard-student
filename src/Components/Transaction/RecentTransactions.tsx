'use client';

import React, { useState } from 'react';
import TransactionTable from './TransactionTable';
import TransactionModal from './TransactionModal';
import { Transaction } from '@/types/Transacton';

interface RecentTransactionsProps {
  transactions: Transaction[];
}

const RecentTransactions: React.FC<RecentTransactionsProps> = ({ transactions }) => {
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [open, setOpen] = useState(false);

  const handleRowClick = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedTransaction(null);
    setOpen(false);
  };

  return (
    <>
      <TransactionTable
        transactions={transactions}
        onRowClick={handleRowClick}
        maxRows={5}
      />
      <TransactionModal
        open={open}
        transaction={selectedTransaction}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default RecentTransactions;
