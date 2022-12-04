import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

const useHttp = (
  requestFunction,
  dispatch,
  navigateURL,
  dispatchName,
  dispatchAuth,
  successMessage,
  type
) => {
  const navigate = useNavigate();
  const [loading, isLoading] = useState(null);
  const sendRequest = useCallback(
    async (requestData) => {
      isLoading(true);
      try {
        const responseData = await requestFunction(requestData);
        const { data } = responseData.data;
        console.log(responseData);
        console.log(data);
        dispatch({
          type: dispatchName,
          payload:
            dispatchAuth === "auth" ? { ...data, isAuthenticated: true } : data,
        });
        if (type === "POST") {
          toast.success(successMessage);
          navigate(navigateURL, { replace: true });
          return;
        }
        return;
      } catch (error) {
        toast.error("Error");
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
    ]
  );

  return {
    sendRequest,
    loading,
  };
};

export default useHttp;
