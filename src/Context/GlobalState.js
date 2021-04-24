import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";

//initial state
const initialState = {
  code: "",
  polls: [],
  phone: "",
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
  function setCode(code) {
    dispatch({ type: "SET_CODE", payload: code });
  }

  function setPhone(number) {
    dispatch({ type: "SET_PHONE", payload: number });
  }

  function setUser(user) {
    dispatch({ type: "SET_USER", payload: user });
  }

  return (
    <GlobalContext.Provider
      value={{
        code: state.code,
        polls: state.polls,
        phone: state.phone,
        user: state.user,
        addPoll,
        delPoll,
        clearPolls,
        setCode,
        setPhone,
        setUser,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
