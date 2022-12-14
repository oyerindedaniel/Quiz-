import { useEffect, useState } from "react";

import QuizItem from "./quizitem";

import QuizItemsSkeletonLoader from "../ui/quizitemsskeletonloader/quizitemsskeletonloader";

import { useDataStoreContext } from "../../contexts/data-context";

import { getAllQuizById } from "../lib/api";

import useHttp from "../../hooks/use-http";

import xlsImg from "../../assets/img/xls1.png";
import xlsxImg from "../../assets/img/xlsx.png";
import quizHere from "../../assets/img/up-arrow.png";

import classes from "./quizitems.module.css";

const QuizItems = () => {
  const { state, dispatch } = useDataStoreContext();
  const [Quizzes, setQuizzes] = useState(null);

  const { sendRequest, loading, error } = useHttp(
    getAllQuizById,
    dispatch,
    "",
    "SET_USER-QUIZ",
    "",
    "",
    "",
    ""
  );

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  useEffect(() => {
    if (state.userQuiz) {
      const UserQuizDataEdits = [...state.userQuiz];
      const newUserQuizData = UserQuizDataEdits.map((UserQuizDataEdit) => {
        const fileType = UserQuizDataEdit.uploadQuiz.split(".")[1];

        if (fileType === "xls") {
          UserQuizDataEdit["img"] = xlsImg;
        }

        if (fileType === "xlsx") {
          UserQuizDataEdit["img"] = xlsxImg;
        }

        return UserQuizDataEdit;
      });
      setQuizzes(newUserQuizData);
    }
  }, [state.userQuiz]);

  let quizItems;

  if (Quizzes) {
    quizItems = Quizzes.map((quizItem) => (
      <QuizItem
        key={quizItem._id}
        imgSrc={quizItem.img}
        quizName={quizItem.quizName}
        quizId={quizItem._id}
        numberOfQuestion={quizItem.numberOfQuestion}
        uploadQuizName={quizItem.uploadQuiz}
      />
    ));
  }

  return (
    <section className={`${classes.quizItems}`}>
      {loading && <QuizItemsSkeletonLoader />}
      {!loading && Quizzes && quizItems}
      {!loading && !state.userQuiz?.length && !error && (
        <div className={`${classes.noQuizItems}`}>
          <img
            className={`${classes.noQuizItemsImg}`}
            src={quizHere}
            alt="Add Quiz Arrow Point"
          />
          <span className={`${classes.noQuizItemsCaption}`}>Add Quiz ????</span>
        </div>
      )}
      {error && (
        <>
          <div className={classes.errorContainer}>
            <p className={classes.errorP}>Could not fetch your Quizzes ????????</p>
          </div>
        </>
      )}
    </section>
  );
};

export default QuizItems;
