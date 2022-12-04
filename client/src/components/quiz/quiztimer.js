import { useEffect, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useGlobalStoreContext } from "../../contexts/global-context";

import useTimer from "../../hooks/use-timer";

import toast from "react-hot-toast";

import classes from "./quiztimer.module.css";

const QuizTimer = () => {
  const [timeoutIntervalFunction, setTimeoutIntervalFunction] = useState(null);

  const { state, dispatch } = useGlobalStoreContext();
  const navigate = useNavigate();

  const setQuizDuration = useCallback(() => {
    if (!state.timeDuration) {
      navigate("/home", { replace: true });
      toast.error("Error start Quiz");
    }
    let date = new Date(state.timeDuration.dateNow);
    date.setHours(
      date.getHours() + state.timeDuration.hoursValue,
      date.getMinutes() + state.timeDuration.minutesValue,
      date.getSeconds() + state.timeDuration.secondsValue
    );
    return date.getTime();
  }, [state.timeDuration, navigate]);

  const { timer, timerFunction } = useTimer(setQuizDuration);

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
