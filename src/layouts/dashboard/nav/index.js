import PropTypes from 'prop-types';
import { useEffect,useState } from 'react';
import { useLocation, Navigate, useNavigate } from 'react-router-dom';
// @mui
import { styled, alpha } from '@mui/material/styles';
import { Box, Link, Button, Drawer, Typography, Avatar, Stack } from '@mui/material';
import {jwtDecode} from 'jwt-decode';
// mock
import account from '../../../_mock/account';
import accountNo from '../../../_mock/accountNo';
// hooks
import useResponsive from '../../../hooks/useResponsive';
// components
import Logo from '../../../components/logo';
import Scrollbar from '../../../components/scrollbar';
import NavSection from '../../../components/nav-section';
//
import navConfig from './config';
import navConfigLogged from './configLogged';

import { useAuth } from '../../../Auth'


// ----------------------------------------------------------------------

const NAV_WIDTH = 280;

const StyledAccount = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: alpha(theme.palette.grey[500], 0.12),
}));

// ----------------------------------------------------------------------

Nav.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};

export default function Nav({ openNav, onCloseNav }) {
  const { pathname } = useLocation();

  const navigate = useNavigate();

  const isDesktop = false;

  const { auth, setAuth } = useAuth();


  function getJwtToken() {
    const jwtCookie = document.cookie.split('; ').find(row => row.startsWith('jwtToken='));
    return jwtCookie ? jwtCookie.split('=')[1] : null;
  }
  
  const jwtToken = getJwtToken();
  const decodedToken = jwtToken ? jwtDecode(jwtToken) : null;

  const [username, setUsername] = useState(decodedToken ? decodedToken.name : accountNo.displayName);
  const [logo, setLogo] = useState(decodedToken ? (decodedToken.imagen) : accountNo.photoURL);
  







  const handleAuth = () => {
    onCloseNav();
    setAuth(false);
    document.cookie = `jwtToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    navigate('/dashboard');
  };

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const handleClick = () => {
    navigate('/login');
  }

  const handleClick2 = () => {
    navigate('/register');
  }

  const maxFileNameLength = 17;
  const getFileDisplayName = () => {
    if (username) {
      if (username.length > maxFileNameLength) {
        return `${username.slice(0, maxFileNameLength)}...`;
      }
      return username;
    }
    return '';
  };


  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': { height: 1, display: 'flex', flexDirection: 'column' },
      }}
    >
      
      <Box sx={{ px: 2.5, pb: 1, pt: 3, display: 'flex', alignItems: 'center' }}>
        <Box>
          <Logo />
       </Box>
       <Typography variant="h6" sx={{ marginLeft: 2, color: 'text.primary'}}>
           Bienvenido a Pet Sitter
       </Typography>
      </Box>


      {auth ? (
      <Box sx={{ mb: 2, mx: 2.5 }}>
        <Link underline="none">
          <StyledAccount>
            <Avatar src={logo} alt="photoURL" />

            <Box sx={{ ml: 2 }}>
              <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
                {getFileDisplayName(username)}
              </Typography>

              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {account.role}
              </Typography>
            </Box>
          </StyledAccount>
        </Link>
      </Box>) : (<></>)}
      {auth ? (<NavSection data={navConfigLogged} />) : (<><NavSection data={navConfig}/></>)}

  
      
      <Box sx={{ px: 2.5, pb: 0, mt: 2 }}>
      <Stack alignItems="center" spacing={1} sx={{ pt: 0, borderRadius: 2, position: 'relative' }}>
        
      {auth ? (
           <><Button onClick={handleAuth} variant='outlined' color="error">
            Cerrar sesión
            </Button></>
            ) : (
            <><Box sx={{ textAlign: 'center' }}>
                <Typography gutterBottom variant="h6">
                  ¿Sos proveedor?
                </Typography>
              </Box><Button onClick={handleClick} variant="contained" disableElevation="true">
                  Iniciar sesión
                </Button><Button onClick={handleClick2} variant='outlined'>
                  Registarme
                </Button></>
         )}


        
      </Stack>
     </Box>
    </Scrollbar>
  );

  return (
    <Box
      component="nav"
      sx={{

      }}
    >
      {isDesktop ? (
        <Drawer
          open
          variant="permanent"
          PaperProps={{
            sx: {
              width: NAV_WIDTH,
              bgcolor: 'background.default',
              borderRightStyle: 'dashed',
            },
          }}
        >
          {renderContent}
        </Drawer>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            sx: { width: NAV_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}
