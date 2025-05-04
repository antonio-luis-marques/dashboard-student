'use client';

import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';
import { Transaction } from '@/types/Transacton';

interface TransactionModalProps {
  open: boolean;
  transaction: Transaction | null;
  onClose: () => void;
}

const TransactionModal: React.FC<TransactionModalProps> = ({ open, transaction, onClose }) => {
  if (!transaction) return null;

  return (
    <Modal open={open} onClose={onClose}>
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
          <strong>Status:</strong> {transaction.status}
        </Typography>
        <Typography>
          <strong>Comprador:</strong> {transaction.client || 'N/A'}
        </Typography>
        <Typography>
          <strong>Email:</strong> {transaction.email || 'N/A'}
        </Typography>
        <Typography>
          <strong>Contato:</strong> {transaction.contact || 'N/A'}
        </Typography>
        <Typography>
          <strong>Método de Pagamento:</strong> {transaction.paymentMethod}
        </Typography>
        <Typography>
          <strong>Taxa:</strong> MT {transaction.fee.toFixed(2)}
        </Typography>
        <Typography>
          <strong>Notas:</strong> {transaction.notes || 'N/A'}
        </Typography>
        <Button
          variant="contained"
          onClick={onClose}
          sx={{ marginTop: 2 }}
          fullWidth
        >
          Fechar
        </Button>
      </Box>
    </Modal>
  );
};

export default TransactionModal;
