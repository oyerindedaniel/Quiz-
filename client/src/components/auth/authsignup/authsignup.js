import AuthCard from "../../ui/authcard/authcard";
import AuthForm from "../authform/authform";
import AuthControl from "../authcontrol/authcontrol";
import AuthButton from "../../ui/authbutton/authbutton";

import classes from "./authsignup.module.css";

const AuthSignup = () => {
  const submitHandler = () => {};

  const usernameOnChangeHandler = () => {};

  const emailAddressOnChangeHandler = () => {};

  const passwordOnChangeHandler = () => {};

  const formItems = [
    {
      key: 1,
      htmlFor: "username",
      id: "username",
      type: "text",
      content: "Username",
      placeholder: "doyerinde",
      onChangeHandler: usernameOnChangeHandler,
    },
    {
      key: 2,
      htmlFor: "emailaddress",
      id: "emailaddress",
      type: "text",
      content: "E-mail Address",
      placeholder: "oyerinde.daniel@mail.com",
      onChangeHandler: emailAddressOnChangeHandler,
    },
    {
      key: 3,
      htmlFor: "password",
      id: "password",
      type: "password",
      content: "Password",
      placeholder: "Your Password",
      onChangeHandler: passwordOnChangeHandler,
    },
    {
      key: 4,
      htmlFor: "confirmpassword",
      id: "confirmpassword",
      type: "password",
      content: "Confirm Password",
      placeholder: "Your Password",
      onChangeHandler: passwordOnChangeHandler,
    },
  ].map((formItem) => (
    <AuthForm
      key={formItem.key}
      htmlFor={formItem.htmlFor}
      id={formItem.id}
      content={formItem.content}
      onChange={formItem.onChangeHandler}
      placeholder={formItem.placeholder}
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
