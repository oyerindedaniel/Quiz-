import classes from "./button.module.css";

const Button = ({ children, type, className, status, onClickHandler }) => {
  return (
    <button
      type={type}
      className={`${!status ? classes.buttonNormal : classes.buttonPending} ${
        classes.button
      } ${className}`}
      disabled={false}
      onClick={onClickHandler}
    >
      {children}
    </button>
  );
};

export default Button;
