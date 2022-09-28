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
    data: loggedInData,
    error,
  } = useHttp(signup);

  if (loggedInData) console.log(loggedInData.status);

  if (userLoggingStatus === "success") {
    const { status: loggedIn } = loggedInData;
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
        loggedInUser: loggedInData,
        loggingInError: error,
        loggingInStatus: userLoggingStatus,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
