import { use, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
// import { getMyProfile, getMyOrders, getMyCart } from "@/api/Customer";
import { useAuthStore } from "@/store/useAuthStore";
import { ProfileTab } from "./utils/profileTab";
import { useAuth } from "@/hooks/useAuth";
import PersonalData from "./options/PersonalData";
import { myProfile } from "@/api/Auth";
import ChangePasswordForm from "./options/ChangePasswordForm";
// import ChangePasswordForm from "@/components/profile/ChangePasswordForm";

export default function CustomerProfile() {




  const [activeTab, setActiveTab] = useState<ProfileTab>(ProfileTab.PROFILE);


  // const { user } = useAuth()
  const { data: user, isLoading } = useQuery({
  queryKey: ["customer-profile"],
  queryFn: myProfile,
});
 
  console.log(user)
  

//   const { data: profile, isLoading: profileLoading } = useQuery({
//     queryKey: ["profile"],
//     queryFn: () => getMyProfile(accessToken),
//   });

//   const { data: cart, isLoading: cartLoading } = useQuery({
//     queryKey: ["cart"],
//     queryFn: () => getMyCart(accessToken),
//     enabled: activeTab === "cart",
//   });

//   const { data: orders, isLoading: ordersLoading } = useQuery({
//     queryKey: ["orders"],
//     queryFn: () => getMyOrders(accessToken),
//     enabled: activeTab === "orders",
//   });

  const tabs = [
    { id: ProfileTab.PROFILE, label: "Información personal" },
    { id: ProfileTab.SECURITY, label: "Seguridad" },
    { id: ProfileTab.CART, label: "Mi carrito" },
    { id: ProfileTab.ORDERS, label: "Mis órdenes" },
];
  const renderContent = () => {
    if (activeTab === ProfileTab.PROFILE) {
    //   if (profileLoading) return <Skeleton />;

      return  <PersonalData/>   }

    if (activeTab ===ProfileTab.SECURITY) {
      return (
        <div>
          <h2 className="text-2xl font-bold mb-4">Actualizar Password</h2>
          <ChangePasswordForm />
        </div>
      );
    }

    if (activeTab === ProfileTab.CART) {
    //   if (cartLoading) return <Skeleton />;
      return (
        <div>
          {/* <h2 className="text-2xl font-bold mb-4">Mi carrito</h2>
          {cart.items.length === 0 ? (
            <p>Tu carrito está vacío</p>
          ) : (
            <ul>
              {cart.items.map((item: any) => (
                <li key={item.id} className="border-b py-2">
                  {item.product.name} - {item.quantity} x ${item.product.price}
                </li>
              ))}
            </ul>
          )} */}
        </div>
      );
    }

    if (activeTab === ProfileTab.ORDERS) {
    //   if (ordersLoading) return <Skeleton />;
      return (
        <div>
          <h2 className="text-2xl font-bold mb-4">Mis órdenes</h2>
          {/* {orders.length === 0 ? (
            <p>No tienes órdenes aún</p>
          ) : (
            <ul>
              {orders.map((order: any) => (
                <li key={order.id} className="border-b py-2">
                  Orden #{order.id} - Estado: {order.status} - Total: ${order.total}
                </li>
              ))}
            </ul>
          )} */}
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
}

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
