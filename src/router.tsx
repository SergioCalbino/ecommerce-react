import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import Dashboard from '@/pages/Dashboard';
import Checkout from './features/checkout/Checkout';




const Router = () => {
  return (
        <BrowserRouter>
            <Routes>
                <Route element={<MainLayout/>}>
                    <Route path='/' element={<Dashboard/>} index/>
                    <Route path='/checkout' element={<Checkout/>} />
                    
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Router


