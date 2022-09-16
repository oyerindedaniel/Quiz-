import { Fragment } from "react";

import QuizItem from "./quizitem";

import classes from "./quizitems.module.css";

import icons from "../../assets/svg/SVG/sprite.svg";
import excelImg from "../../assets/img/xls.png";
import wordImg from "../../assets/img/doc.png";
import pptImg from "../../assets/img/ppt.png";

const QuizItems = () => {
  const quizItems = [
    { key: 1, img: excelImg, caption: "EIE 523" },
    { key: 2, img: wordImg, caption: "POS 222" },
    { key: 3, img: pptImg, caption: "CVE 111" },
    { key: 4, img: excelImg, caption: "MCE 229" },
    { key: 5, img: wordImg, caption: "TMC 328" },
    { key: 6, img: excelImg, caption: "AGP 221" },
    { key: 7, img: excelImg, caption: "AGP 121" },
    { key: 8, img: excelImg, caption: "AGP 521" },
    { key: 9, img: excelImg, caption: "AGP 521" },
    { key: 10, img: excelImg, caption: "AGP 521" },
    { key: 11, img: excelImg, caption: "AGP 521" },
    { key: 12, img: excelImg, caption: "AGP 521" },
    { key: 13, img: excelImg, caption: "AGP 521" },
  ].map((quizItem) => (
    <QuizItem
      key={quizItem.key}
      imgSrc={quizItem.img}
      caption={quizItem.caption}
    />
  ));

  return (
    <Fragment>
      <div className={`${classes.quizItems}`}>{quizItems}</div>
      <div className={`${classes.svgArrowContainer}`}>
        <span className={`${classes.svgArrow1}`}>
          <svg className={`${classes.svgArrow}`}>
            <use xlinkHref={`${icons}#icon-arrow_back_ios`}></use>
          </svg>
        </span>
        <span className={`${classes.svgArrow2}`}>
          <svg className={`${classes.svgArrow}`}>
            <use xlinkHref={`${icons}#icon-arrow_forward_ios`}></use>
          </svg>
        </span>
      </div>
    </Fragment>
  );
};

export default QuizItems;
