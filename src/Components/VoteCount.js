import React from "react";
import {totalBoolVotes} from '../functions/funcs';

export const VoteCountOne = ({ pollVotes, totalCount }) => {
  const pollCount = pollVotes === undefined ? 0 : pollVotes.length;
  const currPercent = Math.round((pollCount / totalCount) * 100);

  return (
    <div>
      {totalCount !== 0 && (
        <React.Fragment>
          <p>{`${pollCount} out of ${totalCount}`}</p>
          <p>{`${currPercent}%`}</p>
        </React.Fragment>
      )}
    </div>
  );
};

export const VoteCountBool = ({ pollVotes }) => {
  const totalCount = totalBoolVotes(pollVotes);
  const tPercent = Math.round((pollVotes.T.length / totalCount) * 100);
  const fPercent = 100 - tPercent;

  return (
    <div>
      <p>T: {tPercent}%</p>
      <p>F: {fPercent}%</p>
    </div>
  );
};
