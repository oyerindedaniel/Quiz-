import classes from "./quizitem.module.css";

const QuizItem = ({ imgSrc, caption }) => {
  return (
    <div className={`${classes.quizItem}`}>
      <div className={`${classes.quizItemImgContainer}`}>
        <img className={`${classes.quizItemImg}`} src={imgSrc} alt="Default" />
      </div>
      <div className={`${classes.quizItemCaptionContainer}`}>
        <span className={`${classes.quizItemCaptionName}`}>{caption}</span>
        <span className={`${classes.quizItemCaptionQuestionNo}`}>
          225 questions
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
