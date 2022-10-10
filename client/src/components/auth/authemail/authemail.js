import { Fragment } from "react";

import Navigation from "../../navigation/navigation";
import AuthButton from "../../ui/authbutton/authbutton";

import { Oval } from "react-loader-spinner";

import img1 from "../../../assets/img/envelope.png";

import classes from "./authemail.module.css";

const AuthConfirmEmail = () => {
  const emailConfirm = "oyerinde.daniel@gmail.com";
  const resendEmailTime = 13;

  return (
    <Fragment>
      <Navigation isAccountControlNeeded="true" />
      <main className={`${classes.main}`}>
        <div className={`${classes.confirmEmail}`}>
          <h1 className={`${classes.confirmEmailH1}`}>Confirm Email</h1>
          <img
            className={`${classes.confirmEmailImg}`}
            src={img1}
            alt="Email Confirm Logo"
          />
        </div>
        <section className={`${classes.confirmEmailDetails}`}>
          <p className={`${classes.confirmEmailP}`}>
            We sent a link to{" "}
            <span className={`${classes.confirmEmailAddress}`}>
              {emailConfirm}
            </span>{" "}
            to confirm your email
          </p>
          <p className={`${classes.confirmEmailP}`}>
            The link will expire in 24 hours
          </p>
          <AuthButton className={`${classes.button}`} status="true">
            {true === "pending" ? (
              <Oval
                ariaLabel="loading-indicator"
                height={20}
                width={20}
                strokeWidth={10}
                strokeWidthSecondary={5}
                color="white"
                secondaryColor="#6035e7"
              />
            ) : (
              "Resend Email"
            )}
          </AuthButton>
          <p className={`${classes.confirmEmailP}`}>
            You'll be redirected in {resendEmailTime} seconds if email isn't
            confirmed
          </p>
        </section>
      </main>
    </Fragment>
  );
};

export default AuthConfirmEmail;
