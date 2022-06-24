import { useAuth } from "../contexts/auth-context";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = () => {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? <Outlet /> : <Navigate to="login" />;
};

export default PrivateRoutes;
