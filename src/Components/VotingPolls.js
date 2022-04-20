import React, { useContext, useState } from "react";
import { GlobalContext } from "../Context/GlobalState";
import { PollEnums } from "../Enums/PollEnums";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import { CardContent, TextField } from "@mui/material";
import "../styles/VotingPolls.css";

export const BoolVote = ({ id, pollValue, dv }) => {
  const [vote, setVote] = useState(dv);
  const { voteMany, user } = useContext(GlobalContext);

  const voteForBool = (val) => {
    setVote(val);

    const voteBool = {
      uid: user._id,
      pollId: id,
      pollType: PollEnums.Bool,
      voted: val,
    };

    voteMany(voteBool);
  };

  return (
    <Box className="justify-center mx-2">
      <TextField
        label="Statement"
        value={pollValue}
        multiline
        InputLabelProps={{ shrink: true }}
        InputProps={{
          readOnly: true,
        }}
        className="w-full mb-4"
      />
      <Stack
        direction="row"
        spacing={4}
        alignItems="center"
        className="mt-4 justify-evenly"
      >
        <Button
          onClick={() => voteForBool(true)}
          disabled={vote === true}
          style={{ borderRadius: 100 }}
          className={vote && "grnGradient"}
        >
          <Card
            sx={{
              maxWidth: 345,
              minWidth: 150,
              height: 100,
              maxHeight: 200,
              borderRadius: 100,
            }}
          >
            <CardContent className="text-6xl">T</CardContent>
          </Card>
        </Button>
        <Button
          onClick={() => voteForBool(false)}
          disabled={vote === false}
          className={!vote && "redGradient"}
          style={{ borderRadius: 100 }}
        >
          <Card
            sx={{
              maxWidth: 345,
              minWidth: 150,
              height: 100,
              maxHeight: 200,
              borderRadius: 100,
            }}
          >
            <CardContent className="text-6xl">F</CardContent>
          </Card>
        </Button>
      </Stack>
    </Box>
  );
};

export const ListVote = ({ id, pollValue, currVoteId }) => {
  const { voteOne, user } = useContext(GlobalContext);
  const currVote = {
    uid: user._id,
    pollId: id,
    pollType: PollEnums.List,
  };

  return (
    <Box>
      <Button
        onClick={() => voteOne(currVote)}
        style={{ borderRadius: 100 }}
        className={currVoteId === id && "blueGradient"}
      >
        <Card
          sx={{
            maxWidth: 650,
            minWidth: 250,
            minHeight: "6em",
            borderRadius: 100,
          }}
        >
          <CardContent className="text-xl">{pollValue}</CardContent>
        </Card>
      </Button>
    </Box>
  );
};

export const DateVote = ({ id, pollValue, currVoteId }) => {
  const { voteOne, user } = useContext(GlobalContext);
  const currVote = {
    uid: user._id,
    pollId: id,
    pollType: PollEnums.Dates,
  };

  return (
    <Box className="shrink justify-center my-2">
      <Button
        onClick={() => voteOne(currVote)}
        style={{ borderRadius: 100 }}
        className={currVoteId === id && "purpGradient"}
      >
        <Card
          sx={{
            maxWidth: 540,
            minWidth: 180,
            minHeight: "5em",
            borderRadius: 100,
          }}
        >
          <CardContent className="text-xl">{pollValue}</CardContent>
        </Card>
      </Button>
    </Box>
  );
};
