import { useRef } from "react";
import { useNavigate } from "react-router-dom";

import { useGlobalStoreContext } from "../../contexts/global-context";
import icons from "../../assets/svg/SVG/sprite.svg";

import { Oval } from "react-loader-spinner";

import classes from "./quizmodalformquiz.module.css";

const QuizModalFormQuiz = ({
  quizName,
  noOfQuestion,
  loading,
  error,
  onDisplayModalHandler,
  uploadQuizName,
  startQuizHandler,
}) => {
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
      type: "SET_LOCAL-TIME-DURATION",
      payload: timeDuration,
    });

    setTimeout(() => {
      navigate(`/quiz/${quizName.split(" ").join("-")}`, { replace: true });
    }, 250);
  };

  const tryAgainFunction = () => {
    startQuizHandler(uploadQuizName, "retry");
  };

  return (
    <div className={`${classes.aboutQuiz}`}>
      <div
        className={`${classes.aboutQuizLoad} ${
          loading && classes.aboutQuizLoadPending
        } ${!loading && !error && classes.aboutQuizLoadCompleted} ${
          !loading && error && classes.aboutQuizLoadError
        }`}
      >
        {loading && (
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
        {!loading && !error && (
          <svg className={`${classes.aboutQuizLoadSvgCompleted}`}>
            <use xlinkHref={`${icons}#icon-checkmark`}></use>
          </svg>
        )}
        {!loading && error && (
          <svg className={`${classes.aboutQuizLoadSvgError}`}>
            <use xlinkHref={`${icons}#icon-error_outline`}></use>
          </svg>
        )}
        <span
          className={`${classes.aboutQuizLoadText} ${
            error && classes.errorCursor
          }`}
          onClick={error && tryAgainFunction}
        >
          {loading && "Writing Quiz Data"}
          {!loading && !error && "Done"}
          {error && !loading && "Try Again"}
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
            <button type="button" onClick={onDisplayModalHandler}>
              Cancel
            </button>
            <button disabled={loading || error}>Start Quiz</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuizModalFormQuiz;
