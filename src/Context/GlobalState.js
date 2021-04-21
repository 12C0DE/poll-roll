import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";

//initial state
const initialState = {
  polls: [],
};

//create context
export const GlobalContext = createContext(initialState);

//provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  //actions
  function addPoll(poll) {
    dispatch({ type: "ADD_POLL", payload: poll });
  }
  function delPoll(pollIndex) {
    dispatch({ type: "DEL_POLL", payload: pollIndex });
  }

  return (
    <GlobalContext.Provider value={{ polls: state.polls, addPoll, delPoll }}>
      {children}
    </GlobalContext.Provider>
  );
};
