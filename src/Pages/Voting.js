import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { GlobalContext } from "../Context/GlobalState";
import { dateSplit, getAllVotes, totalPollVotes } from "../functions/funcs";
import { generateVotingPolls } from "../functions/funcs";
import { VoteCountOne } from "../Components/VoteCount";
import { PollEnums } from "../Enums/PollEnums";

export const Voting = () => {
  const { _id } = useParams();
  const {
    boolVotes,
    listVotes,
    dateVotes,
    polls,
    setPolls,
    setDateVotes,
    setListVotes,
    user,
  } = useContext(GlobalContext);
  const [rsvp, setRsvp] = useState("");
  const [voteSaved, setVoteSaved] = useState(false);

  useEffect(() => {
    axios.get(`/polls/${_id}`).then((p) => {
      setPolls(p.data);
      const formDate = dateSplit(
        new Date(p.data.rsvpDate).toLocaleDateString()
      );
      setRsvp(formDate);

      const allLVotes = getAllVotes(p.data, PollEnums.List);
      setListVotes(totalPollVotes(allLVotes));
      const allDVotes = getAllVotes(p.data, PollEnums.Dates);
      setDateVotes(totalPollVotes(allDVotes));
    });
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log("in time UE");
      setVoteSaved(false);
    }, [2500]);
    // Clear timeout if the component is unmounted
    return () => clearTimeout(timer);
  }, [voteSaved, setVoteSaved]);

  const submitVote = () => {
    console.log("submit vote");

    axios.patch(`/polls/upd/${_id}`, polls).then(setVoteSaved(true));
  };

  return (
    <div>
      <ul>
        {polls.pollOptions?.map((p) =>
          generateVotingPolls(
            +p.pollType,
            p.pollId,
            p.option,
            p.startDate,
            p.endDate,
            p.votes,
            user._id,
            boolVotes,
            dateVotes,
            listVotes
          )
        )}
      </ul>
      <button onClick={() => submitVote()}>Submit Votes</button>
      <div>{voteSaved && <h2>Your vote has been saved.</h2>}</div>
    </div>
  );
};
