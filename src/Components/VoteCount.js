import React from "react";
import { totalBoolVotes } from "../functions/funcs";
import "chart.js/auto";
import { Chart } from "react-chartjs-2";

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
  const totalCount = pollVotes === undefined ? 0 : totalBoolVotes(pollVotes);
  let tCount = pollVotes?.T.length;
  let fCount = totalCount - tCount;

  return (
    <div>
      {totalCount !== 0 && (
        <Chart
          type="bar"
          options={{
            indexAxis: "y",
            scales: {
              x: {
                min: 0,
                max: totalCount,
                ticks: {
                  decimals: 0,
                },
              },
            },
          }}
          data={{
            labels: ["True", "False"],
            datasets: [
              {
                label: `Votes (${totalCount} total)`,
                data: [tCount, fCount],
                backgroundColor: ["#76deb1", "#f76e89"],
              },
            ],
          }}
        />
      )}
    </div>
  );
};
