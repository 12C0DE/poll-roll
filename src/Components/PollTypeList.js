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
    <div className="flex flex-col gap-2 w-full md:w-1/2 md:flex-row">
      <FormControl className="w-full grow shrink">
        <InputLabel id="simple-select-label">Select a Poll</InputLabel>
        <Select
          labelId="simple-select-label"
          id="simple-select"
          value={selLocalPoll}
          label="Select a Poll"
          onChange={(e) => setSelLocalPoll(e.target.value)}
        >
          <MenuItem value={PollEnums.None}>-- Select One --</MenuItem>
          <MenuItem value={PollEnums.Dates}>Dates</MenuItem>
          <MenuItem value={PollEnums.List}>List</MenuItem>
          <MenuItem value={PollEnums.Bool}>T/F</MenuItem>
        </Select>
      </FormControl>
      <Button
        size="small"
        className="mb-8 md:mb-0"
        onClick={() => add(selLocalPoll)}
      >
        Add Poll
      </Button>
    </div>
  );
};
