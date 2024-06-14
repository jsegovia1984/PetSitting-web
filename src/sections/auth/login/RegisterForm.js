import { useRef, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox, Typography, Container } from '@mui/material';
import { LoadingButton } from '@mui/lab';

import { useAuth } from '../../../Auth'

// components
import Iconify from '../../../components/iconify';


// ----------------------------------------------------------------------

export default function RegisterForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const { auth, setAuth } = useAuth();
  const [exp, setExp] = useState(false);

  const handleClick = () => {
    navigate('/dashboard', { replace: true });
    setAuth(true);
  };

  const handleClick2 = () => {
    navigate('/experiencia', { replace: true });
    setAuth(true);
  };

  return (
    <>
      <Stack spacing={3}>
        <TextField name="nombre" label="Nombre y Apellido" />
        <TextField name="mail" label="Correo Electrónico" />
        <TextField name="telefono" label="Teléfono" />
        <TextField
          name="Contraseña"
          label="Contraseña"
          type={showPassword ? 'text' : 'password'}
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

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick2} sx={{mt:3}}>
        Continuar
      </LoadingButton>
    </>
  );
}
