import { Fragment } from "react";

import classes from "./profile.module.css";

const Profile = () => {
  return (
    <Fragment>
      <main className={`${classes.main}`}>
        <h1 className={`${classes.h1}`}>Profile</h1>
      </main>
    </Fragment>
  );
};

export default Profile;
