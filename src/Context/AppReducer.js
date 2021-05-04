export default (state, action) => {
  switch (action.type) {
    case "ADD_POLL":
      return {
        ...state,
        polls: [action.payload, ...state.polls],
      };
    case "ADD_POLL_OPT":
      const ind = state.polls.findIndex(
        (poll) => poll.pollId === action.payload.pollId
      );
      const copiedPolls = state.polls;
      copiedPolls[ind].pollOptions = action.payload;

      return {
        ...state,
        polls: copiedPolls,
      };
    case "DEL_POLL":
      return {
        ...state,
        polls: state.polls.filter((poll) => poll.pollId !== action.payload),
      };
    case "DEL_POLL_OPT":
      const pollArr = state.polls.pollOptions?.filter(
        (p) => p.pollId !== action.payload
      );

      return {
        ...state,
        polls: pollArr,
      };
    case "CLEAR_POLLS":
      return {
        ...state,
        polls: [],
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
      const index = state.polls.findIndex(
        (poll) => poll.pollId === action.payload.pollId
      );
      const copyPolls = state.polls;
      copyPolls[index] = action.payload;

      return {
        ...state,
        polls: copyPolls,
      };
    default:
      return state;
  }
};
