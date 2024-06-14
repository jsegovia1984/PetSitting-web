import { Helmet } from 'react-helmet-async';
import { Navigate, useNavigate } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Link, Container, Typography, Divider, Stack, Button } from '@mui/material';
// hooks
import useResponsive from '../hooks/useResponsive';
// components
import Logo from '../components/logo';
import Iconify from '../components/iconify';
// sections
import { CrearServicioForm } from '../sections/auth/login';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const StyledSection = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: 480,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  boxShadow: theme.customShadows.card,
  backgroundColor: theme.palette.background.default,
}));

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: 'auto',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
}));

// ----------------------------------------------------------------------

export default function CrearServicioPage() {
  const mdUp = useResponsive('up', 'md');
  const navigate = useNavigate();


  return (
    <>
      <Helmet>
        <title> Crear Servicio | Pet Sitting </title>
      </Helmet>

      <StyledRoot>

        <Container maxWidth="sm">
          <StyledContent>
            <Typography variant="h3" gutterBottom>
            Crear servicio
            </Typography>

            <Typography variant="body2" sx={{ mb: 2 }}>
                Por favor, completá los datos del nuevo servicio.
            </Typography>
            <CrearServicioForm />
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}
