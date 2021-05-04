import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { PollTypeList } from "../Components/PollTypeList";
import uuid from "react-uuid";
import { PollEnums } from "../Enums/PollEnums";
import { BoolPoll, ListPoll, DatePoll } from "../Components/PollTypes";
import { GlobalContext } from "../Context/GlobalState";
import { dateSplit } from "../functions/funcs";

export const EditPolls2 = () => {
  const { _id } = useParams();
  const { polls, addPollOption, setPolls } = useContext(GlobalContext);
  const [details, setDetails] = useState("");
  const [rsvp, setRsvp] = useState("");

  useEffect(() => {
    axios.get(`/polls/${_id}`).then((p) => {
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

  const generatePollComps = (poll, pollID, pollValue) => {
    console.log(`poll ${poll}`);

    switch (poll) {
      case PollEnums.Bool:
        return (
          <BoolPoll
            key={`bool${pollID}`}
            id={pollID}
            pollValue={pollValue}
            isPollOption={true}
          />
        );
      case PollEnums.List:
        return (
          <ListPoll
            key={`list${pollID}`}
            id={pollID}
            pollValue={pollValue}
            isPollOption={true}
          />
        );
      case PollEnums.Dates:
        return (
          <DatePoll
            key={`date${pollID}`}
            id={pollID}
            pollValue={pollValue}
            isPollOption={true}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <p>Edit Poll</p>
      <h3>{polls.pollName}</h3>
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
            generatePollComps(+p.pollType, p.pollId, p.option)
          )}
        </ul>
      </div>
      <button>Delete Poll</button>
      <button>Save</button>
    </div>
  );
};
