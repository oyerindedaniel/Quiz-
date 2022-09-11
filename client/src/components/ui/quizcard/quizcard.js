import classes from "./quizcard.module.css";

const QuizCard = ({ children, className }) => {
  const quizCard = `${classes.quizCard} ${className}`;

  return <div className={quizCard}>{children}</div>;
};

export default QuizCard;
