import { useContext } from "react";

import AuthContext from "../../../contexts/auth-context";

import classes from "./authbutton.module.css";

const AuthButton = ({ children, type, className, status }) => {
  return (
    <button
      type={type}
      className={`${
        status !== "pending" ? classes.buttonNormal : classes.buttonPending
      } ${classes.button} ${className}`}
      disabled={false}
    >
      {children}
    </button>
  );
};

export default AuthButton;
