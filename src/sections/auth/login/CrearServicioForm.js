import { useRef, useState, useEffect } from "react";

import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

// @mui
import { Link, Stack,Card,CardContent,Divider,Button, IconButton, InputAdornment, TextField, Checkbox, Typography, Container, Box, MenuItem,InputLabel, FormControl, Select } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import axios from 'axios';
import { useAuth } from '../../../Auth'

// components
import Iconify from '../../../components/iconify';

import negocio from '../../../negocio.jpg'


// ----------------------------------------------------------------------

export default function CrearServicioForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const { auth, setAuth } = useAuth();
  const [nombre, setNombre] = useState("");
  const [categoria, setCategoria] = useState("");
  const [duracion, setDuracion] = useState("");
  const [frecuencia, setFrecuencia] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [costo, setCosto] = useState("");
  const [tipo, setTipo] = useState("");

  const [banner, setBanner] = useState(null);


  const handleClick = () => {
    navigate('/dashboard/mispublicaciones');
  }

  const handleBannerChange = (e) => {
    const selectedFile = e.target.files[0];
    setBanner(selectedFile);
  };

  const validateFields = () => {
    if (
      nombre.trim() === '' ||
      categoria.trim() === '' ||
      duracion.trim() === '' ||
      frecuencia.trim() === '' ||
      descripcion.trim() === '' ||
      costo.trim() === '' ||
      banner === null
    ) {
      return false; 
    }
    return true; 
  };

  function getJwtToken() {
    const jwtCookie = document.cookie.split('; ').find(row => row.startsWith('jwtToken='));
    return jwtCookie ? jwtCookie.split('=')[1] : null;
  }

  const cookieValue = getJwtToken();

  const decodedToken = jwtDecode(cookieValue);
  const id = decodedToken.id

  const handleRegisterBack = async () => {


    if (!validateFields()) {
      alert('Por favor, completá los campos obligatorios.');
      return;
    }

    const config = {
      headers: {
        'x-access-token': `${cookieValue}`,
        'Content-Type': 'multipart/form-data', // Importante para indicar que estás enviando un formulario con datos binarios (archivos)
      },
    };



  
    const formData = new FormData();
    formData.append('userid', id);
    formData.append('titulo', nombre);
    formData.append('descripcion', descripcion);
    formData.append('frecuencia', frecuencia);
    formData.append('duracion', duracion);
    formData.append('costo', costo.toString());
    formData.append('estado', 'Publicado'); 
    formData.append('file', banner);
    formData.append('tipo', tipo);
    formData.append('categoria', categoria);


    try {

      const response = await axios.post(
        "http://173.230.135.41/api/servicios/publicar",
        formData,
        config
      );

      const token = response.data.createdServicio;

      if (token){
        navigate('/dashboard/mispublicaciones');

      } else {
        alert('Por favor, verifica los campos ingresados.');
      }

    } catch (error) {
      console.error("Error de registro", error);
      alert('Ocurrió un error inesperado. No se pudo completar la creación del evento.');
    }




  };

  
  return (
    <>
      <Stack spacing={2}>
      <TextField name="Nombre del servicio" label="Nombre del servicio" value={nombre}
          onChange={(e) => setNombre(e.target.value)}/>
      <Box sx={{ minWidth: 120, }}>


      

      <FormControl fullWidth>
        <InputLabel id="Categoria">Categoría</InputLabel>
        <Select
          labelId="Categoria"
          id="Categoria"
          label="Categoria"
          MenuProps={{ PaperProps: { sx: { maxHeight: 300 } } }}
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
        >
        <MenuItem value="Cuidado Diario y Paseo">Cuidado Diario y Paseo</MenuItem>
        <MenuItem value="Alojamiento y Hospedaje">Alojamiento y Hospedaje</MenuItem>
        <MenuItem value="Entrenamiento y Comportamiento">Entrenamiento y Comportamiento</MenuItem>
        <MenuItem value="Salud y Bienestar">Salud y Bienestar</MenuItem>
        <MenuItem value="Aseo y Estética">Aseo y Estética</MenuItem>
        <MenuItem value="Nutrición y Dietética">Nutrición y Dietética</MenuItem>
        <MenuItem value="Recreación y Ejercicio">Recreación y Ejercicio</MenuItem>
        <MenuItem value="Transporte y Logística">Transporte y Logística</MenuItem>
        
        <MenuItem value="Otros">Otros</MenuItem>
        </Select>
      </FormControl>
    </Box>

        <Box sx={{ minWidth: 120}}>
      <FormControl fullWidth>
        <InputLabel id="duracion">Duracion</InputLabel>
        <Select
          labelId="duracion"
          id="duracion"
          label="Duracion"
          value={duracion}
          onChange={(e) => setDuracion(e.target.value)}
        >
         <MenuItem value="30 Minutos">30 Minutos</MenuItem>
         <MenuItem value="1 Hora">1 Hora</MenuItem>
         <MenuItem value="2 Horas">2 Horas</MenuItem>
         <MenuItem value="3 Horas">3 Horas</MenuItem>
         <MenuItem value="4 Horas">4 Horas</MenuItem>
         <MenuItem value="1 dia">1 dia</MenuItem>
        </Select>
      </FormControl>
    </Box>

    <Box sx={{ minWidth: 120}}>
      <FormControl fullWidth>
        <InputLabel id="tipo">Tipo</InputLabel>
        <Select
          labelId="tipo"
          id="tipo"
          label="Tipo"
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
        >
         <MenuItem value="Individual">Individual</MenuItem>
         <MenuItem value="Grupal">Grupal</MenuItem>

        </Select>
      </FormControl>
    </Box>
    
    <Box sx={{ minWidth: 120}}>
      <FormControl fullWidth>
        <InputLabel id="frecuencia">Frecuencia</InputLabel>
        <Select
          labelId="frecuencia"
          id="frecuencia"
          label="Frecuencia"
          value={frecuencia}
          onChange={(e) => setFrecuencia(e.target.value)}
        >
         <MenuItem value="Única">Única</MenuItem>
         <MenuItem value="Semanal">Semanal</MenuItem>
         <MenuItem value="Mensual">Mensual</MenuItem>
        </Select>
      </FormControl>
    </Box>

        <TextField name="descripcion" label="Descripcion" multiline rows={5} value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}/>
        <TextField name="costo" label="Costo ($)" type="number" value={costo}
          onChange={(e) => setCosto(e.target.value)}/>






<Card  sx={{mb:4,mr:3, ml:6, backgroundColor:'transparent',}}>
      <CardContent>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column'
            
          }}
        >
   
              <img src={banner ? URL.createObjectURL(banner) : negocio} alt='banner' style={{ 
              width: "200px",
              height: "200px", 
              objectFit: "cover", 
              objectPosition: "center",
              borderRadius: "10%",
              }
              }/>

              
        
        </Box>
      </CardContent>
      <Divider />
      <label htmlFor="fileInput2" >
              <input
              type="file"
              accept="image/*" 
              style={{ display: 'none' }}
              onChange={handleBannerChange}
              id="fileInput2"
            />
        <Button
          fullWidth
          variant="text"
          color='secondary'
          component="span"
        >
          Subir foto del servicio
        </Button></label>
    </Card>
        
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleRegisterBack} sx={{mt:3}}>
        Publicar
      </LoadingButton>
    </>
  );
}
