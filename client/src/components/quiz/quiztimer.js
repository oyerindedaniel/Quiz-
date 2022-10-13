import { useEffect, useContext } from "react";

import AuthContext from "../../contexts/auth-context";

import useTimer from "../../hooks/use-timer";

import classes from "./quiztimer.module.css";

const QuizTimer = () => {
  const { timeDurationValues } = useContext(AuthContext);

  const setQuizDuration = () => {
    let date = new Date();
    date.setHours(
      date.getHours() + timeDurationValues?.hoursValue,
      date.getMinutes() + timeDurationValues?.minutesValue,
      date.getSeconds() + timeDurationValues?.secondsValue
    );
    return date.getTime();
  };

  const { timer, timerFunction } = useTimer(setQuizDuration);

  useEffect(() => {
    timerFunction();
  }, [timerFunction]);

  if (timer) {
    console.log(timer[0], timer[1], timer[2]);
  }

  return (
    <div className={`${classes.quizTimer}`}>
      {/* <span className={`${classes.quizTime}`}>{timer[0]}</span>
      <span className={`${classes.quizTime}`}>{timer[1]}</span>
      <span className={`${classes.quizTime}`}>{timer[2]}</span> */}
    </div>
  );
};

export default QuizTimer;
