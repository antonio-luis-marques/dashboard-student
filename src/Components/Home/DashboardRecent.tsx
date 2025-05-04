import {
  Card,
  CardContent,
  Typography,
  Grid,
  List,
  ListItem,
  ListItemText,
  Button,
  Divider,
  Box,
} from '@mui/material';

const trabalhosPendentes = [
  { modulo: 'Programação I', trabalhos: 2 },
  { modulo: 'Redes de Computadores', trabalhos: 1 },
  { modulo: 'Banco de Dados', trabalhos: 3 },
];

const cursosConcluidos = [
  { nome: 'Programação I', certificadoPago: true },
  { nome: 'Banco de Dados SQL', certificadoPago: false, preco: 300 },
  { nome: 'Redes de Computadores', certificadoPago: false, preco: 250 },
];

const DashboardExtraCards = () => {
  const cardStyle = {
    boxShadow: 'none',
    border: '1px solid #ccc',
  };

  return (
    <Grid container spacing={4}>
      {/* Card de Trabalhos Pendentes */}
      <Grid item xs={12} md={6}>
        <Card sx={cardStyle}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Trabalhos Pendentes
            </Typography>
            <List>
              {trabalhosPendentes.map((item, index) => (
                <ListItem
                  key={index}
                  sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                >
                  <ListItemText
                    primary={item.modulo}
                    secondary={`${item.trabalhos} trabalho(s) não submetido(s)`}
                  />
                  <Button variant="contained" color="success" size="small">
                    Submeter Trabalho
                  </Button>
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      </Grid>

      {/* Card de Certificados */}
      <Grid item xs={12} md={6}>
        <Card sx={cardStyle}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Certificados dos Cursos
            </Typography>
            {cursosConcluidos.map((curso, index) => (
              <Box key={index} mb={2}>
                <Typography variant="subtitle1">{curso.nome}</Typography>

                {curso.certificadoPago ? (
                  <Typography variant="body2" color="green">
                    ✅ Certificado obtido
                  </Typography>
                ) : (
                  <>
                    <Typography variant="body2" color="text.secondary">
                      💰 Certificado disponível por MT{curso.preco}
                    </Typography>
                    <Button variant="contained" size="small" color="success" sx={{ mt: 1 }}>
                      Obter Certificado
                    </Button>
                  </>
                )}

                {index < cursosConcluidos.length - 1 && <Divider sx={{ my: 2 }} />}
              </Box>
            ))}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default DashboardExtraCards;
