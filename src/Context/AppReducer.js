export default (state, action) => {
  switch (action.type) {
    case "ADD_POLL":
      return {
        ...state,
        polls: [action.payload, ...state.polls],
      };
    case "DEL_POLL":
      return {
        ...state,
        polls: state.polls.filter((poll) => poll.pollId !== action.payload),
      };
    case "CLEAR_POLLS":
      return {
        ...state,
        polls: [],
      };
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};
