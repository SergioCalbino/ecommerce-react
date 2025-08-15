import { useAuthStore } from '@/store/useAuthStore'
import { Navigate, Outlet } from 'react-router-dom';

export default function PrivateRoutes() {

    const {isHydrated, token, accessToken } = useAuthStore();

    if (!isHydrated) {
    return <div className="text-white">Cargando...</div>;
  }
    

    return token || accessToken  ? <Outlet/> : <Navigate to="/auth/login" replace/>


  
  

}
