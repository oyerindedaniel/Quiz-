import { useState } from "react";

import icons from "../../../assets/svg/SVG/sprite.svg";

import classes from "./authform.module.css";

const AuthForm = ({
  htmlFor,
  id,
  content,
  type,
  value,
  onChange,
  onBlur,
  placeholder,
  passwordBool,
}) => {
  const [showDisplayPasswordButton, setShowDisplayPasswordButton] =
    useState(true);

  const toggleDisplayPasswordFun = (e) => {
    setShowDisplayPasswordButton((prevValue) => !prevValue);

    if (showDisplayPasswordButton) {
      e.target.parentElement.parentElement.firstChild.setAttribute(
        "type",
        "text"
      );
    }

    if (!showDisplayPasswordButton) {
      e.target.parentElement.parentElement.firstChild.setAttribute(
        "type",
        "password"
      );
    }
  };

  return (
    <div className={`${classes.inputControl}`}>
      <label className={`${classes.label}`} htmlFor={htmlFor}>
        {content}
      </label>
      <div className={`${passwordBool && classes.inputCont}`}>
        <input
          className={`${passwordBool ? classes.inputEdit : classes.input}`}
          type={type}
          value={value}
          htmlFor={htmlFor}
          placeholder={placeholder}
          id={id}
          onChange={onChange}
          onBlur={onBlur}
        />
        {passwordBool && (
          <span
            className={`${classes.displayButton}`}
            onClick={toggleDisplayPasswordFun}
          >
            {value.length > 0 &&
              (showDisplayPasswordButton ? (
                <svg className={`${classes.svgDisplayPassword}`}>
                  <use xlinkHref={`${icons}#icon-view-show`}></use>
                </svg>
              ) : (
                <svg className={`${classes.svgDisplayPassword}`}>
                  <use xlinkHref={`${icons}#icon-view-hide`}></use>
                </svg>
              ))}
          </span>
        )}
      </div>
    </div>
  );
};

export default AuthForm;
