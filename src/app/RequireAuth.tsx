import { Navigate, Outlet } from "react-router";
import { useAuthStore } from "../stores/authStore";

export default function RequireAuth() {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  return <Outlet />;
}
