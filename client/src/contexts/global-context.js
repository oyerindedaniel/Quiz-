import { useReducer, useContext, useMemo, createContext } from "react";

import React from "react";
import Calm from "../assets/img/calm.png";

const localStorageName = "persistentState";
let localStorageState;

if (typeof window !== "undefined") {
  localStorageState = localStorage.getItem(localStorageName);
}

export const initialState = localStorageState
  ? {
      ...JSON.parse(localStorageState),
    }
  : {
      timeDuration: {},
      user: {},
      profilePicture: Calm,
    };

export const GlobalStoreContext = createContext({
  state: initialState,
  dispatch: () => {},
});

const Reducer = (state, action) => {
  let newState = { ...state };
  switch (action.type) {
    case "SET_USER": {
      newState = {
        ...state,
        user: {
          ...action.payload,
        },
      };
      break;
    }
    case "SET_LOCAL-TIME-DURATION": {
      newState = {
        ...state,
        timeDuration: { ...action.payload },
      };
      break;
    }
    case "SET_PROFILE-PICTURE": {
      newState = {
        ...state,
        profilePicture: action.payload,
      };
      break;
    }
    default:
      throw new Error(`No such type ${action.type}`);
  }
  localStorage.setItem(localStorageName, JSON.stringify(newState));
  return newState;
};

export const GlobalContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);
  const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);
  return (
    <GlobalStoreContext.Provider value={value}>
      {children}
    </GlobalStoreContext.Provider>
  );
};

export const useGlobalStoreContext = () => {
  const { state, dispatch } = useContext(GlobalStoreContext);
  return { state, dispatch };
};
