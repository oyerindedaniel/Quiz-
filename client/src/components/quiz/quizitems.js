import { Fragment, useEffect, useState } from "react";

import QuizItem from "./quizitem";

import QuizItemsSkeletonLoader from "../ui/quizitemsskeletonloader/quizitemsskeletonloader";

import { getAllQuizById } from "../lib/api";

import useHttp from "../../hooks/use-http";

import icons from "../../assets/svg/SVG/sprite.svg";
import xlsImg from "../../assets/img/xls1.png";
import xlsxImg from "../../assets/img/xlsx.png";
import quizHere from "../../assets/img/up-arrow.png";

import classes from "./quizitems.module.css";

const QuizItems = () => {
  const [Quizzes, setQuizzes] = useState(null);

  const {
    sendRequest: userQuizSendRequest,
    status: userQuizStatus,
    data: userQuizData,
    error: userQuizError,
  } = useHttp(getAllQuizById);

  useEffect(() => {
    userQuizSendRequest();
  }, [userQuizSendRequest]);

  useEffect(() => {
    if (userQuizData) {
      const { data: foundUserQuizData } = userQuizData;
      const UserQuizDataEdits = [...foundUserQuizData];
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
  }, [userQuizData]);

  let quizItems;

  if (Quizzes) {
    quizItems = Quizzes.map((quizItem) => (
      <QuizItem
        key={quizItem._id}
        imgSrc={quizItem.img}
        quizName={quizItem.quizName}
        numberOfQuestion={quizItem.numberOfQuestion}
        uploadQuizName={quizItem.uploadQuiz}
      />
    ));
  }

  return (
    <Fragment>
      <section className={`${classes.quizItems}`}>
        {userQuizStatus === "pending" && <QuizItemsSkeletonLoader />}
        {Quizzes && quizItems}
        {userQuizStatus === "completed" && !userQuizData.data.length && (
          <div className={`${classes.noQuizItems}`}>
            <img
              className={`${classes.noQuizItemsImg}`}
              src={quizHere}
              alt="Add Quiz Arrow Point"
            />
            <span className={`${classes.noQuizItemsCaption}`}>Add Quiz 🆙</span>
          </div>
        )}
      </section>
      <div className={`${classes.svgArrowContainer}`}>
        <span className={`${classes.svgArrow1}`}>
          <svg className={`${classes.svgArrow}`}>
            <use xlinkHref={`${icons}#icon-arrow_back_ios`}></use>
          </svg>
        </span>
        <span className={`${classes.svgArrow2}`}>
          <svg className={`${classes.svgArrow}`}>
            <use xlinkHref={`${icons}#icon-arrow_forward_ios`}></use>
          </svg>
        </span>
      </div>
    </Fragment>
  );
};

export default QuizItems;
