import { Link } from "react-router-dom";

import classes from "./navigationmain.module.css";

const NavigationMain = () => {
  return (
    <nav className={`${classes.nav}`}>
      <div className={`${classes.navH1}`}>
        <Link to="/">Quiz!</Link>
      </div>
      <ul className={`${classes.navLinks}`}>
        <li>
          <Link
            to="/login"
            className={`${classes.navLink} ${classes.navLink1}`}
          >
            Log in
          </Link>
        </li>
        <li>
          <Link
            to="/signup"
            className={`${classes.navLink} ${classes.navLink2}`}
          >
            Sign up
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavigationMain;
