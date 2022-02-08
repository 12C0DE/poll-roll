import React from "react";
import { BoolPoll, ListPoll, DatePoll } from "../Components/PollTypes";
import { BoolVote, ListVote, DateVote } from "../Components/VotingPolls";
import { BoolResult, DateResult, ListResult } from "../Components/ResultPolls";
import { PollEnums } from "../Enums/PollEnums";
import { VoteCountBool, VoteCountOne } from "../Components/VoteCount";

export const dateSplit = (dte) => {
  const dateArr = dte.split("/", 3);
  dateArr[1] = (+dateArr[1] + 1).toString();

  let dateFormatted = `${dateArr[2]}-${add0(dateArr[0])}-${add0(dateArr[1])}`;
  return dateFormatted;
};

const add0 = (input) => {
  return input.length > 1 ? input : `0${input}`;
};

export const generateResultPolls = (
  pollType,
  pollID,
  pollValue,
  startDate,
  endDate,
  pollVotes,
  dateVotes,
  listVotes
) => {
  switch (pollType) {
    case PollEnums.Bool:
      return (
        <BoolResult
          key={`br${pollID}`}
          pollValue={pollValue}
          pollVotes={pollVotes}
        />
      );
    case PollEnums.Dates:
      return (
        <DateResult
          key={`dr${pollID}`}
          pollValue={`${startDate} - ${endDate}`}
          pollVotes={pollVotes}
          totalCount={dateVotes}
        />
      );
    case PollEnums.List:
      return (
        <ListResult
          key={`lr${pollID}`}
          pollValue={pollValue}
          pollVotes={pollVotes}
          totalCount={listVotes}
        />
      );
    default:
      return null;
  }
};

export const generateVotingPolls = (
  pollType,
  pollID,
  pollOpt,
  pollSD,
  pollED,
  pollVotes,
  uid,
  dateVotes,
  listVotes
) => {
  switch (pollType) {
    case PollEnums.Bool:
      const boolDV = checkBoolVote(pollVotes, uid);

      return (
        <React.Fragment key={`rf${pollID}`}>
          <BoolVote
            key={`bool${pollID}`}
            id={pollID}
            pollValue={pollOpt}
            dv={boolDV}
          />
          <VoteCountBool key={`vcb${pollID}`} pollVotes={pollVotes} />
        </React.Fragment>
      );
    case PollEnums.List:
      return (
        <React.Fragment key={`rf${pollID}`}>
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
        <React.Fragment key={`rf${pollID}`}>
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
  const tVotes = data?.T === undefined ? 0 : data.T.length;
  const fVotes = data?.F === undefined ? 0 : data.F.length;

  return tVotes + fVotes;
};
