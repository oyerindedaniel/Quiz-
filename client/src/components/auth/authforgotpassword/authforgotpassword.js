import classes from "./authforgotpassword.module.css";

import AuthForm from "../authform/authform";
import AuthCard from "../../ui/authcard/authcard";
import AuthButton from "../../ui/authbutton/authbutton";
import AuthControl from "../authcontrol/authcontrol";

const AuthForgotPassword = () => {
  const submitHandler = () => {};
  const emailAddressOnChangeHandler = () => {
    console.log("email changed");
  };

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
        Please fill in the email you've used to create a Camel Cloud account and
        we'll send you a reset link
      </h3>
      <AuthControl />
      <form onSubmit={submitHandler}>
        <div>{formItems}</div>
        <div>
          <AuthButton>Reset my Password</AuthButton>
        </div>
      </form>
    </AuthCard>
  );
};

export default AuthForgotPassword;
