import { React, useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
import '../App.css';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography, Box, Button, AppBar, Toolbar, Chip, Stack } from '@mui/material';
// components
import Iconify from '../components/iconify';
// sections
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
} from '../sections/@dashboard/app';

import portada from '../animales.webp'
import milogo from '../logo-celeste.png'



import { useAuth } from '../Auth';






// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();
  const palabras = ["Guitarra", "Piano", "Natación", "Inglés", "Geografía", "Programación"];
  const colores = ["#2065D1", "#2065D1", "#2065D1", "#2065D1","#2065D1" ,"#2065D1"];
  const iconos = [];
  const [palabraActualIndex, setPalabraActualIndex] = useState(0);
  const [iconoActualIndex, setIconoActualIndex] = useState(0);
  const [mostrar, setMostrar] = useState(true);
  const [iconoKey, setIconoKey] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMostrar(false); // Comienza a ocultar la palabra actual
      setTimeout(() => {
        setPalabraActualIndex((prevIndex) => (prevIndex + 1) % palabras.length);
        setIconoActualIndex((prevIndex) => (prevIndex + 1) % iconos.length);
        setIconoKey((prevKey) => prevKey + 1);
        setMostrar(true); // Muestra la nueva palabra después de un breve retraso
      }, 500); // Retraso para permitir que se complete la animación de desvanecimiento (500 milisegundos)
    }, 3000); // Cambia la palabra cada 3 segundos (3000 milisegundos)

    return () => clearInterval(interval); // Limpia el intervalo al desmontar el componente
  }, [iconos.length, palabras.length]);

  const palabraActual = palabras[palabraActualIndex];
  const colorPalabra = colores[palabraActualIndex];
  const iconoActual = iconos[iconoActualIndex];


  const handleClick = () => {
    navigate('/dashboard/blog');  // para ver publicaciones (cliente)
  }
  
  const handleClick2 = () => {
    navigate('/login');  // para iniciar sesion (profesional)
  }
  
  const handleClick3 = () => {
    navigate('/dashboard/mispublicaciones');  // para ir a mis publicaciones (profesional)
  }

  const handleAuth = () => {
    setAuth(true);
 };
 
 


  return (
    <>
      <Helmet>
        <title> Inicio | Pet Sitter </title>
      </Helmet>

      <Container sx={{mb: -10, ms: -3, me:-3 }} disableGutters maxWidth={false} >
        <Typography variant="h4" sx={{ mb: 15 }}/>
          
        
        <Grid container spacing={2}>
          <Grid xs={12} lg={6}>  
            <Grid className="Altura" sx={{display: "flex", flexDirection: 'column', alignItems: 'center', justifyContent: "center", ml:3}}>
              <Grid>
                <Typography variant='h1' align = 'center'>Bienvenido a <span className="color-change"> Pet Sitter</span></Typography>
                <Typography variant='h4' align='center' sx={{mt:1}}>Confiá en nuestros cuidadores para brindar a tu mascota el amor y la atención
                  que merecen</Typography>
              </Grid>
              
              <Grid sx={{display: "flex", flexDirection: 'row', alignItems: 'center', justifyContent: "center", mt:3}}>
                <Button variant = "contained" size ='large' sx={{mx:2}} onClick={handleClick} > Servicios </Button> 
                <Button variant = "outlined" size ='large' onClick={ auth ? handleClick3 : handleClick2} >Iniciar Sesion</Button>
              </Grid>
            </Grid>
          </Grid>


          
          <Grid className='Ocultar' xs={6} sx={{display: "flex", alignItems: 'center', justifyContent: "center", position: "relative"}}>
            
           
           <img src={portada} alt="Portada"/>
          </Grid>
          

        </Grid>




        <Box sx={{m: 50}} />

        <Box sx={{backgroundColor: colorPalabra, py:15}}>

        <Stack spacing={2} sx={{display: "flex",flexDirection: 'column', alignItems: 'center', justifyContent: "center", my:6, px:2}}>

          
          <Typography variant="h2"  align = 'center' sx={{color: "white"}}> 
          ¿Necesitás un servicio para tus mascotas?
          </Typography>
          
          
          
          
          
            <Typography variant="h2" style={{ opacity: mostrar ? 1 : 0, transition: 'opacity 0.5s', color: "white"}}>{palabraActual}</Typography>
            
        </Stack></Box>
        
        <Box sx={{m: 50}} />

        

        <Grid sx={{display: "flex",flexDirection: 'column', alignItems: 'center', justifyContent: "center", my:20}}>

        <Typography variant="h2"  align = 'center'>
        ¿Que es Pet Sitting?
        </Typography>

        <Typography variant="h5"  align = 'center' sx={{color: "black"}}> 

        
        
        Pet Sitting es el espacio que conecta cuidadores, veterinarios y paseadores con clientes que buscan servicios para mascotas. 
        Ofrecemos una amplia gama de cuidados, desde paseos hasta atención médica, garantizando el mejor cuidado para tus amigos peludos. 

        Nuestra plataforma proporciona acceso directo a profesionales confiables, asegurando una experiencia sin preocupaciones 
        para ti y tus mascotas. 

        En Pet Sitting, nos dedicamos a brindar un cuidado personalizado y excepcional para cada compañero de cuatro patas.

        </Typography>

        <Button  variant = "contained" sx={{my:2, py:1}} onClick={handleClick} ><Typography variant="h6">Explorá nuestros servicios </Typography></Button>
        </Grid>

              
                <AppBar position="relative" sx={{top: 'auto',bottom: 0, width: '100%' }}  >
                  <Toolbar>
                    <Typography variant="body1">
                      © {new Date().getFullYear()} Pet sitter 
                    </Typography>
                  </Toolbar>
                </AppBar>
                
      
      </Container>
    </>
  );
}
