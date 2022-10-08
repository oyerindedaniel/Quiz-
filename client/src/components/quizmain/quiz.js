import { Fragment } from "react";
import { Link } from "react-router-dom";

import NavigationMain from "../navigation/navigationmain";

import img1 from "../../assets/imgmain/capture1.png";

import classes from "./quiz.module.css";

const Quiz = () => {
  return (
    <Fragment>
      <NavigationMain />
      <main className={`${classes.main}`}>
        <section className={`${classes.quiz}`}>
          <h1 className={`${classes.quizHeader}`}>
            Excel File to <span className={`${classes.quizSpan}`}>QUIZ!</span>
          </h1>
          <p className={`${classes.quizP}`}>
            Add Quiz, Take a Quiz, Get a score and review Corrections in one
            place.
          </p>
          <ul className={`${classes.navLinks}`}>
            <li>
              <Link
                to="/signup"
                className={`${classes.navLink} ${classes.navLink1}`}
              >
                Get Started
              </Link>
            </li>
            <li>
              <Link
                to="/login"
                className={`${classes.navLink} ${classes.navLink2}`}
              >
                Log in
              </Link>
            </li>
          </ul>
          <img className={`${classes.img}`} src={img1} alt="img" />
        </section>
      </main>
    </Fragment>
  );
};

export default Quiz;
