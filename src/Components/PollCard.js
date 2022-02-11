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

export const PollCard = ({ poll }) => {
  const history = useHistory();
  const { aid } = useParams();

  const pollKindStyle = (pollKind) => {
    switch (pollKind) {
      case PollEnums.Bool:
        return (
          <Card
            sx={{
              maxWidth: 345,
              minWidth: 210,
              color: "white",
              width: "25%",
            }}
            key={`pn${poll._id}`}
            elevation={12}
            className="boolCard"
          >
            <CardHeader title={poll.pollName} />
            <CardMedia height="200" className="text-center">
              <CodeRoundedIcon style={{ height: "80px", width: "80px" }} />
            </CardMedia>
            <CardContent></CardContent>
            <CardActions className="flex justify-between">
              <Button
                size="small"
                onClick={() => history.push(`/editPoll/${poll._id}/${aid}`)}
              >
                Edit
              </Button>
              <Button
                size="small"
                onClick={() => history.push(`/voting/${poll._id}`)}
              >
                Voting
              </Button>
            </CardActions>
          </Card>
        );
      case PollEnums.List:
        return (
          <Card
            sx={{
              maxWidth: 345,
              minWidth: 210,
              color: "white",
              width: "25%",
            }}
            key={`pn${poll._id}`}
            elevation={12}
            className="listCard"
          >
            <CardHeader title={poll.pollName} />
            <CardMedia height="200" className="text-center">
              <FormatListNumberedRoundedIcon
                style={{ height: "80px", width: "80px" }}
              />
            </CardMedia>
            <CardContent></CardContent>
            <CardActions className="flex justify-between">
              <Button
                size="small"
                onClick={() => history.push(`/editPoll/${poll._id}/${aid}`)}
              >
                Edit
              </Button>
              <Button
                size="small"
                onClick={() => history.push(`/voting/${poll._id}`)}
              >
                Voting
              </Button>
            </CardActions>
          </Card>
        );
      case PollEnums.Dates:
        return (
          <Card
            sx={{
              maxWidth: 345,
              minWidth: 210,
              color: "white",
              width: "25%",
            }}
            key={`pn${poll._id}`}
            elevation={12}
            className="datesCard"
          >
            <CardHeader title={poll.pollName} />
            <CardMedia height="200" className="text-center">
              <EventRoundedIcon style={{ height: "80px", width: "80px" }} />
            </CardMedia>
            <CardContent></CardContent>
            <CardActions className="flex justify-between">
              <Button
                size="small"
                onClick={() => history.push(`/editPoll/${poll._id}/${aid}`)}
              >
                Edit
              </Button>
              <Button
                size="small"
                onClick={() => history.push(`/voting/${poll._id}`)}
              >
                Voting
              </Button>
            </CardActions>
          </Card>
        );
      case PollEnums.Combo:
        return (
          <Card
            sx={{
              maxWidth: 345,
              minWidth: 210,
              color: "white",
              width: "25%",
            }}
            key={`pn${poll._id}`}
            elevation={12}
            className="comboCard"
          >
            <CardHeader title={poll.pollName} />
            <CardMedia height="200" className="text-center">
              <AnimationRoundedIcon style={{ height: "80px", width: "80px" }} />
            </CardMedia>
            <CardContent></CardContent>
            <CardActions className="flex justify-between">
              <Button
                size="small"
                onClick={() => history.push(`/editPoll/${poll._id}/${aid}`)}
              >
                Edit
              </Button>
              <Button
                size="small"
                onClick={() => history.push(`/voting/${poll._id}`)}
              >
                Voting
              </Button>
            </CardActions>
          </Card>
        );
      default:
        return null;
    }
  };

  return <>{pollKindStyle(+poll.pollKind)}</>;
};
