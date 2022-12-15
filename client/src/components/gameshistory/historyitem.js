import classes from "./historyitem.module.css";

const HistoryItem = ({
  dateLast,
  quizName,
  trophyPic,
  trophyName,
  quizScore,
}) => {
  const createdAt = new Date(dateLast).toLocaleString();
  return (
    <div className={`${classes.historyItem}`}>
      <p className={`${classes.historyItemDate}`}>{createdAt}</p>
      <p className={`${classes.historyItemName}`}>{quizName}</p>
      <div className={`${classes.historyItemPicContainer}`}>
        <img
          className={`${classes.historyItemPic}`}
          src={trophyPic}
          alt="trophy img"
        />
      </div>
      <p className={`${classes.historyItemTName}`}>{trophyName}</p>
      <p className={`${classes.historyItemScore}`}>{`${quizScore}%`}</p>
    </div>
  );
};

export default HistoryItem;
