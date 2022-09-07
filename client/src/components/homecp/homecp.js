import { Fragment } from "react";

import Navigation from "../navigation/navigation";

import icons from "../../assets/svg/SVG/sprite.svg";

import classes from "./homecp.module.css";

const Homecp = () => {
  const searchOnChangerHandler = () => {};

  return (
    <Fragment>
      <Navigation />
      <main className={`${classes.main}`}>
        <h1 className={`${classes.h1}`}>My Quizes</h1>
        <form className={`${classes.controlGroupContainer}`} onSubmit="">
          <div className={`${classes.controlGroup}`}>
            <svg className={`${classes.svgSearch}`}>
              <use xlinkHref={`${icons}#icon-search`}></use>
            </svg>
            <input
              className={`${classes.searchInput}`}
              type="text"
              placeholder="Search Quiz ..."
              onChange={searchOnChangerHandler}
            />
          </div>
        </form>
        <div className={`${classes.addButtonSection}`}>
          <span className={`${classes.svgAddContainer}`}>
            <svg className={`${classes.svgAdd}`}>
              <use xlinkHref={`${icons}#icon-add`}></use>
            </svg>
          </span>
          <span className={`${classes.addButton}`}>New Quiz</span>
        </div>
      </main>
    </Fragment>
  );
};

export default Homecp;
