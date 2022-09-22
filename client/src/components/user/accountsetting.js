import { Fragment } from "react";

import AuthForm from "../auth/authform/authform";
import Navigation from "../navigation/navigation";

import classes from "./accountsetting.module.css";

const AccountSetting = () => {
  const formItems = [
    {
      key: 1,
      htmlFor: "username",
      id: "username",
      type: "text",
      value: "",
      label: "Username",
      placeholder: "doyerinde",
      onChangeHandler: "",
      onBlurHandler: "",
      errorValue: "Username may only contain alphanumeric characters",
      hasError: "",
    },
    {
      key: 2,
      htmlFor: "emailaddress",
      id: "emailaddress",
      type: "email",
      value: "",
      label: "E-mail Address",
      placeholder: "oyerinde.daniel@mail.com",
      onChangeHandler: "",
      onBlurHandler: "",
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

  return (
    <Fragment>
      <Navigation isAccountControlNeeded="true" />
      <main>
        <div></div>
      </main>
    </Fragment>
  );
};

export default AccountSetting;
