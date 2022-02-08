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
      >
        <option value={PollEnums.None}>- Select One -</option>
        <option value={PollEnums.Dates}>Dates</option>
        <option value={PollEnums.List}>List</option>
        <option value={PollEnums.Bool}>T/F</option>
      </select>
      <input type="button" value="Add Poll" onClick={() => add(selLocalPoll)} />
    </div>
  );
};
