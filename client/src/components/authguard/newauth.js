import { Navigate, Outlet } from "react-router-dom";

const NewAuth = () => {
  const isLoggedLS = localStorage.getItem("isLoggedIn");

  return isLoggedLS ? <Navigate to="/home" /> : <Outlet />;
};

export default NewAuth;
