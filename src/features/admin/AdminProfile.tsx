import { useEffect, useState } from "react";
import { AdminTabs } from "./utils/adminTabs";
import { motion, AnimatePresence } from "framer-motion";
import PersonalData from "../customer/options/PersonalData";
import ChangePasswordForm from "../customer/options/ChangePasswordForm";
import CreateCategory from "./options/CreateCategory";
import ProductManagement from "./options/ProductManagement";

export const AdminProfile = () => {
  const [activeTab, setActiveTab] = useState<AdminTabs>(AdminTabs.PRODUCTS);
  // Estado para controlar la visibilidad del menú en móvil
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const tabs = [
    { id: AdminTabs.PROFILE, label: "Información personal" },
    { id: AdminTabs.PASSWORD, label: "Cambiar contraseña" },
    { id: AdminTabs.PRODUCTS, label: "Productos" },
    { id: AdminTabs.CATEGORIES, label: "Categorias" },
  ];
  
  const currentTab = tabs.find(tab => tab.id === activeTab);

  useEffect(() => {
    // Si el menú móvil está abierto, deshabilita el scroll del body
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    // Función de limpieza para reestablecer el scroll si el componente se desmonta
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMobileMenuOpen]);

  const renderContent = () => {
    switch (activeTab) {
      case AdminTabs.PROFILE: return <PersonalData />;
      case AdminTabs.PASSWORD: return <ChangePasswordForm />;
      case AdminTabs.PRODUCTS: return <ProductManagement />;
      case AdminTabs.CATEGORIES: return <CreateCategory />;
      default: return <PersonalData />;
    }
  };

  // Función que se ejecuta al hacer clic en un tab
  const handleTabClick = (tabId: AdminTabs) => {
    setActiveTab(tabId);
    // Cierra el menú móvil automáticamente al seleccionar una opción
    setIsMobileMenuOpen(false);
  };

  // Componente reutilizable para la navegación, para no repetir código
  const NavigationMenu = () => (
    <nav className="flex flex-col gap-3">
      <h2 className="text-xl font-bold mb-4">Mi Cuenta</h2>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => handleTabClick(tab.id as any)}
          className={`text-left p-2 rounded transition-colors cursor-pointer ${
            activeTab === tab.id
              ? "bg-fuchsia-600 text-white"
              : "hover:bg-gray-200"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  );

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* ====================================================== */}
      {/* SIDEBAR PARA DESKTOP (FIJO)                           */}
      {/* ====================================================== */}
      <aside className="hidden lg:block w-64 bg-white shadow-md p-4">
        <NavigationMenu />
      </aside>

      {/* Contenido Principal */}
      <main className="flex-1 p-6 relative">
        {/* ====================================================== */}
        {/* BOTÓN DE HAMBURGUESA (SOLO VISIBLE EN MÓVIL)         */}
        {/* ====================================================== */}
        <button 
          className="lg:hidden p-2 mb-4 bg-white rounded-md shadow"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* ====================================================== */}
        {/* MENÚ COLAPSABLE PARA MÓVIL (ABSOLUTO)                 */}
        {/* ====================================================== */}
       <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              {/* ====================================================== */}
              {/* MEJORA 1: OVERLAY PARA CERRAR AL HACER CLIC AFUERA   */}
              {/* ====================================================== */}
              <motion.div
                className="lg:hidden fixed inset-0 bg-black/50 z-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMobileMenuOpen(false)}
              />
              
              <motion.aside 
                className="lg:hidden fixed top-0 left-0 w-full max-w-xs h-full bg-white shadow-lg p-4 z-30"
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "tween", ease: "easeInOut", duration: 0.3 }}
              >
                <NavigationMenu />
              </motion.aside>
            </>
          )}
        </AnimatePresence>
        
        {/* Título y contenido principal */}
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
            {currentTab?.label}
        </h2>
        
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};