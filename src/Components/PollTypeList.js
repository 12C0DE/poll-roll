import React, { useState } from "react";
import { PollEnums } from "../Enums/PollEnums";

export const PollTypeList = ({ add }) => {
  const [selLocalPoll, setSelLocalPoll] = useState(PollEnums.None);

  return (
    <div>
      <label>Type of poll</label>
      <select
        value={selLocalPoll}
        onChange={(e) => setSelLocalPoll(e.target.value)}
        // onChange={(event) => setSelLocalPoll(event.target.value)}
      >
        {/* <select value={selPoll} onChange={(e) => setSelPoll(e.target.value)}> */}
        <option value={PollEnums.None}>- Select One -</option>
        <option value={PollEnums.Dates}>Dates</option>
        <option value={PollEnums.List}>List</option>
        <option value={PollEnums.Bool}>T/F</option>
      </select>
      <button onClick={() => add(selLocalPoll)}>Add Poll</button>
      {/* <button onClick={(e) => add2Polls(e, selPoll)}>Add Poll</button> */}
    </div>
  );
};
