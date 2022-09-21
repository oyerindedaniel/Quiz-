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
    console.log(e.target.closest(".svgDisplayPassword"));

    if (showDisplayPasswordButton) {
      //   e.target
      //     .closest(".displayButton")
      //     .parentElement.setAttribute("type", "text");
      // }
    }
    if (!showDisplayPasswordButton) {
      console.log("second");
      e.target.parentElement.parentElement.firstChild.setAttribute(
        "type",
        "password"
      );
    }

    setShowDisplayPasswordButton((prevValue) => !prevValue);
  };

  return (
    <div className={`${classes.inputControl}`}>
      <label className={`${classes.label}`} htmlFor={htmlFor} aria-label="">
        {content}
        <span></span>
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
          aria-required="true"
          required
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
