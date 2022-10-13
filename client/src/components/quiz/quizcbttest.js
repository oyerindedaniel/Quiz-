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
  const [quizLength, setQuizLength] = useState(null);
  const [quizData, setQuizData] = useState(null);

  const { myQuizData } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (!myQuizData) {
      navigate("/home", { replace: true });
    }

    if (myQuizData) {
      setQuizData(myQuizData.data);
      setQuizLength(myQuizData.data.length);
    }
  }, [myQuizData, navigate]);

  const previousQuestionChangeHandler = () => {
    if (questionCount < 1) return;

    setQuestionCount((prevQuestionCountState) => prevQuestionCountState - 1);
  };

  const nextQuestionChangeHandler = () => {
    if (questionCount > quizData.length) return;

    setQuestionCount((prevQuestionCountState) => prevQuestionCountState + 1);
  };

  const submitQuizHandler = () => {};

  let answerItems;
  let questionItem;
  if (quizData) {
    const filterArrayQuizKeys = (quizKeysData) => {
      questionItem = quizKeysData[0];
      quizKeysData.pop();
      quizKeysData.shift();
      return quizKeysData;
    };

    answerItems = filterArrayQuizKeys(
      Object.values(quizData[questionCount - 1])
    )
      .filter((filterAnswerItem) => filterAnswerItem)
      .map((answerItem) => {
        return (
          <li className={`${classes.quizAnswerItem}`}>
            <label className={`${classes.quizAnswerLabel}`}>
              {answerItem}
              <input type="radio" name="radio" />
              <span className={`${classes.quizAnswerCheckmark}`}></span>
            </label>
          </li>
        );
      });
  }

  return (
    <Fragment>
      <Navigation isAccountControlNeeded="false" />
      <main className={`${classes.main}`}>
        <Fragment>
          <QuizTimer />
        </Fragment>
        <div className={`${classes.mainQuiz}`}>
          <h4 className={`${classes.quizQuestionCount}`}>
            QUESTION {`${questionCount}/${quizLength}`}
          </h4>
          <h2 className={`${classes.quizQuestion}`}>{questionItem}</h2>
          <ul>{answerItems}</ul>
          <form className={classes.quizButtonContainer}>
            {questionCount > 1 && (
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
            )}
            {questionCount < quizLength && (
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
            )}
            {questionCount === quizLength && (
              <AuthButton
                onClickHandler={submitQuizHandler}
                className={`${classes.button}`}
                type="button"
              >
                <span>Submit</span>
                {/* <svg className={`${classes.svgQuestionChange}`}>
                <use xlinkHref={`${icons}#icon-arrow-thin-right`}></use>
              </svg> */}
              </AuthButton>
            )}
          </form>
        </div>
      </main>
    </Fragment>
  );
};

export default QuizCbtTest;
