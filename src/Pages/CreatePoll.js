import React, { useState } from "react";
import { BoolPoll, ListPoll } from "../Components/PollTypes";
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
  };

  const addPoll = (e, poll) => {
    e.preventDefault();
    setPolls([poll, ...polls]);
  };

  // const generatePollComps = () => {
  //   polls.map((poll) => {
  //     console.log(`poll ${poll}`);
  //     switch (poll) {
  //       case PollEnums.Bool:
  //         return <BoolPoll />;
  //       case PollEnums.Dates:
  //         return <ListPoll />;
  //       default:
  //         return null;
  //     }
  //   });
  // };

  const generatePollComps = (poll) => {
    console.log(`poll ${poll}`);
    // let comp;

    switch (poll) {
      case PollEnums.Bool:
        return <BoolPoll />;
      // comp = <BoolPoll />;
      // break;
      case PollEnums.Dates:
        return <ListPoll />;
      // comp = <ListPoll />;
      default:
        return null;
    }
    // return comp;
  };

  return (
    <div>
      <h2>Create a Poll</h2>
      <form>
        <div>
          <label>Name</label>
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
        <div>
          <input type="submit" value="Submit" />
          <input type="button" value="Clear" onClick={() => clearInputs()} />
        </div>
        {/* <div>{polls.map((poll) => generatePollComps(poll))}</div> */}
        <div>
          {/* {polls.map((poll) =>
            +poll === PollEnums.List ? <h1>list</h1> : <h1>Bool</h1>
          )} */}
          {polls.map((poll) => generatePollComps(poll))}
        </div>
      </form>
    </div>
  );
};
