import { useAuthStore } from '@/store/useAuthStore'
import { Navigate, Outlet } from 'react-router-dom';

export default function PrivateRoutes() {

    const {isAuthenticated, token, accessToken } = useAuthStore();

    return token || accessToken  ? <Outlet/> : <Navigate to="/auth/login" replace/>


  
  

}
