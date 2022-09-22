import { Link } from "react-router-dom";

import AuthCard from "../../ui/authcard/authcard";
import AuthForm from "../authform/authform";
import AuthControl from "../authcontrol/authcontrol";
import AuthButton from "../../ui/authbutton/authbutton";

import useInput from "../../../hooks/use-input";

import classes from "./authlogin.module.css";

const AuthLogin = () => {
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
    value: enteredPassword,
    isValid: enteredPasswordIsValid,
    hasError: passwordInputHasError,
    valueChangeHandler: passwordOnChangedHandler,
    inputBlurHandler: passwordOnBlurHandler,
    reset: resetPasswordInput,
  } = useInput((value) => /^[A-Za-z0-9]*$/.test(value));

  const submitHandler = () => {
    resetEmailInput();
    resetPasswordInput();
  };

  const formItems = [
    {
      key: 1,
      htmlFor: "emailaddress",
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
      htmlFor: "password",
      id: "password",
      type: "password",
      value: enteredPassword,
      label: "Password",
      placeholder: "Your Password",
      onChangeHandler: passwordOnChangedHandler,
      onBlurHandler: passwordOnBlurHandler,
      passwordBool: true,
    },
  ].map((formItem) => (
    <AuthForm
      key={formItem.key}
      htmlFor={formItem.htmlFor}
      id={formItem.id}
      type={formItem.type}
      label={formItem.label}
      value={formItem.value}
      onChange={formItem.onChangeHandler}
      onBlur={formItem.onBlurHandler}
      placeholder={formItem.placeholder}
      passwordBool={formItem.passwordBool}
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
      <form onSubmit={submitHandler}>
        <div className="control-group">{formItems}</div>
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
          <AuthButton>Login</AuthButton>
        </div>
      </form>
    </AuthCard>
  );
};

export default AuthLogin;
