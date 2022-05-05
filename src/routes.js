import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardApp from './pages/DashboardApp';
import Products from './pages/Products';
import Blog from './pages/Blog';
import User from './pages/User';
import NotFound from './pages/Page404';
import ChangePassword from './pages/changePassword';
import Bill from './pages/BillPage';
import DetailProduct from './sections/@dashboard/products/detailProduct';
import Profile from './pages/Profile/profile';
import Coupon from './pages/Coupon';
import MessagePage from './pages/Message';

// ----------------------------------------------------------------------

export default function Router() {
  const token = localStorage.getItem('access_token');
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: 'app', element: <DashboardApp /> },
        { path: 'user', element: <User /> },
        { path: 'products', element: <Products /> },
        { path: 'blog', element: <Blog /> },
        { path: 'bill', element: <Bill /> },
        { path: 'products/:id', element: <DetailProduct /> },
        { path: 'profile', element: <Profile /> },
        { path: 'coupon', element: <Coupon /> },
        { path: 'message', element: <MessagePage /> },
      ],
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: <Navigate to="/dashboard/app" /> },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: 'profile', element: <Profile /> },
        { path: 'change-password', element: <ChangePassword /> },
        { path: '404', element: <NotFound /> },
        // { path: '/products/:id', element: <DetailProduct /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
