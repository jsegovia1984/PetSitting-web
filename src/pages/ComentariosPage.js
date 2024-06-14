import { Helmet } from 'react-helmet-async';
import { filter,sample } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
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
  TablePagination,Modal,Box,Grid
} from '@mui/material';
// components
import Label from '../components/label';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
// sections
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';
// mock
import USERLIST from '../_mock/user';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Alumno', alignRight: false },
  { id: 'servicio', label: 'Servicio', alignRight: false },

  { id: 'comentario', label: 'Comentario', alignRight: false },

  { id: 'estadoComentario', label: 'Estado', alignRight: false },
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
    return filter(array, (_user) => _user.alumno.toLowerCase().indexOf(query.toLowerCase()) !== -1);
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
      const response = await axios.get(`http://173.230.135.41/api/comentarios/dashboard?id=${id}`, config);
      
      // Crea el token
      const aux = response.data.data;

      const updatedJsons = aux.map((json, index) => ({
        ...json,
        avatarSrc: `/assets/images/avatars/avatar_${index + 1}.jpg`
      }));

      setUSERLIST(updatedJsons);

    } catch (error) {
      console.error('Error de carga de comentarios', error);
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

  const handleOpenMenu = (event, id) => {
    
    setOpen(event.currentTarget);
    setidEvento(id);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = USERLIST.map((n) => n.alumno);
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

  const handleCloseModal3 = () => {
    setOpenModal3(false);
  };


  const [idEvento, setidEvento] = useState("");

  const handleEliminarBack = async () => { 
    try {
      
      await axios.delete('http://173.230.135.41/api/comentarios/borrar', {
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

  const handleAceptarBack = async () => { 

    const config = {
      headers: {
        'x-access-token': `${cookieValue}`,
      },
    };

    try {
      await axios.put('http://173.230.135.41/api/comentarios/modificar', {
          id: idEvento,
          estado: 'Aceptado'
      },config)

      window.location.reload();

    } catch (error) {
      alert('Ocurrió un error inesperado. No se puedo aceptar el comentario.');
      console.log(error)
    }


  };

  const handleRechazarBack = async () => { 

    const config = {
      headers: {
        'x-access-token': `${cookieValue}`,
      },
    };

    try {
      await axios.put('http://173.230.135.41/api/comentarios/modificar', {
          id: idEvento,
          estado: 'Rechazado'
      },config)

      window.location.reload();

    } catch (error) {
      alert('Ocurrió un error inesperado. No se puedo rechazar el comentario.');
      console.log(error)
    }


  };

  const jwtToken = getJwtToken();
  const decodedToken = jwtDecode(jwtToken);

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredUsers.length && !!filterName;

  const avatarList = Array.from({ length: 24 }, (_, index) => `/assets/images/avatars/avatar_${index + 1}.jpg`);

  const generateRandomAvatar = () => {
    return sample(avatarList); // Utiliza lodash.sample para obtener una ruta aleatoria de la lista
  };

  return (
    <>
      <Helmet>
        <title> Comentarios | Pet Sitting </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Comentarios de mis publicaciones
          </Typography>

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
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { _id, alumno, nombreservicio, texto,estado,avatarSrc } = row;
                    const selectedUser = selected.indexOf(alumno) !== -1;

                    return (
                      <TableRow hover key={_id} tabIndex={-1} role="checkbox" selected={selectedUser}>
                        <TableCell padding="checkbox"/>

                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Avatar alt={avatarSrc} src={avatarSrc} />
                            <Typography variant="subtitle2" noWrap>
                              {alumno}
                            </Typography>
                          </Stack>
                        </TableCell>

                        <TableCell align="left">{nombreservicio}</TableCell>
                        <TableCell align="left">{texto}</TableCell>


                        <TableCell align="left">
                          <Label color={(estado === 'Rechazado' && 'error') || (estado === 'Aceptado' && 'success') || 'primary'}>{sentenceCase(estado)}</Label>
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
        <MenuItem onClick={handleAceptarBack}>
          <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
          Aceptar
        </MenuItem>

        <MenuItem onClick={handleRechazarBack}>
          <Iconify icon={'eva:close-circle-outline'} sx={{ mr: 2 }} />
          Rechazar
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

            <strong>¿Estás seguro que deseas eliminar el comentario?</strong>
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
    </>
  );
}
