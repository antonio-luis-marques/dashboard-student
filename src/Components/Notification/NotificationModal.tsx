'use client';

import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';
import { Notification } from '@/types/Notification';

interface NotificationModalProps {
  open: boolean;
  notification: Notification | null;
  onClose: () => void;
}

const NotificationModal: React.FC<NotificationModalProps> = ({
  open,
  notification,
  onClose,
}) => {
  if (!notification) return null;

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
          Detalhes da Notificação
        </Typography>
        <Typography>
          <strong>Título:</strong> {notification.title}
        </Typography>
        <Typography>
          <strong>Descrição:</strong> {notification.description}
        </Typography>
        <Typography>
          <strong>Status:</strong> {notification.status}
        </Typography>
        <Typography>
          <strong>Data:</strong> {notification.date}
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

export default NotificationModal;
