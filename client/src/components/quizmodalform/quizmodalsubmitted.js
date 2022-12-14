import AddQuizModal from "../ui/modal/addquizmodal";

import { useDataStoreContext } from "../../contexts/data-context";

import Button from "../ui/button/button";
import { Oval } from "react-loader-spinner";
import classes from "./quizmodalsubmitted.module.css";

const QuizModalSubmitted = ({
  showModal,
  onDisplayModalHandler,
  quizName,
  onSubmitHandler,
  loading,
}) => {
  const { state, dispatch } = useDataStoreContext();
  return (
    <>
      {showModal && (
        <AddQuizModal>
          <h2
            className={classes.modalH2Text}
          >{`Are you sure you want to submit ${quizName} ?`}</h2>
          <div className={classes.buttonActions}>
            <Button
              className={`${classes.button}`}
              onClickHandler={onDisplayModalHandler}
              disabled={loading}
            >
              No
            </Button>
            <Button
              onClickHandler={onSubmitHandler}
              className={`${classes.button}`}
              status={loading}
            >
              {loading ? (
                <Oval
                  ariaLabel="loading-indicator"
                  height={20}
                  width={20}
                  strokeWidth={10}
                  strokeWidthSecondary={5}
                  color="white"
                  secondaryColor="#6035e7"
                />
              ) : (
                " Yes"
              )}
            </Button>
          </div>
          {/* <h2
            className={`${classes.modalH2Text}`}
          >{`${quizName} Quiz Score`}</h2> */}
        </AddQuizModal>
      )}
    </>
  );
};

export default QuizModalSubmitted;
