'use client';

import React, { useState } from 'react';
import NotificationTable from './NotificationTable';
import NotificationModal from './NotificationModal';
import { Notification } from '@/types/Notification';
import { TextField, FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';

interface AllNotificationsProps {
  notifications: Notification[];
}

const AllNotifications: React.FC<AllNotificationsProps> = ({ notifications }) => {
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);
  const [open, setOpen] = useState(false);
  const [searchTitle, setSearchTitle] = useState('');
  const [searchDescription, setSearchDescription] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  const handleRowClick = (notification: Notification) => {
    setSelectedNotification(notification);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedNotification(null);
    setOpen(false);
  };

  const filteredNotifications = notifications.filter((notification) => {
    const matchesTitle = notification.title.toLowerCase().includes(searchTitle.toLowerCase());
    const matchesDescription = notification.description.toLowerCase().includes(searchDescription.toLowerCase());
    const matchesStatus = statusFilter ? notification.status === statusFilter : true;
    const matchesDate = dateFilter ? notification.date.startsWith(dateFilter) : true;

    return matchesTitle && matchesDescription && matchesStatus && matchesDate;
  });

  return (
    <Box>
      <Box marginBottom={2}>
        <TextField
          label="Pesquisar Título"
          variant="outlined"
          fullWidth
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Pesquisar Descrição"
          variant="outlined"
          fullWidth
          value={searchDescription}
          onChange={(e) => setSearchDescription(e.target.value)}
          margin="normal"
        />
      </Box>

      <Box display="flex" gap={2} marginBottom={2}>
        <FormControl fullWidth>
          <InputLabel>Status</InputLabel>
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            label="Status"
          >
            <MenuItem value="">Todos</MenuItem>
            <MenuItem value="success">Sucesso</MenuItem>
            <MenuItem value="error">Erro</MenuItem>
            <MenuItem value="info">Informativo</MenuItem>
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

      <NotificationTable
        notifications={filteredNotifications}
        onRowClick={handleRowClick}
        maxRows={5}
      />
      <NotificationModal
        open={open}
        notification={selectedNotification}
        onClose={handleCloseModal}
      />
    </Box>
  );
};

export default AllNotifications;
