import React, { useContext, useState } from "react";
import { withRouter } from "react-router";
import { GlobalContext } from "../Context/GlobalState";
import { BoolPoll, ListPoll, DatePoll } from "../Components/PollTypes";
import { PollEnums } from "../Enums/PollEnums";
import uuid from "react-uuid";
import axios from "axios";

const CreatePoll = ({ history }) => {
  const [rsvpDate, setRsvpDate] = useState("");
  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [selPoll, setSelPoll] = useState(PollEnums.None);
  const { polls, addPoll, clearPolls, user } = useContext(GlobalContext);

  const clearInputs = () => {
    console.log("clear inputs");
    setName("");
    setDetails("");
    setRsvpDate("");
    clearPolls();
    setSelPoll(PollEnums.None);
  };

  const add2Polls = (e, poll) => {
    e.preventDefault();

    if (+poll === PollEnums.None) {
      return;
    }

    const newPoll = {
      pollType: +poll,
      pollId: uuid(),
      data: [],
    };

    addPoll(newPoll);
  };

  const generatePollComps = (poll, pollID) => {
    console.log(`poll ${poll}`);

    switch (poll) {
      case PollEnums.Bool:
        return <BoolPoll key={`bool${pollID}`} id={pollID} />;
      case PollEnums.List:
        return <ListPoll key={`list${pollID}`} id={pollID} />;
      case PollEnums.Dates:
        return <DatePoll key={`date${pollID}`} id={pollID} />;
      default:
        return null;
    }
  };

  const submitPoll = (e) => {
    e.preventDefault();

    if (!polls.length > 0) {
      return;
    }

    const newPoll = {
      pollName: name,
      details: details,
      rsvpDate: rsvpDate,
      pollOptions: polls,
      authId: user.authId,
    };

    axios.post("/polls/post", newPoll).then((res) => {
      clearInputs();
      history.push(`/editPoll/${res.data._id}`);
    });
  };

  return (
    <div>
      <h2>Create a Poll</h2>
      <form onSubmit={submitPoll}>
        <div>
          <label>Title</label>
          <input
            type="text"
            required={true}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>Details</label>
          <textarea
            onChange={(e) => setDetails(e.target.value)}
            value={details}
          />
        </div>
        <div>
          <label>RSVP by</label>
          <input
            type="date"
            required={true}
            onChange={(e) => setRsvpDate(e.target.value)}
            value={rsvpDate}
          />
        </div>
        <div>
          <label>Type of poll</label>
          <select value={selPoll} onChange={(e) => setSelPoll(e.target.value)}>
            <option value={PollEnums.None}>- Select One -</option>
            <option value={PollEnums.Dates}>Dates</option>
            <option value={PollEnums.List}>List</option>
            <option value={PollEnums.Bool}>T/F</option>
          </select>
          <button onClick={(e) => add2Polls(e, selPoll)}>Add Poll</button>
        </div>
        <div>
          {polls?.map((poll) => generatePollComps(+poll.pollType, poll.pollId))}
        </div>
        <div>
          <input type="submit" value="Submit" />
          <input type="button" value="Clear" onClick={() => clearInputs()} />
        </div>
      </form>
    </div>
  );
};
export default withRouter(CreatePoll);
