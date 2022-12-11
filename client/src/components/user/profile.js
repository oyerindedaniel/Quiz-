import { useState, useRef } from "react";

import { useGlobalStoreContext } from "../../contexts/global-context";
import { setTimeDuration } from "../lib/api";
import { Oval } from "react-loader-spinner";

import TabNavItem from "../ui/tab/tabnavitem";
import TabContent from "../ui/tab/tabcontent";
import useHttp from "../../hooks/use-http";
import Button from "../ui/button/button";

import Trauma from "../../assets/img/trauma.png";
import Bandage from "../../assets/img/bandage.png";
import Pain from "../../assets/img/pain.png";
import Calm from "../../assets/img/calm.png";

import classes from "./profile.module.css";

const Profile = () => {
  const { state, dispatch } = useGlobalStoreContext();

  const [persistentTimeInput, setPersistentTimeInput] = useState({
    hours: state.user.timeDuration.hours,
    minutes: state.user.timeDuration.minutes,
    seconds: state.user.timeDuration.seconds,
  });
  const [activeTab, setActiveTab] = useState("picture");

  const { sendRequest, loading } = useHttp(
    setTimeDuration,
    dispatch,
    "/home",
    "SET_USER",
    "auth",
    "Successfully set time duration",
    false,
    "POST"
  );

  const onSubmitHandler = (e) => {
    e.preventDefault();

    const hours = +persistentTimeInput.hours;
    const minutes = +persistentTimeInput.minutes;
    const seconds = +persistentTimeInput.seconds;

    const timeDuration = {
      hours,
      minutes,
      seconds,
    };

    sendRequest(timeDuration);
  };

  const profilePictureChangeHandler = (avatarSrc) => {
    dispatch({
      type: "SET_PROFILE-PICTURE",
      payload: avatarSrc,
    });
  };

  return (
    <>
      <main className={`${classes.main}`}>
        <div className={`${classes.profileHeading}`}>
          <img
            className={`${classes.profileHeadingImg}`}
            src={state.profilePicture}
            alt="profile"
          />
          <div>
            <h1 className={`${classes.profileHeadingH1}`}>
              {state.user.username} / Edit Picture
            </h1>
            <p className={`${classes.profileP}`}>Manage your account</p>
          </div>
        </div>
        <div className={`${classes.profileTabContainer}`}>
          <ul>
            {[
              { title: "Edit Picture", id: "picture" },
              { title: "Time Duration", id: "time" },
              { title: "Delete Account", id: "delete" },
            ].map((tabNavItem) => (
              <TabNavItem
                key={tabNavItem.id}
                id={tabNavItem.id}
                title={tabNavItem.title}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
            ))}
          </ul>
          <TabContent id="picture" activeTab={activeTab}>
            <div className={`${classes.container}`}>
              <div className={`${classes.profilePictureContainer}`}>
                <img src={state.profilePicture} alt="profile" />
                <div>
                  <p>{state.user.username}</p>
                  <p>{state.user.email}</p>
                  <p>User</p>
                  <p>Active</p>
                </div>
              </div>
              <div>
                <p className={`${classes.avatarP}`}>
                  Choose a profile picture to apply
                </p>
                <div className={`${classes.avatarChooseContainer}`}>
                  {[
                    { src: Calm, alt: "calm avatar" },
                    { src: Trauma, alt: "trauma avatar" },
                    { src: Bandage, alt: "bandage avatar" },
                    { src: Pain, alt: "pain avatar" },
                  ].map((avatar, i) => (
                    <img
                      key={i}
                      className={`${classes.avatarImg} ${
                        state.profilePicture === avatar.src &&
                        classes.avatarImgActive
                      }`}
                      src={avatar.src}
                      alt={avatar.alt}
                      onClick={profilePictureChangeHandler.bind(
                        null,
                        avatar.src
                      )}
                    />
                  ))}
                </div>
              </div>
            </div>
          </TabContent>
          <TabContent id="time" activeTab={activeTab}>
            <form
              onSubmit={onSubmitHandler}
              className={`${classes.aboutQuizTimeContainer}`}
            >
              <div className={`${classes.aboutQuizTimeInsert}`}>
                <div className={`${classes.aboutQuizTimeInsertInputCont}`}>
                  <input
                    type="text"
                    id="hours"
                    name="hours"
                    min="0"
                    max="24"
                    value={persistentTimeInput.hours}
                    onChange={(e) => {
                      setPersistentTimeInput((prev) => {
                        return {
                          hours: e.target.value,
                          minutes: prev.minutes,
                          seconds: prev.seconds,
                        };
                      });
                    }}
                  />
                  <span>Hours</span>
                </div>
                <div className={`${classes.aboutQuizTimeInsertInputCont}`}>
                  <input
                    type="text"
                    id="minutes"
                    name="minutes"
                    value={persistentTimeInput.minutes}
                    onChange={(e) => {
                      setPersistentTimeInput((prev) => {
                        return {
                          hours: prev.hours,
                          minutes: e.target.value,
                          seconds: prev.seconds,
                        };
                      });
                    }}
                  />
                  <span>Minutes</span>
                </div>
                <div className={`${classes.aboutQuizTimeInsertInputCont}`}>
                  <input
                    type="text"
                    id="seconds"
                    name="seconds"
                    value={persistentTimeInput.seconds}
                    onChange={(e) => {
                      setPersistentTimeInput((prev) => {
                        return {
                          hours: prev.hours,
                          minutes: prev.minutes,
                          seconds: e.target.value,
                        };
                      });
                    }}
                  />
                  <span>Seconds</span>
                </div>
              </div>
              <div className={classes.modalActions}>
                <Button status={loading}>
                  {loading ? (
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
                    "Set Time Duration"
                  )}
                </Button>
              </div>
            </form>
          </TabContent>
          <TabContent id="delete" activeTab={activeTab}>
            <h1 className={classes.deleteH1}>We are sorry to see you go</h1>
            <p className={classes.deleteP}>
              Be advised, account deletion is final. There will be no way to
              restore your account.
            </p>
            <div className={`${classes.modalActions}`}>
              <Button status={loading}>
                {loading ? (
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
                  "Delete my account"
                )}
              </Button>
            </div>
          </TabContent>
        </div>
      </main>
    </>
  );
};

export default Profile;
