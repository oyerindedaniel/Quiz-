import { useContext } from "react";

import { Navigate, Outlet } from "react-router-dom";

import AuthContext from "../../contexts/auth-context";

const UnProtectedRoute = () => {
  const { isLoggedState } = useContext(AuthContext);

  return isLoggedState ? <Navigate to="/home" /> : <Outlet />;
};

export default UnProtectedRoute;
