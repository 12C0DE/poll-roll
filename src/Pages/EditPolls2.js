import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import uuid from "react-uuid";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { PollTypeList } from "../Components/PollTypeList";
import { PollEnums } from "../Enums/PollEnums";
import { GlobalContext } from "../Context/GlobalState";
import { dateSplit } from "../functions/funcs";
import { generatePollComps } from "../functions/funcs";

export const EditPolls2 = () => {
  const { _id, authId } = useParams();
  const { polls, addPollOption, setPolls } = useContext(GlobalContext);
  const [details, setDetails] = useState("");
  const [rsvp, setRsvp] = useState("");

  useEffect(() => {
    axios.get(`/polls/${_id}/${authId}`).then((p) => {
      console.log("poll useEffect");
      setPolls(p.data);
      setDetails(p.data.details);
      const formDate = dateSplit(
        new Date(p.data.rsvpDate).toLocaleDateString()
      );
      setRsvp(formDate);
    });
  }, []);

  const add2Polls = (poll) => {
    if (+poll === PollEnums.None) {
      return;
    }

    try {
      const newPoll = {
        pollType: +poll,
        pollId: uuid(),
      };

      addPollOption(newPoll);
    } catch (err) {
      console.log(err);
    }
  };

  const submitUpdate = (e) => {
    e.preventDefault();

    if (!polls.pollOptions.length > 0) {
      return;
    }

    const updatedPoll = {
      pollName: polls.pollName,
      details: details,
      rsvpDate: rsvp,
      pollOptions: polls.pollOptions,
      authId: polls.authId,
    };

    axios.patch(`/polls/upd/${_id}`, updatedPoll).then((res) => {
      console.log("poll updated");
    });
  };

  return (
    <div>
      <p>Edit Poll</p>
      <h3>{polls.pollName}</h3>
      <h3>
        <Link to={`/voting/${_id}`}> Go to Voting</Link>
      </h3>
      <h3>
        <Link to={`/results/${_id}`}>Go to Results</Link>
      </h3>
      <h4>Copy Voting URL: /voting/{_id}</h4>
      <div>
        <label>Details</label>
        <textarea
          onChange={(e) => setDetails(e.target.value)}
          defaultValue={polls.details}
        />
      </div>
      <div>
        <label>RSVP by</label>
        <input
          type="date"
          required={true}
          onChange={(e) => setRsvp(e.target.value)}
          defaultValue={rsvp}
        />
      </div>
      <div>
        <PollTypeList add={add2Polls} />
        <ul>
          {polls.pollOptions?.map((p) =>
            generatePollComps(
              +p.pollType,
              p.pollId,
              p.option,
              p.startDate,
              p.endDate
            )
          )}
        </ul>
      </div>
      <button>Delete Poll</button>
      <button onClick={(e) => submitUpdate(e)}>Save</button>
    </div>
  );
};
