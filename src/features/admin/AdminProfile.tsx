import  { useState } from "react";
import { AdminTabs } from "./utils/adminTabs";
import { motion, AnimatePresence } from "framer-motion";
import PersonalData from "../customer/options/PersonalData";
import ChangePasswordForm from "../customer/options/ChangePasswordForm";
import CreateProduct from "./options/CreateProduct";

export const AdminProfile = () => {
  const [activeTab, setActiveTab] = useState<AdminTabs>(AdminTabs.PROFILE);

  const tabs = [
    { id: AdminTabs.PROFILE, label: "Información personal" },
    { id: AdminTabs.PASSWORD, label: "Cambiar contraseña" },
    { id: AdminTabs.PRODUCTS, label: "Productos" },
    { id: AdminTabs.CATEGORIES, label: "Categorias" },
  ];
  const renderContent = () => {
    if (activeTab === AdminTabs.PROFILE) {
      //   if (profileLoading) return <Skeleton />;

      return <PersonalData />;
    }

    if (activeTab === AdminTabs.PASSWORD) {
      //   if (profileLoading) return <Skeleton />;

      return (
        <div>
          <h2 className="text-center text-2xl font-bold mb-4">
            Actualizar Password
          </h2>
          <ChangePasswordForm />
        </div>
      );
    }

    if (activeTab === AdminTabs.PRODUCTS) {
      return (
        <div>
          <h2 className="text-center text-2xl font-bold mb-4">
            Crear Producto
          </h2>
          <CreateProduct />
        </div>
      );
    }

    if (activeTab === AdminTabs.CATEGORIES) {
      //   if (cartLoading) return <Skeleton />;
      return (
        <div>
          <h2 className="text-2xl font-bold mb-4">Mi carrito</h2>
          {/* <MyCart /> */}
        </div>
      );
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-4">
        <h2 className="text-xl font-bold mb-6">Mi Cuenta</h2>
        <nav className="flex flex-col gap-3">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
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
      </aside>

      {/* Contenido con animación */}
      <main className="flex-1 p-6">
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

// Loader tipo skeleton
function Skeleton() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-4 bg-gray-300 rounded w-1/3"></div>
      <div className="h-4 bg-gray-300 rounded w-1/2"></div>
      <div className="h-4 bg-gray-300 rounded w-1/4"></div>
    </div>
  );
}
