import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Button,
  Popover,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,Grid,Modal,Box,FormControl,InputLabel,Select,Divider,TextField
} from '@mui/material';
// components
import Label from '../components/label';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
// sections
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';
// mock


// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'servicio', label: 'Servicio', alignRight: false },
  { id: 'duracion', label: 'Duracion', alignRight: false },
  { id: 'frecuencia', label: 'Frecuencia', alignRight: false },
  { id: 'costo', label: 'Costo', alignRight: false },
  { id: 'estado', label: 'Estado', alignRight: false },
  { id: '' },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.titulo.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function UserPage() {

  const [USERLIST, setUSERLIST] = useState([]);


  useEffect(() => {
    handleLogin();
  }, []);

  function getJwtToken() {
    const jwtCookie = document.cookie.split('; ').find(row => row.startsWith('jwtToken='));
    return jwtCookie ? jwtCookie.split('=')[1] : null;
  }

  const cookieValue = getJwtToken();

  const handleLogin = async () => {

    const config = {
      headers: {
        'x-access-token': `${cookieValue}`,
        'Content-Type': 'multipart/form-data', // Importante para indicar que estás enviando un formulario con datos binarios (archivos)
      },
    };

    const id = decodedToken.id


    try {
      const response = await axios.get(`http://173.230.135.41/api/servicios/getserviciosdash?id=${id}`, config);
      
      // Crea el token
      const aux = response.data.data;
      setUSERLIST(aux);

    } catch (error) {
      console.error('Error de carga de servicios', error);
    }


  };

  USERLIST.map((item) => {
    return null; // El valor de retorno no es importante en este caso
  });

  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openModal3, setOpenModal3] = useState(false);

  const [nombre, setNombre] = useState("");
  const [categoria, setCategoria] = useState("");
  const [duracion, setDuracion] = useState("");
  const [frecuencia, setFrecuencia] = useState("");
  const [tipo, setTipo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [costo, setCosto] = useState("");
  const [estado, setEstado] = useState("");
  const [openModal2, setOpenModal2] = useState(false);
  const [file, setFile] = useState(null);

  const handleOpenMenu = (event,id) => {
    setOpen(event.currentTarget);
    setidEvento(id);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleCloseModal2 = () => {
    setOpenModal2(false);
    setNombre('');
    setCategoria('');
    setDuracion('');
    setFrecuencia('');
    setTipo('');
    setDescripcion('');
    setCosto('');
  };

  const handleCloseModal3 = () => {
    setOpenModal3(false);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = USERLIST.map((n) => n.titulo);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const navigate = useNavigate();

  const handleClick2 = () => {
    navigate('/dashboard/crearservicio');
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const handleEliminar = () => { 
    setOpenModal3(true);
    setOpen(null);
  };

  const maxFileNameLength = 40;
  const getFileDisplayName = () => {
    if (file) {
      const fileName = file.name;
      if (fileName.length > maxFileNameLength) {
        return `...${fileName.slice(-maxFileNameLength)}`;
      }
      return fileName;
    }
    return '';
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };



  const [idEvento, setidEvento] = useState("");

  const handleModificarServicio = () => { 
    setOpenModal2(true);
    setOpen(null);
    
    handlePisarDatos();

  };

  const handlePisarDatos = () => {
    const aux = USERLIST.find(item => item._id === idEvento);
    console.log(aux);

    setNombre(aux.titulo);
    setCategoria(aux.categoria);
    setFrecuencia(aux.frecuencia);
    setTipo(aux.tipo);
    
    setDescripcion(aux.descripcion)
    setCosto(aux.costo)
    setDuracion(aux.duracion)
    setEstado(aux.estado)
  }

  const validateFields = () => {
    if (
      nombre.trim() === '' ||
      categoria.trim() === '' ||
      duracion.trim() === '' ||
      frecuencia.trim() === '' ||
      descripcion.trim() === '' ||
      tipo.trim() === '' ||
      costo.trim() === '' 
    ) {
      return false; 
    }
    return true; 
  };

  const handleBackendModificar = async () => {
    setOpenModal2(false);
    
    if (!validateFields()) {
      alert('Por favor, complete los campos obligatorios.');
      return;
    }
    

    const config = {
      headers: {
        'x-access-token': `${cookieValue}`,
        'Content-Type': 'multipart/form-data', // Importante para indicar que estás enviando un formulario con datos binarios (archivos)
      },
    };

    console.log('id', idEvento);
    console.log('titulo', nombre);
    console.log('descripcion', descripcion);
    console.log('frecuencia', frecuencia);
    console.log('duracion', duracion);
    console.log('tipo', tipo);
    console.log('costo', costo.toString());
    console.log('estado', estado); 
    console.log('categoria', categoria);
    
    const formData = new FormData();
    formData.append('id', idEvento);
    formData.append('titulo', nombre);
    formData.append('descripcion', descripcion);
    formData.append('frecuencia', frecuencia);
    formData.append('duracion', duracion);
    formData.append('tipo', tipo);
    formData.append('costo', costo.toString());
    formData.append('estado', estado); 
    formData.append('categoria', categoria);

    if (file!=null){
       formData.append('file', file); 
    }


    try {
      await axios.put(
        "http://173.230.135.41/api/servicios/modificar",
        formData,
        config
      );

      window.location.reload();

    } catch (error) {
      console.error("Error de registro", error);
      alert('Ocurrió un error inesperado. No se pudo completar la creación del evento.');
    }

  };


  const handleEliminarBack = async () => { 

    try {
      
      await axios.delete('http://173.230.135.41/api/servicios/borrar', {
        headers: {
          'x-access-token': `${cookieValue}`,
        },
        data: {
          id: idEvento
        }
      });

      window.location.reload();

    } catch (error) {
      alert('Ocurrió un error inesperado. No se puedo eliminar el evento.');
    }
    setOpenModal3(false);

  };

  

  
  const jwtToken = getJwtToken();
  const decodedToken = jwtDecode(jwtToken);
  



  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredUsers.length && !!filterName;

  return (
    <>
      <Helmet>
        <title> Mis Publicaciones | Pet Sitting </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Mis Publicaciones
          </Typography>
          <Button variant="contained" onClick={handleClick2} startIcon={<Iconify icon="eva:plus-fill" />}>
            Nueva publicación 
          </Button>
        </Stack>

        <Card>
          <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={USERLIST.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {USERLIST.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { _id, titulo, duracion, frecuencia, costo, estado } = row;
                    const selectedUser = selected.indexOf(titulo) !== -1;

                    return (
                      <TableRow hover key={_id} tabIndex={-1} role="checkbox" selected={selectedUser}>
                        <TableCell padding="checkbox"/>
                          
                        

                        

                        <TableCell align="left">{titulo}</TableCell>
                        <TableCell align="left">{duracion}</TableCell>
                        <TableCell align="left">{frecuencia}</TableCell>
                        <TableCell align="left">{costo}</TableCell>

                        <TableCell align="left">
                          <Label color={ (estado === 'Publicado' && 'success') || 'primary'}>{sentenceCase(estado)}</Label>
                        </TableCell>

                        <TableCell align="right">
                          <IconButton size="large" color="inherit" onClick={(event) => handleOpenMenu(event, _id)}>
                            <Iconify icon={'eva:more-vertical-fill'} />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <Paper
                          sx={{
                            textAlign: 'center',
                          }}
                        >
                          <Typography variant="h6" paragraph>
                          No encontrado
                          </Typography>

                          <Typography variant="body2">
                          No se encontraron resultados para &nbsp;
                            <strong>&quot;{filterName}&quot;</strong>.
                            <br /> Prueba escribiendo otra palabra.
                          </Typography>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={USERLIST.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >

        <MenuItem onClick={handleModificarServicio}>
          <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
          Editar
        </MenuItem>

        <MenuItem onClick={handleEliminar} sx={{ color: 'error.main' }}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
          Eliminar
        </MenuItem>
        
      </Popover>







      <Modal
        open={openModal3}
        onClose={handleCloseModal3}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Container maxWidth="sm" sx={{ mt:25, padding: '20px', maxHeight: '675px', backgroundColor: 'white', borderRadius: 5 }}>

          <Box mt={1} mb={2} backgroundColor='white' align='center'>
            <Typography variant="h4" gutterBottom>

            <strong>¿Estás seguro que deseas eliminar la publicación?</strong>
            </Typography>
          </Box>

          <Box backgroundColor='white'>
            <Grid align="center">
              <Button variant="contained" size="large" color="primary" onClick={handleEliminarBack}>Eliminar</Button>
              <Button sx= {{ml: 3}} variant="outlined" size="large" color="primary" onClick={handleCloseModal3}>Volver atrás</Button>
            </Grid>
          </Box>
        </Container>
      </Modal>





















































      <Modal
        open={openModal2}
        onClose={handleCloseModal2}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{overflow: 'auto'}}
      >

      
        <Container maxWidth="sm" sx={{ mt: 4, padding: '20px', maxHeight: '675px', backgroundColor: 'white', borderRadius: 5 }}>

          <Box mt={1} mb={2} backgroundColor='white' align='center'>
            <Typography variant="h4" gutterBottom>

              <strong>Modificar Servicio</strong>
            </Typography>
          </Box>

          <Stack spacing={2}>
      <TextField name="Nombre del servicio" label="Nombre del servicio" value={nombre} size="small"
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
          size="small"
          onChange={(e) => setCategoria(e.target.value)}
        >
        <MenuItem value="Cuidado Diario y Paseo">Cuidado Diario y Paseo</MenuItem>
        <MenuItem value="Alojamiento y Hospedaje">Alojamiento y Hospedaje</MenuItem>
        <MenuItem value="Entrenamiento y Comportamiento">Entrenamiento y Comportamiento</MenuItem>
        <MenuItem value="Salud y Bienestar">Salud y Bienestar</MenuItem>
        <MenuItem value="Aseo y Estética">Aseo y Estética</MenuItem>
        <MenuItem value="Nutrición y Dietética">Nutrición y Dietética</MenuItem>
        <MenuItem value="Recreación y Ejercicio">Recreación y Ejercicio</MenuItem>
        <MenuItem value=" Transporte y Logística">Transporte y Logística</MenuItem>
        
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
          size="small"
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
        <InputLabel id="frecuencia">Frecuencia</InputLabel>
        <Select
          labelId="frecuencia"
          id="frecuencia"
          label="Frecuencia"
          value={frecuencia}
          size="small"
          onChange={(e) => setFrecuencia(e.target.value)}
        >
         <MenuItem value="Única">Única</MenuItem>
         <MenuItem value="Semanal">Semanal</MenuItem>
         <MenuItem value="Mensual">Mensual</MenuItem>
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
          size="small"
          onChange={(e) => setTipo(e.target.value)}
        >
         <MenuItem value="Individual">Individual</MenuItem>
         <MenuItem value="Grupal">Grupal</MenuItem>
        </Select>
      </FormControl>
    </Box>

        <TextField name="descripcion" label="Descripcion" multiline rows={2} value={descripcion} size="small"
          onChange={(e) => setDescripcion(e.target.value)}/>
          
        <TextField name="costo" label="Costo ($)" type="number" value={costo} size="small"
          onChange={(e) => setCosto(e.target.value)}/>


<Box sx={{ minWidth: 120}}>
      <FormControl fullWidth>
        <InputLabel id="estado">Estado</InputLabel>
        <Select
          labelId="estado"
          id="estado"
          label="Estado"
          value={estado}
          size="small"
          onChange={(e) => setEstado(e.target.value)}
        >
         <MenuItem value="Pausado">Pausado</MenuItem>
         <MenuItem value="Publicado">Publicado</MenuItem>
        </Select>
      </FormControl>
    </Box>
        
      </Stack>



          <Box my={2} align="center" backgroundColor='white'sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} >
          <label htmlFor="fileInput" >
              <input
              type="file"
              accept="image/*" // Puedes especificar el tipo de archivo que esperas aquí
              style={{ display: 'none' }}
              onChange={handleFileChange}
              id="fileInput"
            />
            
              <Button
                variant="outlined"
                color="primary"
                startIcon={<Iconify icon="eva:cloud-upload-outline" />}
                component="span"
                
              >
                Subir foto
              </Button>
            </label>
            {file && (
              <>
          <p style={{ padding: 0, margin: 0 }}> {getFileDisplayName()}</p>
          </>
       
      )}


          </Box>
          <Box my={2}>
            <Divider />
          </Box>
          <Box backgroundColor='white'>
            <Grid align="center">
              <Button variant="contained" 
              
                color="primary"
                startIcon={<Iconify icon="ic:baseline-plus" />}
                onClick={handleBackendModificar}
              
              >
                Guardar cambios
              </Button>
            </Grid>
          </Box>
        </Container>
      </Modal>
    </>
  );
}
