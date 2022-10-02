import { useEffect, Fragment } from "react";

import { useNavigate } from "react-router-dom";

import AccountSetting from "../components/user/accountsetting";
import LoadingScreen from "../components/ui/loadingscreen/loadingscreen";

import { initialProtect } from "../components/lib/api";

import useHttp from "../hooks/use-http";

const UserAccountSettings = () => {
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
      {initialProtectData && <AccountSetting />}
    </Fragment>
  );
};

export default UserAccountSettings;
