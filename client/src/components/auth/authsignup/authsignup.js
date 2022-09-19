import AuthCard from "../../ui/authcard/authcard";
import AuthForm from "../authform/authform";
import AuthControl from "../authcontrol/authcontrol";
import AuthButton from "../../ui/authbutton/authbutton";

import useInput from "../../../hooks/use-input";

import classes from "./authsignup.module.css";

const AuthSignup = () => {
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
    value: enteredPassword,
    isValid: enteredPasswordIsValid,
    hasError: passwordInputHasError,
    valueChangeHandler: passwordOnChangedHandler,
    inputBlurHandler: passwordOnBlurHandler,
    reset: resetPasswordInput,
  } = useInput((value) => /^[A-Za-z0-9]*$/.test(value));

  const {
    value: enteredConfirmPassword,
    isValid: enteredConfirmPasswordIsValid,
    hasError: confirmPasswordInputHasError,
    valueChangeHandler: confirmPasswordOnChangedHandler,
    inputBlurHandler: confirmPasswordOnBlurHandler,
    reset: resetConfirmPasswordInput,
  } = useInput((value) => /^[A-Za-z0-9]*$/.test(value));

  const submitHandler = () => {};

  const formItems = [
    {
      key: 1,
      htmlFor: "username",
      id: "username",
      type: "text",
      value: enteredUsername,
      content: "Username",
      placeholder: "doyerinde",
      onChangeHandler: usernameOnChangedHandler,
      onBlurHandler: usernameOnBlurHandler,
    },
    {
      key: 2,
      htmlFor: "emailaddress",
      id: "emailaddress",
      type: "text",
      value: enteredEmail,
      content: "E-mail Address",
      placeholder: "oyerinde.daniel@mail.com",
      onChangeHandler: emailOnChangedHandler,
      onBlurHandler: emailOnBlurHandler,
    },
    {
      key: 3,
      htmlFor: "password",
      id: "password",
      type: "password",
      value: enteredPassword,
      content: "Password",
      placeholder: "Your Password",
      passwordBool: true,
      onChangeHandler: passwordOnChangedHandler,
      onBlurHandler: passwordOnBlurHandler,
    },
    {
      key: 4,
      htmlFor: "confirmpassword",
      id: "confirmpassword",
      type: "password",
      value: enteredConfirmPassword,
      content: "Confirm Password",
      placeholder: "Your Password",
      passwordBool: true,
      onChangeHandler: confirmPasswordOnChangedHandler,
      onBlurHandler: confirmPasswordOnBlurHandler,
    },
  ].map((formItem) => (
    <AuthForm
      key={formItem.key}
      htmlFor={formItem.htmlFor}
      id={formItem.id}
      value={formItem.value}
      type={formItem.type}
      content={formItem.content}
      onChange={formItem.onChangeHandler}
      placeholder={formItem.placeholder}
      passwordBool={formItem.passwordBool}
      onBlur={formItem.onBlurHandler}
    />
  ));

  return (
    <AuthCard>
      <h1 className={`${classes.authH1}`}>Quiz!</h1>
      <h3 className={`${classes.authH3}`}>
        Get access to exclusive features on Quiz! by creating an account
      </h3>
      <AuthControl />
      <form onSubmit={submitHandler}>
        <div>{formItems}</div>
        <div>
          <AuthButton>Sign up</AuthButton>
        </div>
      </form>
    </AuthCard>
  );
};

export default AuthSignup;
