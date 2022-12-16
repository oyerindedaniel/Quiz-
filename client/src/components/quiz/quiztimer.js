import { useEffect, useCallback } from "react";

import { useGlobalStoreContext } from "../../contexts/global-context";
import { useDataStoreContext } from "../../contexts/data-context";

import useTimer from "../../hooks/use-timer";

import classes from "./quiztimer.module.css";

const QuizTimer = () => {
  const { state: globalState } = useGlobalStoreContext();
  const { state: dataState, dispatch: dataDispatch } = useDataStoreContext();

  const setQuizDuration = useCallback(() => {
    let date = new Date(Date.now());
    let hours = dataState.isLocalTimeDuration
      ? dataState.hoursValue
      : globalState.user.timeDuration.hours;
    let minutes = dataState.isLocalTimeDuration
      ? dataState.minutesValue
      : globalState.user.timeDuration.minutes;
    let seconds = dataState.isLocalTimeDuration
      ? dataState.secondsValue
      : globalState.user.timeDuration.seconds;
    date.setHours(
      date.getHours() + hours,
      date.getMinutes() + minutes,
      date.getSeconds() + seconds
    );
    return date.getTime();
  }, [
    globalState.user.timeDuration.hours,
    globalState.user.timeDuration.minutes,
    globalState.user.timeDuration.seconds,
    dataState.isLocalTimeDuration,
    dataState.minutesValue,
    dataState.hoursValue,
    dataState.secondsValue,
  ]);

  const { timer, timerFunction } = useTimer(setQuizDuration);

  useEffect(() => {
    let timerInterval;
    if (Object.keys(dataState.quizScore).length !== 0)
      return clearInterval(timerInterval);

    timerInterval = setInterval(timerFunction, 1000);

    if (timer?.distance < 0) {
      dataDispatch({
        type: "SET_IS-SUBMITTED",
        payload: { bool: true, why: "timeDurationFinished" },
      });
      return clearInterval(timerInterval);
    }

    return () => clearInterval(timerInterval);
  }, [timerFunction, timer?.distance, dataState.quizScore, dataDispatch]);

  return (
    <div className={`${classes.quizTimer}`}>
      <span className={`${classes.quizTime}`}>{timer?.hours || 0}</span>
      <span className={`${classes.quizTime}`}>{timer?.minutes || 0}</span>
      <span className={`${classes.quizTime}`}>{timer?.seconds || 0}</span>
    </div>
  );
};
export default QuizTimer;
