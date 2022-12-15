import { useReducer, useContext, useMemo, createContext } from "react";

import React from "react";

export const initialState = {
  userQuiz: [],
  userQuizHistory: [],
  quizQuestion: [],
  quizScore: {},
};

export const DataStoreContext = createContext({
  state: initialState,
  dispatch: () => {},
});

const Reducer = (state, action) => {
  let newState = { ...state };
  switch (action.type) {
    case "SET_USER-QUIZ": {
      newState = {
        ...state,
        userQuiz: [...action.payload],
      };
      break;
    }
    case "SET_QUIZ-QUESTION": {
      newState = {
        ...state,
        quizQuestion: [...action.payload],
      };
      break;
    }
    case "SET_QUIZ-SCORE": {
      newState = {
        ...state,
        quizScore: { ...action.payload },
      };
      break;
    }
    case "SET_USER-QUIZ-HISTORY": {
      newState = {
        ...state,
        userQuizHistory: [...action.payload],
      };
      break;
    }
    default:
      throw new Error(`No such type ${action.type}`);
  }
  return newState;
};

export const DataContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);
  const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);
  return (
    <DataStoreContext.Provider value={value}>
      {children}
    </DataStoreContext.Provider>
  );
};

export const useDataStoreContext = () => {
  const { state, dispatch } = useContext(DataStoreContext);
  return { state, dispatch };
};
