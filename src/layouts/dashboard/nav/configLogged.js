// component
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

const navConfig = [
  
  {
    title: 'Inicio',
    path: '/dashboard/app',
    icon: <Iconify icon={"eva:heart-fill"} />,   
  },
  {
    title: 'servicios',
    path: '/dashboard/blog',
    icon: <Iconify icon={"eva:briefcase-fill"} />,  
  },
  {
    title: 'Contrataciones',
    path: '/dashboard/user',
    icon: <Iconify icon={"eva:people-fill"} />,
  },
  {
    title: 'mis publicaciones',
    path: '/dashboard/mispublicaciones',
    icon: <Iconify icon={'eva:layers-fill'} />
  },
  {
    title: 'comentarios',
    path: '/dashboard/comentarios',
    icon: <Iconify icon={'eva:archive-fill'} />
  },  
];

export default navConfig;
