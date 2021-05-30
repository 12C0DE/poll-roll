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
    case "VOTE_MANY":
      const indexB = state.polls.pollOptions?.findIndex(
        (p) => p.pollId === action.payload.pollId
      );
      let updatedB = state.polls;

      if (updatedB.pollOptions[indexB].hasOwnProperty("votes")) {
        let foundIndex;

        if (action.payload.voted) {
          foundIndex = updatedB.pollOptions[indexB].votes.F.indexOf(
            action.payload.uid
          );

          foundIndex !== -1 &&
            updatedB.pollOptions[indexB].votes.F.splice(foundIndex, 1);

          updatedB.pollOptions[indexB].votes.T.unshift(action.payload.uid);
        } else {
          foundIndex = updatedB.pollOptions[indexB].votes.T.indexOf(
            action.payload.uid
          );

          foundIndex !== -1 &&
            updatedB.pollOptions[indexB].votes.T.splice(foundIndex, 1);

          updatedB.pollOptions[indexB].votes.F.unshift(action.payload.uid);
        }
      } else {
        action.payload.voted
          ? (updatedB.pollOptions[indexB].votes = {
              T: [action.payload.uid],
              F: [],
            })
          : (updatedB.pollOptions[indexB].votes = {
              T: [],
              F: [action.payload.uid],
            });
      }

      return {
        ...state,
        polls: updatedB,
      };
    case "VOTE_ONE":
      const indexL = state.polls.pollOptions?.findIndex(
        (p) => p.pollId === action.payload.pollId
      );

      let filtered1 = state.polls;

      filtered1.pollOptions.every((item) => {
        if (
          item.pollType === action.payload.pollType &&
          item.hasOwnProperty("votes")
        ) {
          const voteInd = item.votes.indexOf(action.payload.uid);
          if (voteInd !== -1) {
            item.votes.splice(voteInd, 1);
            return false;
          }
        }
        return true;
      });

      //adding new vote
      filtered1.pollOptions[indexL].hasOwnProperty("votes")
        ? filtered1.pollOptions[indexL].votes.unshift(action.payload.uid)
        : (filtered1.pollOptions[indexL].votes = [action.payload.uid]);

      return {
        ...state,
        polls: filtered1,
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
