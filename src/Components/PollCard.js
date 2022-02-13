import React from "react";
import { useHistory, useParams } from "react-router";
import { PollEnums } from "../Enums/PollEnums";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardActions from "@mui/material/CardActions";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import FormatListNumberedRoundedIcon from "@mui/icons-material/FormatListNumberedRounded"; //List
import EventRoundedIcon from "@mui/icons-material/EventRounded"; //Dates
import AnimationRoundedIcon from "@mui/icons-material/AnimationRounded"; //Combo
import CodeRoundedIcon from "@mui/icons-material/CodeRounded"; //T/F
import "../styles/PollCard.css";

export const PollCard = ({ poll, justVote }) => {
  const history = useHistory();
  const { aid } = useParams();

  return (
    <Card
      sx={{
        maxWidth: 345,
        minWidth: 210,
        height: 250,
        color: "white",
        width: "25%",
      }}
      key={`pn${poll._id}`}
      elevation={12}
      className={
        poll.pollKind === PollEnums.Bool
          ? "card boolCard"
          : poll.pollKind === PollEnums.List
          ? "card listCard"
          : poll.pollKind === PollEnums.Dates
          ? "card datesCard"
          : "card comboCard"
      }
    >
      <CardHeader title={poll.pollName} />
      <CardMedia height="200" className="text-center">
        {poll.pollKind === PollEnums.Bool ? (
          <CodeRoundedIcon style={{ height: "80px", width: "80px" }} />
        ) : poll.pollKind === PollEnums.List ? (
          <FormatListNumberedRoundedIcon
            style={{ height: "80px", width: "80px" }}
          />
        ) : poll.pollKind === PollEnums.Dates ? (
          <EventRoundedIcon style={{ height: "80px", width: "80px" }} />
        ) : (
          <AnimationRoundedIcon style={{ height: "80px", width: "80px" }} />
        )}
      </CardMedia>
      <CardActions className="flex justify-between content-end">
        <Button
          size="small"
          onClick={() => history.push(`/voting/${poll._id}`)}
        >
          Voting
        </Button>
        <Button
          size="small"
          style={{ display: justVote ? "none" : "inline-flex" }}
          onClick={() => history.push(`/editPoll/${poll._id}/${aid}`)}
        >
          Edit
        </Button>
      </CardActions>
    </Card>
  );
};
