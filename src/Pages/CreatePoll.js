import React, { useEffect, useState } from "react";
import { BoolPoll, ListPoll, DatePoll } from "../Components/PollTypes";
import { PollEnums } from "../PollEnums";

export const CreatePoll = () => {
  const [rsvpDate, setRsvpDate] = useState("");
  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [polls, setPolls] = useState([]);
  const [selPoll, setSelPoll] = useState(PollEnums.None);

  const clearInputs = () => {
    setName("");
    setDetails("");
    setRsvpDate("");
    setPolls([]);
    setSelPoll([]);
  };

  const addPoll = (e, poll) => {
    e.preventDefault();
    setPolls([poll, ...polls]);
  };

  const generatePollComps = (poll, index) => {
    console.log(`poll ${poll}`);

    switch (poll) {
      case PollEnums.Bool:
        return <BoolPoll ind={index} />;
      case PollEnums.List:
        return <ListPoll ind={index} />;
      case PollEnums.Dates:
        return <DatePoll />;
      default:
        return null;
    }
  };

  return (
    <div>
      <h2>Create a Poll</h2>
      <form>
        <div>
          <label>Title</label>
          <input
            type="text"
            required={true}
            onChange={(e) => setName(e.target.value)}
            value={name}
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
            <option>- Select One -</option>
            <option value={PollEnums.Dates}>Dates</option>
            <option value={PollEnums.List}>List</option>
            <option value={PollEnums.Bool}>T/F</option>
          </select>
          <button onClick={(e) => addPoll(e, selPoll)}>Add Poll</button>
        </div>
        <div className="pollContainer"></div>
        <div>{polls.map((poll, index) => generatePollComps(+poll, index))}</div>
        <div>
          <input type="submit" value="Submit" />
          <input type="button" value="Clear" onClick={() => clearInputs()} />
        </div>
      </form>
    </div>
  );
};
