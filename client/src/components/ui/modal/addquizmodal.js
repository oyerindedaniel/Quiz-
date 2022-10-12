import { Fragment } from "react";

import QuizCard from "../quizcard/quizcard";

import classes from "./addquizmodal.module.css";

const AddQuizModal = ({
  children,
  classNameModal,
  classNameBackdrop,
  onDisplayModalHandler,
}) => {
  return (
    <Fragment>
      <div
        className={`${classes.backdrop}`}
        onClick={onDisplayModalHandler}
      ></div>
      <QuizCard className={`${classes.modal}`}>
        <h1 className={`${classes.h1}`}>Quiz!</h1>
        {children}
      </QuizCard>
    </Fragment>
  );
};

export default AddQuizModal;
