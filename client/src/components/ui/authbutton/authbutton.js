import { useContext } from "react";

import AuthContext from "../../../contexts/auth-context";

import classes from "./authbutton.module.css";

const AuthButton = ({ children, type, className, status, onClickHandler }) => {
  return (
    <button
      type={type}
      className={`${
        status !== "pending" ? classes.buttonNormal : classes.buttonPending
      } ${classes.button} ${className}`}
      disabled={false}
      onClick={onClickHandler}
    >
      {children}
    </button>
  );
};

export default AuthButton;
