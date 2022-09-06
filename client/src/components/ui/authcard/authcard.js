import classes from "./authcard.module.css";

const AuthCard = ({ children }) => {
  return <div className={`${classes.card}`}>{children}</div>;
};

export default AuthCard;
