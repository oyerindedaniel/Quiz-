import { Fragment, useState } from "react";

import { useNavigate } from "react-router-dom";

import Navigation from "../navigation/navigation";
import QuizItems from "../quiz/quizitems";
import HistoryItems from "../gameshistory/historyitems";
import AddQuizModal from "../ui/modal/addquizmodal";

import icons from "../../assets/svg/SVG/sprite.svg";

import classes from "./homecp.module.css";

const Homecp = () => {
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  const onDisplayModalHandler = () => {
    setShowModal((currentModalValue) => {
      return !currentModalValue;
    });
  };

  const searchHandler = () => {};

  const searchHandlerOn = (e) => {
    e.preventDefault();
    navigate("/account/settings");
  };

  const showModalClasses = `${classes.modalVisibility} ${classes.backdropVisibility}`;

  return (
    <Fragment>
      <Navigation isAccountControlNeeded="true" />
      <main>
        <div className={`${classes.main}`}>
          <h1 className={`${classes.h1}`}>My Quizes</h1>
          <form
            className={`${classes.controlGroupContainer}`}
            onSubmit={searchHandlerOn}
          >
            <div className={`${classes.controlGroup}`}>
              <svg className={`${classes.svgSearch}`}>
                <use xlinkHref={`${icons}#icon-search`}></use>
              </svg>
              <input
                className={`${classes.searchInput}`}
                type="text"
                placeholder="Search Quiz ..."
                onChange={searchHandler}
              />
              <svg className={`${classes.svgClear}`}>
                <use xlinkHref={`${icons}#icon-clear`}></use>
              </svg>
            </div>
          </form>
          <div
            onClick={onDisplayModalHandler}
            className={`${classes.addButtonSection}`}
          >
            <span className={`${classes.svgAddContainer}`}>
              <svg className={`${classes.svgAdd}`}>
                <use xlinkHref={`${icons}#icon-add`}></use>
              </svg>
            </span>
            <span className={`${classes.addButton}`}>New Quiz</span>
          </div>
        </div>
        {showModal && (
          <AddQuizModal
            classNameModal={`${showModal ? classes.modalVisibility : " "}`}
            classNameBackdrop={`${
              showModal ? classes.backdropVisibility : " "
            }`}
            onDisplayModalHandler={onDisplayModalHandler}
          >
            <h2 className={`${classes.modalH2Text}`}>Upload File</h2>
            <form className={`${classes.modalForm}`}>
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
                  />
                </div>
                <div className={`${classes.modalFormInputContainer2}`}>
                  <label
                    className={`${classes.modalLabel}`}
                    htmlFor="questionno"
                  >
                    Number of Question
                    <span className={`${classes.labelRequired}`}>*</span>
                  </label>
                  <input
                    className={`${classes.modalQuestionNoInput}`}
                    type="type"
                    id="questionno"
                  />
                </div>
                <div className={`${classes.modalFormInputContainer3}`}>
                  <input
                    type="file"
                    accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                  />
                </div>
              </div>
              <div className={classes.modalActions}>
                <button type="button" onClick={onDisplayModalHandler}>
                  Cancel
                </button>
                <button className={classes.submit}>Add Quiz</button>
              </div>
            </form>
          </AddQuizModal>
        )}
        <QuizItems />
        <div className={`${classes.main2}`}>
          <h1 className={`${classes.h1}`}>Quiz! History</h1>
          <HistoryItems />
        </div>
      </main>
    </Fragment>
  );
};

export default Homecp;
