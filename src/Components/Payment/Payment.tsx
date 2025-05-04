'use client'

import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Grid,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Chip,
} from '@mui/material';
import { FileCopy, Share, Delete } from '@mui/icons-material';

type PaymentLink = {
  id: string;
  description: string;
  value: number;
  expirationDate: string; // Formato ISO: YYYY-MM-DD
  status: 'Gerado' | 'Pago' | 'Expirado';
};

const PaymentLinkCard: React.FC = () => {
  const [description, setDescription] = useState('');
  const [value, setValue] = useState<number | ''>('');
  const [expirationDate, setExpirationDate] = useState('');
  const [links, setLinks] = useState<PaymentLink[]>([]);

  const handleCreateLink = () => {
    if (description && value && expirationDate) {
      const newLink: PaymentLink = {
        id: `LINK-${Date.now()}`,
        description,
        value: Number(value),
        expirationDate,
        status: 'Gerado',
      };
      setLinks([newLink, ...links]);
      setDescription('');
      setValue('');
      setExpirationDate('');
    }
  };

  const handleCopy = (link: PaymentLink) => {
    navigator.clipboard.writeText(`https://payment-link.com/${link.id}`);
    alert('Link copiado para a área de transferência!');
  };

  const handleShare = (link: PaymentLink) => {
    alert(`Compartilhar: https://payment-link.com/${link.id}`);
  };

  const handleDeactivate = (linkId: string) => {
    setLinks(links.map((link) => (link.id === linkId ? { ...link, status: 'Expirado' } : link)));
  };

  return (
    <Card>
      <CardContent>
        {/* Interface de Criação de Links */}
        <Typography variant="h6" gutterBottom>
          Criar Link de Pagamento
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Descrição"
              fullWidth
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              label="Valor (MT)"
              fullWidth
              type="number"
              value={value}
              onChange={(e) => setValue(Number(e.target.value) || '')}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              label="Data de Validade"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={expirationDate}
              onChange={(e) => setExpirationDate(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={handleCreateLink} fullWidth>
              Gerar Link
            </Button>
          </Grid>
        </Grid>

        {/* Lista de Links Gerados */}
        <Typography variant="h6" marginTop={4} gutterBottom>
          Links Gerados
        </Typography>
        <List>
          {links.map((link) => (
            <ListItem
              key={link.id}
              sx={{ borderBottom: '1px solid #ddd', marginBottom: 1, paddingBottom: 1 }}
            >
              <ListItemText
                primary={`${link.description} - MT ${link.value.toFixed(2)}`}
                secondary={`Data de validade: ${link.expirationDate}`}
              />
              <Chip
                label={link.status}
                color={
                  link.status === 'Pago'
                    ? 'success'
                    : link.status === 'Gerado'
                    ? 'primary'
                    : 'default'
                }
                sx={{ marginRight: 2 }}
              />
              <IconButton onClick={() => handleCopy(link)}>
                <FileCopy />
              </IconButton>
              <IconButton onClick={() => handleShare(link)}>
                <Share />
              </IconButton>
              {link.status === 'Gerado' && (
                <IconButton onClick={() => handleDeactivate(link.id)}>
                  <Delete />
                </IconButton>
              )}
            </ListItem>
          ))}
        </List>

        {/* Exibir Mensagem Quando Não Há Links */}
        {links.length === 0 && (
          <Typography variant="body2" color="textSecondary">
            Nenhum link gerado ainda.
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default PaymentLinkCard;