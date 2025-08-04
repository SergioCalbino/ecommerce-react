import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import Dashboard from '@/pages/Dashboard';
import Checkout from './features/checkout/Checkout';
import AuthLayout from './layouts/AuthLayout';
import Login from './features/auth/Login';
import Register from './features/auth/Register';
import PrivateRoutes from './pages/PrivateRoutes';




const Router = () => {
  return (
        <BrowserRouter>
            <Routes>
                <Route element={<PrivateRoutes/>} >
                <Route element={<MainLayout/>}>
                    <Route path='/' element={<Dashboard/>} index/>
                    <Route path='/checkout' element={<Checkout/>} />
                    
                    
                </Route>
                </Route>

                <Route element={<AuthLayout/>}>
                    <Route path='/auth/login' element={<Login/>}/>
                    <Route path='/auth/register' element={<Register/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Router


