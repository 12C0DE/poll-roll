import React from "react";
import { useHistory, useParams } from "react-router";
import { PollEnums } from "../Enums/PollEnums";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardActions from "@mui/material/CardActions";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import FormatListNumberedRoundedIcon from "@mui/icons-material/FormatListNumberedRounded"; //List
import EventRoundedIcon from "@mui/icons-material/EventRounded"; //Dates
import AnimationRoundedIcon from "@mui/icons-material/AnimationRounded"; //Combo
import CodeRoundedIcon from "@mui/icons-material/CodeRounded"; //T/F
import "../styles/PollCard.css";

export const ResultCard = ({ poll }) => {
  const history = useHistory();

  return (
    <Button onClick={() => history.push(`/results/poll/${poll._id}`)}>
      <Card
        sx={{
          maxWidth: 345,
          minWidth: 210,
          minHeight: 250,
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
        <CardActions></CardActions>
      </Card>
    </Button>
  );
};
