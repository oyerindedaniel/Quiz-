import classes from "./authbutton.module.css";

const AuthButton = ({ children }) => {
  return (
    <button className={`${classes.button}`} disabled={false}>
      {children}
    </button>
  );
};

export default AuthButton;
