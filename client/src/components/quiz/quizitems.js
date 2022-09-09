import QuizItem from "./quizitem";

import classes from "./quizitems.module.css";

import excelImg from "../../assets/img/xls.png";
import wordImg from "../../assets/img/doc.png";
import pptImg from "../../assets/img/ppt.png";

const QuizItems = () => {
  const quizItems = [
    { img: excelImg, caption: "EIE 523" },
    { img: wordImg, caption: "POS 222" },
    { img: pptImg, caption: "CVE 111" },
    { img: excelImg, caption: "MCE 229" },
    { img: wordImg, caption: "TMC 328" },
    { img: excelImg, caption: "AGP 221" },
    { img: excelImg, caption: "AGP 121" },
    { img: excelImg, caption: "AGP 521" },
    { img: excelImg, caption: "AGP 521" },
    { img: excelImg, caption: "AGP 521" },
    { img: excelImg, caption: "AGP 521" },
    { img: excelImg, caption: "AGP 521" },
    { img: excelImg, caption: "AGP 521" },
  ].map((quizItem) => (
    <QuizItem imgSrc={quizItem.img} caption={quizItem.caption} />
  ));

  return <div className={`${classes.quizItems}`}>{quizItems}</div>;
};

export default QuizItems;
