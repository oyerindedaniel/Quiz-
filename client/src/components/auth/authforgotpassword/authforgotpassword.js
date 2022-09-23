import AuthForm from "../authform/authform";
import AuthCard from "../../ui/authcard/authcard";
import AuthButton from "../../ui/authbutton/authbutton";
import AuthControl from "../authcontrol/authcontrol";

import useInput from "../../../hooks/use-input";

import classes from "./authforgotpassword.module.css";

const AuthForgotPassword = () => {
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

  const submitHandler = () => {};

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
    },
  ].map((formItem) => (
    <AuthForm
      key={formItem.key}
      htmlFor={formItem.htmlFor}
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
      <form onSubmit={submitHandler}>
        <div>{formItems}</div>
        <div className={`${classes.formActions}`}>
          <AuthButton>Reset my Password</AuthButton>
        </div>
      </form>
    </AuthCard>
  );
};

export default AuthForgotPassword;
