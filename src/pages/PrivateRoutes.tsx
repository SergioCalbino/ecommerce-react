import { authStore } from '@/store/authStore';
import { Navigate, Outlet } from 'react-router-dom';

export type roleProps = {
  role: "CUSTOMER" | "ADMIN"
}

export default function PrivateRoutes({ role }: roleProps) {
  const { isHydrated, token, accessToken, user, refreshToken } = authStore();

  if (!isHydrated) {
    return <div className="text-white">Cargando...</div>;
  }

  if (!(token || accessToken || refreshToken) || !user) {
    return <Navigate to="/auth/login" replace />;
  }

  if (user.role !== role) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
