import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams, withRouter } from "react-router";
import { GlobalContext } from "../Context/GlobalState";
import { getAllVotes, totalPollVotes } from "../functions/funcs";
import { GenerateVotingPolls } from "../functions/funcs";
import { PollEnums } from "../Enums/PollEnums";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { SnackbarAlert } from "../Components/SnackbarAlert";
import { LoadingSkeleton } from "../Components/LoadingSkeleton";
import { format } from "date-fns";

const ip = require("ip");

const Voting = ({ history }) => {
  const { _id } = useParams();
  const {
    boolVotes,
    dateVotes,
    listVotes, //total count of votes
    polls,
    setPolls,
    setDateData,
    setDateVotes,
    setListData,
    setListVotes,
    user,
    voteIdParam,
  } = useContext(GlobalContext);
  const [rsvp, setRsvp] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [voteSaved, setVoteSaved] = useState(false);

  useEffect(() => {
    const cancelToken = axios.CancelToken;
    const source = cancelToken.source();

    try {
      if (voteIdParam) {
        axios.get(
          `https://pollroll-api.herokuapp.com/voteat/clear/${ip.address(
            "public",
            "ipv6"
          )}`
        );
      }

      axios
        .get(`https://pollroll-api.herokuapp.com/polls/${_id}`, {
          signal: source,
        })
        .then((p) => {
          const rsvpCheck = new Date(p.data.rsvpDate);
          if (rsvpCheck.getTime() < Date.now()) {
            history.push(`/results/poll/${_id}?voteEnd=1`);
          } else {
            setPolls(p.data);

            setRsvp(new Date(p.data.rsvpDate).toDateString());

            const allLVotes = getAllVotes(p.data, PollEnums.List);

            const lNames = allLVotes?.map((names) => names.option);
            let lCounts = lNames
              ?.map((opt) =>
                allLVotes
                  .filter((lCounts) => lCounts.option === opt)
                  .map((data) => data?.votes?.length ?? 0)
              )
              .flat();

            setListVotes(totalPollVotes(allLVotes));
            setListData({ names: lNames, counts: lCounts });

            const allDVotes = getAllVotes(p.data, PollEnums.Dates);
            const dNames = allDVotes?.map(
              (names) =>
                `${format(new Date(names.startDate), "M/d/yy")} - ${format(
                  new Date(names.endDate),
                  "M/d/yy"
                )}`
            );
            let dCounts = dNames
              ?.map((opt) =>
                allDVotes
                  .filter(
                    (dCounts) =>
                      `${format(
                        new Date(dCounts.startDate),
                        "M/d/yy"
                      )} - ${format(new Date(dCounts.endDate), "M/d/yy")}` ===
                      opt
                  )
                  .map((data) => data?.votes?.length ?? 0)
              )
              .flat();

            setDateVotes(totalPollVotes(allDVotes));
            setDateData({ names: dNames, counts: dCounts });
          }

          setIsLoading(false);
        });
    } catch (err) {
      if (axios.isCancel(err)) {
        history.push("/results");
        return "axios request cancelled";
      }
      return err;
    }
    return () => {
      source.cancel();
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVoteSaved(false);
    }, [4000]);
    // Clear timeout if the component is unmounted
    return () => clearTimeout(timer);
  }, [voteSaved, setVoteSaved]);

  const submitVote = () => {
    axios
      .patch(`https://pollroll-api.herokuapp.com/polls/upd/${_id}`, polls)
      .then((res) => {
        setVoteSaved(true);
      });
  };

  return (
    <div>
      {isLoading ? (
        <LoadingSkeleton />
      ) : (
        <React.Fragment>
          <div className="flex flex-col">
            <div>
              <h1 className="text-3xl font-bold text-center py-8">Voting</h1>
            </div>
            <Container>
              <Stack spacing={2} alignItems="center">
                <h2
                  className="text-center italic text-2xl"
                  style={{ color: "#637c7e" }}
                >
                  {polls.pollName}
                </h2>
                <hr />
                <TextField
                  id="outlined-multiline-static"
                  label="Details"
                  defaultValue={polls.details}
                  className="mt-8 mb-4 w-3/4"
                  multiline
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <TextField
                  label="Vote by"
                  type="text"
                  value={rsvp}
                  className="flex-grow-1 sm:flex-grow-0 mt-8 mb-4 w-3/4 sm:w-1/2 max-w-xl text-center"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Stack>
            </Container>
          </div>
          <div className="flex flex-col flex-wrap lg:flex-row lg:gap-4 lg:justify-center items-center mt-12">
            <ul className="flex flex-col flex-wrap lg:flex-row lg:gap-4 lg:justify-center items-center">
              {polls.pollOptions
                ?.filter((item) => item.pollType === PollEnums.Bool)
                .map((p) =>
                  GenerateVotingPolls(
                    +p.pollType,
                    p.pollId,
                    p.option,
                    p.startDate,
                    p.endDate,
                    p.votes,
                    user._id,
                    boolVotes,
                    dateVotes,
                    listVotes
                  )
                )}
            </ul>
            <div
              style={{ backgroundColor: "#FBF9F6", borderRadius: 15 }}
              className="min-w-xs w-lg max-w-2xl p-4 mb-4"
            >
              <ul className="flex flex-row flex-wrap place-content-center items-stretch">
                {polls.pollOptions
                  ?.filter((item) => item.pollType === PollEnums.List)
                  .map((p) =>
                    GenerateVotingPolls(
                      +p.pollType,
                      p.pollId,
                      p.option,
                      p.startDate,
                      p.endDate,
                      p.votes,
                      user._id,
                      boolVotes,
                      dateVotes,
                      listVotes
                    )
                  )}
              </ul>
            </div>
            <div
              style={{ backgroundColor: "#FBF9c6", borderRadius: 15 }}
              className="min-w-xs w-lg max-w-2xl py-8 px-4 mb-4"
            >
              <ul className="flex flex-row flex-wrap place-content-center items-stretch">
                {polls.pollOptions
                  ?.filter((item) => item.pollType === PollEnums.Dates)
                  .map((p) =>
                    GenerateVotingPolls(
                      +p.pollType,
                      p.pollId,
                      p.option,
                      p.startDate,
                      p.endDate,
                      p.votes,
                      user._id,
                      boolVotes,
                      dateVotes,
                      listVotes
                    )
                  )}
              </ul>
            </div>
          </div>
          <div className="flex flex-row space-x-6 my-8 place-content-center">
            <Button type="button" variant="contained" onClick={submitVote}>
              Submit
            </Button>
          </div>
          <div className="text-center mb-2">
            {voteSaved && <SnackbarAlert showSb={voteSaved} msg="Vote saved" />}
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default withRouter(Voting);
