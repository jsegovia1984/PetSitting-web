import {useState} from 'react';
// @mui
import PropTypes from 'prop-types';
import { Box, Stack, Link, Card, Button, Divider, Typography, CardHeader, TextField, MenuItem,Select,FormControl,InputLabel  } from '@mui/material';
// utils
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { fToNow } from '../../../utils/formatTime';

// components
import Iconify from '../../../components/iconify';
import Scrollbar from '../../../components/scrollbar';
import { useAuth } from '../../../Auth'
// ----------------------------------------------------------------------

AppNewsUpdate.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  list: PropTypes.array.isRequired,
};

export default function AppNewsUpdate({ title, subheader, list, ...other }) {
  
  const [state, setState ] = useState(true);
  const { auth, setAuth } = useAuth();
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [rating, setRating] = useState('5');

  const { idBlog } = useParams();
  const id = String(idBlog); 


  const handleClick = async () => {

    if (name.trim() === '') {
      alert('El nombre no puede quedar vacío');
      return;
    }
    if (text.trim() === '') {
      alert('No se puede publicar un comentario vacío');
      return;
    }
    if (rating.trim() === '') {
      alert('El rating no puede quedar vacío');
      return;
    }

    try {

      const response = await axios.get(`http://173.230.135.41/api/servicios/getserviciosgen?id=${id}`);
      const aux = response.data.data;

      await axios.post(
        "http://173.230.135.41/api/comentarios/publicar",{
          userid: aux[0].userid,
          serviceid: id,
          nombreservicio: aux[0].titulo,
          alumno: name,
          texto: text,
          titulo: aux[0].titulo,
          calificacion: rating,
          estado: 'Pendiente'
        }
        
      );

      setState(false);

    } catch (error) {
      console.log(error)
      alert("Por favor, verifica los datos ingresados")
    }
    
    
  }

  return (
    <Card {...other}>

    {!auth ? (


  <>{(state ? (<>
      <CardHeader title={title} subheader={subheader} />
      <Stack spacing={2} sx={{ p: 3, px: 3 }}>
      <TextField name="nombre" label="Nombre" value={name} onChange={(e) => setName(e.target.value)}/>
      <TextField name="comentario" label="Agregar un comentario" multiline rows={3} onChange={(e) => setText(e.target.value)}
          value={text}/>

      <FormControl fullWidth>
        <InputLabel id="calificacion">Calificación</InputLabel>
        <Select
          labelId="calificacion"
          id="calificacion"
          label="calificacion"
          onChange={(e) => setRating(e.target.value)}
          value={rating}
        >
         <MenuItem value="1"><Iconify sx={{color: '#2065D1'}} icon={'solar:star-bold'}/></MenuItem>
         <MenuItem value="2"><Iconify sx={{color: '#2065D1'}} icon={'solar:star-bold'}/><Iconify sx={{color: '#2065D1'}} icon={'solar:star-bold'}/></MenuItem>
         <MenuItem value="3"><Iconify sx={{color: '#2065D1'}} icon={'solar:star-bold'}/><Iconify sx={{color: '#2065D1'}} icon={'solar:star-bold'}/><Iconify sx={{color: '#2065D1'}} icon={'solar:star-bold'}/></MenuItem>
         <MenuItem value="4"><Iconify sx={{color: '#2065D1'}} icon={'solar:star-bold'}/><Iconify sx={{color: '#2065D1'}} icon={'solar:star-bold'}/><Iconify sx={{color: '#2065D1'}} icon={'solar:star-bold'}/><Iconify sx={{color: '#2065D1'}} icon={'solar:star-bold'}/></MenuItem>
         <MenuItem value="5"><Iconify sx={{color: '#2065D1'}} icon={'solar:star-bold'}/><Iconify sx={{color: '#2065D1'}} icon={'solar:star-bold'}/><Iconify sx={{color: '#2065D1'}} icon={'solar:star-bold'}/><Iconify sx={{color: '#2065D1'}} icon={'solar:star-bold'}/><Iconify sx={{color: '#2065D1'}} icon={'solar:star-bold'}/></MenuItem>
        </Select>
      </FormControl>

      <div style={{textAlign: "right"}}>
      <Button variant="outlined" onClick={handleClick}>Agregar comentario</Button></div>
      </Stack></>
      ):(
      <>
      <Stack spacing={2} sx={{ p: 3, px: 3 }}>
        <Typography align="center">
          El comentario fue enviado. Estará pendiente a revisión.
        </Typography>
      </Stack>
      </>))}</>
      ) : (
        <></>
      )}



      
      <Scrollbar>
          <Stack spacing={3} sx={{ p: 3, pr: 0, pt: 2 }}>
            <Typography variant="h6">Comentarios</Typography>
            {  ( list.length === 0 ? (<div> No hay comentarios. </div>) : (<> {list.map((news) => (
            <NewsItem key={news.id} news={news} />
          ))}</>)) }
          </Stack>
        </Scrollbar>
      </Card>
  );
}

// ----------------------------------------------------------------------

NewsItem.propTypes = {
  news: PropTypes.shape({
    alumno: PropTypes.string,
    texto: PropTypes.string,
    calificacion: PropTypes.number,
  }),
};

function NewsItem({ news }) {
  const { alumno, texto, calificacion,avatarSrc } = news;

  return (
    <Stack direction="row" alignItems="center" spacing={2} sx={{borderTop: '1px solid #f0f0f0', }}>
      <Box component="img" alt={'comentario'} src={avatarSrc} sx={{ width: 48, height: 48, borderRadius: 1.5, flexShrink: 0 }} />

      <Box sx={{ minWidth: 240, flexGrow: 1 }}>
        <Link color="inherit" variant="subtitle2" underline="hover" noWrap>
          {alumno}
        </Link>

        <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: "justify", pr:2 }}>
          {texto}
        </Typography>
      </Box>

      <Stack sx={{color: 'grey.500', pr:3}} alignItems="center">
          <Typography sx={{alignItems: "center",display: 'flex'}}><Iconify sx={{mt:-0.35, mr:0.5}}  icon="solar:star-bold" />

          {calificacion}
          
          </Typography>
          </Stack>
    </Stack>
  );
}
