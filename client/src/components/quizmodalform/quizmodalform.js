import { useRef, useContext } from "react";

import AuthContext from "../../contexts/auth-context";

import classes from "./quizmodalform.module.css";

const QuizModalForm = ({ onDisplayModal }) => {
  const { createQuiz, createQuizLoggingStatus } = useContext(AuthContext);

  const quizNameInputRef = useRef();
  const numberOfQuestionInputRef = useRef();
  const quizFileInputRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();

    const quizUploadForm = new FormData();
    quizUploadForm.append("quizName", quizNameInputRef.current.value);
    quizUploadForm.append(
      "numberOfQuestion",
      numberOfQuestionInputRef.current.value
    );
    quizUploadForm.append("quizFile", quizFileInputRef.current.files[0]);

    createQuiz(quizUploadForm);
  };

  return (
    <form onSubmit={submitHandler} className={`${classes.modalForm}`}>
      <div className={`${classes.modalFormInputContainer}`}>
        <div className={`${classes.modalFormInputContainer1}`}>
          <label className={`${classes.modalLabel}`} htmlFor="name">
            Quiz Name
            <span className={`${classes.labelRequired}`}>*</span>
          </label>
          <input
            className={`${classes.modalQuizNameInput}`}
            type="type"
            id="name"
            ref={quizNameInputRef}
            required
          />
        </div>
        <div className={`${classes.modalFormInputContainer2}`}>
          <label className={`${classes.modalLabel}`} htmlFor="questionno">
            Number of Question
            <span className={`${classes.labelRequired}`}>*</span>
          </label>
          <input
            className={`${classes.modalQuestionNoInput}`}
            type="type"
            id="questionno"
            ref={numberOfQuestionInputRef}
            pattern="[0-9]{3}"
            title="Maximum of three figures (0-999)"
            required
          />
        </div>
        <div className={`${classes.modalFormInputContainer3}`}>
          <input
            type="file"
            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            ref={quizFileInputRef}
            required
          />
        </div>
      </div>
      <div className={classes.modalActions}>
        <button type="button" onClick={onDisplayModal}>
          Cancel
        </button>
        <button className={classes.submit}>
          {createQuizLoggingStatus === "pending" ? "uploading ..." : "Add Quiz"}
        </button>
      </div>
    </form>
  );
};

export default QuizModalForm;
