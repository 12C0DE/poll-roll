import React from "react";
import { VoteCountBool, VoteCountOne } from "../Components/VoteCount";

export const BoolResult = ({ pollValue, pollVotes }) => {
  return (
    <div>
      <h3>{pollValue}</h3>
      <VoteCountBool pollVotes={pollVotes} />
    </div>
  );
};

export const DateResult = ({ pollValue, pollVotes, totalCount }) => {
  return (
    <div>
      <h3>{pollValue}</h3>
      <VoteCountOne pollVotes={pollVotes} totalCount={totalCount} />
    </div>
  );
};

export const ListResult = ({ pollValue, pollVotes, totalCount }) => {
  return (
    <div>
      <h3>{pollValue}</h3>
      <VoteCountOne pollVotes={pollVotes} totalCount={totalCount} />
    </div>
  );
};
