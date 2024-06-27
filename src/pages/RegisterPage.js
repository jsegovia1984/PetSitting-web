import { Helmet } from 'react-helmet-async';
import { useRef, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

// @mui
import { styled } from '@mui/material/styles';
import { Link, Container, Typography, Divider, Stack, Button,
  InputAdornment,TextField,IconButton,CardActions,Card,Avatar,
  CardContent,Box
  } from '@mui/material';
  import axios from 'axios';
  import { LoadingButton } from '@mui/lab';
// hooks
import useResponsive from '../hooks/useResponsive';
// components
import Logo from '../components/logo';
import Iconify from '../components/iconify';
import { useAuth } from '../Auth'
// sections
import { RegisterForm } from '../sections/auth/login';
import foto from '../fb.jpg'

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

// ----------------------------------------------------------------------

export default function RegisterPage() {
  const mdUp = useResponsive('up', 'md');
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/login');
  }

  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);

  const { auth, setAuth } = useAuth();
  const [bool, setBool] = useState(true);

  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setRePassword] = useState('');
  const [titulo, setTitulo] = useState('');
  const [experiencia, setExperiencia] = useState('');


  const [cambioLogo, setCambioLogo] = useState(false);
  const [logo, setLogo] = useState();
  const handleLogoChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile){
      setLogo(selectedFile);
      setCambioLogo(true);
    }
  };


  const handleClick2 = () => {
    
    if (!validateFields()) {
      alert('Por favor, completá los campos obligatorios.');
      return;
    }

    if (!validatePass()){
      alert("Los password no son iguales, por favor verifiquelo");
      return;
    }
    setBool(false);

  };

  const handleClick3 = () => {
    navigate('/dashboard');
    setAuth(true);
  }

  const validateFields = () => {
    if (
      nombre.trim() === '' ||
      correo.trim() === '' ||
      telefono.trim() === '' ||
      password.trim() === '' ||
      repassword.trim() === ''
      
    ) {
      return false; 
    }
    return true; 
  };

   const validatePass = () => {
    if (password.trim() !== repassword.trim() ) {
      return false; 
    }
    return true; 
  };

  const validateFields2 = () => {
    if (
      titulo.trim() === '' ||
      experiencia.trim() === '' ||
      logo === null
    ) {
      return false; 
    }
    return true; 
  };

  

  const handleRegisterBack = async () => {


    if (!validateFields2()) {
      alert('Por favor, completá los campos obligatorios.');
      return;
    }

    const config = {
       headers: {
        'Content-Type': 'multipart/form-data', 
      },
     };




    const formData = new FormData();

    formData.append('name', nombre);
    formData.append('email', correo);
    formData.append('password', password);
    formData.append('telefono', telefono);
    formData.append('titulo', titulo);
    formData.append('experiencia', experiencia);

    if (cambioLogo){
       formData.append('file', logo);
       } else {
       const blob = await fetch(foto).then((r) => r.blob()); 
       const file = new File([blob], 'myImage.jpg'); 
       formData.append('file', file);
     }

    try {
      const response = await axios.post(
        "http://173.230.135.41/api/users/registration",
        formData,
        config
      );

      const token = response.data.createdUser;

      if (token){
        document.cookie = `jwtToken=${token}; path=/; SameSite=Strict;`;

        navigate('/dashboard/mispublicaciones', { replace: true });
        setAuth(true);

      } else {
        alert('Por favor, verifica los campos ingresados.');
      }

    } catch (error) {

      if (error.response && error.response.status === 400) {
        alert('El correo electrónico ingresado ya se encuentra registrado.');
        navigate('/login/', { replace: true });

      } else {
        alert('Ocurrió un error inesperado. No se pudo completar la creación del evento.');
      }

 
    }



  }; 

  return (
    <>
      <Helmet>
        <title> Registro | Pet Sitter </title>
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
            <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
              ¡Bienvenido!
            </Typography>
            <img
              src="/assets/illustrations/illustration_login.png"
              alt="register"
              style={{ transform: 'scaleX(-1)' }}
            />
          </StyledSection>
        )}



        <Container maxWidth="sm">
          <StyledContent>
          {bool ? (<>
            <Typography variant="h3" gutterBottom>
              Registrarse
            </Typography>

            <Typography variant="body2" sx={{ mb: 2 }}>
              ¿Ya tenés cuenta? {''}
              <Link variant="subtitle2" onClick={handleClick} sx={{ cursor: 'pointer' }}>Iniciar Sesión</Link>
            </Typography>
           
            <Stack spacing={3}>
            <TextField name="nombre" label="Nombre y Apellido" value={nombre}
            onChange={(e) => setNombre(e.target.value)}/>
            <TextField name="mail" label="Correo Electrónico" value={correo}
            onChange={(e) => setCorreo(e.target.value)}/>
            <TextField name="telefono" label="Teléfono" value={telefono} type="number"
            onChange={(e) => setTelefono(e.target.value)}/>
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
              name="Contraseña-2"
              label="Repetir Contraseña"
              type={showRePassword ? 'text' : 'password'}
              value={repassword}
             onChange={(e) => setRePassword(e.target.value)}
              InputProps={{
            endAdornment: (
              <InputAdornment position="end">

                
                <IconButton onClick={() => setShowRePassword(!showRePassword)} edge="end">
                  <Iconify icon={showRePassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
            
          }}
        /> 
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick2} sx={{mt:3}}>
        Continuar
      </LoadingButton>
           
           
           </>):(<>


           
            <Typography variant="h3" gutterBottom>
            Experiencia
            </Typography>

            <Typography variant="body2" sx={{ mb: 2 }}>
                Por favor, completá los datos con tu información profesional.
            </Typography>
            <Stack spacing={1}>


                 











            <TextField name="titulo" label="Título / Profesion" value={titulo}
            onChange={(e) => setTitulo(e.target.value)}/>
            <TextField name="experiencia" label="Experiencia" value={experiencia}
            onChange={(e) => setExperiencia(e.target.value)} multiline rows={5}/>




<Card sx={{mb:4,mr:3, ml:6, backgroundColor:'transparent',}}>
            <CardContent>
              <Box
                sx={{
                  alignItems: 'center',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <Avatar
                    src={logo ? URL.createObjectURL(logo) : foto}
                    sx={{
                      height: 40,
                      mb: 1,
                      width: 40
                    }}
                    style={{ width: 80, height: 80 }}
                  />
                
                
                <Typography
                  gutterBottom
                  variant="h5"
                >
                
                      {nombre}
                
          
                </Typography>
                <Typography
                  color="text.secondary"
                  variant="body2"
                >
                  {correo}
                </Typography>

              </Box>
            </CardContent>
            <Divider />
            <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>

            <label htmlFor="fileInput" >
                    <input
                    type="file"
                    accept="image/*" 
                    style={{ display: 'none' }}
                    onChange={handleLogoChange}
                    id="fileInput"
                  />
              <Button
                fullWidth
                variant="text"
                color='secondary'
                component="span"
              >
                Subir foto de usuario
              </Button></label>




            </CardActions>
          </Card>
            
          </Stack>

          <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleRegisterBack} sx={{mt:3}}>
            Registrarme
          </LoadingButton>
           
           </>)}

           











          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}
