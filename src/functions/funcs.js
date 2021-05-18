import React from "react";
import { BoolPoll, ListPoll, DatePoll } from "../Components/PollTypes";
import { BoolVote, ListVote, DateVote } from "../Components/VotingPolls";
import { PollEnums } from "../Enums/PollEnums";

export const dateSplit = (dte) => {
  const dateArr = dte.split("/", 3);

  const dateFormatted = `${dateArr[2]}-${add0(dateArr[0])}-${add0(dateArr[1])}`;
  return dateFormatted;
};

const add0 = (input) => {
  return input.length > 1 ? input : `0${input}`;
};

export const generateVotingPolls = (poll, pollID, pollValue) => {
  switch (poll) {
    case PollEnums.Bool:
      return (
        <BoolVote key={`bool${pollID}`} id={pollID} pollValue={pollValue} />
      );
    case PollEnums.List:
      return (
        <ListVote key={`elist${pollID}`} id={pollID} pollValue={pollValue} />
      );
    case PollEnums.Dates:
      return (
        <DateVote key={`date${pollID}`} id={pollID} pollValue={pollValue} />
      );
    default:
      return null;
  }
};

export const generatePollComps = (poll, pollID, pollValue) => {
  switch (poll) {
    case PollEnums.Bool:
      return (
        <BoolPoll key={`bool${pollID}`} id={pollID} pollValue={pollValue} />
      );
    case PollEnums.List:
      return (
        <ListPoll key={`elist${pollID}`} id={pollID} pollValue={pollValue} />
      );
    case PollEnums.Dates:
      return (
        <DatePoll key={`date${pollID}`} id={pollID} pollValue={pollValue} />
      );
    default:
      return null;
  }
};
