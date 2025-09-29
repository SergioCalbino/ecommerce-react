import Logo from '@/components/Logo';
import {  Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { NavMenuAdmin } from './NavMenuAdmin';

export const AdminLayout = () => {

    

  return (
        <>
            <header className="bg-gray-900 text-white py-5">
                <div className="max-w-screen-2xl mx-auto flex flex-col justify-between items-center px-5 lg:flex-row ">
                    <div className="w-20">
                        <Logo />
                    </div>

                    <div className="flex items-center gap-8">
                        
                        <NavMenuAdmin />
                    </div>
                </div>
            </header>
            <section className="max-w-screen-2xl mx-auto mt-10 p-5">
                <Outlet />
            </section>

            <footer className="bg-gray-200 text-gray-700 py-5">
                <p className="text-center">
                    Todos los derechos reservados {new Date().getFullYear()} - Ecommerce
                </p>
            </footer>
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar
                newestOnTop
                theme="light"
            />

            {/* <ModalCart open={openCart} onClose={() => setOpenCart(false)} /> */}
        </>
    );
}
