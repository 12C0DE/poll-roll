import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { useLocation } from "react-router-dom";
import { GlobalContext } from "../Context/GlobalState";
import {
  dateSplit,
  generateResultPolls,
  getAllVotes,
  totalPollVotes,
} from "../functions/funcs";
import { PollEnums } from "../Enums/PollEnums";
import { TopSectionLbls } from "../Components/topSectionLbls";
import axios from "axios";

export const Results = () => {
  const { _id } = useParams();
  let location = useLocation();
  let voteEnd = new URLSearchParams(location.search).get("voteEnd");
  const { listVotes, dateVotes, polls, setPolls, setListVotes, setDateVotes } =
    useContext(GlobalContext);
  const [rsvp, setRsvp] = useState("");
  const [isLoading, setIsLoading] = useState(true);

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
        setIsLoading(false);
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
      {isLoading ? null : (
        <React.Fragment>
          <div>
            <h2>RESULTS</h2>
          </div>
          {voteEnd && <h3>Voting has ended for this poll</h3>}
          <TopSectionLbls
            pollname={polls.pollName}
            details={polls.details}
            rsvp={rsvp}
          />
          <ul>
            {polls.pollOptions?.map((p) =>
              generateResultPolls(
                +p.pollType,
                p.pollId,
                p.option,
                p.startDate,
                p.endDate,
                p.votes,
                dateVotes,
                listVotes
              )
            )}
          </ul>
        </React.Fragment>
      )}
    </div>
  );
};
