import { ThreeDots } from "react-loader-spinner";

import classes from "./loadingscreen.module.css";

const LoadingScreen = () => {
  return (
    <div className={`${classes.loadingScreen}`}>
      <h1 className={`${classes.h1}`}>Quiz!</h1>
      <ThreeDots
        height="70"
        width="70"
        radius="9"
        color="#6ea6fd"
        ariaLabel="three-dots-loading"
        visible={true}
      />
    </div>
  );
};

export default LoadingScreen;
