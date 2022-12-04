import { useContext, Fragment, useState } from "react";

import useHttp from "../../hooks/use-http";
import { getQuizData } from "../lib/api";

import { useGlobalStoreContext } from "../../contexts/global-context";

import AddQuizModal from "../ui/modal/addquizmodal";
import QuizModalFormQuiz from "../quizmodalform/quizmodalformquiz";

import classes from "./quizitem.module.css";

const QuizItem = ({ imgSrc, quizName, numberOfQuestion, uploadQuizName }) => {
  const { dispatch } = useGlobalStoreContext();

  const { sendRequest, loading } = useHttp(
    getQuizData,
    dispatch,
    "",
    "SET_QUIZ-QUESTION",
    "",
    "",
    "",
    ""
  );

  const [showModal, setShowModal] = useState(false);

  const onDisplayModalHandler = () => {
    setShowModal((currentModalValue) => {
      return !currentModalValue;
    });
  };

  const startQuizHandler = (uploadQuizName) => {
    onDisplayModalHandler();

    const userSubmittedData = {
      excelName: uploadQuizName,
    };

    sendRequest(userSubmittedData);
  };

  return (
    <Fragment>
      <div
        onClick={startQuizHandler.bind(null, uploadQuizName)}
        className={`${classes.quizItem}`}
      >
        <div className={`${classes.quizItemImgContainer}`}>
          <img
            className={`${classes.quizItemImg}`}
            src={imgSrc}
            alt="Default"
          />
        </div>
        <div className={`${classes.quizItemCaptionContainer}`}>
          <span className={`${classes.quizItemCaptionName}`}>{quizName}</span>
          <span className={`${classes.quizItemCaptionQuestionNo}`}>
            {`${numberOfQuestion} ${
              numberOfQuestion > 1 ? "Questions" : "Question"
            }`}
          </span>
        </div>
      </div>
      {showModal && (
        <AddQuizModal onDisplayModalHandler={onDisplayModalHandler}>
          <h2 className={`${classes.modalH2Text}`}>Quiz Description</h2>
          <p className={`${classes.modalTextP}`}>
            * The time duration box must be filled up before each quiz, however
            you may establish a permanent setting on the profile page to prevent
            having to do so.
          </p>
          <QuizModalFormQuiz
            quizName={quizName}
            noOfQuestion={numberOfQuestion}
            loadingState={loading}
          />
        </AddQuizModal>
      )}
    </Fragment>
  );
};

export default QuizItem;
