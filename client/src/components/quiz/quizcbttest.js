import { Fragment, useState, useContext, useEffect, useRef } from "react";
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
  const [answerChecked, setAnswerChecked] = useState([]);

  const { myQuizData } = useContext(AuthContext);

  const ref = useRef([]);

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
    if (questionCount < 1) return console.log("yeah less");

    ref.current
      .filter((input) => input)
      .forEach((input) => {
        input.checked = false;
      });

    setQuestionCount((prevQuestionCountState) => prevQuestionCountState - 1);
  };

  const nextQuestionChangeHandler = () => {
    if (questionCount > quizData.length) return;

    ref.current
      .filter((input) => input)
      .forEach((input) => {
        input.checked = false;
      });

    setQuestionCount((prevQuestionCountState) => prevQuestionCountState + 1);
  };

  const submitQuizHandler = () => {};

  let options;
  let question;
  let correctAnswer;

  const selectAnswerOnClickHandler = (e) => {
    console.log(e.target.dataset["id"]);
    if (correctAnswer?.length > 1) {
      const correctAnswerLength = correctAnswer.split(",").length;
      const checkedOptions = ref.current.filter(
        (input) => input && input.checked
      );

      if (checkedOptions?.length === correctAnswerLength) {
        ref.current
          .filter((input) => input && !input.checked)
          .forEach((input) => {
            input.disabled = true;
          });
      }

      if (
        checkedOptions.length < correctAnswerLength &&
        checkedOptions.length !== correctAnswerLength
      ) {
        console.log(ref.current);
        ref.current
          .filter((input) => input)
          .forEach((input) => {
            input.disabled = false;
          });
      }

      return "A";
    }

    return setAnswerChecked((prevAnswerChecked) => {
      if (prevAnswerChecked.length === 0)
        return [
          {
            questionCount,
            question,
            correctAnswer: correctAnswer,
            yourAnswer: +e.target.dataset["id"],
            isCorrect: +e.target.dataset["id"] === correctAnswer,
          },
        ];

      const filterPrevAnswerChecked = prevAnswerChecked.filter(
        (e) => +e.questionCount !== questionCount
      );

      return [
        ...filterPrevAnswerChecked,
        {
          questionCount,
          question,
          correctAnswer: correctAnswer,
          yourAnswer: +e.target.dataset["id"],
          isCorrect: +e.target.dataset["id"] === correctAnswer,
        },
      ];
    });
  };

  console.log(answerChecked);

  if (quizData) {
    const filterArrayQuizKeys = (quizKeysData) => {
      question = quizKeysData[0];
      correctAnswer = quizKeysData.pop();
      quizKeysData.shift();
      return quizKeysData;
    };

    options = filterArrayQuizKeys(Object.values(quizData[questionCount - 1]))
      .filter((filterAnswerItem) => filterAnswerItem)
      .map((option, i) => {
        return (
          <li key={i} className={`${classes.quizAnswerItem}`}>
            <label className={`${classes.quizAnswerLabel}`}>
              {option}
              <input
                type={correctAnswer?.length > 1 ? "checkbox" : "radio"}
                name="answer"
                onChange={selectAnswerOnClickHandler}
                data-id={i + 1}
                ref={(e) => {
                  ref.current[i] = e;
                }}
              />
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
          <h2 className={`${classes.quizQuestion}`}>{question}</h2>
          <ul>{options}</ul>
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
