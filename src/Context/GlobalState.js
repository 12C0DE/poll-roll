import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";

//initial state
const initialState = {
  polls: [],
  user: null,
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
  function delPoll(pollId) {
    dispatch({ type: "DEL_POLL", payload: pollId });
  }
  function clearPolls() {
    dispatch({ type: "CLEAR_POLLS" });
  }

  function setUser(user) {
    dispatch({ type: "SET_USER", payload: user });
  }

  return (
    <GlobalContext.Provider
      value={{
        polls: state.polls,
        user: state.user,
        addPoll,
        delPoll,
        clearPolls,
        setUser,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
