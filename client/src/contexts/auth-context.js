import { useEffect, useState } from "react";

import { signup, login, initialProtect } from "../components/lib/api";

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
  const [submittedSignUpData, setSubmittedSignUpData] = useState(null);
  const [submittedLoginData, setSubmittedLoginData] = useState(null);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //UseHttp
  //UseHttp for sign up
  const {
    sendRequest: signupSendRequest,
    status: userSigningUpStatus,
    data: signUpData,
    error: signupError,
  } = useHttp(signup);

  //UseHttp for login
  const {
    sendRequest: loginSendRequest,
    status: userLoggingStatus,
    data: loginData,
    error: loginError,
  } = useHttp(login);

  const {
    sendRequest: initialProtectSendRequest,
    status: initialProtectStatus,
    data: initialProtectData,
    error: initialProtectError,
  } = useHttp(initialProtect);

  //UseEffect
  //Sign up Use Effect
  useEffect(() => {
    if (submittedSignUpData) {
      signupSendRequest(submittedSignUpData);
    }
  }, [submittedSignUpData, signupSendRequest]);

  //Login Use Effect
  useEffect(() => {
    if (submittedLoginData) {
      loginSendRequest(submittedLoginData);
    }
  }, [submittedLoginData, loginSendRequest]);

  //
  useEffect(() => {
    console.log("initial protect");
    initialProtectSendRequest();
  }, [initialProtectSendRequest]);

  // Handler Function
  const logoutHandler = () => {
    setIsLoggedIn(false);
  };

  const loginHandler = (userSubmittedData) => {
    console.log(userSubmittedData);
    setSubmittedLoginData(userSubmittedData);
  };

  const signupHandler = (userSubmittedData) => {
    setSubmittedSignUpData(userSubmittedData);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedState: isLoggedIn,
        login: loginHandler,
        signup: signupHandler,
        logout: logoutHandler,
        signedUpUser: signUpData,
        signingUpError: signupError,
        signingUpStatus: userSigningUpStatus,
        loggedInUser: loginData,
        loggingInError: loginError,
        loggingInStatus: userLoggingStatus,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
