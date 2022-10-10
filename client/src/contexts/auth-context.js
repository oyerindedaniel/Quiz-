import { useEffect, useReducer, useState } from "react";

import {
  signup,
  login,
  updatePassword,
  updateProfile,
  forgotPassword,
  createQuiz,
} from "../components/lib/api";

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

const initialQuizDataState = {
  submittedSignUpData: null,
  submittedLoginData: null,
  submittedForgotPasswordData: null,
  submittedUpdatePasswordData: null,
  submittedUpdateProfileData: null,
  submittedCreateQuizData: null,
};

const quizDataStateReducer = (state, action) => {
  if (action.type === "LOGIN") {
    return { submittedLoginData: action.value };
  }
  if (action.type === "SIGNUP") {
    return { submittedSignUpData: action.value };
  }
  if (action.type === "FORGOTPASSWORD") {
    return { submittedForgotPasswordData: action.value };
  }
  if (action.type === "UPDATEPASSWORD") {
    return { submittedUpdatePasswordData: action.value };
  }
  if (action.type === "UPDATEPROFILE") {
    return { submittedUpdateProfileData: action.value };
  }
  if (action.type === "CREATEQUIZ") {
    return { submittedCreateQuizData: action.value };
  }
  if (action.type === "RESET") {
    return {
      submittedLoginData: null,
      submittedSignUpData: null,
      submittedForgotPasswordData: null,
      submittedUpdatePasswordData: null,
      submittedUpdateProfileData: null,
      submittedCreateQuizData: null,
    };
  }
  return quizDataStateReducer;
};

export const AuthContextProvider = (props) => {
  const [quizDataState, dispatchQuizDataState] = useReducer(
    quizDataStateReducer,
    initialQuizDataState
  );

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
  } = useHttp(forgotPassword);

  //UseHttp for update password
  const {
    sendRequest: updatePasswordSendRequest,
    status: updatePasswordLoggingStatus,
    data: updatePasswordData,
    error: updatePasswordError,
  } = useHttp(updatePassword);

  //UseHttp for update profile
  const {
    sendRequest: updateProfileSendRequest,
    status: updateProfileLoggingStatus,
    data: updateProfileData,
    error: updateProfileError,
  } = useHttp(updateProfile);

  //UseHttp for update profile
  const {
    sendRequest: createQuizSendRequest,
    status: createQuizLoggingStatus,
    data: createQuizData,
    error: createQuizError,
  } = useHttp(createQuiz);

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
    if (quizDataState.submittedSignUpData) {
      signupSendRequest(quizDataState.submittedSignUpData);
    }

    if (quizDataState.submittedLoginData) {
      loginSendRequest(quizDataState.submittedLoginData);
    }

    if (quizDataState.submittedForgotPasswordData) {
      forgotPasswordSendRequest(quizDataState.submittedForgotPasswordData);
    }

    if (quizDataState.submittedUpdatePasswordData) {
      updatePasswordSendRequest(quizDataState.submittedUpdatePasswordData);
    }

    if (quizDataState.submittedUpdateProfileData) {
      updateProfileSendRequest(quizDataState.submittedUpdateProfileData);
    }
    if (quizDataState.submittedCreateQuizData) {
      createQuizSendRequest(quizDataState.submittedCreateQuizData);
    }
  }, [
    quizDataState.submittedSignUpData,
    signupSendRequest,
    quizDataState.submittedLoginData,
    loginSendRequest,
    quizDataState.submittedForgotPasswordData,
    forgotPasswordSendRequest,
    quizDataState.submittedUpdatePasswordData,
    updatePasswordSendRequest,
    quizDataState.submittedUpdateProfileData,
    updateProfileSendRequest,
    quizDataState.submittedCreateQuizData,
    createQuizSendRequest,
  ]);

  useEffect(() => {
    if (
      signUpData ||
      signupError ||
      loginData ||
      loginError ||
      updatePasswordData ||
      updatePasswordError ||
      updateProfileData ||
      updateProfileError
    ) {
      dispatchQuizDataState({ type: "RESET" });
    }
  }, [
    signUpData,
    signupError,
    loginData,
    loginError,
    updatePasswordData,
    updatePasswordError,
    updateProfileData,
    updateProfileError,
  ]);

  // Handler Function
  const logoutHandler = () => {
    setIsLoggedIn(false);
  };

  const loginHandler = (userSubmittedData) => {
    dispatchQuizDataState({ type: "LOGIN", value: userSubmittedData });
  };

  const signupHandler = (userSubmittedData) => {
    dispatchQuizDataState({ type: "SIGNUP", value: userSubmittedData });
  };

  const forgotPasswordHandler = (userSubmittedData) => {
    dispatchQuizDataState({
      type: "FORGOTPASSWORD",
      value: userSubmittedData,
    });
  };

  const updatePasswordHandler = (userSubmittedData) => {
    dispatchQuizDataState({ type: "UPDATEPASSWORD", value: userSubmittedData });
  };

  const updateProfileHandler = (userSubmittedData) => {
    dispatchQuizDataState({ type: "UPDATEPROFILE", value: userSubmittedData });
  };

  const createQuizHandler = (userSubmittedData) => {
    dispatchQuizDataState({ type: "CREATEQUIZ", value: userSubmittedData });
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedState: isLoggedIn,
        login: loginHandler,
        signup: signupHandler,
        forgotPassword: forgotPasswordHandler,
        updatePassword: updatePasswordHandler,
        logout: logoutHandler,
        signedUpUser: signUpData,
        signingUpError: signupError,
        signingUpStatus: userSigningUpStatus,
        loggedInUser: loginData,
        loggingInError: loginError,
        loggingInStatus: userLoggingStatus,
        updatePasswordError,
        updatePasswordData,
        updatePasswordLoggingStatus,
        updateProfile: updateProfileHandler,
        updateProfileLoggingStatus,
        updateProfileData,
        createQuiz: createQuizHandler,
        createQuizLoggingStatus,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
