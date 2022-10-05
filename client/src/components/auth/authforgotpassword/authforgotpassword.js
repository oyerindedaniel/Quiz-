import { useContext } from "react";

import AuthForm from "../authform/authform";
import AuthCard from "../../ui/authcard/authcard";
import AuthButton from "../../ui/authbutton/authbutton";
import AuthControl from "../authcontrol/authcontrol";
import AuthContext from "../../../contexts/auth-context";

import useInput from "../../../hooks/use-input";

import classes from "./authforgotpassword.module.css";

const AuthForgotPassword = () => {
  const { forgotPassword } = useContext(AuthContext);

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

  const submitHandler = (e) => {
    e.preventDefault();

    const userSubmittedData = {
      email: enteredEmail,
    };

    forgotPassword(userSubmittedData);

    resetEmailInput();
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
    },
  ].map((formItem) => (
    <AuthForm
      key={formItem.key}
      htmlForValue={formItem.htmlForValue}
      id={formItem.id}
      label={formItem.label}
      type={formItem.type}
      value={formItem.value}
      onChange={formItem.onChangeHandler}
      placeholder={formItem.placeholder}
    />
  ));

  return (
    <AuthCard>
      <h1 className={`${classes.authH1}`}>Quiz!</h1>
      <h3 className={`${classes.authH3}`}>
        Please fill in the email you've used to create a Camel Cloud account and
        we'll send you a reset link
      </h3>
      <AuthControl />
      <form autoComplete="on" onSubmit={submitHandler}>
        <div>{formItems}</div>
        <div className={`${classes.formActions}`}>
          <AuthButton>Reset my Password</AuthButton>
        </div>
      </form>
    </AuthCard>
  );
};

export default AuthForgotPassword;
