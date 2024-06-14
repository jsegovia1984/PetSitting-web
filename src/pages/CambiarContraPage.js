import {useState} from 'react';
import { Helmet } from 'react-helmet-async';
import { Navigate, useNavigate,useParams  } from 'react-router-dom';
// @mui
import axios from 'axios';
import { styled } from '@mui/material/styles';
import { Link, Container, Typography, Divider, Stack, Button, TextField,InputAdornment,IconButton } from '@mui/material';
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

export default function CambiarContraPage() {
  const mdUp = useResponsive('up', 'md');
  const navigate = useNavigate();

  const { idUser } = useParams();
  const id = String(idUser); 

  const [state, setState ] = useState(true);
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const handleClick = async () => {
    
    if (password !== password2) {
      alert('Las contraseñas no coinciden');
      return;
    }


    try {
        const response = await axios.put('http://173.230.135.41/api/users/modificarpassword/', {
        id, 
        password,
      });

      const token = response.data.status;
      console.log(token);

      if (token===200){
        navigate('/login');
      } 

    } catch (error) {
      console.log(error);
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
        <title> Cambiar contraseña | Pet Sitting </title>
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
            <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}/>

            <img
              src="/assets/illustrations/character_7.png"
              alt="register"
              style={{ transform: 'scaleX(-1)' }}
            />
          </StyledSection>
        )}

        
       { (state ? (<><Container maxWidth="sm">
          <StyledContent>
            <Typography variant="h3" gutterBottom>
                Cambiar contraseña
            </Typography>

            <Typography variant="body2" sx={{ mb: 2 }}>
              Por favor, ingresa tu nueva contraseña. 
            </Typography>

            <Stack spacing={3}>
            
            
            <TextField
          name="Contraseña"
          label="Contraseña"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <TextField
                name="Contraseña2"
                label="Confirmar contraseña"
                type={showPassword2 ? 'text' : 'password'}
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                InputProps={{
                    endAdornment: (
                    <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword2(!showPassword2)} edge="end">
                        <Iconify icon={showPassword2 ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                        </IconButton>
                    </InputAdornment>
                    ),
                }}
                />








             </Stack>

            <Button fullWidth size="large" type="submit" variant="contained" onClick={handleClick}sx={{mt:2}} disableElevation >
             Cambiar contraseña
              </Button>
              
          </StyledContent>
        </Container></>) : (
        
        <></>
        ))}
        
      </StyledRoot>
    </>
  );
}
