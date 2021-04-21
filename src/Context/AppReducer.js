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
        polls: state.polls.splice(action.payload, 1),
      };
    default:
      return state;
  }
};
