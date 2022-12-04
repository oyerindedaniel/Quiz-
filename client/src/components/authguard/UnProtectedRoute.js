import { Navigate, Outlet } from "react-router-dom";

import { useGlobalStoreContext } from "../../contexts/global-context";

const UnProtectedRoute = () => {
  const { state } = useGlobalStoreContext();

  return state.user.isAuthenticated ? <Navigate to="/home" /> : <Outlet />;
};

export default UnProtectedRoute;
