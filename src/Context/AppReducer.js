/* eslint-disable import/no-anonymous-default-export */
export default (state, action) => {
  switch (action.type) {
    case "ADD_POLL_OPT":
      const addedPolls = state.polls;
      addedPolls.pollOptions.unshift(action.payload);

      //sort poll options
      addedPolls.pollOptions.sort((a, b) => a.pollType - b.pollType);

      return {
        ...state,
        polls: addedPolls,
      };
    case "DEL_POLL_OPT":
      const pollArr = state.polls.pollOptions?.filter(
        (p) => p.pollId !== action.payload
      );
      let pollUpd = state.polls;
      pollUpd.pollOptions = pollArr;

      return {
        ...state,
        polls: pollUpd,
      };
    case "CLEAR_POLLS":
      return {
        ...state,
        polls: { pollOptions: [] },
      };
    case "SET_CODE":
      return {
        ...state,
        code: action.payload,
      };
    case "SET_POLLS":
      return {
        ...state,
        polls: action.payload,
      };
    case "SET_PHONE":
      return {
        ...state,
        phone: action.payload,
      };
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
      };
    case "VOTE_BOOL":
      return {
        ...state,
      };
    case "VOTE_DATE":
      return {
        ...state,
      };
    case "VOTE_LIST":
      // based on id, add/update votes: {} with userID
      //remove userid whereever it exists on polls.pollOptions["id"].votes?
      //   if it has pollType of 2 (list)
      //polls.pollOptions["id"].votes["userid"]
      //This might need to be done with useContext

      //removing 1 record that matches the pollType & uid
      const lPolls = state.polls.pollOptions.votes?.filter((v) => v.pollType !== 2 && v.uid !== action.payload.uid );
      
      return {
        ...state,
        polls: lPolls
      };
    case "UPDATE_POLL":
      const index = state.polls.pollOptions?.findIndex(
        (p) => p.pollId === action.payload.pollId
      );
      const copyPolls = state.polls;
      copyPolls.pollOptions[index] = action.payload;

      return {
        ...state,
        polls: copyPolls,
      };
    default:
      return state;
  }
};
