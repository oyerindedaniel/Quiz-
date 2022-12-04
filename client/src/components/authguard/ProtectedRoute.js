import { Navigate, Outlet } from "react-router-dom";

import { useGlobalStoreContext } from "../../contexts/global-context";

import Layout from "../layout";

const ProtectedRoute = () => {
  const { state } = useGlobalStoreContext();

  return state.user.isAuthenticated ? (
    <Layout>
      <Outlet />
    </Layout>
  ) : (
    <Navigate to="/login" />
  );
};

export default ProtectedRoute;
