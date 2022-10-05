import { useEffect, useState } from "react";

import { signup, login } from "../components/lib/api";

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
  const [submittedForgotPasswordData, setSubmittedForgotPasswordDData] =
    useState(null);

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

  //UseHttp for forgot password
  const {
    sendRequest: forgotPasswordSendRequest,
    status: forgotPasswordLoggingStatus,
    data: forgotPasswordData,
    error: forgotPasswordError,
  } = useHttp(login);

  useEffect(() => {
    if (loginData || signUpData) {
      setIsLoggedIn(true);

      if (loginError || signupError) {
        setIsLoggedIn(false);
      }
    }
  }, [loginData, loginError, signUpData, signupError, setIsLoggedIn]);

  //UseEffect
  //Sign up Use Effect
  useEffect(() => {
    if (submittedSignUpData) {
      signupSendRequest(submittedSignUpData);
    }

    if (submittedLoginData) {
      loginSendRequest(submittedLoginData);
    }

    if (submittedForgotPasswordData) {
      forgotPasswordSendRequest(submittedForgotPasswordData);
    }
  }, [
    submittedSignUpData,
    signupSendRequest,
    submittedLoginData,
    loginSendRequest,
    submittedForgotPasswordData,
    forgotPasswordSendRequest,
  ]);

  console.log("Auth Context");

  // Handler Function
  const logoutHandler = () => {
    setIsLoggedIn(false);
  };

  const loginHandler = (userSubmittedData) => {
    console.log("submitted");
    setSubmittedLoginData(userSubmittedData);
  };

  const signupHandler = (userSubmittedData) => {
    setSubmittedSignUpData(userSubmittedData);
  };

  const forgotPasswordHandler = (userSubmittedData) => {
    console.log("submitted");
    setSubmittedLoginData(userSubmittedData);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedState: isLoggedIn,
        login: loginHandler,
        signup: signupHandler,
        forgotPassword: forgotPasswordHandler,
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
