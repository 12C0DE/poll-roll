import React, { useContext, useState } from "react";
import { GlobalContext } from "../Context/GlobalState";
import { BoolPoll, ListPoll, DatePoll } from "../Components/PollTypes";
import { PollEnums } from "../PollEnums";

export const CreatePoll = () => {
  const [rsvpDate, setRsvpDate] = useState("");
  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  // const [polls, setPolls] = useState([]);
  const [selPoll, setSelPoll] = useState(PollEnums.None);
  const { polls, addPoll, delPoll } = useContext(GlobalContext);

  const clearInputs = () => {
    console.log("clear inputs");
    setName("");
    setDetails("");
    setRsvpDate("");
    // setPolls([]);
    setSelPoll([]);
  };

  const add2Polls = (e, poll) => {
    e.preventDefault();
    // addPoll([poll, ...polls]);
    const newPoll = {
      val: poll,
      pollIndex: polls.length,
    };

    addPoll(newPoll);
  };

  const delPolls = (pollIndex) => {
    // e.preventDefault();
    console.log(`pollIndex ${pollIndex}`);
    let newPolls = polls.splice(pollIndex, 1);

    // setPolls(polls.splice(pollIndex, 1));
    // setPolls(newPolls);
  };

  const generatePollComps = (poll, index) => {
    console.log(`poll ${poll}`);

    switch (poll) {
      case PollEnums.Bool:
        return (
          <BoolPoll
            key={`bool${index}`}
            ind={index}
            // delPoll={(e) => delPoll(e, index)}
            delPoll={delPolls}
          />
        );
      case PollEnums.List:
        return (
          <ListPoll
            key={`list${index}`}
            ind={index}
            // delPoll={(e) => delPoll(e, index)}
            delPoll={delPolls}
          />
        );
      case PollEnums.Dates:
        return (
          <DatePoll
            key={`date${index}`}
            ind={index}
            // delPoll={(e) => delPoll(e, index)}
            delPoll={delPolls}
          />
        );
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
            // required={true}
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
            // required={true}
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
          <button onClick={(e) => add2Polls(e, selPoll)}>Add Poll</button>
        </div>
        <div className="pollContainer"></div>
        <div>{polls.map((poll, index) => generatePollComps(+poll, index))}</div>
        <div>
          <input type="submit" value="Submit" />
          <input type="button" value="Clear" onClick={(e) => delPoll(e, 0)} />
          {/* <input type="button" value="Clear" onClick={() => clearInputs()} /> */}
        </div>
      </form>
    </div>
  );
};
