'use client';

import React from 'react';
import {
    Box,
    Typography,
    Card,
    CardContent,
    Grid,
    Button,
    Chip,
    Divider,
    Avatar,
} from '@mui/material';
import { CheckCircle, Clock, RefreshCcw, XCircle } from 'lucide-react';
// import { TrendingUp, AccessTime, CheckCircle, Cancel } from 'lucide-react';

export default function MarketplaceDashboard() {
    const projetos = [
        { id: 1, nome: 'Landing Page para startup', status: 'pendente', cliente: 'Ana Costa', data: '2025-05-02', valor: 'MZN 8.000' },
        { id: 2, nome: 'Sistema de login', status: 'em andamento', cliente: 'Carlos Mendes', data: '2025-04-28', valor: 'MZN 12.500' },
        { id: 3, nome: 'Dashboard administrativo', status: 'concluído', cliente: 'Bruno Maico', data: '2025-04-20', valor: 'MZN 20.000' },
    ];

    const ganhos = {
        mesAtual: 'MZN 32.500',
        pendente: 'MZN 12.500',
        ultimoPagamento: '2025-04-27'
    };

    return (
        <Box >
            <Typography variant="h4" fontWeight={700} mb={3}>
                Painel do Marketplace
            </Typography>

            <Grid container spacing={3}>
                {/* Resumo dos Projetos */}
                <Grid item xs={12} md={3}>
                    <Card sx={{ border: '1px solid #4caf50', boxShadow: 0 }}>
                        <CardContent>
                            <Typography variant="subtitle1" display="flex" alignItems="center" gap={1}>
                                <CheckCircle size={20} color="green" />
                                Concluídos
                            </Typography>
                            <Typography variant="h5" sx={{ color: 'green' }}>5</Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={3}>
                    <Card sx={{ border: '1px solid #4caf50', boxShadow: 0 }}>
                        <CardContent>
                            <Typography variant="subtitle1" display="flex" alignItems="center" gap={1}>
                                <Clock size={20} color="orange" />
                                Pendentes
                            </Typography>
                            <Typography variant="h5" sx={{ color: 'orange' }}>2</Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={3}>
                    <Card sx={{ border: '1px solid #4caf50', boxShadow: 0 }}>
                        <CardContent>
                            <Typography variant="subtitle1" display="flex" alignItems="center" gap={1}>
                                <RefreshCcw size={20} color="blue" />
                                Em andamento
                            </Typography>
                            <Typography variant="h5" sx={{ color: 'blue' }}>3</Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={3}>
                    <Card sx={{ border: '1px solid #4caf50', boxShadow: 0 }}>
                        <CardContent>
                            <Typography variant="subtitle1" display="flex" alignItems="center" gap={1}>
                                <XCircle size={20} color="red" />
                                Cancelados
                            </Typography>
                            <Typography variant="h5" sx={{ color: 'red' }}>1</Typography>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Pedidos Recentes */}
                <Grid item xs={12}>
                    <Card sx={{ border: '1px solid #CCC', boxShadow: 0 }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Pedidos Recentes
                            </Typography>
                            {projetos.map((proj) => (
                                <Box key={proj.id} mb={2}>
                                    <Box display="flex" justifyContent="space-between" alignItems="center">
                                        <Box>
                                            <Typography fontWeight={600}>{proj.nome}</Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Cliente: {proj.cliente} • {proj.data} • {proj.valor}
                                            </Typography>
                                        </Box>
                                        <Box display="flex" alignItems="center" gap={1}>
                                            <Chip
                                                label={proj.status}
                                                color={
                                                    proj.status === 'concluído'
                                                        ? 'success'
                                                        : proj.status === 'pendente'
                                                            ? 'warning'
                                                            : 'info'
                                                }
                                            />
                                            {proj.status === 'pendente' && (
                                                <>
                                                    <Button size="small" variant="outlined" color="success">
                                                        Aceitar
                                                    </Button>
                                                    <Button size="small" variant="outlined" color="error">
                                                        Rejeitar
                                                    </Button>
                                                </>
                                            )}
                                        </Box>
                                    </Box>
                                    <Divider sx={{ my: 1 }} />
                                </Box>
                            ))}
                        </CardContent>
                    </Card>
                </Grid>

                {/* Ganhos */}
                <Grid item xs={12} md={6}>
                    <Card sx={{ border: '1px solid #CCC', boxShadow: 0 }}>
                        <CardContent>
                            <Typography variant="h6">Ganhos</Typography>
                            <Typography>Este mês: <strong>{ganhos.mesAtual}</strong></Typography>
                            <Typography>Pendente de recebimento: <strong>{ganhos.pendente}</strong></Typography>
                            <Typography>Último pagamento: {ganhos.ultimoPagamento}</Typography>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Disponibilidade */}
                <Grid item xs={12} md={6}>
                    <Card sx={{ border: '1px solid #ccc', boxShadow: 0 }}>
                        <CardContent>
                            <Typography variant="h6">Disponibilidade</Typography>
                            <Typography variant="body2" mb={2}>
                                Você está atualmente <strong>disponível</strong> para novos projetos.
                            </Typography>
                            <Button variant="contained" color="warning">
                                Pausar recebimento de pedidos
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
}
