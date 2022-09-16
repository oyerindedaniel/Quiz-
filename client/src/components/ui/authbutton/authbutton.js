import classes from "./authbutton.module.css";

const AuthButton = ({ children, type, className }) => {
  return (
    <button
      type={type}
      className={`${classes.button} ${className}`}
      disabled={false}
    >
      {children}
    </button>
  );
};

export default AuthButton;
