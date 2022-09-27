import icons from "../../../assets/svg/SVG/sprite.svg";

import classes from "./alert.module.css";

const Alert = ({ children, img1, img2 }) => {
  return (
    <div className={`${classes.alert}`}>
      <svg className={`${classes.svgError}`}>
        <use xlinkHref={`${icons}#icon-error`}></use>
      </svg>
      <span>
        <img className={`${classes.alertImg}`} src={img1} alt="img 1" />
      </span>
      <p>{children}</p>
      <span>
        <img className={`${classes.alertImg}`} src={img2} alt="img 2" />
      </span>
    </div>
  );
};

export default Alert;
