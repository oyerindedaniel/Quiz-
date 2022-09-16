import HistoryItem from "./historyitem";

import goldImg from "../../assets/img/gold-cup.png";
import silverImg from "../../assets/img/silver-cup.png";
import bronzeImg from "../../assets/img/bronze-cup.png";

import classes from "./historyitems.module.css";

const HistoryItems = () => {
  const historyItems = [
    {
      dateLast: "Jan 15, 13:30",
      quizName: "MCE 421",
      trophyPic: goldImg,
      trophyName: "Gold",
      quizScore: "90%",
    },
    {
      dateLast: " Dec 25, 22:45",
      quizName: "EDS 111",
      trophyPic: silverImg,
      trophyName: "Silver",
      quizScore: "67%",
    },
    {
      dateLast: "Feb 1, 9:12",
      quizName: "POS 221",
      trophyPic: bronzeImg,
      trophyName: "Bronze",
      quizScore: "30%",
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
