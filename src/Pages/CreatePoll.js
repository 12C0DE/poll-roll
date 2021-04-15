import React, { useState } from "react";

export const CreatePoll = () => {
  const [rsvpDate, setRsvpDate] = useState("");
  const [name, setName] = useState("");
  const [details, setDetails] = useState("");

  const clearInputs = () => {
    setName("");
    setDetails("");
    setRsvpDate("");
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
          <select>
            <option>- Select One -</option>
            <option>Dates</option>
            <option>List</option>
            <option>T/F</option>
          </select>
        </div>
        <div>
          <input type="submit" value="Submit" />
          <input type="button" value="Clear" onClick={() => clearInputs()} />
        </div>
      </form>
    </div>
  );
};
