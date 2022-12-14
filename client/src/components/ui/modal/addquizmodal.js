import QuizCard from "../quizcard/quizcard";

import classes from "./addquizmodal.module.css";

const AddQuizModal = ({ children, onDisplayModalHandler }) => {
  return (
    <>
      <div
        className={`${classes.backdrop}`}
        onClick={onDisplayModalHandler}
      ></div>
      <QuizCard className={`${classes.modal}`}>
        <h1 className={`${classes.h1}`}>Quiz!</h1>
        {children}
      </QuizCard>
    </>
  );
};

export default AddQuizModal;
