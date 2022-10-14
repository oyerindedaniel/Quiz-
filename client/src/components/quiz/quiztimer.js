import { useEffect, useContext, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

import AuthContext from "../../contexts/auth-context";

import useTimer from "../../hooks/use-timer";

import classes from "./quiztimer.module.css";

const QuizTimer = () => {
  const [timeoutIntervalFunction, setTimeoutIntervalFunction] = useState(null);

  const { timeDurationValues } = useContext(AuthContext);
  const navigate = useNavigate();

  const setQuizDuration = useCallback(() => {
    let date = new Date(timeDurationValues.dateNow);
    date.setHours(
      date.getHours() + timeDurationValues.hoursValue,
      date.getMinutes() + timeDurationValues.minutesValue,
      date.getSeconds() + timeDurationValues.secondsValue
    );
    return date.getTime();
  }, [timeDurationValues]);

  const { timer, timerFunction } = useTimer(setQuizDuration);

  useEffect(() => {});

  useEffect(() => {
    let timerInterval = setInterval(timerFunction, 1000);
    setTimeoutIntervalFunction(timerInterval);
  }, [timerFunction]);

  if (timer?.distance < 0) {
    clearInterval(timeoutIntervalFunction);
    navigate("/home", { replace: true });
  }

  return (
    <div className={`${classes.quizTimer}`}>
      <span className={`${classes.quizTime}`}>{timer?.hours || 0}</span>
      <span className={`${classes.quizTime}`}>{timer?.minutes || 0}</span>
      <span className={`${classes.quizTime}`}>{timer?.seconds || 0}</span>
    </div>
  );
};
export default QuizTimer;
