import { Outlet } from "react-router-dom";
import Logo from "@/components/Logo";
import { NavMenu } from "@/components/NavMenu";
import { ShoppingCartIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import ModalCart from "@/components/ModalCart";
import { useCartStore } from "@/store/useCartStore";
import { ToastContainer } from 'react-toastify'



export default function MainLayout() {

    const { items } = useCartStore();


    const [openCart, setOpenCart] = useState(false)

    return(
        <>
            <header className="bg-gray-900 text-white py-5">
                <div className="max-w-screen-2xl mx-auto flex flex-col justify-between items-center px-5 lg:flex-row ">
                    <div className="w-20">
                        
                        <Logo/>
                    </div>

                    <div className="flex items-center gap-8">
                        <div className="relative">
                           
                            <ShoppingCartIcon className="w-8 h-8 cursor-pointer"
                                onClick={() => setOpenCart(true)}
                            />
                             { items.length > 0 && (
                            <span className="absolute -top-2 -right-4 bg-red-600 text-white rounded-sm px-1 ">{items.length}</span>
                        ) }

                        </div>
                        <NavMenu/>
            

                    </div>
                    

                </div>

            </header>
            <section className="max-w-screen-2xl mx-auto mt-10 p-5">
                <Outlet/>

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

            <ModalCart 
              open={openCart}
              onClose={() => setOpenCart(false)}
            />
            
        </>
    )
}