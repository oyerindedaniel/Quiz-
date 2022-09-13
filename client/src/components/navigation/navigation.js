import { Fragment } from "react";
import { Link } from "react-router-dom";

import avatarImg from "../../assets/img/smile.png";

import classes from "./navigation.module.css";

const Navigation = () => {
  return (
    <Fragment>
      <nav className={`${classes.nav}`}>
        <div className={`${classes.h1}`}>
          <Link to="/">Quiz!</Link>
        </div>
        <ul className={`${classes.accountControlContainer}`}>
          <li className={`${classes.accountControl}`}>
            <img
              className={`${classes.accountAvatar}`}
              src={avatarImg}
              alt="default avatar"
            />
            <Link to="/me" className={`${classes.accountName}`}>
              doyerinde
            </Link>
          </li>
        </ul>
        <ul className={`${classes.accountControlItems}`}>
          <li>
            <Link
              to="/me"
              className={`${classes.accountControlItem} ${classes.accountControlItem1}`}
            >
              Profile
            </Link>
          </li>
          <hr className={`${classes.accountControlItemHr}`} />
          <li>
            <Link
              to="/account"
              className={`${classes.accountControlItem} ${classes.accountControlItem2}`}
            >
              Account Settings
            </Link>
          </li>
          <li>
            <Link
              to="/signout"
              className={`${classes.accountControlItem} ${classes.accountControlItem3}`}
            >
              Sign out
            </Link>
          </li>
        </ul>
      </nav>
    </Fragment>
  );
};

export default Navigation;
