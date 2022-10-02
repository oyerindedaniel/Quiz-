import { useEffect, Fragment } from "react";

import { useNavigate } from "react-router-dom";

import QuizCbtTest from "../components/quiz/quizcbttest";
import LoadingScreen from "../components/ui/loadingscreen/loadingscreen";

import { initialProtect } from "../components/lib/api";

import useHttp from "../hooks/use-http";

const QuizCbt = () => {
  const navigate = useNavigate();

  const {
    sendRequest: initialProtectSendRequest,
    status: initialProtectStatus,
    data: initialProtectData,
    error: initialProtectError,
  } = useHttp(initialProtect);

  //
  useEffect(() => {
    initialProtectSendRequest();
  }, [initialProtectSendRequest]);

  useEffect(() => {
    if (initialProtectError) {
      navigate("/login", { replace: true });
    }
  }, [initialProtectError, navigate]);

  return (
    <Fragment>
      {initialProtectStatus === "pending" && <LoadingScreen />}
      {initialProtectData && <QuizCbtTest />}
    </Fragment>
  );
};

export default QuizCbt;
