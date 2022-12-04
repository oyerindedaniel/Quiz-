import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { initialProtect } from "../lib/api";
import useHttp from "../../hooks/use-http";

import { useGlobalStoreContext } from "../../contexts/global-context";

import LoadingScreen from "../ui/loadingscreen/loadingscreen";

import Navbar from "./navbar";
import Footer from "./footer";

const Layout = ({ children }) => {
  const { dispatch } = useGlobalStoreContext();

  const { sendRequest, loading } = useHttp(
    initialProtect,
    dispatch,
    "",
    "SET_USER",
    "auth",
    "",
    ""
  );

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  return (
    <>
      {!loading ? (
        <>
          <Navbar></Navbar>
          <>{children}</>
          <Footer></Footer>
        </>
      ) : (
        <LoadingScreen />
      )}
    </>
  );
};

export default Layout;
