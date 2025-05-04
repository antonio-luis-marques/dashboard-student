'use client'
import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Chip,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { Edit, Cancel } from '@mui/icons-material';

type SubscriptionPlan = {
  id: string;
  name: string;
  price: number;
  period: 'Diária' | 'Mensal' | 'Anual';
  benefits: string[];
};

type ActiveSubscription = {
  id: string;
  plan: SubscriptionPlan;
  paymentCycle: string; // Exemplo: '01/01/2024 - 31/01/2024'
  renewalStatus: 'Ativa' | 'Cancelada';
};

const SubscriptionManager: React.FC = () => {
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [activeSubscriptions, setActiveSubscriptions] = useState<ActiveSubscription[]>([]);
  const [planName, setPlanName] = useState('');
  const [price, setPrice] = useState<number | ''>('');
  const [period, setPeriod] = useState<'Diária' | 'Mensal' | 'Anual'>('Mensal');
  const [benefits, setBenefits] = useState<string>('');
  const [editSubscription, setEditSubscription] = useState<ActiveSubscription | null>(null);

  const handleCreatePlan = () => {
    if (planName && price && period && benefits) {
      const newPlan: SubscriptionPlan = {
        id: `PLAN-${Date.now()}`,
        name: planName,
        price: Number(price),
        period,
        benefits: benefits.split(',').map((b) => b.trim()),
      };
      setPlans([newPlan, ...plans]);
      setPlanName('');
      setPrice('');
      setPeriod('Mensal');
      setBenefits('');
    }
  };

  const handleCancelSubscription = (id: string) => {
    setActiveSubscriptions(
      activeSubscriptions.map((sub) =>
        sub.id === id ? { ...sub, renewalStatus: 'Cancelada' } : sub
      )
    );
  };

  const handleEditSubscription = (subscription: ActiveSubscription) => {
    setEditSubscription(subscription);
  };

  const handleUpdateSubscription = () => {
    if (editSubscription) {
      setActiveSubscriptions(
        activeSubscriptions.map((sub) =>
          sub.id === editSubscription.id ? { ...editSubscription } : sub
        )
      );
      setEditSubscription(null);
    }
  };

  return (
    <Box>
      <Card sx={{ marginBottom: 4 }}>
        <CardContent>
          {/* Configurar Planos de Assinatura */}
          <Typography variant="h6" gutterBottom>
            Criar Plano de Assinatura
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Nome do Plano"
                fullWidth
                value={planName}
                onChange={(e) => setPlanName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                label="Preço (MT)"
                type="number"
                fullWidth
                value={price}
                onChange={(e) => setPrice(Number(e.target.value) || '')}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <Select
                fullWidth
                value={period}
                onChange={(e) => setPeriod(e.target.value as 'Diária' | 'Mensal' | 'Anual')}
              >
                <MenuItem value="Diária">Diária</MenuItem>
                <MenuItem value="Mensal">Mensal</MenuItem>
                <MenuItem value="Anual">Anual</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Benefícios (separados por vírgula)"
                fullWidth
                value={benefits}
                onChange={(e) => setBenefits(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" onClick={handleCreatePlan} fullWidth>
                Criar Plano
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Listagem de Planos Criados */}
      <Card sx={{ marginBottom: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Planos Criados
          </Typography>
          <List>
            {plans.map((plan) => (
              <ListItem
                key={plan.id}
                sx={{ borderBottom: '1px solid #ddd', paddingBottom: 1, marginBottom: 1 }}
              >
                <ListItemText
                  primary={`${plan.name} - MT ${plan.price.toFixed(2)} / ${plan.period}`}
                  secondary={`Benefícios: ${plan.benefits.join(', ')}`}
                />
              </ListItem>
            ))}
            {plans.length === 0 && (
              <Typography variant="body2" color="textSecondary">
                Nenhum plano criado.
              </Typography>
            )}
          </List>
        </CardContent>
      </Card>

      {/* Listagem de Assinaturas Ativas */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Assinaturas Ativas
          </Typography>
          <List>
            {activeSubscriptions.map((sub) => (
              <ListItem
                key={sub.id}
                sx={{ borderBottom: '1px solid #ddd', paddingBottom: 1, marginBottom: 1 }}
              >
                <ListItemText
                  primary={`${sub.plan.name} - ${sub.paymentCycle}`}
                  secondary={`Status: ${sub.renewalStatus}`}
                />
                <Chip
                  label={sub.renewalStatus}
                  color={sub.renewalStatus === 'Ativa' ? 'success' : 'default'}
                  sx={{ marginRight: 2 }}
                />
                {sub.renewalStatus === 'Ativa' && (
                  <>
                    <IconButton onClick={() => handleEditSubscription(sub)}>
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => handleCancelSubscription(sub.id)}>
                      <Cancel />
                    </IconButton>
                  </>
                )}
              </ListItem>
            ))}
            {activeSubscriptions.length === 0 && (
              <Typography variant="body2" color="textSecondary">
                Nenhuma assinatura ativa.
              </Typography>
            )}
          </List>
        </CardContent>
      </Card>

      {/* Modal para Editar Assinatura */}
      {editSubscription && (
        <Dialog open onClose={() => setEditSubscription(null)}>
          <DialogTitle>Alterar Assinatura</DialogTitle>
          <DialogContent>
            <TextField
              label="Novo Ciclo de Pagamento"
              fullWidth
              value={editSubscription.paymentCycle}
              onChange={(e) =>
                setEditSubscription({ ...editSubscription, paymentCycle: e.target.value })
              }
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEditSubscription(null)} color="secondary">
              Cancelar
            </Button>
            <Button onClick={handleUpdateSubscription} color="primary">
              Salvar
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
};

export default SubscriptionManager;
