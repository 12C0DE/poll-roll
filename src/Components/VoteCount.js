import React from "react";

export const VoteCountOne = ({ pollVotes, totalCount }) => {
  const pollCount = pollVotes === undefined ? 0 : pollVotes.length;
  const currPerc = Math.round((pollCount / totalCount) * 100);

  return (
    <div>
      {totalCount !== 0 && (
        <React.Fragment>
          <p>{`${pollCount} out of ${totalCount}`}</p>
          <p>{`${currPerc}%`}</p>
        </React.Fragment>
      )}
    </div>
  );
};

export const VoteCountBool = ({ pollVal, tCount, fCount }) => {
  //have pollVal, T.Count, F.Count, totalCount
  const totalCount = tCount + fCount;
  const tPerc = tCount / totalCount;
  const fPerc = 100 - tPerc;

  return (
    <div>
      <p>{pollVal}</p>
      <p>T: {tPerc}</p>
      <p>F: {fPerc}</p>
    </div>
  );
};
