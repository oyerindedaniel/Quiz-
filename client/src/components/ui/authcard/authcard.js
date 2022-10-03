import classes from "./authcard.module.css";

const AuthCard = ({ children }) => {
  return (
    <section className={`${classes.cardContainer}`}>
      <div className={`${classes.card}`}>{children}</div>
    </section>
  );
};

export default AuthCard;
