import { Outlet } from "react-router-dom";
import Logo from "@/components/Logo";
import { NavMenu } from "@/components/NavMenu";
import { ShoppingCartIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import ModalCart from "@/components/ModalCart";



export default function MainLayout() {

    const [openCart, setOpenCart] = useState(false)

    return(
        <>
            <header className="bg-gray-900 text-white py-5">
                <div className="max-w-screen-2xl mx-auto flex flex-col justify-between items-center px-5 lg:flex-row ">
                    <div className="w-20">
                        <Logo/>
                    </div>

                    <div className="flex items-center gap-8">
                        <ShoppingCartIcon className="w-8 h-8 cursor-pointer "
                            onClick={() => setOpenCart(true)}
                        />
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

            <ModalCart 
              open={openCart}
              onClose={() => setOpenCart(false)}
            />
            
        </>
    )
}