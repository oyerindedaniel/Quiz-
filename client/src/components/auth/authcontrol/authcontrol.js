import { NavLink } from "react-router-dom";

import classes from "./authcontrol.module.css";

const AuthControl = () => {
  let activeStyle = {
    border: ".2rem solid var(--color-blue-4)",
  };

  let notActiveStyle = {
    border: "0.1rem solid var(--color-grey-1)",
  };

  return (
    <div className={`${classes.authControl} `}>
      <NavLink
        to="/login"
        style={({ isActive }) => (isActive ? activeStyle : notActiveStyle)}
        className={`${classes.authControl0} ${classes.authControl1}`}
      >
        Login
      </NavLink>
      <NavLink
        to="/signup"
        style={({ isActive }) => (isActive ? activeStyle : notActiveStyle)}
        className={`${classes.authControl0} ${classes.authControl2}`}
      >
        Sign up
      </NavLink>
    </div>
  );
};

export default AuthControl;
