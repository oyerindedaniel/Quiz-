import { Navigate, Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { useGlobalStoreContext } from "../../contexts/global-context";

const UnProtectedRoute = () => {
  const { state } = useGlobalStoreContext();

  return state.user.isAuthenticated ? (
    <Navigate to="/home" />
  ) : (
    <>
      <Toaster
        toastOptions={{
          duration: 5000,
          style: {
            background: "#fff",
            color: "#000",
            fontSize: "1.5rem",
          },
        }}
      />
      <Outlet />
    </>
  );
};

export default UnProtectedRoute;
