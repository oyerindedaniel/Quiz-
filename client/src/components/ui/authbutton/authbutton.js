import { useContext } from "react";

import AuthContext from "../../../contexts/auth-context";

import classes from "./authbutton.module.css";

const AuthButton = ({ children, type, className }) => {
  const ctx = useContext(AuthContext);

  return (
    <button
      type={type}
      className={`${
        ctx.loggingInStatus !== "pending"
          ? classes.buttonNormal
          : classes.buttonPending
      } ${classes.button} ${className}`}
      disabled={false}
    >
      {children}
    </button>
  );
};

export default AuthButton;
