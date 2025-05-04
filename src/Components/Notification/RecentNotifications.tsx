'use client';

import React, { useState } from 'react';
import NotificationTable from './NotificationTable';
import NotificationModal from './NotificationModal';
import { Notification } from '@/types/Notification';

interface RecentNotificationsProps {
  notifications: Notification[];
}

const RecentNotifications: React.FC<RecentNotificationsProps> = ({ notifications }) => {
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);
  const [open, setOpen] = useState(false);

  const handleRowClick = (notification: Notification) => {
    setSelectedNotification(notification);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedNotification(null);
    setOpen(false);
  };

  return (
    <>
      <NotificationTable
        notifications={notifications}
        onRowClick={handleRowClick}
        maxRows={5}
      />
      <NotificationModal
        open={open}
        notification={selectedNotification}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default RecentNotifications;