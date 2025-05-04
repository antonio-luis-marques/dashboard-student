'use client';

import { extendTheme, styled } from '@mui/material/styles';
import HomeIcon from '@mui/icons-material/Home';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import PaymentIcon from '@mui/icons-material/Payment';
import ReceiptIcon from '@mui/icons-material/Receipt';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import StoreIcon from '@mui/icons-material/Store';
import SchoolIcon from '@mui/icons-material/School';
import BookIcon from '@mui/icons-material/Book';
import AssignmentIcon from '@mui/icons-material/Assignment';
import React from 'react';
import { Navigation, Router } from '@toolpad/core';
import { Dashboard } from '@mui/icons-material';
import { LogOut, User } from 'lucide-react';

export const NAVIGATION: Navigation = [
  {
    kind: 'page',
    segment: 'dashboard',
    title: 'Visao Geral',
    icon: <Dashboard />,
  },
  {
    kind: 'page',
    segment: 'courses',
    title: 'Cursos',
    icon: <SchoolIcon />, // Ícone mais apropriado para cursos
  },
  {
    kind: 'page',
    segment: 'mycourses',
    title: 'Meus Cursos',
    icon: <BookIcon />, // Ícone mais adequado para "Meus Cursos"
  },
  {
    kind: 'page',
    segment: 'certificate',
    title: 'Certificação',
    icon: <AssignmentIcon />, // Ícone de "Certificação" com mais referência a tarefas ou provas
  },
  {
    kind: 'page',
    segment: 'marketplace',
    title: 'Marketplace',
    icon: <ReceiptIcon />,
  },
  {
    kind: 'page',
    segment: 'profile',
    title: 'Meu Perfil',
    icon: <User />,
  },
];

export function useDemoRouter(initialPath: string): Router {
  const [pathname, setPathname] = React.useState(initialPath);

  const router = React.useMemo(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path: string | URL) => setPathname(String(path)),
    };
  }, [pathname]);

  return router;
}

export const demoTheme = extendTheme({
  colorSchemes: { light: true, dark: true },
  colorSchemeSelector: 'class',
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
  components: {
    MuiListItemButton: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.selected && {
            backgroundColor: '#ffffff', // verde claro
            color: '#145a32',           // texto verde escuro
            '& .MuiSvgIcon-root': {
              color: '#145a32',         // ícone verde escuro
            },
            '&:hover': {
              backgroundColor: '#b3e6b3', // hover para o selecionado
            },
          }),
        }),
      },
    },
  },
});
