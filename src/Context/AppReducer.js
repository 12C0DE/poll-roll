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
