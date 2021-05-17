import React from "react";
import { BoolPoll, ListPoll, DatePoll } from "../Components/PollTypes";
import { PollEnums } from "../Enums/PollEnums";

export const dateSplit = (dte) => {
  const dateArr = dte.split("/", 3);

  const dateFormatted = `${dateArr[2]}-${add0(dateArr[0])}-${add0(dateArr[1])}`;
  return dateFormatted;
};

const add0 = (input) => {
  return input.length > 1 ? input : `0${input}`;
};

export const generatePollComps = (poll, pollID, pollValue) => {
  switch (poll) {
    case PollEnums.Bool:
      return (
        <BoolPoll
          key={`bool${pollID}`}
          id={pollID}
          pollValue={pollValue}
          isPollOption={true}
        />
      );
    case PollEnums.List:
      return (
        <ListPoll
          key={`elist${pollID}`}
          id={pollID}
          pollValue={pollValue}
          isPollOption={true}
        />
      );
    case PollEnums.Dates:
      return (
        <DatePoll
          key={`date${pollID}`}
          id={pollID}
          pollValue={pollValue}
          isPollOption={true}
        />
      );
    default:
      return null;
  }
};
