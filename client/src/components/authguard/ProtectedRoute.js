import { useContext } from "react";

import { Navigate, Outlet } from "react-router-dom";

import AuthContext from "../../contexts/auth-context";

const ProtectedRoute = () => {
  const { isLoggedState } = useContext(AuthContext);

  return isLoggedState ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
