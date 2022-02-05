import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams, withRouter } from "react-router";
import { GlobalContext } from "../Context/GlobalState";
import { dateSplit, getAllVotes, totalPollVotes } from "../functions/funcs";
import { generateVotingPolls } from "../functions/funcs";
import { PollEnums } from "../Enums/PollEnums";
import { TopSectionLbls } from "../Components/topSectionLbls";

const Voting = ({ history }) => {
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
  const [isLoading, setIsLoading] = useState(true);
  const [voteSaved, setVoteSaved] = useState(false);

  useEffect(() => {
    const cancelToken = axios.CancelToken;
    const source = cancelToken.source();

    try {
      axios.get(`/polls/${_id}`, { signal: source }).then((p) => {
        const rsvpCheck = new Date(p.data.rsvpDate);
        if (rsvpCheck.getTime() < Date.now()) {
          history.push(`/results/${_id}?voteEnd=1`);
        } else {
          setPolls(p.data);
          const formDate = dateSplit(
            new Date(p.data.rsvpDate).toLocaleDateString()
          );
          setRsvp(formDate);

          const allLVotes = getAllVotes(p.data, PollEnums.List);
          setListVotes(totalPollVotes(allLVotes));
          const allDVotes = getAllVotes(p.data, PollEnums.Dates);
          setDateVotes(totalPollVotes(allDVotes));
        }
        setIsLoading(false);
      });
    } catch (err) {
      if (axios.isCancel(err)) {
        history.push("/results");
        return "axios request cancelled";
      }
      return err;
    }
    return () => {
      source.cancel();
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVoteSaved(false);
    }, [2500]);
    // Clear timeout if the component is unmounted
    return () => clearTimeout(timer);
  }, [voteSaved, setVoteSaved]);

  const submitVote = () => {
    axios.patch(`/polls/upd/${_id}`, polls).then(setVoteSaved(true));
  };

  return (
    <div>
      {isLoading ? null : (
        <React.Fragment>
          <TopSectionLbls
            pollname={polls.pollName}
            details={polls.details}
            rsvp={rsvp}
          />
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
        </React.Fragment>
      )}
    </div>
  );
};

export default withRouter(Voting);
