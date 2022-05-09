import React, { useContext, useRef } from "react";
import { DeletePollOption } from "../Components/DeletePollOption";
import { GlobalContext } from "../Context/GlobalState";
import { PollEnums } from "../Enums/PollEnums";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Stack from "@mui/material/Stack";
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";

export const BoolPoll = ({ id, pollValue }) => {
  const { updatePoll } = useContext(GlobalContext);

  const updatingPoll = (e) => {
    if (e.target.value.length > 0) {
      const updatedPoll = {
        pollType: PollEnums.Bool,
        pollId: id,
        option: e.target.value,
      };

      updatePoll(updatedPoll);
    }
  };

  return (
    <div>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={1}
        className="space-x-4 my-6"
        alignItems="center"
      >
        <TextField
          name="statement"
          variant="outlined"
          label="Statement"
          defaultValue={pollValue}
          onBlur={(e) => updatingPoll(e)}
          className="w-full grow shrink"
        />
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography>True</Typography>
          <Switch disabled />
          <Typography>False</Typography>
          <DeletePollOption id={id} />
        </Stack>
      </Stack>
    </div>
  );
};

export const ListPoll = ({ id, pollValue }) => {
  const { updatePoll } = useContext(GlobalContext);
  const updatingPoll = (e) => {
    e.preventDefault();
    if (e.target.value.length > 0) {
      const updatedPoll = {
        pollType: PollEnums.List,
        pollId: id,
        option: e.target.value,
      };

      updatePoll(updatedPoll);
    }
  };

  return (
    <div className="flex flex-row m-4 space-x-4 place-content-center">
      <TextField
        id={`li${id}`}
        variant="outlined"
        label="Option"
        defaultValue={pollValue}
        onBlur={(e) => updatingPoll(e)}
        className="grow shrink"
      />
      <DeletePollOption key={`del${id}`} id={id} />
    </div>
  );
};

export const DatePoll = ({ id, pollStart, pollEnd }) => {
  const { updatePoll } = useContext(GlobalContext);
  const startRef = useRef();
  const endRef = useRef();

  const updatingPoll = (e) => {
    if (e.target.value.length > 0) {
      const updatedPoll = {
        pollType: PollEnums.Dates,
        pollId: id,
        startDate: startRef.current.value,
        endDate: endRef.current.value,
      };

      updatePoll(updatedPoll);
    }
  };

  return (
    <div className="flex flex-col space-y-4 mb-6 md:mb-0 md:space-x-4 md:place-content-center md:flex-row md:items-baseline">
      <FormControl className="w-full">
        <TextField
          type="date"
          id={`sd${id}`}
          inputRef={startRef}
          label="Start Date"
          InputLabelProps={{ shrink: true }}
          defaultValue={pollStart}
          onChangeCapture={updatingPoll}
        />
      </FormControl>
      <FormControl className="w-full">
        <TextField
          type="date"
          id={`ed${id}`}
          inputRef={endRef}
          label="End Date"
          InputLabelProps={{ shrink: true }}
          defaultValue={pollEnd}
          onChangeCapture={updatingPoll}
        />
      </FormControl>
      <DeletePollOption id={id} />
    </div>
  );
};
