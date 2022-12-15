import classes from "./quizhistoryskeleton.module.css";

const QuizHistorySkeletonLoader = () => {
  const arrayOfQuizHistorySkeletonLoader = [1, 2, 3].map(
    (arrayOfQuizHistorySkeletonLoader, i) => {
      return (
        <div key={i} className={`${classes.historyItemSkeletonLoader}`}>
          <p className={`${classes.historyItemDateSkeletonLoader}`}></p>
          <p className={`${classes.historyItemNameSkeletonLoader}`}></p>
          <div className={`${classes.historyItemPicContainerSkeletonLoader}`}>
            <div className={`${classes.historyItemPicSkeletonLoader}`}></div>
          </div>
          <p className={`${classes.historyItemTNameSkeletonLoader}`}></p>
          <p className={`${classes.historyItemScoreSkeletonLoader}`}></p>
        </div>
      );
    }
  );
  return <>{arrayOfQuizHistorySkeletonLoader}</>;
};

export default QuizHistorySkeletonLoader;
