import { useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { useGlobalStoreContext } from "../../contexts/global-context";

import useTimer from "../../hooks/use-timer";

import toast from "react-hot-toast";

import classes from "./quiztimer.module.css";

const QuizTimer = () => {
  const { state } = useGlobalStoreContext();
  const navigate = useNavigate();

  const setQuizDuration = useCallback(() => {
    if (!state.user.isTimeDuration && !state.timeDuration) {
      toast.error("No time duration set");
      return navigate("/home", { replace: true });
    }
    let date = new Date(state.timeDuration.dateNow);
    date.setHours(
      date.getHours() + state.timeDuration.hoursValue,
      date.getMinutes() + state.timeDuration.minutesValue,
      date.getSeconds() + state.timeDuration.secondsValue
    );
    return date.getTime();
  }, [state.timeDuration, state.user.isTimeDuration, navigate]);

  const { timer, timerFunction } = useTimer(setQuizDuration);

  useEffect(() => {
    if (!state.user.isTimeDuration && !state.timeDuration)
      return navigate("/home", { replace: true });
    let timerInterval = setInterval(timerFunction, 1000);

    if (timer?.distance < 0) {
      clearInterval(timerInterval);
      navigate("/home", { replace: true });
    }
  }, [
    timerFunction,
    state?.user?.isTimeDuration,
    navigate,
    timer?.distance,
    state?.timeDuration,
  ]);

  return (
    <div className={`${classes.quizTimer}`}>
      <span className={`${classes.quizTime}`}>{timer?.hours || 0}</span>
      <span className={`${classes.quizTime}`}>{timer?.minutes || 0}</span>
      <span className={`${classes.quizTime}`}>{timer?.seconds || 0}</span>
    </div>
  );
};
export default QuizTimer;
