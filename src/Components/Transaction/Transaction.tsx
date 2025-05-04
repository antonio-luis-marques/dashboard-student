'use client'

import React, { useState } from 'react';
import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    TextField,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    Chip,
    Modal,
    Typography,
    Button,
} from '@mui/material';

type Transaction = {
    id: string;
    date: string; // Formato ISO: YYYY-MM-DD HH:mm
    status: 'Pendente' | 'Completo' | 'Falhou';
    paymentMethod: 'Cartão' | 'Pix' | 'Transferência';
    value: number;
    fee: number;
    client: string | null;
    email?: string; // Email do comprador
    contact?: string; // Contato do comprador
    type: 'Venda' | 'Reembolso';
    notes?: string; // Comentários ou detalhes adicionais
  };
  
  const transactions: Transaction[] = [
    {
      id: 'T001',
      date: '2024-12-31 14:30',
      status: 'Completo',
      paymentMethod: 'Pix',
      value: 150.0,
      fee: 1.5,
      client: 'João Silva',
      email: 'joao.silva@email.com',
      contact: '+55 11 98765-4321',
      type: 'Venda',
      notes: 'Compra realizada com sucesso.',
    },
    {
      id: 'T002',
      date: '2024-12-30 10:00',
      status: 'Pendente',
      paymentMethod: 'Cartão',
      value: 250.0,
      fee: 3.5,
      client: 'Maria Oliveira',
      email: 'maria.oliveira@email.com',
      contact: '+55 21 91234-5678',
      type: 'Venda',
      notes: 'Aguardando aprovação do cartão.',
    },
    {
      id: 'T003',
      date: '2024-12-29 18:45',
      status: 'Falhou',
      paymentMethod: 'Transferência',
      value: 100.0,
      fee: 2.0,
      client: null,
      type: 'Reembolso',
      notes: 'Transferência não realizada.',
    },
    // Adicione mais transações
  ];

const TransactionList: React.FC = () => {
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

        const matchesDate = dateFilter
            ? transaction.date.startsWith(dateFilter)
            : true;

        return matchesSearch && matchesStatus && matchesType && matchesValue && matchesDate;
    });

    return (
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
                    <Select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        label="Status"
                    >
                        <MenuItem value="">Todos</MenuItem>
                        <MenuItem value="Pendente">Pendente</MenuItem>
                        <MenuItem value="Completo">Completo</MenuItem>
                        <MenuItem value="Falhou">Falhou</MenuItem>
                    </Select>
                </FormControl>

                <FormControl fullWidth>
                    <InputLabel>Tipo</InputLabel>
                    <Select
                        value={typeFilter}
                        onChange={(e) => setTypeFilter(e.target.value)}
                        label="Tipo"
                    >
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

            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Data e Hora</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Método de Pagamento</TableCell>
                            <TableCell>Valor</TableCell>
                            <TableCell>Taxa</TableCell>
                            <TableCell>Cliente</TableCell>
                            <TableCell>Tipo</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredTransactions
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((transaction) => (
                                <TableRow
                                style={{ cursor: 'pointer' }}                   
                                onClick={() => handleOpenModal(transaction)}
                                key={transaction.id}>
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
                                    <TableCell>{`MT ${transaction.value.toFixed(2)}`}</TableCell>
                                    <TableCell>{`MT ${transaction.fee.toFixed(2)}`}</TableCell>
                                    <TableCell>{transaction.client || 'N/A'}</TableCell>
                                    <TableCell>{transaction.type}</TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <TablePagination
                component="div"
                count={filteredTransactions.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />

            {selectedTransaction && (
                <Modal open={open} onClose={handleCloseModal}>
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: 400,
                            bgcolor: 'background.paper',
                            boxShadow: 24,
                            p: 4,
                            borderRadius: 2,
                        }}
                    >
                        <Typography variant="h6" marginBottom={2}>
                            Detalhes da Transação
                        </Typography>
                        <Typography>
                            <strong>Status:</strong> {selectedTransaction.status}
                        </Typography>
                        <Typography>
                            <strong>Comprador:</strong> {selectedTransaction.client || 'N/A'}
                        </Typography>
                        <Typography>
                            <strong>Email:</strong> {selectedTransaction.email || 'N/A'}
                        </Typography>
                        <Typography>
                            <strong>Contato:</strong> {selectedTransaction.contact || 'N/A'}
                        </Typography>
                        <Typography>
                            <strong>Método de Pagamento:</strong> {selectedTransaction.paymentMethod}
                        </Typography>
                        <Typography>
                            <strong>Taxa:</strong> MT {selectedTransaction.fee.toFixed(2)}
                        </Typography>
                        <Typography>
                            <strong>Notas:</strong> {selectedTransaction.notes || 'N/A'}
                        </Typography>
                        <Button
                            variant="contained"
                            onClick={handleCloseModal}
                            sx={{ marginTop: 2 }}
                            fullWidth
                        >
                            Fechar
                        </Button>
                    </Box>
                </Modal>
            )}
        </Box>
    );
};

export default TransactionList;


