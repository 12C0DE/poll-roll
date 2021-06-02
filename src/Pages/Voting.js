import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams, withRouter } from "react-router";
import { GlobalContext } from "../Context/GlobalState";
import { dateSplit, getAllVotes, totalPollVotes } from "../functions/funcs";
import { generateVotingPolls } from "../functions/funcs";
import { PollEnums } from "../Enums/PollEnums";

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
  const [showResults, setShowResults] = useState(false);
  const [voteSaved, setVoteSaved] = useState(false);

  useEffect(() => {
    // const abortConst = new AbortController();
    const cancelToken = axios.CancelToken;
    const source = cancelToken.source();

    // axios.get(`/polls/${_id}`, { signal: abortConst.signal }).then((p) => {
    axios.get(`/polls/${_id}`, { source }).then((p) => {
      const rsvpCheck = new Date(p.data.rsvpDate);
      console.log("starting UE");
      if (rsvpCheck.getTime() < Date.now()) {
        // history.push("/results");
        setShowResults(true);
        // abortConst.abort();
        source.cancel("voting is over");
      }

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
    showResults && history.push("/results");

    // return () => abortConst.abort();
    return () => {
      source.cancel();
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log("in timer UE");
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
      <h2>{polls.pollName}</h2>
      <div>
        <p>{polls.details}</p>
      </div>
      <div>
        <label>RSVP by</label>
        <h3>{rsvp}</h3>
      </div>
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

export default withRouter(Voting);
