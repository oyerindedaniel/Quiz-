import { useState } from "react";

import QuizItems from "../quiz/quizitems";
import HistoryItems from "../gameshistory/historyitems";
import AddQuizModal from "../ui/modal/addquizmodal";
import QuizModalForm from "../quizmodalform/quizmodalform";
import SearchedQuizzes from "../quiz/searchquiz/searchquiz";

import { useDataStoreContext } from "../../contexts/data-context";

import icons from "../../assets/svg/SVG/sprite.svg";

import classes from "./homecp.module.css";

const Homecp = () => {
  const { state } = useDataStoreContext();

  const [showModal, setShowModal] = useState(false);
  const [searchQuizzes, setSearchQuizzes] = useState(null);

  const onDisplayModalHandler = () => {
    setShowModal((currentModalValue) => {
      return !currentModalValue;
    });
  };

  const searchHandler = (e) => {
    e.preventDefault();
    if (state.userQuiz) return;
    const quizSearch = e.target.value.toLowerCase();
    const arrayFoundQuiz = [];

    state.userQuiz.forEach((quiz) => {
      if (!quizSearch) return;
      const foundQuiz = quiz.quizName.toLowerCase().startsWith(quizSearch);
      if (foundQuiz) arrayFoundQuiz.push(quiz);
    });

    setSearchQuizzes(arrayFoundQuiz);
  };

  let searchQuizzesData;
  if (searchQuizzes) {
    searchQuizzesData = (
      <div className={classes.searchQuizDisplay}>
        {searchQuizzes.map((quiz, i) => (
          <SearchedQuizzes
            key={i}
            quizName={quiz.quizName}
            image={quiz.image}
            numberOfQuestion={quiz.numberOfQuestion}
            uploadQuizName={quiz.uploadQuiz}
          />
        ))}
      </div>
    );
  }

  return (
    <>
      <main>
        <div className={`${classes.main}`}>
          <h1 className={`${classes.h1}`}>My Quizzes</h1>
          <div className={classes.searchContainer}>
            <form onSubmit={searchHandler}>
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
            <>{searchQuizzes && searchQuizzesData}</>
          </div>
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
          <AddQuizModal onDisplayModalHandler={onDisplayModalHandler}>
            <h2 className={`${classes.modalH2Text}`}>Upload File</h2>
            <p className={`${classes.modalTextP}`}>
              Make sure to upload an{" "}
              <span className={`${classes.modalTextSpan}`}>.xlsx</span> or
              <span className={`${classes.modalTextSpan}`}>.xls</span> and
              adhere to our format{" "}
              <span>
                <a
                  className={`${classes.modalTextLinkDownload}`}
                  href="a"
                  download
                >
                  (download sample template)
                </a>
              </span>
            </p>
            <QuizModalForm onDisplayModal={onDisplayModalHandler} />
          </AddQuizModal>
        )}
        <QuizItems />
        <div className={`${classes.main2}`}>
          <h1 className={`${classes.h1}`}>Quiz! History</h1>
          <HistoryItems />
        </div>
      </main>
    </>
  );
};

export default Homecp;
