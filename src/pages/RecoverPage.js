import {useState} from 'react';
import { Helmet } from 'react-helmet-async';
import { Navigate, useNavigate,  } from 'react-router-dom';
// @mui
import axios from 'axios';
import { styled } from '@mui/material/styles';
import { Link, Container, Typography, Divider, Stack, Button, TextField } from '@mui/material';
// hooks
import useResponsive from '../hooks/useResponsive';
// components
import Logo from '../components/logo';
import Iconify from '../components/iconify';
// sections





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
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
  
}));

const StyledContent2 = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
  alignItems:"center"
}));

// ----------------------------------------------------------------------

export default function LoginPage() {
  const mdUp = useResponsive('up', 'md');
  const navigate = useNavigate();

  const [state, setState ] = useState(true);
  const [correo, setCorreo] = useState('');

  const handleClick = () => {

    if (correo.trim() === '') {
      alert('Por favor, completá el correo.');
      return;
    }
    const mail = correo;
    console.log(mail);
    try {
      axios.post('http://173.230.135.41/api/users/enviarmail', {
        mail, 
      });

      setState(false);

    } catch (error) {
      
      alert("Por favor, verifica los datos ingresados")
    }
  }
    
  


  const handleClick2 = () => {
    navigate('/dashboard/app');
}

const handleClick3 = async () => {
  navigate('/login');

}






  return (
    <>
      <Helmet>
        <title> Recupero | Pet Sitting </title>
      </Helmet>

      <StyledRoot>
        <Logo
          sx={{
            position: 'fixed',
            top: { xs: 16, sm: 24, md: 40 },
            left: { xs: 16, sm: 24, md: 40 },
          }}
        />

      {mdUp && (
          <StyledSection>

            <img src="/assets/illustrations/626bdb579a74b187c17b5cd2_illustration_coming_soon.png" alt="login" />
          </StyledSection>
        )}

        
       { (state ? (<><Container maxWidth="sm">
          <StyledContent>
            <Typography variant="h3" gutterBottom>
                Recuperar cuenta
            </Typography>

            <Typography variant="body2" sx={{ mb: 2 }}>
              Por favor, ingresa tu correo electrónico. 
              <Link sx={{ml:1, cursor: 'pointer'}} onClick={handleClick3}>Volver a inicio de sesión</Link>
            </Typography>

            <Stack spacing={3}>
            <TextField name="correo" label="Correo electrónico" sx={{my:2}} value={correo}
            onChange={(e) => setCorreo(e.target.value)}/>
             </Stack>

            <Button fullWidth size="large" type="submit" variant="contained" onClick={handleClick}sx={{mt:2}} disableElevation >
             Enviar Correo
              </Button>
              
          </StyledContent>
        </Container></>) : (
        
        <StyledContent2>
        <Typography variant="h3" sx={{mb:3}} align="center">
        Te enviamos un correo con los pasos a seguir. 
        </Typography>
        <Button size="large" variant="outlined" sx={{width:"50%"}} onClick={handleClick2}>Volver a Inicio</Button>

        </StyledContent2>
        ))}
        
      </StyledRoot>
    </>
  );
}
