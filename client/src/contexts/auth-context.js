import { useEffect, useState } from "react";

import { signup } from "../components/lib/api";

import useHttp from "../hooks/use-http";

import React from "react";

const AuthContext = React.createContext({
  isLoggedState: null,
  loggedInUser: null,
  loggedInError: null,
  loggedInStatus: null,
  login: () => {},
  signup: () => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const [submittedData, setSubmittedData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const {
    sendRequest,
    status: userLoggingStatus,
    data: loggedInUserInfo,
    error,
  } = useHttp(signup);

  console.log(loggedInUserInfo);
  console.log(userLoggingStatus);

  if (userLoggingStatus === "success") {
    const { status: loggedIn } = loggedInUserInfo;
    console.log(loggedIn);
    if (loggedIn === "status") setIsLoggedIn(true);
  }

  useEffect(() => {
    if (submittedData) {
      sendRequest(submittedData);
    }
  }, [submittedData, sendRequest]);

  const logoutHandler = () => {};

  const loginHandler = () => {};

  const signupHandler = (userSubmittedData) => {
    setSubmittedData(userSubmittedData);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedState: isLoggedIn,
        login: loginHandler,
        signup: signupHandler,
        logout: logoutHandler,
        loggedInUser: loggedInUserInfo,
        loggedInError: error,
        loggingInStatus: userLoggingStatus,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
