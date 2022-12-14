import { useState } from "react";

import useHttp from "../../hooks/use-http";
import { getQuizData } from "../lib/api";

import { useDataStoreContext } from "../../contexts/data-context";

import QuizItemPopUp from "./quizitempopup/quizitempopup";

import classes from "./quizitem.module.css";

const QuizItem = ({
  imgSrc,
  quizName,
  quizId,
  numberOfQuestion,
  uploadQuizName,
}) => {
  const { dispatch } = useDataStoreContext();

  const { sendRequest, loading, error } = useHttp(
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

  const startQuizHandler = (uploadQuizName, state) => {
    if (state === "initial") onDisplayModalHandler();

    const userSubmittedData = {
      excelName: uploadQuizName,
    };

    sendRequest(userSubmittedData);
  };

  return (
    <>
      <div
        onClick={startQuizHandler.bind(null, uploadQuizName, "initial")}
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
      <QuizItemPopUp
        showModal={showModal}
        onDisplayModalHandler={onDisplayModalHandler}
        quizName={quizName}
        quizId={quizId}
        noOfQuestion={numberOfQuestion}
        loading={loading}
        error={error}
        uploadQuizName={uploadQuizName}
        startQuizHandler={startQuizHandler}
      />
    </>
  );
};

export default QuizItem;
