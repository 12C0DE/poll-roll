/* eslint-disable import/no-anonymous-default-export */
import { PollEnums } from "../Enums/PollEnums";
import { format } from "date-fns";

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
    case "SET_BOOL_VOTES":
      return {
        ...state,
        boolVotes: action.payload,
      };
    case "SET_DATE_DATA":
      return {
        ...state,
        dateData: action.payload,
      };
    case "SET_DATE_VOTES":
      return {
        ...state,
        dateVotes: action.payload,
      };
    case "SET_LIST_DATA":
      return {
        ...state,
        listData: action.payload,
      };
    case "SET_LIST_VOTES":
      return {
        ...state,
        listVotes: action.payload,
      };
    case "SET_IP":
      return {
        ...state,
        ip: action.payload,
      };
    case "SET_PHONE":
      return {
        ...state,
        phone: action.payload,
      };
    case "SET_VOTE_ID_PARAM":
      return {
        ...state,
        voteIdParam: action.payload,
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
        if (action.payload.voted) {
          //voting TRUE

          updatedB.pollOptions[indexB].votes.F = updatedB.pollOptions[
            indexB
          ].votes.F.filter((vote) => vote !== action.payload.uid);

          updatedB.pollOptions[indexB].votes.T.push(action.payload.uid);
        } else {
          //voting FALSE

          updatedB.pollOptions[indexB].votes.T = updatedB.pollOptions[
            indexB
          ].votes.T.filter((vote) => vote !== action.payload.uid);

          updatedB.pollOptions[indexB].votes.F.push(action.payload.uid);
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

      //testing if i can update listData here
      let updatedListData = state.listData;
      let updatedDateData = state.dateData;

      if (action.payload.pollType === PollEnums.List) {
        updatedListData.counts = state.listData.names
          .map((name) =>
            filtered1.pollOptions
              .filter((p) => p.pollType === PollEnums.List)
              .filter((l) => l.option === name)
              .map((v) => v?.votes?.length ?? 0)
          )
          .flat();
      } else if (action.payload.pollType === PollEnums.Dates) {
        updatedDateData.counts = state.dateData.names
          .map((name) =>
            filtered1.pollOptions
              .filter((p) => p.pollType === PollEnums.Dates)
              .filter(
                (d) =>
                  `${format(new Date(d.startDate), "M/d/yy")} - ${format(
                    new Date(d.endDate),
                    "M/d/yy"
                  )}` === name
              )
              .map((v) => v?.votes?.length ?? 0)
          )
          .flat();
      }

      return {
        ...state,
        dateData: updatedDateData,
        listData: updatedListData,
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
