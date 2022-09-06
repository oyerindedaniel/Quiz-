import { Link } from "react-router-dom";

import AuthCard from "../../ui/authcard/authcard";
import AuthForm from "../authform/authform";
import AuthControl from "../authcontrol/authcontrol";
import AuthButton from "../../ui/authbutton/authbutton";

import classes from "./authlogin.module.css";

const AuthLogin = () => {
  const submitHandler = () => {};

  const emailAddressOnChangeHandler = () => {
    console.log("email changed");
  };

  const passwordOnChangeHandler = () => {};

  const formItems = [
    {
      key: 1,
      htmlFor: "emailaddress",
      id: "emailaddress",
      type: "text",
      content: "E-mail Address",
      placeholder: "oyerinde.daniel@mail.com",
      onChangeHandler: emailAddressOnChangeHandler,
    },
    {
      key: 2,
      htmlFor: "password",
      id: "password",
      type: "password",
      content: "Password",
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
          <Link to="/reset-password" className={`${classes.authReset}`}>
            Reset Password
          </Link>
        </div>
        <div className="form-actions">
          <AuthButton>Login</AuthButton>
        </div>
      </form>
    </AuthCard>
  );
};

export default AuthLogin;
