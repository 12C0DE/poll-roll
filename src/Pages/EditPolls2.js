import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import uuid from "react-uuid";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { PollTypeList } from "../Components/PollTypeList";
import { LoadingSkeleton } from "../Components/LoadingSkeleton";
import { PollEnums } from "../Enums/PollEnums";
import { GlobalContext } from "../Context/GlobalState";
import { generatePollComps } from "../functions/funcs";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import DoubleArrowRoundedIcon from "@mui/icons-material/DoubleArrowRounded";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import { SnackbarAlert } from "../Components/SnackbarAlert";

export const EditPolls2 = () => {
  const { _id, authId } = useParams();
  const { polls, addPollOption, setPolls } = useContext(GlobalContext);
  const [details, setDetails] = useState("");
  const [rsvp, setRsvp] = useState("");
  const [updatedStatus, setUpdatedStatus] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`https://pollroll-api.herokuapp.com/polls/${_id}/${authId}`)
      .then((p) => {
        setPolls(p.data);
        setDetails(p.data.details);
        let rDate = new Date(p.data.rsvpDate).toLocaleDateString();

        setRsvp(rDate);
      });
    setIsLoading(false);
  }, []);

  //status appers for 3 secs on update
  useEffect(() => {
    const timer = setTimeout(() => {
      setUpdatedStatus(false);
    }, [4000]);

    return () => clearTimeout(timer);
  }, [updatedStatus, setUpdatedStatus]);

  const add2Polls = (poll) => {
    if (+poll === PollEnums.None) {
      return;
    }

    try {
      const newPoll = {
        pollType: +poll,
        pollId: uuid(),
      };

      addPollOption(newPoll);
    } catch (err) {
      console.log(err);
    }
  };

  const submitUpdate = (e) => {
    e.preventDefault();

    if (!polls.pollOptions.length > 0) {
      return;
    }

    const updatedPoll = {
      pollName: polls.pollName,
      details: details,
      rsvpDate: rsvp,
      pollOptions: polls.pollOptions,
      authId: polls.authId,
    };

    axios
      .patch(`https://pollroll-api.herokuapp.com/polls/upd/${_id}`, updatedPoll)
      .then((res) => {
        console.log("poll updated");
        setUpdatedStatus(true);
      });
  };

  return (
    <div className="flex flex-col">
      {isLoading ? (
        <LoadingSkeleton />
      ) : (
        <>
          <div>
            <h1 className="text-3xl font-bold text-center py-8">Edit Poll</h1>
          </div>
          <Container>
            <Stack spacing={2}>
              <h2
                className="text-center italic text-2xl"
                style={{ color: "#637c7e" }}
              >
                {polls.pollName}
              </h2>
              <hr />
              <div className="flex flex-row justify-between">
                <Link to={`/voting/${_id}`}>
                  <DoubleArrowRoundedIcon className="rotate-180" />
                  Go to Voting
                </Link>
                <Link to={`/results/${_id}`}>
                  Go to Results <DoubleArrowRoundedIcon />
                </Link>
              </div>
              <div className="flex flex-col justify-center gap-2 pb-4 px-4 sm:px-0 sm:flex-row">
                <h4>Send to Voters: </h4>
                <label
                  className="mx-2 flex-wrap sm:mx-0"
                  onClick={() => {
                    navigator.clipboard.writeText(
                      `${window.location.origin}/voteat/${_id}`
                    );
                  }}
                >
                  {window.location.origin}/voteat/{_id}
                </label>
              </div>
              <TextField
                id="outlined-multiline-static"
                label="Details"
                defaultValue={details}
                className="mt-8"
                multiline
                rows={4}
                InputLabelProps={{
                  shrink: true,
                }}
                onBlur={(e) => setDetails(e.target.value)}
              />
              <div className="flex flex-row flex-wrap mt-4 space-x-4 space-y-4 md:space-y-0 place-content-center">
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Vote by:"
                    value={rsvp}
                    required={true}
                    onChange={(newValue) => {
                      setRsvp(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
                <PollTypeList add={add2Polls} />
              </div>
            </Stack>
            <div>
              <ul>
                {polls.pollOptions?.map((p) =>
                  generatePollComps(
                    +p.pollType,
                    p.pollId,
                    p.option,
                    p.startDate,
                    p.endDate
                  )
                )}
              </ul>
            </div>
            <div className="flex flex-row space-x-6 my-8 place-content-center">
              <Button
                type="button"
                variant="contained"
                onClick={(e) => submitUpdate(e)}
              >
                Update
              </Button>
              <Button type="submit">Delete</Button>
            </div>
            <div className="text-center mb-2">
              {updatedStatus && (
                <SnackbarAlert showSb={updatedStatus} msg="Vote saved" />
              )}
            </div>
          </Container>
        </>
      )}
    </div>
  );
};
