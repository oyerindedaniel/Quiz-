import { useCallback, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { useGlobalStoreContext } from "../contexts/global-context";

import toast from "react-hot-toast";

const useHttp = (
  requestFunction,
  dispatch,
  navigateURL,
  dispatchName,
  dispatchAuth,
  successMessage,
  navigateBool,
  type
) => {
  const navigate = useNavigate();
  const [loading, isLoading] = useState(null);
  const [error, setError] = useState(null);
  const { state } = useGlobalStoreContext();

  const userState = useMemo(
    () => ({ ...state.user }),
    [state.user.isAuthenticated]
  );

  const sendRequest = useCallback(
    async (requestData) => {
      isLoading(true);
      setError(null);
      try {
        const responseData = await requestFunction(requestData);
        const { data } = responseData.data;
        dispatch({
          type: dispatchName,
          payload:
            dispatchAuth === "auth" ? { ...data, isAuthenticated: true } : data,
        });

        if (type === "NAVIGATE") {
          if (navigateBool) navigate(navigateURL, { replace: true });
          toast.success(successMessage);
          return;
        }
        return;
      } catch (error) {
        setError(error);

        if (error?.error?.statusCode === 500) {
          toast.error("No Internet Connection.");
          return;
        }
        if (
          error?.message ===
          "You are not logged in! Please log in to get access."
        ) {
          dispatch({
            type: "SET_USER",
            payload: {
              ...userState,
              isAuthenticated: false,
            },
          });
          navigate("/login", { replace: true });
          toast.error(error.message);
          return;
        }
        console.log(error);
        if (error?.message) {
          return toast.error(error.message);
        }
      } finally {
        isLoading(false);
      }
    },
    [
      requestFunction,
      navigateURL,
      dispatchName,
      dispatch,
      dispatchAuth,
      successMessage,
      type,
      navigate,
      userState,
      navigateBool,
    ]
  );

  return {
    sendRequest,
    loading,
    error,
  };
};

export default useHttp;
