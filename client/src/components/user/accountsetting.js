import { Fragment } from "react";

import AuthForm from "../auth/authform/authform";
import Navigation from "../navigation/navigation";
import AuthButton from "../ui/authbutton/authbutton";

import useInput from "../../hooks/use-input";

import classes from "./accountsetting.module.css";

const AccountSetting = () => {
  const {
    value: enteredUsername,
    isValid: enteredUsernameIsValid,
    hasError: usernameInputHasError,
    valueChangeHandler: usernameOnChangedHandler,
    inputBlurHandler: usernameOnBlurHandler,
    reset: resetUsernameInput,
  } = useInput((value) => /^[A-Za-z0-9]*$/.test(value));

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailOnChangedHandler,
    inputBlurHandler: emailOnBlurHandler,
    reset: resetEmailInput,
  } = useInput((value) =>
    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)
  );

  const {
    value: enteredCurrentPassword,
    isValid: enteredCurrentPasswordIsValid,
    hasError: currentPasswordInputHasError,
    valueChangeHandler: currentPasswordOnChangedHandler,
    inputBlurHandler: currentPasswordOnBlurHandler,
    reset: resetcurrentPasswordInput,
  } = useInput((value) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(value)
  );

  const {
    value: enteredPassword,
    isValid: enteredPasswordIsValid,
    hasError: passwordInputHasError,
    valueChangeHandler: passwordOnChangedHandler,
    inputBlurHandler: passwordOnBlurHandler,
    reset: resetPasswordInput,
  } = useInput((value) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(value)
  );

  const {
    value: enteredConfirmPassword,
    isValid: enteredConfirmPasswordIsValid,
    hasError: confirmPasswordInputHasError,
    valueChangeHandler: confirmPasswordOnChangedHandler,
    inputBlurHandler: confirmPasswordOnBlurHandler,
    reset: resetConfirmPasswordInput,
  } = useInput((value) => enteredPassword === value);

  const formItemsEditProfile = [
    {
      key: 1,
      htmlFor: "username",
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
      htmlFor: "emailaddress",
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
      htmlFor={formItem.htmlFor}
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
      htmlFor: "currentpassword",
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
      htmlFor: "password",
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
      htmlFor: "confirmpassword",
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
      htmlFor={formItem.htmlFor}
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

  return (
    <Fragment>
      <Navigation isAccountControlNeeded="true" />
      <main className={`${classes.main}`}>
        <h1 className={`${classes.h1}`}>Account Settings</h1>
        <div className={`${classes.editCont}`}>
          <div className={`${classes.editCont1} ${classes.editProfileCont}`}>
            <div className={`${classes.editHeader}`}>
              <h1>User Profile</h1>
              <p>Update your profile information below</p>
            </div>
            <Fragment>{formItemsEditProfile}</Fragment>
            <div className={`${classes.formActions}`}>
              <AuthButton>Update Profile</AuthButton>
            </div>
          </div>
          <div className={`${classes.editCont1} ${classes.editPasswordCont}`}>
            <div className={`${classes.editHeader}`}>
              <h1>Change Password</h1>
            </div>
            <Fragment>{formItemsEditPassword}</Fragment>
            <div className={`${classes.formActions}`}>
              <AuthButton>Change Password</AuthButton>
            </div>
          </div>
        </div>
      </main>
    </Fragment>
  );
};

export default AccountSetting;