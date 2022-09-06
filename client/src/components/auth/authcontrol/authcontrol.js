import { Link } from "react-router-dom";

import classes from "./authcontrol.module.css";

const AuthControl = () => {
  return (
    <div className={`${classes.authControl}`}>
      <Link to="/login" className={`${classes.authControl1}`}>
        Login
      </Link>
      <Link to="/signup" className={`${classes.authControl2}`}>
        Sign up
      </Link>
    </div>
  );
};

export default AuthControl;
