import avatarImg from "../../assets/img/smile.png";

import classes from "./navigation.module.css";

const Navigation = () => {
  return (
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
  );
};

export default Navigation;
