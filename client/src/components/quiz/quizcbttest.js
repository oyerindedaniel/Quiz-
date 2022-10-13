import { Fragment, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Navigation from "../navigation/navigation";
import AuthButton from "../ui/authbutton/authbutton";
import QuizTimer from "./quiztimer";
import AuthContext from "../../contexts/auth-context";

import icons from "../../assets/svg/SVG/sprite.svg";

import classes from "./quizcbttest.module.css";

const QuizCbtTest = () => {
  const [questionCount, setQuestionCount] = useState(1);
  const [quizData, setQuizData] = useState(null);

  const {
    myQuizData: { data },
  } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      setQuizData(data);
    }

    if (!data) {
      navigate("/home", { replace: true });
    }
  }, [data, navigate]);

  const previousQuestionChangeHandler = () => {
    console.log("previous");
  };

  const nextQuestionChangeHandler = () => {};

  const question = "What is your ideal Workplace?";

  return (
    <Fragment>
      <Navigation isAccountControlNeeded="false" />
      <main className={`${classes.main}`}>
        <Fragment>
          <QuizTimer />
        </Fragment>
        <div className={`${classes.mainQuiz}`}>
          <h4 className={`${classes.quizQuestionCount}`}>
            QUESTION {`${questionCount}/${quizData?.length}`}
          </h4>
          <h2 className={`${classes.quizQuestion}`}>{question}</h2>
          <ul>
            <li className={`${classes.quizAnswerItem}`}>
              <label className={`${classes.quizAnswerLabel}`}>
                A place where people don't question my authority.
                <input type="radio" name="radio" />
                <span className={`${classes.quizAnswerCheckmark}`}></span>
              </label>
            </li>
            <li className={`${classes.quizAnswerItem}`}>
              <label className={`${classes.quizAnswerLabel}`}>
                Wherever my best friends are, that's where I want to be.
                <input type="radio" name="radio" />
                <span className={`${classes.quizAnswerCheckmark}`}></span>
              </label>
            </li>
            <li className={`${classes.quizAnswerItem}`}>
              <label className={`${classes.quizAnswerLabel}`}>
                One where everyone pushes themselves to do their best every
                single day.
                <input type="radio" name="radio" />
                <span className={`${classes.quizAnswerCheckmark}`}></span>
              </label>
            </li>
            <li className={`${classes.quizAnswerItem}`}>
              <label className={`${classes.quizAnswerLabel}`}>
                A place where I'm the CEO.
                <input type="radio" name="radio" />
                <span className={`${classes.quizAnswerCheckmark}`}></span>
              </label>
            </li>
          </ul>
          <form className={classes.quizButtonContainer}>
            <AuthButton
              onClickHandler={previousQuestionChangeHandler}
              className={`${classes.button}`}
              type="button"
            >
              <span>Previous Question</span>
              <svg className={`${classes.svgQuestionChange}`}>
                <use xlinkHref={`${icons}#icon-arrow-thin-left`}></use>
              </svg>
            </AuthButton>
            <AuthButton
              onClickHandler={nextQuestionChangeHandler}
              className={`${classes.button}`}
              type="button"
            >
              <span>Next Question</span>
              <svg className={`${classes.svgQuestionChange}`}>
                <use xlinkHref={`${icons}#icon-arrow-thin-right`}></use>
              </svg>
            </AuthButton>
          </form>
        </div>
      </main>
    </Fragment>
  );
};

export default QuizCbtTest;
