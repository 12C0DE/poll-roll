import React, { useState } from "react";
import { PollEnums } from "../Enums/PollEnums";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";

export const PollTypeList = ({ add }) => {
  const [selLocalPoll, setSelLocalPoll] = useState(PollEnums.None);

  return (
    <div className="flex flex-row flex-wrap gap-2 mb-8">
      <FormControl>
        <InputLabel id="demo-simple-select-label">Select a Poll</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selLocalPoll}
          label="Select a Poll"
          onChange={(e) => setSelLocalPoll(e.target.value)}
          style={{ width: "250px" }}
        >
          <MenuItem value={PollEnums.None}>-- Select One --</MenuItem>
          <MenuItem value={PollEnums.Dates}>Dates</MenuItem>
          <MenuItem value={PollEnums.List}>List</MenuItem>
          <MenuItem value={PollEnums.Bool}>T/F</MenuItem>
        </Select>
      </FormControl>
      {/* <input type="button" value="Add Poll" onClick={() => add(selLocalPoll)} /> */}
      <Button size="small" onClick={() => add(selLocalPoll)}>
        Add Poll
      </Button>
    </div>
  );
};
