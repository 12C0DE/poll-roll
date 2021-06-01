import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";

//initial state
const initialState = {
  code: "",
  phone: "",
  polls: {},
  boolVotes: 0,
  listVotes: 0,
  dateVotes: 0,
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
  function setBoolVotes(bVotes) {
    dispatch({ type: "SET_BOOL_VOTES", payload: bVotes });
  }
  function setDateVotes(dVotes) {
    dispatch({ type: "SET_DATE_VOTES", payload: dVotes });
  }
  function setListVotes(lVotes) {
    dispatch({ type: "SET_LIST_VOTES", payload: lVotes });
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
  function voteMany(vote) {
    dispatch({ type: "VOTE_MANY", payload: vote });
  }
  function voteOne(vote) {
    dispatch({ type: "VOTE_ONE", payload: vote });
  }

  return (
    <GlobalContext.Provider
      value={{
        boolVotes: state.boolVotes,
        dateVotes: state.dateVotes,
        listVotes: state.listVotes,
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
        setBoolVotes,
        setDateVotes,
        setListVotes,
        setUser,
        voteMany,
        voteOne,
        updatePoll,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
