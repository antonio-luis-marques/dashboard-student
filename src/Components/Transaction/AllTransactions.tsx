'use client';

import React, { useState } from 'react';
import {
  Box,
  
  TablePagination,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';
import { Transaction } from '@/types/Transacton';
import TransactionModal from './TransactionModal';
import TransactionTable from './TransactionTable';

interface AllTransactionsProps {
  transactions: Transaction[];
}

const AllTransactions: React.FC<AllTransactionsProps> = ({ transactions }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [typeFilter, setTypeFilter] = useState<string>('');
  const [minValue, setMinValue] = useState<string>('');
  const [maxValue, setMaxValue] = useState<string>('');
  const [dateFilter, setDateFilter] = useState<string>('');
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [open, setOpen] = useState(false);

  const handleOpenModal = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedTransaction(null);
    setOpen(false);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.id.toLowerCase().includes(search.toLowerCase()) ||
      (transaction.client && transaction.client.toLowerCase().includes(search.toLowerCase()));

    const matchesStatus = statusFilter ? transaction.status === statusFilter : true;
    const matchesType = typeFilter ? transaction.type === typeFilter : true;

    const matchesValue =
      (!minValue || transaction.value >= parseFloat(minValue)) &&
      (!maxValue || transaction.value <= parseFloat(maxValue));

    const matchesDate = dateFilter ? transaction.date.startsWith(dateFilter) : true;

    return matchesSearch && matchesStatus && matchesType && matchesValue && matchesDate;
  });

  return (
    <>
      <Box padding={2}>
        <TextField
          label="Pesquisar por ID ou Cliente"
          variant="outlined"
          fullWidth
          margin="normal"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Box display="flex" gap={2} marginBottom={2}>
          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} label="Status">
              <MenuItem value="">Todos</MenuItem>
              <MenuItem value="Pendente">Pendente</MenuItem>
              <MenuItem value="Completo">Completo</MenuItem>
              <MenuItem value="Falhou">Falhou</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Tipo</InputLabel>
            <Select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} label="Tipo">
              <MenuItem value="">Todos</MenuItem>
              <MenuItem value="Venda">Venda</MenuItem>
              <MenuItem value="Reembolso">Reembolso</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="Data (YYYY-MM-DD)"
            variant="outlined"
            fullWidth
            type="date"
            InputLabelProps={{ shrink: true }}
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
          />
        </Box>

        <Box display="flex" gap={2} marginBottom={2}>
          <TextField
            label="Valor Mínimo"
            variant="outlined"
            fullWidth
            type="number"
            value={minValue}
            onChange={(e) => setMinValue(e.target.value)}
          />
          <TextField
            label="Valor Máximo"
            variant="outlined"
            fullWidth
            type="number"
            value={maxValue}
            onChange={(e) => setMaxValue(e.target.value)}
          />
        </Box>

        <TransactionTable
          transactions={filteredTransactions.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)}
          onRowClick={handleOpenModal}
        />
        <TablePagination
          component="div"
          count={filteredTransactions.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />

        {selectedTransaction && (
          <TransactionModal
            open={open}
            transaction={selectedTransaction}
            onClose={handleCloseModal}
          />
        )}
      </Box>
    </>
  );
};

export default AllTransactions;
