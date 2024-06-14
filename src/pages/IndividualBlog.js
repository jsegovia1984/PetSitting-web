import { faker } from '@faker-js/faker';
import { useState,useEffect } from 'react';
import { sample } from 'lodash';
import { useParams } from 'react-router-dom';

import { Helmet } from 'react-helmet-async';
// @mui
import { Grid, Button, Container, Stack, Typography, Box } from '@mui/material';

import axios from 'axios';

import { ProductSort} from '../sections/@dashboard/products';

// components
import Iconify from '../components/iconify';

import BlogPostCardInd from '../sections/@dashboard/blog/BlogPostCardInd';

// mock
import POSTS from '../_mock/blog';

import {AppNewsUpdate} from '../sections/@dashboard/app';



// ----------------------------------------------------------------------

export default function BlogPage() {
  const [openFilter, setOpenFilter] = useState(false);

  const [GG, setGG] = useState(null);
  const [UU, setUU] = useState(null);
  const [comentarios, setComentarios] = useState(null);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const { idBlog } = useParams();
  const id = String(idBlog);  

  const handleLogin = async () => {
    
    try {
      const response = await axios.get(`http://173.230.135.41/api/servicios/getserviciosgen?id=${id}`);
      const aux = response.data.data;
      setGG(aux[0]);

    
      const response2 = await axios.get(`http://173.230.135.41/api/users/getuser?id=${aux[0].userid}`);
      const aux2 = response2.data.data;
      setUU(aux2[0]);
      console.log(aux2[0])

      const response3 = await axios.get(`http://173.230.135.41/api/comentarios/publicacion?id=${id}`);
      const aux3 = response3.data.data;
      const comentariosAceptados = aux3.filter((comentario) => comentario.estado === "Aceptado");

      const updatedJsons = comentariosAceptados.map((json, index) => ({
        ...json,
        avatarSrc: `/assets/images/avatars/avatar_${index + 1}.jpg`
      }));

      setComentarios(updatedJsons);

    } catch (error) {
      console.error('Ocurrió un error al intentar cargar los datos', error);
    };

  };

  useEffect(() => {
    handleLogin();
  }, []);

  useEffect(() => {
    if (UU !== null) {
      console.log('UU se actualizó:', UU);
    }
    if (comentarios !== null) {
      console.log('Comentarios se actualizó:', comentarios);
    }
  }, [UU, comentarios]);
  


  if (!GG || !comentarios || !UU) {
    return <div/>;
  }
  
  
  return (

  
    <>
      <Helmet>
        <title> {GG.titulo} </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2} mt={-4}>
          <Typography variant="h3" gutterBottom>
          {GG.titulo}
          </Typography>
          
        </Stack>
      <div>{console.log(UU)}</div>
        <Grid container spacing={3}>
            
            <BlogPostCardInd key={GG._id} post={GG} index={id} usuario={UU} banner={GG.imagen} title={GG.titulo}/>
            
        </Grid> 


        <Grid item xs={12} md={6} lg={8} >
            <AppNewsUpdate
              sx={{borderRadius: "0px"}}
              title="Agregar comentario"
              list={comentarios}
            />
        </Grid> 


      </Container>


    </>
  );
}
