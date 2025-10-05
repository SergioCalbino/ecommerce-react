import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import Dashboard from '@/pages/customer/Dashboard';
import Checkout from './features/checkout/Checkout';
import AuthLayout from './layouts/customer/AuthLayout';
import Login from './features/auth/Login';
import Register from './features/auth/Register';
import PrivateRoutes from './pages/PrivateRoutes';
import RecoverPassword from './features/auth/RecoverPassword';
import ResetPassword from './features/auth/ResetPassword';
import CustomerProfile from './features/customer/CustomerProfile';

import { AdminLayout } from './layouts/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import { AdminProfile } from '@/features/admin/AdminProfile';




const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas públicas */}
        <Route element={<AuthLayout />}>
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
          <Route path="/auth/forgot-password" element={<RecoverPassword />} />
          <Route path="/auth/reset-password" element={<ResetPassword />} />
        </Route>


        {/* Rutas de customer */}
        <Route element={<PrivateRoutes role="CUSTOMER" />}>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Dashboard />} index />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/profile" element={<CustomerProfile />} />
          </Route>
        </Route>

        {/* Rutas de admin */}
        <Route element={<PrivateRoutes role="ADMIN" />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin" element={<AdminDashboard />} />
            {/* <Route path="/products" element={<Dashboard />} />  */}
            <Route path="/admin-profile" element={<AdminProfile />} /> 
            <Route path="/products" element={<Dashboard />} index />


          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
