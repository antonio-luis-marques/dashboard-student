
// pages/perfil.tsx (ou src/pages/perfil.tsx se usa Next.js)
import React, { useState } from 'react';
import { Container, Box, Modal, TextField, Button, Typography, Avatar, Card, CardContent } from '@mui/material';
import { Pencil, LogOut } from 'lucide-react';

const Perfil = () => {
  const [openModal, setOpenModal] = useState(false);
  const [user, setUser] = useState({
    name: 'João Silva',
    email: 'joao.silva@email.com',
    avatarUrl: 'https://i.pravatar.cc/150?img=3',
  });

  const [form, setForm] = useState(user);

  const handleLogout = () => {
    console.log('Fazendo logout...');
    // Aqui você limpa o token / dados do usuário e redireciona
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  const handleEdit = () => setOpenModal(true);

  const handleSave = () => {
    setUser(form);
    setOpenModal(false);
  };

  return (
    <Container maxWidth="sm">
      <Box >
        <Card sx={{ borderRadius: 3, p: 2 ,  border: '1px solid #ccc'}}>
          <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Avatar src={user.avatarUrl} sx={{ width: 80, height: 80, mb: 2 }} />
            <Typography variant="h6">{user.name}</Typography>
            <Typography variant="body2" color="text.secondary">{user.email}</Typography>

            <Box mt={3} display="flex" gap={2}>
              <Button 
                variant="outlined" 
                startIcon={<Pencil size={16} />} 
                onClick={handleEdit}
              >
                Editar
              </Button>
              <Button 
                variant="contained" 
                color="error" 
                startIcon={<LogOut size={16} />} 
                onClick={handleLogout}
              >
                Logout
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>

      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box 
          sx={{
            position: 'absolute',
            top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" mb={2}>Editar Perfil</Typography>
          <TextField
            fullWidth
            label="Nome"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Avatar URL"
            value={form.avatarUrl}
            onChange={(e) => setForm({ ...form, avatarUrl: e.target.value })}
            sx={{ mb: 3 }}
          />
          <Box display="flex" justifyContent="flex-end" gap={1}>
            <Button onClick={() => setOpenModal(false)}>Cancelar</Button>
            <Button variant="contained" onClick={handleSave}>Salvar</Button>
          </Box>
        </Box>
      </Modal>
    </Container>
  );
};

export default Perfil;