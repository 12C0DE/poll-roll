import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { GlobalContext } from "../Context/GlobalState";
import { dateSplit } from "../functions/funcs";
import { generateVotingPolls } from "../functions/funcs";

export const Voting = () => {
  const { _id } = useParams();
  const { polls, setPolls, user } = useContext(GlobalContext);
  const [rsvp, setRsvp] = useState("");
  const [voteSaved, setVoteSaved] = useState(false);

  useEffect(() => {
    axios.get(`/polls/${_id}`).then((p) => {
      setPolls(p.data);
      const formDate = dateSplit(
        new Date(p.data.rsvpDate).toLocaleDateString()
      );
      setRsvp(formDate);
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
            user._id
          )
        )}
      </ul>
      <button onClick={() => submitVote()}>Submit Votes</button>
      <div>{voteSaved && <h2>Your vote has been saved.</h2>}</div>
    </div>
  );
};
