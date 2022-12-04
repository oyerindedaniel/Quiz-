import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useGlobalStoreContext } from "../../contexts/global-context";
import icons from "../../assets/svg/SVG/sprite.svg";

import { Oval } from "react-loader-spinner";

import classes from "./quizmodalformquiz.module.css";

const QuizModalFormQuiz = ({ quizName, noOfQuestion, loadingState }) => {
  const { dispatch } = useGlobalStoreContext();

  const navigate = useNavigate();

  const hoursInputRef = useRef();
  const minutesInputRef = useRef();
  const secondsInputRef = useRef();

  const onSubmitHandler = (e) => {
    e.preventDefault();

    const hoursValue = +hoursInputRef.current.value;
    const minutesValue = +minutesInputRef.current.value;
    const secondsValue = +secondsInputRef.current.value;

    const timeDuration = {
      hoursValue,
      minutesValue,
      secondsValue,
      dateNow: new Date(),
    };

    dispatch({
      type: "SET_TIME-DURATION",
      payload: timeDuration,
    });

    setTimeout(() => {
      navigate(`/quiz/${quizName}`, { replace: true });
    }, 250);
  };

  return (
    <div className={`${classes.aboutQuiz}`}>
      <div
        className={`${classes.aboutQuizLoad} ${
          loadingState && classes.aboutQuizLoadPending
        } ${!loadingState && classes.aboutQuizLoadCompleted}`}
      >
        {loadingState && (
          <Oval
            ariaLabel="loading-indicator"
            height={19}
            width={19}
            strokeWidth={10}
            strokeWidthSecondary={5}
            color="#dd6c20"
            secondaryColor="white"
          />
        )}
        {!loadingState && (
          <svg className={`${classes.aboutQuizLoadSvgCompleted}`}>
            <use xlinkHref={`${icons}#icon-checkmark`}></use>
          </svg>
        )}
        <span className={`${classes.aboutQuizLoadText}`}>
          {loadingState && "Writing Quiz Data"}
          {!loadingState && "Done"}
        </span>
      </div>
      <div className={`${classes.aboutQuizLoadAboutQuiz}`}>
        <h1>{quizName}</h1>
        <h3>{`${noOfQuestion} ${
          noOfQuestion === 1 ? "Question" : "Questions"
        }`}</h3>
      </div>
      <div className={`${classes.aboutQuizTime}`}>
        <div className={`${classes.aboutQuizTimeNote}`}>
          <p className={`${classes.aboutQuizTimeNoteP}`}>
            Time duration of Quiz (Maximum of 24 Hours)
          </p>
        </div>
        <form onSubmit={onSubmitHandler}>
          <div className={`${classes.aboutQuizTimeInsert}`}>
            <div className={`${classes.aboutQuizTimeInsertInputCont}`}>
              <input
                type="text"
                id="hours"
                name="hours"
                min="0"
                max="24"
                ref={hoursInputRef}
              />
              <span>Hours</span>
            </div>
            <div className={`${classes.aboutQuizTimeInsertInputCont}`}>
              <input
                type="text"
                id="minutes"
                name="minutes"
                ref={minutesInputRef}
              />
              <span>Minutes</span>
            </div>
            <div className={`${classes.aboutQuizTimeInsertInputCont}`}>
              <input
                type="text"
                id="seconds"
                name="seconds"
                ref={secondsInputRef}
              />
              <span>Seconds</span>
            </div>
          </div>
          <div className={classes.modalActions}>
            <button type="button" onClick="">
              Cancel
            </button>
            <button className={classes.submit} disabled={loadingState}>
              Start Quiz
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuizModalFormQuiz;
