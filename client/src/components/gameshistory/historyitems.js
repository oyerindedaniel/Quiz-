import { useState, useEffect } from "react";

import useHttp from "../../hooks/use-http";
import { getAllQuizHistoryById } from "../lib/api";
import { useDataStoreContext } from "../../contexts/data-context";

import HistoryItem from "./historyitem";
import QuizHistorySkeletonLoader from "../ui/quizhistoryskeleton/quizhistoryskeleton";

import goldImg from "../../assets/img/gold-cup.png";
import silverImg from "../../assets/img/silver-cup.png";
import bronzeImg from "../../assets/img/bronze-cup.png";

import classes from "./historyitems.module.css";

const HistoryItems = () => {
  const { state, dispatch } = useDataStoreContext();
  const [QuizzesHistory, setQuizzesHistory] = useState(null);

  const { sendRequest, loading, error } = useHttp(
    getAllQuizHistoryById,
    dispatch,
    "",
    "SET_USER-QUIZ-HISTORY",
    "",
    "",
    "",
    ""
  );

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  useEffect(() => {
    if (state.userQuizHistory) {
      const UserQuizScoreDataEdits = [...state.userQuizHistory];
      const newUserQuizScoreData = UserQuizScoreDataEdits.map(
        (UserQuizScoreDataEdit) => {
          const quizScore = +UserQuizScoreDataEdit.quizScore;
          if (quizScore >= 80) {
            UserQuizScoreDataEdit["trophyImg"] = goldImg;
            UserQuizScoreDataEdit["trophyName"] = "Gold";
            return UserQuizScoreDataEdit;
          }
          if (quizScore >= 50) {
            UserQuizScoreDataEdit["trophyImg"] = silverImg;
            UserQuizScoreDataEdit["trophyName"] = "Silver";
            return UserQuizScoreDataEdit;
          }

          UserQuizScoreDataEdit["trophyImg"] = bronzeImg;
          UserQuizScoreDataEdit["trophyName"] = "Bronze";

          return UserQuizScoreDataEdit;
        }
      );
      setQuizzesHistory(newUserQuizScoreData);
    }
  }, [state.userQuizHistory]);

  let quizHistoryItems;

  if (QuizzesHistory) {
    quizHistoryItems = QuizzesHistory.map((quizHistoryItem) => (
      <HistoryItem
        key={quizHistoryItem._id}
        trophyPic={quizHistoryItem.trophyImg}
        quizName={quizHistoryItem.quizName}
        trophyName={quizHistoryItem.trophyName}
        quizScore={quizHistoryItem.quizScore}
        dateLast={quizHistoryItem.createdAt}
      />
    ));
  }

  return (
    <section className={`${classes.quizHistoryItems}`}>
      {loading && <QuizHistorySkeletonLoader />}
      {!loading && QuizzesHistory && quizHistoryItems}
      {!loading && !state.userQuizHistory?.length && !error && (
        <div className={classes.errorContainer}>
          <p className={classes.errorP}>
            You have no Quiz History, Take a Quiz 😁👍
          </p>
        </div>
      )}
      {error && (
        <>
          <div className={classes.errorContainer}>
            <p className={classes.errorP}>
              Could not fetch your Quizzes History 😭🤔
            </p>
          </div>
        </>
      )}
    </section>
  );
};

export default HistoryItems;
