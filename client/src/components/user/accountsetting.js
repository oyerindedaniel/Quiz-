import { Fragment, useEffect, useContext, useState } from "react";

import AuthForm from "../auth/authform/authform";
import Navigation from "../navigation/navigation";
import AuthButton from "../ui/authbutton/authbutton";
import Alert from "../ui/alert/alert";

import useInput from "../../hooks/use-input";

import img1 from "../../assets/alertimg/bear.png";
import img2 from "../../assets/alertimg/refresh-arrow.png";

import { Oval } from "react-loader-spinner";

import AuthContext from "../../contexts/auth-context";

import classes from "./accountsetting.module.css";

const AccountSetting = ({ userData }) => {
  const { username, email } = userData;

  const {
    updatePassword,
    updatePasswordError,
    updatePasswordData,
    updatePasswordLoggingStatus,
  } = useContext(AuthContext);
  const [event, setEvent] = useState(null);

  const {
    value: enteredUsername,
    hasError: usernameInputHasError,
    valueChangeHandler: usernameOnChangedHandler,
    inputBlurHandler: usernameOnBlurHandler,
    valueOnLoadHandler: usernameOnLoadHandler,
  } = useInput((value) => /^[A-Za-z0-9]*$/.test(value));

  const {
    value: enteredEmail,
    valueChangeHandler: emailOnChangedHandler,
    inputBlurHandler: emailOnBlurHandler,
    valueOnLoadHandler: emailOnLoadHandler,
  } = useInput((value) =>
    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)
  );

  const {
    value: enteredCurrentPassword,
    valueChangeHandler: currentPasswordOnChangedHandler,
  } = useInput((value) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(value)
  );

  const {
    value: enteredPassword,
    hasError: passwordInputHasError,
    valueChangeHandler: passwordOnChangedHandler,
    inputBlurHandler: passwordOnBlurHandler,
  } = useInput((value) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(value)
  );

  const {
    value: enteredConfirmPassword,
    hasError: confirmPasswordInputHasError,
    valueChangeHandler: confirmPasswordOnChangedHandler,
    inputBlurHandler: confirmPasswordOnBlurHandler,
  } = useInput((value) => enteredPassword === value);

  const formItemsEditProfile = [
    {
      key: 1,
      htmlForValue: "username",
      id: "username",
      type: "text",
      value: enteredUsername,
      label: "Username",
      placeholder: "doyerinde",
      onChangeHandler: usernameOnChangedHandler,
      onBlurHandler: usernameOnBlurHandler,
      errorValue: "Username may only contain alphanumeric characters",
      hasError: usernameInputHasError,
    },
    {
      key: 2,
      htmlForValue: "emailaddress",
      id: "emailaddress",
      type: "email",
      value: enteredEmail,
      label: "E-mail Address",
      placeholder: "oyerinde.daniel@mail.com",
      onChangeHandler: emailOnChangedHandler,
      onBlurHandler: emailOnBlurHandler,
    },
  ].map((formItem) => (
    <AuthForm
      key={formItem.key}
      htmlForValue={formItem.htmlForValue}
      id={formItem.id}
      value={formItem.value}
      type={formItem.type}
      label={formItem.label}
      onChange={formItem.onChangeHandler}
      placeholder={formItem.placeholder}
      passwordDetail={formItem.passwordDetail}
      passwordBool={formItem.passwordBool}
      hasError={formItem.hasError}
      errorValue={formItem.errorValue}
      onBlur={formItem.onBlurHandler}
    />
  ));

  const formItemsEditPassword = [
    {
      key: 0,
      htmlForValue: "currentpassword",
      id: "currentpassword",
      type: "password",
      label: "Current Password",
      valueCheck: enteredCurrentPassword,
      placeholder: "Your Password",
      passwordBool: true,
      onChangeHandler: currentPasswordOnChangedHandler,
    },
    {
      key: 1,
      htmlForValue: "password",
      id: "password",
      type: "password",
      label: "Password",
      valueCheck: enteredPassword,
      placeholder: "Your Password",
      passwordBool: true,
      passwordDetail:
        "Password must contain at least one uppercase and lowercase letter, number and a minimum of 8 characters",
      onChangeHandler: passwordOnChangedHandler,
      onBlurHandler: passwordOnBlurHandler,
      errorValue: "Password is too week",
      hasError: passwordInputHasError,
    },
    {
      key: 2,
      htmlForValue: "confirmpassword",
      id: "confirmpassword",
      type: "password",
      valueCheck: enteredConfirmPassword,
      label: "Confirm Password",
      placeholder: "Your Password",
      passwordBool: true,
      onChangeHandler: confirmPasswordOnChangedHandler,
      onBlurHandler: confirmPasswordOnBlurHandler,
      errorValue: "Password does not match",
      hasError: confirmPasswordInputHasError,
    },
  ].map((formItem) => (
    <AuthForm
      key={formItem.key}
      htmlForValue={formItem.htmlForValue}
      id={formItem.id}
      value={formItem.value}
      type={formItem.type}
      label={formItem.label}
      onChange={formItem.onChangeHandler}
      placeholder={formItem.placeholder}
      passwordDetail={formItem.passwordDetail}
      passwordBool={formItem.passwordBool}
      hasError={formItem.hasError}
      errorValue={formItem.errorValue}
      valueCheck={formItem.valueCheck}
      onBlur={formItem.onBlurHandler}
    />
  ));

  const editProfileOnSubmitHandler = (e) => {
    e.preventDefault();
  };

  const editPasswordOnSubmitHandler = (e) => {
    e.preventDefault();
    setEvent(e);

    const userSubmittedData = {
      currentPassword: enteredCurrentPassword,
      password: enteredPassword,
      confirmPassword: enteredConfirmPassword,
    };

    updatePassword(userSubmittedData);
  };

  if (updatePasswordData && event) {
    event.target.reset();
    setEvent(null);
  }

  useEffect(() => {
    usernameOnLoadHandler(username);
    emailOnLoadHandler(email);
  }, [usernameOnLoadHandler, emailOnLoadHandler, username, email]);

  return (
    <Fragment>
      <Navigation isAccountControlNeeded="true" />
      <main className={`${classes.main}`}>
        <h1 className={`${classes.h1}`}>Account Settings</h1>
        <div className={`${classes.editCont}`}>
          <section
            className={`${classes.editCont1} ${classes.editProfileCont}`}
          >
            <div className={`${classes.editHeader}`}>
              <h1>User Profile</h1>
              <p>Update your profile information below</p>
            </div>
            <form autoComplete="on" onSubmit={editProfileOnSubmitHandler}>
              <Fragment>{formItemsEditProfile}</Fragment>
              <div className={`${classes.formActions}`}>
                <AuthButton>Update Profile</AuthButton>
              </div>
            </form>
          </section>
          <section
            className={`${classes.editCont1} ${classes.editPasswordCont}`}
          >
            <div className={`${classes.editHeader}`}>
              <h1>Change Password</h1>
            </div>
            {updatePasswordError && (
              <Alert img1={img1} img2={img2}>
                {updatePasswordError.message}
              </Alert>
            )}
            <form autoComplete="off" onSubmit={editPasswordOnSubmitHandler}>
              <Fragment>{formItemsEditPassword}</Fragment>
              <div className={`${classes.formActions}`}>
                <AuthButton status={updatePasswordLoggingStatus}>
                  {updatePasswordLoggingStatus === "pending" ? (
                    <Oval
                      ariaLabel="loading-indicator"
                      height={20}
                      width={20}
                      strokeWidth={10}
                      strokeWidthSecondary={5}
                      color="white"
                      secondaryColor="#6035e7"
                    />
                  ) : (
                    "Change Password"
                  )}
                </AuthButton>
              </div>
            </form>
          </section>
        </div>
      </main>
    </Fragment>
  );
};

export default AccountSetting;
