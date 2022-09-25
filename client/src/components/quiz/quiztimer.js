import useTimer from "../../hooks/use-timer";

import classes from "./quiztimer.module.css";

const QuizTimer = () => {
  const setQuizDuration = () => {
    let date = new Date();
    date.setHours(
      date.getHours() + 2,
      date.getMinutes() + 30,
      date.getSeconds() + 0
    );
    return date;
  };
  const {} = useTimer(setQuizDuration);

  return (
    <div className={`${classes.quizTimer}`}>
      <span className={`${classes.quizTime}`}>2</span>
      <span className={`${classes.quizTime}`}>30</span>
      <span className={`${classes.quizTime}`}>00</span>
    </div>
  );
};

export default QuizTimer;
