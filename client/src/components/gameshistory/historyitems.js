import HistoryItem from "./historyitem";

import goldImg from "../../assets/img/gold-cup.png";
import silverImg from "../../assets/img/silver-cup.png";
import bronzeImg from "../../assets/img/bronze-cup.png";

import classes from "./historyitems.module.css";

const HistoryItems = () => {
  const historyItems = [
    {
      dateLast: "Jan 15, 13:30",
      quizName: "EIE 523",
      trophyPic: { goldImg },
      trophyName: "Gold",
      quizScore: "99",
    },
    {
      dateLast: "Jan 15, 13:30",
      quizName: "EIE 523",
      trophyPic: { silverImg },
      trophyName: "Gold",
      quizScore: "99",
    },
    {
      dateLast: "Jan 15, 13:30",
      quizName: "EIE 523",
      trophyPic: { bronzeImg },
      trophyName: "Gold",
      quizScore: "99",
    },
  ].map((historyItem) => (
    <HistoryItem
      dateLast={historyItem.dateLast}
      quizName={historyItem.quizName}
      trophyPic={historyItem.trophyPic}
      trophyName={historyItem.trophyName}
      quizScore={historyItem.quizScore}
    />
  ));

  return <div className={`${classes.historyItems}`}>{historyItems}</div>;
};

export default HistoryItems;
