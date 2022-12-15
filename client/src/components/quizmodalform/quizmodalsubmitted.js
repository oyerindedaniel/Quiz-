import { useRef } from "react";
import { useNavigate } from "react-router-dom";

import AddQuizModal from "../ui/modal/addquizmodal";

import { useDataStoreContext } from "../../contexts/data-context";

import Button from "../ui/button/button";
import classes from "./quizmodalsubmitted.module.css";

const QuizModalSubmitted = ({
  showModal,
  onDisplayModalHandler,
  quizName,
  onSubmitHandler,
  loading,
}) => {
  const { state } = useDataStoreContext();
  const buttonLeftRef = useRef();
  const buttonRightRef = useRef();
  const navigate = useNavigate();

  const handleLeftButtonClick = () => {
    if (buttonLeftRef.current.innerText === "No") {
      onDisplayModalHandler();
      return;
    }
    if (buttonLeftRef.current.innerText === "Return to Home") {
      navigate(`/home`, {
        replace: true,
      });
      return;
    }
  };

  const handleRightButtonClick = () => {
    if (buttonRightRef.current.innerText === "Yes") {
      onSubmitHandler();
      return;
    }
    if (buttonRightRef.current.innerText === "Review Quiz") {
      navigate(`/review`, {
        replace: true,
      });
      return;
    }
  };

  return (
    <>
      {showModal && (
        <AddQuizModal>
          <>
            <h2 className={classes.modalH2Text}>
              {Object.keys(state.quizScore).length === 0
                ? `Are you sure you want to submit ${quizName} ?`
                : `You score for ${quizName.split("-").join(" ")} is ${
                    state.quizScore.quizScore
                  }%`}
            </h2>
            <div className={classes.buttonActions}>
              <Button
                className={`${classes.button}`}
                disabled={loading}
                buttonRef={buttonLeftRef}
                onClickHandler={handleLeftButtonClick}
              >
                {Object.keys(state.quizScore).length === 0
                  ? "No"
                  : "Return to Home"}
              </Button>
              <Button
                className={`${classes.button}`}
                onClickHandler={handleRightButtonClick}
                buttonRef={buttonRightRef}
              >
                {loading
                  ? "Submitting ..."
                  : Object.keys(state.quizScore).length === 0
                  ? "Yes"
                  : "Review Quiz"}
              </Button>
            </div>
          </>
        </AddQuizModal>
      )}
    </>
  );
};

export default QuizModalSubmitted;
