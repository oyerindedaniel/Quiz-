import classes from "./quizitem.module.css";

const QuizItem = ({ imgSrc, quizName, numberOfQuestion }) => {
  return (
    <div className={`${classes.quizItem}`}>
      <div className={`${classes.quizItemImgContainer}`}>
        <img className={`${classes.quizItemImg}`} src={imgSrc} alt="Default" />
      </div>
      <div className={`${classes.quizItemCaptionContainer}`}>
        <span className={`${classes.quizItemCaptionName}`}>{quizName}</span>
        <span className={`${classes.quizItemCaptionQuestionNo}`}>
          {`${numberOfQuestion} ${
            numberOfQuestion > 1 ? "Questions" : "Question"
          }`}
        </span>
      </div>
      {/* <div className={`${classes.quizItemImgContainer}`}>
        <img className={`${classes.quizItemImg}`} src={imgSrc} alt="Default" />
      </div>
      <div className={`${classes.quizItemCaption}`}>{caption}</div> */}
    </div>
  );
};

export default QuizItem;
