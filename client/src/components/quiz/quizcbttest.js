import { Fragment, useState, useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import AuthButton from "../ui/button/button";
import QuizTimer from "./quiztimer";
import { useGlobalStoreContext } from "../../contexts/global-context";

import icons from "../../assets/svg/SVG/sprite.svg";

import classes from "./quizcbttest.module.css";

const QuizCbtTest = () => {
  const { state } = useGlobalStoreContext();

  const [questionCount, setQuestionCount] = useState(1);
  const [quizLength, setQuizLength] = useState(null);
  const [quizData, setQuizData] = useState(null);
  const [answerChecked, setAnswerChecked] = useState([]);
  const [change, setChange] = useState(0);

  const ref = useRef([]);

  console.log(ref.current);

  const navigate = useNavigate();

  useEffect(() => {
    if (!state.quizQuestion) {
      navigate("/home", { replace: true });
    }

    if (state.quizQuestion) {
      setQuizData(state.quizQuestion);
      setQuizLength(state.quizQuestion.length);
    }
  }, [state.quizQuestion, navigate]);

  const areArrEqual = (arr1, arr2) => {
    if (arr1.length === arr2.length) {
      return arr1.every((el, i) => {
        if (el === arr2[i]) return true;
        return false;
      });
    }
    return false;
  };

  const prevNextRenderAnswer = (sign) => {
    ref.current
      .filter((input) => input)
      .forEach((input) => {
        input.checked = false;
        input.disabled = false;
      });

    let foundAnswer;

    if (sign === "add")
      foundAnswer = answerChecked.find(
        (i) => i.questionCount === questionCount + 1
      );

    if (sign === "sub")
      foundAnswer = answerChecked.find(
        (i) => i.questionCount === questionCount - 1
      );

    console.log(foundAnswer);

    if (answerChecked && foundAnswer) {
      if (foundAnswer.correctAnswer.toString().length === 1) {
        const foundAnswerIndex = foundAnswer?.yourAnswer - 1;
        ref.current[foundAnswerIndex].checked = true;

        setChange(foundAnswerIndex);
      }

      if (foundAnswer.correctAnswer.length > 1) {
        const foundAnswerArr = foundAnswer.yourAnswer;
        foundAnswerArr.forEach((answerIndex) => {
          ref.current[answerIndex - 1].checked = true;
        });
      }
    }
  };

  const previousQuestionChangeHandler = () => {
    if (questionCount < 1) return;

    prevNextRenderAnswer("sub");

    setQuestionCount((prevQuestionCountState) => prevQuestionCountState - 1);
  };

  const nextQuestionChangeHandler = () => {
    if (questionCount > quizData.length) return;

    prevNextRenderAnswer("add");

    setQuestionCount((prevQuestionCountState) => prevQuestionCountState + 1);
  };

  const submitQuizHandler = () => {};

  let options;
  let question;
  let correctAnswer;

  const selectAnswerOnChangeHandler = (e) => {
    console.log(e.target.dataset["id"]);

    setAnswerChecked((prevAnswerChecked) => {
      if (correctAnswer?.length > 1) {
        const correctAnswerArr = correctAnswer.split(",").map((i) => +i);
        const checkedOptions = ref.current.filter(
          (input) => input && input.checked
        );

        if (checkedOptions?.length === correctAnswerArr.length) {
          ref.current
            .filter((input) => input && !input.checked)
            .forEach((input) => {
              input.disabled = true;
            });
        }

        if (
          checkedOptions.length < correctAnswerArr.length &&
          checkedOptions.length !== correctAnswerArr.length
        ) {
          ref.current
            .filter((input) => input)
            .forEach((input) => {
              input.disabled = false;
            });
        }

        const yourAnswer = ref.current
          .filter((input) => input && input.checked)
          .map((input) => +input.dataset["id"]);

        if (prevAnswerChecked.length === 0)
          return [
            {
              questionCount,
              question,
              correctAnswer: correctAnswerArr,
              yourAnswer,
              isCorrect: areArrEqual(yourAnswer, correctAnswerArr),
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
            correctAnswer: correctAnswerArr,
            yourAnswer,
            isCorrect: areArrEqual(yourAnswer, correctAnswerArr),
          },
        ];
      }

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
                key={i}
                type={
                  correctAnswer?.toString().length === 1 ? "radio" : "checkbox"
                }
                name={
                  correctAnswer?.toString().length === 1
                    ? "answer"
                    : `answer${i + 1}`
                }
                onChange={selectAnswerOnChangeHandler}
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
