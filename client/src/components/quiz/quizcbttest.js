import { Fragment } from "react";

import Navigation from "../navigation/navigation";
import AuthButton from "../ui/authbutton/authbutton";
import QuizTimer from "./quiztimer";

import icons from "../../assets/svg/SVG/sprite.svg";

import classes from "./quizcbttest.module.css";

const QuizCbtTest = () => {
  const currentQuizNo = 1;
  const totalQuizNo = 100;
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
            QUESTION {`${currentQuizNo}/${totalQuizNo}`}
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
            <AuthButton className={`${classes.button}`} type="button">
              <span>Previous Question</span>
              <svg className={`${classes.svgQuestionChange}`}>
                <use xlinkHref={`${icons}#icon-arrow-thin-left`}></use>
              </svg>
            </AuthButton>
            <AuthButton className={`${classes.button}`} type="button">
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
