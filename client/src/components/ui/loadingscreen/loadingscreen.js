import { ThreeDots } from "react-loader-spinner";

import classes from "./loadingscreen.module.css";

const LoadingScreen = () => {
  return (
    <div className={`${classes.loadingScreen}`}>
      <h1 className={`${classes.h1}`}>Quiz!</h1>
      <div className={`${classes.threeDots}`}>
        <ThreeDots
          height="50"
          width="50"
          radius="9"
          color="#6ea6fd"
          ariaLabel="three-dots-loading"
          visible={true}
        />
      </div>
    </div>
  );
};

export default LoadingScreen;
