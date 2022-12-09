import { Link } from "react-router-dom";

import { useGlobalStoreContext } from "../../../contexts/global-context";

import classes from "./navbar.module.css";

const Navbar = () => {
  const { state } = useGlobalStoreContext();
  return (
    <>
      <nav className={`${classes.nav}`}>
        <div className={`${classes.h1}`}>
          <Link to="/">Quiz!</Link>
        </div>
        {state.user.isAuthenticated && (
          <>
            <ul className={`${classes.accountControlContainer}`}>
              <li className={`${classes.accountControl}`}>
                <img
                  className={`${classes.accountAvatar}`}
                  src={state.profilePicture}
                  alt="default avatar"
                />
                <Link to="/me" className={`${classes.accountName}`}>
                  {state.user.username}
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
                  to="/account/settings"
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
          </>
        )}
      </nav>
    </>
  );
};

export default Navbar;
