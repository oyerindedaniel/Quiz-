import { useEffect, useState } from "react";

import { signup } from "../components/lib/api";

import useHttp from "../hooks/use-http";

import React from "react";

const AuthContext = React.createContext({
  isLoggedIn: false,
  login: () => {},
  signup: () => {},
  logout: () => {},
});

let track = 1;

export const AuthContextProvider = (props) => {
  const [submittedData, setSubmittedData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const {
    sendRequest,
    status,
    data: loggedInUserInfo,
    error,
  } = useHttp(signup);

  useEffect(() => {
    // if (track === 1) return track++;
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
        isLoggedIn: isLoggedIn,
        login: loginHandler,
        signup: signupHandler,
        logout: logoutHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
