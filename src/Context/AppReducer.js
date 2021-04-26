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
    case "SET_CODE":
      return {
        ...state,
        code: action.payload,
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
        (poll) => poll.id === action.payload.id
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
