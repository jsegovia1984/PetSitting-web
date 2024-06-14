import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import RegisterPage from './pages/RegisterPage';
import DashboardAppPage from './pages/DashboardAppPage';
import MensajesPage from './pages/MensajesPage';
import MisPublicacionesPage from './pages/MisPublicacionesPage';
import ComentariosPage from './pages/ComentariosPage';
import IndividualBlog from './pages/IndividualBlog';
import ExpPage from './pages/ExpPage';
import RecoverPage from './pages/RecoverPage';
import ContratarPage from './pages/ContratarPage';
import CrearServicioPage from './pages/CrearServicioPage';
import CambiarContraPage from './pages/CambiarContraPage';



// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'user', element: <UserPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'blog', element: <BlogPage /> },
        { path: 'mensajes', element: <MensajesPage /> },
        { path: 'mispublicaciones', element: <MisPublicacionesPage /> },
        { path: 'comentarios', element: <ComentariosPage /> },
        { path: 'individualblog/:idBlog', element: <IndividualBlog />,},
        { path: 'contratar/:idService', element: <ContratarPage />,},
        { path: 'crearservicio', element: <CrearServicioPage />,},

      ],
    },
    
    {path: 'login', element: <LoginPage />,},
    {path: 'register', element: <RegisterPage />,},
    {path: 'experiencia', element: <ExpPage />,},
    {path: 'recupero', element: <RecoverPage />,},
    {path: 'actualizar/:idUser', element: <CambiarContraPage />,},
    
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
