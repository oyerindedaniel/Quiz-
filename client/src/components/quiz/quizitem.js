import { useContext, Fragment, useState } from "react";

import AuthContext from "../../contexts/auth-context";
import AddQuizModal from "../ui/modal/addquizmodal";

import icons from "../../assets/svg/SVG/sprite.svg";

import { Oval } from "react-loader-spinner";

import classes from "./quizitem.module.css";

const QuizItem = ({ imgSrc, quizName, numberOfQuestion, uploadQuizName }) => {
  const [showModal, setShowModal] = useState(false);
  const { getQuizData } = useContext(AuthContext);

  const onDisplayModalHandler = () => {
    setShowModal((currentModalValue) => {
      return !currentModalValue;
    });
  };

  const startQuizHandler = (uploadQuizName) => {
    onDisplayModalHandler();

    const userSubmittedData = {
      excelName: uploadQuizName,
    };

    getQuizData(userSubmittedData);
  };

  return (
    <Fragment>
      <div
        onClick={startQuizHandler.bind(null, uploadQuizName)}
        className={`${classes.quizItem}`}
      >
        <div className={`${classes.quizItemImgContainer}`}>
          <img
            className={`${classes.quizItemImg}`}
            src={imgSrc}
            alt="Default"
          />
        </div>
        <div className={`${classes.quizItemCaptionContainer}`}>
          <span className={`${classes.quizItemCaptionName}`}>{quizName}</span>
          <span className={`${classes.quizItemCaptionQuestionNo}`}>
            {`${numberOfQuestion} ${
              numberOfQuestion > 1 ? "Questions" : "Question"
            }`}
          </span>
        </div>
      </div>
      {showModal && (
        <AddQuizModal onDisplayModalHandler={onDisplayModalHandler}>
          <h2 className={`${classes.modalH2Text}`}>Quiz Description</h2>
          <p className={`${classes.modalTextP}`}>Enter quiz time duration</p>
          <div className={`${classes.aboutQuiz}`}>
            <div className={`${classes.aboutQuizLoad}`}>
              <Oval
                ariaLabel="loading-indicator"
                height={20}
                width={20}
                strokeWidth={10}
                strokeWidthSecondary={5}
                color="white"
                secondaryColor="#dd6c20"
              />
              <span className={`${classes.aboutQuizLoadText}`}>
                Writing Quiz Data
              </span>
            </div>
            <div className={`${classes.aboutQuizTimeNote}`}>
              <span>
                <p className={`${classes.aboutQuizTimeNoteP}`}>
                  Time duration of Quiz
                </p>
                <svg className={`${classes.svgDisplayPassword}`}>
                  <use xlinkHref={`${icons}#icon-view-show`}></use>
                </svg>
              </span>
            </div>
          </div>
        </AddQuizModal>
      )}
    </Fragment>
  );
};

export default QuizItem;
