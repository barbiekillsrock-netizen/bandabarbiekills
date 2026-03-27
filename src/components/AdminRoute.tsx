import { Navigate } from "react-router";
import { useAdminAuth } from "@/hooks/useAdminAuth";

const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loading } = useAdminAuth();

  if (loading) {
    return <div className="min-h-screen bg-background" />;
  }

  if (!isAuthenticated()) {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
};

export default AdminRoute;
