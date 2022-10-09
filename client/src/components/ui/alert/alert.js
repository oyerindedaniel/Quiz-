import icons from "../../../assets/svg/SVG/sprite.svg";

import classes from "./alert.module.css";

const Alert = ({ children, img1, img2, alertType }) => {
  return (
    <div
      className={`${classes.alert} ${
        alertType === "success" ? classes.alertSuccess : classes.alertError
      }`}
    >
      <svg
        className={`${
          alertType === "success" ? classes.svgSuccess : classes.svgError
        }`}
      >
        {alertType === "success" && (
          <use xlinkHref={`${icons}#icon-checkmark`}></use>
        )}
        {alertType === "error" && <use xlinkHref={`${icons}#icon-error`}></use>}
      </svg>
      <img className={`${classes.alertImg}`} src={img1} alt="img 1" />
      <p>{children}</p>
      <img className={`${classes.alertImg}`} src={img2} alt="img 2" />
    </div>
  );
};

export default Alert;
