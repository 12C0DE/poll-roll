import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { useLocation } from "react-router-dom";
import { GlobalContext } from "../Context/GlobalState";
import { dateSplit, getAllVotes, totalPollVotes } from "../functions/funcs";
import { PollEnums } from "../Enums/PollEnums";

import axios from "axios";

export const Results = () => {
  const { _id } = useParams();
  let location = useLocation();
  let voteEnd = new URLSearchParams(location.search).get("voteEnd");
  const { polls, setPolls, setListVotes, setDateVotes } =
    useContext(GlobalContext);
  const [rsvp, setRsvp] = useState("");

  useEffect(() => {
    const cancelToken = axios.CancelToken;
    const source = cancelToken.source();

    try {
      axios.get(`/polls/${_id}`, { signal: source }).then((p) => {
        setPolls(p.data);

        const formDate = dateSplit(
          new Date(p.data.rsvpDate).toLocaleDateString()
        );
        setRsvp(formDate);

        const allLVotes = getAllVotes(p.data, PollEnums.List);
        setListVotes(totalPollVotes(allLVotes));

        const allDVotes = getAllVotes(p.data, PollEnums.Dates);
        setDateVotes(totalPollVotes(allDVotes));
        console.log("finished UE");
      });
    } catch (err) {
      if (axios.isCancel(err)) {
        return "axios request cancelled";
      }
      return err;
    }
    return () => {
      source.cancel();
    };
  }, []);

  return (
    <div>
      <div>
        <h2>results</h2>
      </div>
      {voteEnd && <h3>Voting has ended for this poll</h3>}
    </div>
  );
};
