import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { GlobalContext } from "../Context/GlobalState";
import { dateSplit } from "../functions/funcs";
import { generateVotingPolls } from "../functions/funcs";

export const Voting = () => {
  const { _id } = useParams();
  const { polls, setPolls } = useContext(GlobalContext);
  const [rsvp, setRsvp] = useState("");

  useEffect(() => {
    axios.get(`/polls/${_id}`).then((p) => {
      setPolls(p.data);
      const formDate = dateSplit(
        new Date(p.data.rsvpDate).toLocaleDateString()
      );
      setRsvp(formDate);
    });
  }, []);

  return (
    <div>
      <ul>
        {polls.pollOptions?.map((p) =>
          generateVotingPolls(+p.pollType, p.pollId, p.option)
        )}
      </ul>
    </div>
  );
};
