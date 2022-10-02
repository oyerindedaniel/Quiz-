import { Fragment, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Homecp from "../components/homecp/homecp";
import LoadingScreen from "../components/ui/loadingscreen/loadingscreen";

import { initialProtect } from "../components/lib/api";

import useHttp from "../hooks/use-http";

const Home = () => {
  const navigate = useNavigate();

  const {
    sendRequest: initialProtectSendRequest,
    status: initialProtectStatus,
    data: initialProtectData,
    error: initialProtectError,
  } = useHttp(initialProtect);

  //
  useEffect(() => {
    initialProtectSendRequest();
  }, [initialProtectSendRequest]);

  useEffect(() => {
    if (initialProtectError) {
      navigate("/login", { replace: true });
    }
  }, [initialProtectError, navigate]);

  return (
    <Fragment>
      {initialProtectStatus === "pending" && <LoadingScreen />}
      {initialProtectData && <Homecp />}
    </Fragment>
  );
};

export default Home;
