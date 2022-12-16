import { useRef } from "react";
import { useNavigate } from "react-router-dom";

import AddQuizModal from "../ui/modal/addquizmodal";

import { useDataStoreContext } from "../../contexts/data-context";

import Button from "../ui/button/button";
import classes from "./quizmodalsubmitted.module.css";

const QuizModalSubmitted = ({
  onDisplayModalHandler,
  quizName,
  quizId,
  onSubmitHandler,
  loading,
  error,
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
      navigate("/home", {
        replace: true,
      });
      return;
    }
  };

  const handleRightButtonClick = () => {
    if (
      buttonRightRef.current.innerText === "Yes" ||
      buttonRightRef.current.innerText === "Submit Quiz" ||
      buttonRightRef.current.innerText === "Submit Again"
    ) {
      onSubmitHandler();
      return;
    }
    if (buttonRightRef.current.innerText === "Review Quiz") {
      navigate(`/review/${quizId}/${quizName.split(" ").join("-")}`, {
        replace: true,
      });
      return;
    }
  };

  return (
    <>
      {state.isSubmitted.bool && (
        <AddQuizModal>
          <>
            <h2 className={classes.modalH2Text}>
              {state.isSubmitted.why === "timeDurationFinished" &&
              Object.keys(state.quizScore).length === 0
                ? `Time Duration for ${quizName
                    .split("-")
                    .join(" ")} Quiz exhausted`
                : Object.keys(state.quizScore).length === 0
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
                {state.isSubmitted.why === "timeDurationFinished" &&
                  "Return to Home"}
                {state.isSubmitted.why !== "timeDurationFinished" &&
                  (Object.keys(state.quizScore).length === 0
                    ? "No"
                    : "Return to Home")}
              </Button>
              <Button
                className={`${classes.button}`}
                onClickHandler={handleRightButtonClick}
                buttonRef={buttonRightRef}
              >
                {loading
                  ? "Submitting ..."
                  : error
                  ? "Submit Again"
                  : Object.keys(state.quizScore).length === 0 &&
                    state.isSubmitted.why === "timeDurationFinished"
                  ? "Submit Quiz"
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
