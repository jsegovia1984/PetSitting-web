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

  const handleClick = () => {
    navigate('/dashboard/mispublicaciones', { replace: true });
    setAuth(true);
  };

  return (
    <>
      <Stack spacing={1}>
        <TextField name="titulo" label="Título" />
        <TextField name="experiencia" label="Experiencia" multiline rows={5}/>
        
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick} sx={{mt:3}}>
        Registrarme
      </LoadingButton>
    </>
  );
}
