import { Link } from "react-router-dom";

import classes from "./searchquiz.module.css";

const SearchedQuizzes = ({ image, quizName, numberofQuestion }) => {
  //   const URL = `/countries/${countryName.split(" ").join("-")}`;
  return (
    <>
      <Link to={URL} className={classes.link}>
        <div className="">
          <img class="" src={image} alt="quiz type img" />
        </div>
        <span>
          <h3 className=" ">{quizName}</h3>
          <p className="">{numberofQuestion}</p>
        </span>
      </Link>
    </>
  );
};

export default SearchedQuizzes;
