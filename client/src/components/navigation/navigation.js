import { Fragment } from "react";
import { Link } from "react-router-dom";

import avatarImg from "../../assets/img/smile.png";

import classes from "./navigation.module.css";

const Navigation = () => {
  return (
    <Fragment>
      <nav className={`${classes.nav}`}>
        <h1 className={`${classes.h1}`}>Quiz!</h1>
        <div className={`${classes.accountControl}`}>
          <img
            className={`${classes.accountAvatar}`}
            src={avatarImg}
            alt="default avatar"
          />
          <span className={`${classes.accountName}`}>doyerinde</span>
        </div>
      </nav>
      {/* <ul className={`${classes.accountControlItems}`}>
        <li>
          <Link to="/me" className={`${classes.accountControlItem}`}>
            Profile
          </Link>
        </li>
        <li>
          <Link to="/account" className={`${classes.accountControlItem}`}>
            Account Settings
          </Link>
        </li>
        <li>
          <Link to="/signout" className={`${classes.accountControlItem}`}>
            Sign out
          </Link>
        </li>
      </ul> */}
    </Fragment>
  );
};

export default Navigation;
