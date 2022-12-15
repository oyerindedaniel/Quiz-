import classes from "./quizitemsskeletonloader.module.css";

const QuizItemsSkeletonLoader = () => {
  const arrayOfQuizItemsSkeletonLoader = [1, 2, 3, 4, 5, 6].map(
    (arrayOfQuizItemSkeletonLoader, i) => {
      return (
        <div key={i} className={`${classes.quizItemSkeletonLoader}`}>
          <div className={`${classes.quizItemSkeletonLoaderImgContainer}`}>
            <div className={`${classes.quizItemSkeletonLoaderImg}`}></div>
          </div>
          <div className={`${classes.quizItemSkeletonLoaderCaptionContainer}`}>
            <span
              className={`${classes.quizItemSkeletonLoaderCaptionName}`}
            ></span>
            <span
              className={`${classes.quizItemSkeletonLoaderCaptionQuestionNo}`}
            ></span>
          </div>
        </div>
      );
    }
  );

  return <>{arrayOfQuizItemsSkeletonLoader}</>;
};

export default QuizItemsSkeletonLoader;
