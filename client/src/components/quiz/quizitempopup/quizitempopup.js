import AddQuizModal from "../../ui/modal/addquizmodal";
import QuizModalFormQuiz from "../../quizmodalform/quizmodalformquiz";

import classes from "./quizitempopup.module.css";

const QuizItemPopUp = ({
  showModal,
  onDisplayModalHandler,
  quizName,
  quizId,
  noOfQuestion,
  loading,
  error,
  uploadQuizName,
  startQuizHandler,
}) => {
  return (
    <>
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
            quizId={quizId}
            noOfQuestion={noOfQuestion}
            loading={loading}
            error={error}
            onDisplayModalHandler={onDisplayModalHandler}
            uploadQuizName={uploadQuizName}
            startQuizHandler={startQuizHandler}
          />
        </AddQuizModal>
      )}
    </>
  );
};

export default QuizItemPopUp;
