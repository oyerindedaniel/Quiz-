import { Outlet } from "react-router-dom";

import { Toaster } from "react-hot-toast";

import Layout from "../layout";

const ProtectedRoute = () => {
  return (
    <Layout>
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
    </Layout>
  );
};

export default ProtectedRoute;
