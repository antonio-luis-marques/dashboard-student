import { Card, CardContent, Typography, Grid } from '@mui/material';
import { BookOpen, NotebookPen, GraduationCap, CheckCircle } from 'lucide-react';

const DashboardCards = () => {
  const data = {
    totalCursos: 24,
    cursosProgresso: 8,
    certificacoes: 5,
    cursosConcluidos: 11,
  };

  const cardStyle = {
    maxWidth: 345,
    boxShadow: 'none',
    border: '1px solid #ccc',
  };

  return (
    <Grid container spacing={3} justifyContent="center">
      {/* Total de Cursos */}
      <Grid item xs={12} sm={6} md={3}>
        <Card sx={cardStyle}>
          <CardContent>
            <BookOpen size={32} color="#2e7d32" />
            <Typography variant="h6" sx={{ mt: 2 }}>
              Total de Cursos
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {data.totalCursos} cursos disponíveis
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* Cursos em Progresso */}
      <Grid item xs={12} sm={6} md={3}>
        <Card sx={cardStyle}>
          <CardContent>
            <NotebookPen size={32} color="#0277bd" />
            <Typography variant="h6" sx={{ mt: 2 }}>
              Em Progresso
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {data.cursosProgresso} cursos em andamento
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* Certificações Obtidas */}
      <Grid item xs={12} sm={6} md={3}>
        <Card sx={cardStyle}>
          <CardContent>
            <GraduationCap size={32} color="#6a1b9a" />
            <Typography variant="h6" sx={{ mt: 2 }}>
              Certificações
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {data.certificacoes} certificações obtidas
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* Cursos Concluídos */}
      <Grid item xs={12} sm={6} md={3}>
        <Card sx={cardStyle}>
          <CardContent>
            <CheckCircle size={32} color="#f57c00" />
            <Typography variant="h6" sx={{ mt: 2 }}>
              Concluídos
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {data.cursosConcluidos} cursos concluídos
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default DashboardCards;
