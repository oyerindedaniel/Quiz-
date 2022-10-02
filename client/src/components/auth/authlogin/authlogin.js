import { Link, useNavigate } from "react-router-dom";
import { Fragment, useContext, useEffect } from "react";

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

import classes from "./authlogin.module.css";

const AuthLogin = () => {
  const { login, loggingInError, loggingInStatus, loggedInUser } =
    useContext(AuthContext);
  const navigate = useNavigate();

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

  // UseEffect that navigate to the home Page
  useEffect(() => {
    if (loggedInUser) {
      navigate("/home", { replace: true });
    }
  }, [loggedInUser, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();

    const userSubmittedData = {
      email: enteredEmail,
      password: enteredPassword,
    };

    login(userSubmittedData);

    resetEmailInput();
    resetPasswordInput();
  };

  const formItems = [
    {
      key: 1,
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
      key: 2,
      htmlForValue: "password",
      id: "password",
      type: "password",
      label: "Password",
      valueCheck: enteredPassword,
      placeholder: "Your Password",
      passwordBool: true,
      autoCompleteBool: "off",
      onChangeHandler: passwordOnChangedHandler,
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
      passwordBool={formItem.passwordBool}
      hasError={formItem.hasError}
      autoCompleteBool={formItem.autoCompleteBool}
      errorValue={formItem.errorValue}
      valueCheck={formItem.valueCheck}
      onBlur={formItem.onBlurHandler}
    />
  ));

  return (
    <AuthCard>
      <h1 className={`${classes.authH1}`}>Quiz!</h1>
      <h3 className={`${classes.authH3}`}>
        Welcome to Quiz!, please put your login credentials below to start using
        the app
      </h3>
      <AuthControl />
      {loggingInError && (
        <Alert img1={img1} img2={img2}>
          {loggingInError.message}
        </Alert>
      )}
      <form autoComplete="on" onSubmit={submitHandler}>
        <Fragment>{formItems}</Fragment>
        <div className={`${classes.authCaution}`}>
          <div className={`${classes.authCheckboxContainer}`}>
            <input
              className={`${classes.authCheckbox}`}
              type="checkbox"
              id="checkbox"
            />
            <label for="checkbox">Remember me</label>
          </div>
          <Link to="/forgot-password" className={`${classes.authReset}`}>
            Forgot Password
          </Link>
        </div>
        <div className={`${classes.formActions}`}>
          <AuthButton status={loggingInStatus}>
            {loggingInStatus === "pending" ? (
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
              "Login"
            )}
          </AuthButton>
        </div>
      </form>
    </AuthCard>
  );
};

export default AuthLogin;
