import { useEffect, useCallback, useState } from "react";

import { useGlobalStoreContext } from "../../contexts/global-context";
import { useDataStoreContext } from "../../contexts/data-context";

import useTimer from "../../hooks/use-timer";

import classes from "./quiztimer.module.css";

const QuizTimer = () => {
  const { state: globalState } = useGlobalStoreContext();
  const { state: dataState, dispatch: dataDispatch } = useDataStoreContext();

  const [dateNow, setDateNow] = useState(new Date().getTime() + 2000);

  const setQuizDuration = useCallback(() => {
    let date = new Date(dateNow);
    let hours = globalState.timeDuration.isLocalTimeDuration
      ? +globalState.timeDuration.hoursValue
      : +globalState.user.timeDuration.hours;
    let minutes = globalState.timeDuration.isLocalTimeDuration
      ? +globalState.timeDuration.minutesValue
      : +globalState.user.timeDuration.minutes;
    let seconds = globalState.timeDuration.isLocalTimeDuration
      ? +globalState.timeDuration.secondsValue
      : +globalState.user.timeDuration.seconds;
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
    globalState.timeDuration.isLocalTimeDuration,
    globalState.timeDuration.minutesValue,
    globalState.timeDuration.hoursValue,
    globalState.timeDuration.secondsValue,
    dateNow,
  ]);

  const { timer, timerFunction } = useTimer(setQuizDuration);

  useEffect(() => {
    let timerInterval;

    if (timer?.distance <= 1000) {
      dataDispatch({
        type: "SET_IS-SUBMITTED",
        payload: { bool: true, why: "timeDurationFinished" },
      });
      return clearInterval(timerInterval);
    }

    timerInterval = setInterval(timerFunction, 1000);

    if (Object.keys(dataState.quizScore).length !== 0)
      return clearInterval(timerInterval);

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
