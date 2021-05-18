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
  function addPollOption(pollOptions) {
    dispatch({ type: "ADD_POLL_OPT", payload: pollOptions });
  }
  function delPollOption(pollOption) {
    dispatch({ type: "DEL_POLL_OPT", payload: pollOption });
  }
  function clearPolls() {
    dispatch({ type: "CLEAR_POLLS" });
  }
  function setPolls(polls) {
    dispatch({ type: "SET_POLLS", payload: polls });
  }
  function updatePoll(poll) {
    dispatch({ type: "UPDATE_POLL", payload: poll });
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
  function voteBool(vote) {
    dispatch({type: 'VOTE_BOOL', payload: vote})
  }
  function voteDate(vote) {
    dispatch({type: 'VOTE_DATE', payload: vote})
  }
  function voteList(vote) {
    dispatch({type: 'VOTE_LIST', payload: vote})
  }

  return (
    <GlobalContext.Provider
      value={{
        code: state.code,
        polls: state.polls,
        phone: state.phone,
        user: state.user,
        addPollOption,
        delPollOption,
        clearPolls,
        setCode,
        setPhone,
        setPolls,
        setUser,
        voteBool,
        voteDate,
        voteList,
        updatePoll,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
