import { Fragment, useContext } from "react";

import AuthCard from "../../ui/authcard/authcard";
import AuthForm from "../authform/authform";
import AuthControl from "../authcontrol/authcontrol";
import AuthButton from "../../ui/authbutton/authbutton";
import Alert from "../../ui/alert/alert";

import AuthContext from "../../../contexts/auth-context";

import { Oval } from "react-loader-spinner";

import img1 from "../../../assets/alertimg/bear.png";
import img2 from "../../../assets/alertimg/refresh-arrow.png";

import useInput from "../../../hooks/use-input";

import classes from "./authsignup.module.css";

const AuthSignup = () => {
  const ctx = useContext(AuthContext);

  const {
    value: enteredUsername,
    hasError: usernameInputHasError,
    valueChangeHandler: usernameOnChangedHandler,
    inputBlurHandler: usernameOnBlurHandler,
    reset: resetUsernameInput,
  } = useInput((value) => /^[A-Za-z0-9]*$/.test(value));

  const {
    value: enteredEmail,
    hasError: emailInputHasError,
    valueChangeHandler: emailOnChangedHandler,
    inputBlurHandler: emailOnBlurHandler,
    reset: resetEmailInput,
  } = useInput((value) =>
    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)
  );

  const {
    value: enteredPassword,
    hasError: passwordInputHasError,
    valueChangeHandler: passwordOnChangedHandler,
    inputBlurHandler: passwordOnBlurHandler,
    reset: resetPasswordInput,
  } = useInput((value) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(value)
  );

  const {
    value: enteredConfirmPassword,
    hasError: confirmPasswordInputHasError,
    valueChangeHandler: confirmPasswordOnChangedHandler,
    inputBlurHandler: confirmPasswordOnBlurHandler,
    reset: resetConfirmPasswordInput,
  } = useInput((value) => enteredPassword === value);

  const signupOnSubmitHandler = (e) => {
    e.preventDefault();

    const userSubmittedData = {
      username: enteredUsername,
      email: enteredEmail,
      password: enteredPassword,
      confirmPassword: enteredConfirmPassword,
    };

    ctx.signup(userSubmittedData);

    resetUsernameInput();
    resetEmailInput();
    resetPasswordInput();
    resetConfirmPasswordInput();
  };

  const formItems = [
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
    {
      key: 3,
      htmlForValue: "password",
      id: "password",
      type: "password",
      label: "Password",
      valueCheck: enteredPassword,
      placeholder: "Your Password",
      minlength: 8,
      autocompleteBool: "off",
      passwordBool: true,
      passwordDetail:
        "Password must contain at least one uppercase and lowercase letter, number and a minimum of 8 characters",
      onChangeHandler: passwordOnChangedHandler,
      onBlurHandler: passwordOnBlurHandler,
      errorValue: "Password is too week",
      hasError: passwordInputHasError,
    },
    {
      key: 4,
      htmlForValue: "confirmpassword",
      id: "confirmpassword",
      type: "password",
      valueCheck: enteredConfirmPassword,
      label: "Confirm Password",
      placeholder: "Your Password",
      minlength: 8,
      autoCompleteBool: "off",
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
      minlength={formItem.minlength}
      autocomplete={formItem.autoCompleteBool}
    />
  ));

  return (
    <AuthCard>
      <h1 className={`${classes.authH1}`}>Quiz!</h1>
      <h3 className={`${classes.authH3}`}>
        Get access to exclusive features on Quiz! by creating an account
      </h3>
      <AuthControl />
      {ctx.signingUpError && (
        <Alert img1={img1} img2={img2}>
          {ctx.signingUpError.message}
        </Alert>
      )}
      <form autoComplete="on" onSubmit={signupOnSubmitHandler}>
        <Fragment>{formItems}</Fragment>
        <div className={`${classes.formActions}`}>
          <AuthButton status={ctx.signingUpStatus}>
            {ctx.signingUpStatus === "pending" ? (
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
              "Sign up"
            )}
          </AuthButton>
        </div>
      </form>
    </AuthCard>
  );
};

export default AuthSignup;
