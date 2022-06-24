import { useAuth } from "../contexts/auth-context";
import { Outlet, Navigate } from "react-router-dom";

const DisableAuthenticateRoute = () => {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? <Navigate to="/" /> : <Outlet />;
};

export default DisableAuthenticateRoute;
