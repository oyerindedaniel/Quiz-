import { Fragment, useState } from "react";

import Navigation from "../navigation/navigation";
import QuizItems from "../quiz/quizitems";
import AddQuizModal from "../ui/modal/addquizmodal";

import icons from "../../assets/svg/SVG/sprite.svg";

import classes from "./homecp.module.css";

const Homecp = () => {
  const [showModal, setShowModal] = useState(false);

  const onControlModalHandler = () => {
    setShowModal((currentModalValue) => {
      return !currentModalValue;
    });
  };

  const searchOnChangerHandler = () => {};

  return (
    <Fragment>
      <Navigation />
      <main>
        <div className={`${classes.main}`}>
          <h1 className={`${classes.h1}`}>My Quizes</h1>
          <form className={`${classes.controlGroupContainer}`} onSubmit="">
            <div className={`${classes.controlGroup}`}>
              <svg className={`${classes.svgSearch}`}>
                <use xlinkHref={`${icons}#icon-search`}></use>
              </svg>
              <input
                className={`${classes.searchInput}`}
                type="text"
                placeholder="Search Quiz ..."
                onChange={searchOnChangerHandler}
              />
            </div>
          </form>
          <div
            onClick={onControlModalHandler}
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
          <AddQuizModal>
            <h2 className={`${classes.modalH2Text}`}>Upload File</h2>
            <form className={`${classes.modalForm}`}>
              <div className={`${classes.modalFormInputContainer}`}>
                <div className={`${classes.modalFormInputContainer1}`}>
                  <label className={`${classes.modalLabel}`} htmlFor="name">
                    Quiz Name
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
                <button type="button" onClick={onControlModalHandler}>
                  Cancel
                </button>
                <button className={classes.submit}>Add Quiz</button>
              </div>
            </form>
          </AddQuizModal>
        )}
        <QuizItems />
        <div className={`${classes.main}`}>
          <h1 className={`${classes.h1}`}>Quiz! History</h1>
        </div>
      </main>
    </Fragment>
  );
};

export default Homecp;
