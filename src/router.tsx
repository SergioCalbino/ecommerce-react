import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import Dashboard from '@/pages/Dashboard';




const Router = () => {
  return (
        <BrowserRouter>
            <Routes>
                <Route element={<MainLayout/>}>
                    <Route path='/' element={<Dashboard/>} index/>
                    
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Router


