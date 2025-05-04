'use client';

import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
} from '@mui/material';
import { Notification } from '@/types/Notification';

interface NotificationTableProps {
  notifications: Notification[];
  onRowClick: (notification: Notification) => void;
  maxRows?: number;
}

const NotificationTable: React.FC<NotificationTableProps> = ({
  notifications,
  onRowClick,
  maxRows,
}) => {
  const displayedNotifications = maxRows
    ? notifications.slice(0, maxRows)
    : notifications;

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Data</TableCell>
            <TableCell>Título</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {displayedNotifications.map((notification) => (
            <TableRow
              key={notification.id}
              style={{ cursor: 'pointer' }}
              onClick={() => onRowClick(notification)}
            >
              <TableCell>{notification.id}</TableCell>
              <TableCell>{notification.date}</TableCell>
              <TableCell>{notification.title}</TableCell>
              <TableCell>
                <Chip
                  label={notification.status}
                  color={
                    notification.status === 'success'
                      ? 'success'
                      : notification.status === 'error'
                      ? 'error'
                      : 'info'
                  }
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default NotificationTable;
