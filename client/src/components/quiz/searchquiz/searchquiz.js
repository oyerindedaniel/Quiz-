import { useState } from "react";

import useHttp from "../../../hooks/use-http";
import { getQuizData } from "../../lib/api";
import QuizItemPopUp from "../quizitempopup/quizitempopup";

import { useGlobalStoreContext } from "../../../contexts/global-context";

import xlsImg from "../../../assets/img/xls1.png";
import xlsxImg from "../../../assets/img/xlsx.png";

import classes from "./searchquiz.module.css";

const SearchedQuizzes = ({ quizName, numberOfQuestion, uploadQuizName }) => {
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
    <>
      <div
        onClick={startQuizHandler.bind(null, uploadQuizName)}
        className={classes.searchLink}
      >
        <img
          className={classes.searchImg}
          src={uploadQuizName.split(".")[1] === "xls" ? xlsImg : xlsxImg}
          alt="quiz type img"
        />
        <span className={classes.span}>
          <h3 className={classes.h1}>{quizName}</h3>
          <p className={classes.p}>{`${numberOfQuestion} ${
            numberOfQuestion > 1 ? "Questions" : "Question"
          }`}</p>
        </span>
      </div>
      <QuizItemPopUp
        showModal={showModal}
        onDisplayModalHandler={onDisplayModalHandler}
        quizName={quizName}
        noOfQuestion={numberOfQuestion}
        loading={loading}
      />
    </>
  );
};

export default SearchedQuizzes;
