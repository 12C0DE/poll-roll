import React, { useContext } from "react";
import { BoolPoll, ListPoll, DatePoll } from "../Components/PollTypes";
import { BoolVote, ListVote, DateVote } from "../Components/VotingPolls";
import { BoolResult, DateResult, ListResult } from "../Components/ResultPolls";
import { PollEnums } from "../Enums/PollEnums";
import { VoteCountBool, VoteCountOne } from "../Components/VoteCount";
import { GlobalContext } from "../Context/GlobalState";
import "chart.js/auto";
import { Chart } from "react-chartjs-2";
import { format } from "date-fns";

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

export const GenerateVotingPolls = (
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
  const { dateData, listData, polls } = useContext(GlobalContext);

  switch (pollType) {
    case PollEnums.Bool:
      const boolDV = checkBoolVote(pollVotes, uid);

      return (
        <div
          key={`rf${pollID}`}
          className="mb-8"
          style={{
            backgroundColor: "#f6f5fa",
            padding: "20px",
            borderRadius: 15,
          }}
        >
          <BoolVote
            key={`bool${pollID}`}
            id={pollID}
            pollValue={pollOpt}
            dv={boolDV}
          />
          <VoteCountBool key={`vcb${pollID}`} pollVotes={pollVotes} />
        </div>
      );
    case PollEnums.List:
      const currVoteIdL = checkTypeVote(polls.pollOptions, uid, PollEnums.List);

      return (
        <div
          key={`rf${pollID}`}
          style={{ backgroundColor: "#FBF9F6", borderRadius: 15 }}
          className="p-2"
        >
          <ListVote
            key={`elist${pollID}`}
            id={pollID}
            pollValue={pollOpt}
            currVoteId={currVoteIdL}
          />
          {listData.counts.reduce((a, b) => a + b, 0) > 0 &&
          listData.names[listData.names.length - 1] === pollOpt ? (
            <Chart
              type="doughnut"
              legend={"top"}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: "top",
                  },
                },
              }}
              data={{
                labels: listData.names,
                datasets: [
                  {
                    data: listData.counts,
                    backgroundColor: getchartColors(listData.names.length),
                  },
                ],
              }}
            />
          ) : null}
        </div>
      );
    case PollEnums.Dates:
      const currVoteIdD = checkTypeVote(
        polls.pollOptions,
        uid,
        PollEnums.Dates
      );

      return (
        <div
          key={`rf${pollID}`}
          style={{ backgroundColor: "#FBF9c6", borderRadius: 15 }}
          className="p-2"
        >
          <DateVote
            key={`date${pollID}`}
            id={pollID}
            pollValue={`${format(new Date(pollSD), "M/d/yy")} - ${format(
              new Date(pollED),
              "M/d/yy"
            )}`}
            currVoteId={currVoteIdD}
          />
          {dateData.counts.reduce((a, b) => a + b, 0) > 0 &&
          dateData.names[dateData.names.length - 1] ===
            `${format(new Date(pollSD), "M/d/yy")} - ${format(
              new Date(pollED),
              "M/d/yy"
            )}` ? (
            <Chart
              type="doughnut"
              legend={"top"}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: "top",
                  },
                },
              }}
              data={{
                labels: dateData.names,
                datasets: [
                  {
                    data: dateData.counts,
                    backgroundColor: getchartColors(dateData.names.length),
                  },
                ],
              }}
            />
          ) : null}
        </div>
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

const checkTypeVote = (votes, uid, pollType) => {
  try {
    const currVoteId = votes
      .filter((p) => +p.pollType === pollType)
      .find((pv) => pv?.votes?.includes(uid))?.pollId;

    return currVoteId;
  } catch (err) {
    console.log(err);
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

export const getchartColors = (arrLength) => {
  const colors = [
    "purple",
    "green",
    "red",
    "blue",
    "yellow",
    "orange",
    "pink",
    "black",
    "gray",
    "white",
  ];

  return colors.slice(0, arrLength);
};
