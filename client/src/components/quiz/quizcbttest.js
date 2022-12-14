import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import Button from "../ui/button/button";
import QuizTimer from "./quiztimer";
import QuizModalSubmitted from "../quizmodalform/quizmodalsubmitted";

import { useDataStoreContext } from "../../contexts/data-context";
import { createQuizScore } from "../lib/api";
import useHttp from "../../hooks/use-http";

import toast from "react-hot-toast";

import icons from "../../assets/svg/SVG/sprite.svg";

import classes from "./quizcbttest.module.css";

const QuizCbtTest = () => {
  const { state, dispatch } = useDataStoreContext();

  let { quizName, quizId } = useParams();

  const { sendRequest, loading, error } = useHttp(
    createQuizScore,
    dispatch,
    "",
    "SET_QUIZ-SCORE",
    "",
    "Quiz submitted",
    "",
    "NAVIGATE",
    ""
  );

  const [questionCount, setQuestionCount] = useState(1);
  const [quizLength, setQuizLength] = useState(null);
  const [quizData, setQuizData] = useState(null);
  const [answerChecked, setAnswerChecked] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const ref = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!state.quizQuestion) {
      navigate("/home", { replace: true });
      toast.error("No quiz question found.");
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
    ref.current.forEach((input) => {
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

    if (answerChecked && foundAnswer) {
      if (foundAnswer.correctAnswer.toString().length === 1) {
        const foundAnswerIndex = foundAnswer?.yourAnswer - 1;
        ref.current[foundAnswerIndex].checked = true;
      }

      if (foundAnswer.correctAnswer.length >= 1) {
        const foundAnswerArr = foundAnswer.yourAnswer;
        foundAnswerArr.forEach((answerIndex) => {
          ref.current[+answerIndex - 1].checked = true;
        });
      }
    }
  };

  const previousQuestionChangeHandler = () => {
    if (questionCount < 1) return;

    setQuestionCount((prevQuestionCountState) => prevQuestionCountState - 1);

    prevNextRenderAnswer("sub");
  };

  const nextQuestionChangeHandler = () => {
    if (questionCount > quizData.length) return;

    setQuestionCount((prevQuestionCountState) => prevQuestionCountState + 1);

    prevNextRenderAnswer("add");
  };

  const submitQuizHandler = (e) => {
    e.preventDefault();

    let answer = 0;
    if (answerChecked) {
      answerChecked.forEach((ans) => {
        if (ans.isCorrect) answer += 1;
      });
    }

    const userSubmittedData = {
      quizName: quizName.split("-").join(" "),
      hasTaken: true,
      quizScore: !answerChecked ? 0 : Math.round((answer / quizLength) * 100),
      createdAt: Date.now(),
      quizId,
    };
    sendRequest(userSubmittedData);
  };

  const onDisplayModalHandler = () => {
    setShowModal((currentModalValue) => {
      return !currentModalValue;
    });
  };

  // useEffect(() => {
  //   if (!error && !loading) {
  //     console.log("here");
  //     setShowModal(false);
  //   }
  //   return;
  // }, [error, loading]);

  let options;
  let question;
  let correctAnswer;

  const selectAnswerOnChangeHandler = (e) => {
    // console.log(e.target.dataset["id"]);

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
  // console.log(ref.current);

  useEffect(() => {});

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
                name={
                  correctAnswer?.toString().length === 1
                    ? "answer"
                    : `answer${i}`
                }
                type={
                  correctAnswer?.toString().length === 1 ? "radio" : "checkbox"
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
    <>
      <main className={`${classes.main}`}>
        <>
          <QuizTimer />
        </>
        <div className={`${classes.mainQuiz}`}>
          <h4 className={`${classes.quizQuestionCount}`}>
            QUESTION {`${questionCount}/${quizLength}`}
          </h4>
          <h2 className={`${classes.quizQuestion}`}>{question}</h2>
          <ul>{options}</ul>
          <div className={classes.quizButtonContainer}>
            {questionCount > 1 && (
              <Button
                onClickHandler={previousQuestionChangeHandler}
                className={`${classes.button}`}
                type="button"
              >
                <span>Previous Question</span>
                <svg className={`${classes.svgQuestionChange}`}>
                  <use xlinkHref={`${icons}#icon-arrow-thin-left`}></use>
                </svg>
              </Button>
            )}
            {questionCount < quizLength && (
              <Button
                onClickHandler={nextQuestionChangeHandler}
                className={`${classes.button}`}
                type="button"
              >
                <span>Next Question</span>
                <svg className={`${classes.svgQuestionChange}`}>
                  <use xlinkHref={`${icons}#icon-arrow-thin-right`}></use>
                </svg>
              </Button>
            )}
            {questionCount === quizLength && (
              <Button
                className={classes.button}
                onClickHandler={() => setShowModal(true)}
              >
                Submit
              </Button>
            )}
          </div>
        </div>
      </main>
      <QuizModalSubmitted
        showModal={showModal}
        quizName={quizName}
        onDisplayModalHandler={onDisplayModalHandler}
        onSubmitHandler={submitQuizHandler}
        loading={loading}
      />
    </>
  );
};

export default QuizCbtTest;
