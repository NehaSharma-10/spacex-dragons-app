// src/components/PublicRoute.tsx
import { useAuthStore } from '../store/app.store';
import { Navigate, Outlet } from 'react-router-dom';

const PublicRoute = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return isAuthenticated ? <Navigate to="/dragons" replace /> : <Outlet />;
};

export default PublicRoute;
