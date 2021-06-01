import React from "react";
import { BoolPoll, ListPoll, DatePoll } from "../Components/PollTypes";
import { BoolVote, ListVote, DateVote } from "../Components/VotingPolls";
import { PollEnums } from "../Enums/PollEnums";
import { VoteCountBool, VoteCountOne } from "../Components/VoteCount";

export const dateSplit = (dte) => {
  const dateArr = dte.split("/", 3);

  const dateFormatted = `${dateArr[2]}-${add0(dateArr[0])}-${add0(dateArr[1])}`;
  return dateFormatted;
};

const add0 = (input) => {
  return input.length > 1 ? input : `0${input}`;
};

export const generateVotingPolls = (
  pollType,
  pollID,
  pollOpt,
  pollSD,
  pollED,
  pollVotes,
  uid,
  boolVotes,
  dateVotes,
  listVotes
) => {
  switch (pollType) {
    case PollEnums.Bool:
      const boolDV = checkBoolVote(pollVotes, uid);

      return (
        <React.Fragment>
          <BoolVote
            key={`bool${pollID}`}
            id={pollID}
            pollValue={pollOpt}
            dv={boolDV}
          />
          <VoteCountBool key={`vcb${pollID}`} pollVotes={pollVotes}/>
        </React.Fragment>
        // <BoolVote
        //   key={`bool${pollID}`}
        //   id={pollID}
        //   pollValue={pollOpt}
        //   dv={boolDV}
        // />
      );
    case PollEnums.List:
      return (
        <React.Fragment>
          <ListVote key={`elist${pollID}`} id={pollID} pollValue={pollOpt} />
          <VoteCountOne
            key={`vco${pollID}`}
            pollVotes={pollVotes}
            totalCount={listVotes}
          />
        </React.Fragment>
      );
    case PollEnums.Dates:
      return (
        <React.Fragment>
          <DateVote
            key={`date${pollID}`}
            id={pollID}
            pollValue={`${pollSD} - ${pollED}`}
          />
          <VoteCountOne
            key={`vco${pollID}`}
            pollVotes={pollVotes}
            totalCount={dateVotes}
          />
        </React.Fragment>
      );
    default:
      return null;
  }
};

export const generatePollComps = (
  pollType,
  pollID,
  pollOpt,
  pollSD,
  pollED
) => {
  switch (pollType) {
    case PollEnums.Bool:
      return <BoolPoll key={`bool${pollID}`} id={pollID} pollValue={pollOpt} />;
    case PollEnums.List:
      return (
        <ListPoll key={`elist${pollID}`} id={pollID} pollValue={pollOpt} />
      );
    case PollEnums.Dates:
      return (
        <DatePoll
          key={`date${pollID}`}
          id={pollID}
          pollStart={pollSD}
          pollEnd={pollED}
        />
      );
    default:
      return null;
  }
};

const checkBoolVote = (votes, uid) => {
  try {
    const hasTrue = votes.T.includes(uid);

    if (hasTrue) {
      return true;
    } else {
      const hasFalse = votes.F.includes(uid);

      if (hasFalse) {
        return false;
      } else {
        return null;
      }
    }
  } catch (err) {
    return null;
  }
};

export const getAllVotes = (data, pollType) => {
  return data.pollOptions.filter((vote) => vote.pollType === pollType);
};

export const totalPollVotes = (data) => {
  const totalVotes = data.reduce(function (acc, currVal) {
    if (currVal.hasOwnProperty("votes")) {
      return acc + currVal.votes.length;
    } else {
      return acc + 0;
    }
  }, 0);

  return totalVotes;
};

export const totalBoolVotes = (data) => {
  const tVotes = data.T === undefined ? 0 : data.T.length;
  const fVotes = data.F === undefined ? 0 : data.F.length;

  return tVotes + fVotes;
}
