import { useState } from "react";

import icons from "../../../assets/svg/SVG/sprite.svg";

import classes from "./authform.module.css";

const AuthForm = ({
  htmlFor,
  id,
  label,
  type,
  value,
  onChange,
  onBlur,
  placeholder,
  minlength,
  passwordBool,
  passwordDetail,
  hasError,
  errorValue,
  valueCheck,
  autocomplete,
}) => {
  const [showDisplayPasswordButton, setShowDisplayPasswordButton] =
    useState(true);

  const toggleDisplayPasswordFun = (e) => {
    if (showDisplayPasswordButton) {
      e.target
        .closest(".authform_inputCont__ryb0g")
        .firstChild.setAttribute("type", "text");
    }

    if (!showDisplayPasswordButton) {
      e.target
        .closest(".authform_inputCont__ryb0g")
        .firstChild.setAttribute("type", "password");
    }

    setShowDisplayPasswordButton((prevValue) => !prevValue);
  };

  return (
    <div className={`${classes.inputControl}`}>
      <label className={`${classes.label}`} htmlFor={htmlFor} aria-label="">
        {label}
        <span className={`${classes.labelRequired}`}>*</span>
      </label>
      <div className={`${classes.inputDetail}`}>{passwordDetail}</div>
      <div
        className={`${passwordBool && classes.inputCont} ${
          passwordBool && hasError && classes.inputBorderErrorChange
        }`}
      >
        <input
          className={`${passwordBool ? classes.inputEdit : classes.input} ${
            !passwordBool && hasError && classes.inputBorderErrorChange
          }`}
          type={type}
          value={value}
          htmlFor={htmlFor}
          placeholder={placeholder}
          id={id}
          onChange={onChange}
          onBlur={onBlur}
          autocomplete={autocomplete}
          aria-required="true"
          required
        />
        {passwordBool && (
          <span
            className={`${classes.displayButton}`}
            onClick={toggleDisplayPasswordFun}
          >
            {valueCheck.length > 0 &&
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
      {hasError && (
        <div className={`${classes.inputErrorContainer}`}>
          <span>
            <svg className={`${classes.inputErrorSvg}`}>
              <use xlinkHref={`${icons}#icon-error_outline`}></use>
            </svg>
          </span>
          <span className={`${classes.inputErrorValue}`}>{errorValue}</span>
        </div>
      )}
    </div>
  );
};

export default AuthForm;
