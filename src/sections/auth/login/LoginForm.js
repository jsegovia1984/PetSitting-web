import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import axios from 'axios';
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox, Typography, Container } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// components
import Iconify from '../../../components/iconify';

import { useAuth } from '../../../Auth'






// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const { auth, setAuth } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const handleClick = () => {
    navigate('/dashboard');
    setAuth(true);
  };

  const handleClick2 = () => {
    navigate('/recupero');
  }

  const validateFields = () => {
    if (
      email.trim() === '' ||
      password.trim() === ''

    ) {
      return false; 
    }
    return true; 
  };

  const handleLogin = async () => {

    
    if (!validateFields()) {
      alert('Por favor, complete los campos obligatorios.');
      return;
    }

    try {
      const response = await axios.post('http://173.230.135.41/api/users/login/', {
        email,
        password,
      });

      const token = response.data.loginUser;

      if (token){
        document.cookie = `jwtToken=${token}; path=/; SameSite=Strict;`;
        setAuth(true);
        navigate('/dashboard/app');
      } 

    } catch (error) {
      alert("Por favor, verifica usuario y clave o registrate si no tenes cuenta.")
    }
  }

  return (
    <>
      <Stack spacing={3}>
        <TextField name="correo" label="Correo electrónico" value={email}
          onChange={(e) => setEmail(e.target.value)}/>

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
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2}}>
        
        <Checkbox name="remember" label="Remember me" /> 
        <Typography variant="subtitle2">
        Recordar mi usuario y contraseña</Typography>
        <Link variant="subtitle2" underline="hover" sx={{pl: 4, cursor: 'pointer',textAlign: "right"}} onClick={handleClick2}>
          ¿Olvidaste tu contraseña? 
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleLogin}>
        Iniciar Sesión
      </LoadingButton>
    </>
  );
}
