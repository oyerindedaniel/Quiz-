import { Navigate, Outlet } from "react-router-dom";

const AuthGuard = () => {
  const isLoggedLS = localStorage.getItem("isLoggedIn");

  return isLoggedLS ? <Outlet /> : <Navigate to="/login" />;
};

export default AuthGuard;
