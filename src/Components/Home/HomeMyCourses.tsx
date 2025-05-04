import {
    Card,
    CardContent,
    CardActions,
    Button,
    Typography,
    LinearProgress,
    Grid,
  } from '@mui/material';
  import { styled } from '@mui/material/styles';
  import { courses } from '../../../data/MyCourses';
  
  const cursos = [
    {
      id: 1,
      titulo: 'Introdução à Programação',
      aulaAtual: 5,
      totalAulas: 12,
    },
    {
      id: 2,
      titulo: 'Fundamentos de Redes',
      aulaAtual: 3,
      totalAulas: 10,
    },
    {
      id: 3,
      titulo: 'Banco de Dados SQL',
      aulaAtual: 7,
      totalAulas: 8,
    },
  ];
  
  // ✅ Barra de progresso verde
  const GreenLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    backgroundColor: theme.palette.grey[200],
    '& .MuiLinearProgress-bar': {
      backgroundColor: theme.palette.success.main,
    },
  }));
  
  const CursoCards = () => {
    const cardStyle = {
      boxShadow: 'none',
      border: '1px solid #ccc',
    };
  
    return (
      <Grid container spacing={3}>
        {courses.map((item) => {
          // const progresso = (curso.aulaAtual / curso.totalAulas) * 100;
  
          return (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <Card sx={cardStyle}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {item.title}
                  </Typography>
  
                  <Typography variant="body2" color="text.secondary">
                    Aula {(item.progresso > 0 && item.progresso < 45) ? (' 1 de 5') :(item.progresso === 0 ? ' 0 de 6' : 
                      (item.progresso > 45 && item.progresso < 100 ) ? '4 de 8' : '  7 de 7')} 
                  </Typography>
  
                  <GreenLinearProgress
                    variant="determinate"
                    value={item.progresso}
                    sx={{ mt: 1.5 }}
                  />
                </CardContent>
  
                <CardActions>
                  <Button size="small" variant="contained" color="success">
                    Continuar
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    );
  };
  
  export default CursoCards;
  