import classes from "./historyitem.module.css";

const HistoryItem = ({
  dateLast,
  quizName,
  trophyPic,
  trophyName,
  quizScore,
}) => {
  return (
    <ul className={`${classes.historyItem}`}>
      <li className={`${classes.historyItemDate}`}>{dateLast}</li>
      <li className={`${classes.historyItemName}`}>{quizName}</li>
      <li className={`${classes.historyItemPicContainer}`}>
        <img
          className={`${classes.historyItemPic}`}
          src={trophyPic}
          alt="trophy img"
        />
      </li>
      <li className={`${classes.historyItemTName}`}>{trophyName}</li>
      <li className={`${classes.historyItemScore}`}>{quizScore}</li>
    </ul>
  );
};

export default HistoryItem;
