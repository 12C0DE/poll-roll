import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { useLocation } from "react-router-dom";
import { GlobalContext } from "../Context/GlobalState";
import { getAllVotes, totalPollVotes } from "../functions/funcs";
import { PollEnums } from "../Enums/PollEnums";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import { Chip } from "@mui/material";
import FaceIcon from "@mui/icons-material/Face";
import Alert from "@mui/material/Alert";
import { LoadingSkeleton } from "../Components/LoadingSkeleton";

import { format } from "date-fns";
import { getChartColors } from "../functions/funcs";
import "chart.js/auto";
import { Chart } from "react-chartjs-2";
import axios from "axios";

export const Results = () => {
  const { _id } = useParams();
  let location = useLocation();
  let voteEnd = new URLSearchParams(location.search).get("voteEnd");
  const {
    setListData,
    setDateData,
    dateData,
    dateVotes,
    listData,
    listVotes,
    polls,
    setPolls,
    setListVotes,
    setDateVotes,
  } = useContext(GlobalContext);
  const [rsvp, setRsvp] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [listVoteNames, setListVoteNames] = useState([{}]);
  const [dateVoteNames, setDateVoteNames] = useState([{}]);

  useEffect(() => {
    const cancelToken = axios.CancelToken;
    const source = cancelToken.source();

    try {
      axios
        .get(`https://pollroll-api.herokuapp.com/polls/${_id}`, {
          signal: source,
        })
        .then((p) => {
          setPolls(p.data);

          setRsvp(format(new Date(p.data.rsvpDate), "MMM d yyyy"));

          const allLVotes = getAllVotes(p.data, PollEnums.List);

          const lNames = allLVotes?.map((names) => {
            return { name: names.option, id: names.pollId };
          });
          let lCounts = lNames
            ?.map((opt) =>
              allLVotes
                .filter((lCounts) => lCounts.option === opt.name)
                .map((data) => data?.votes?.length ?? 0)
            )
            .flat();
          setListVotes(totalPollVotes(allLVotes));

          allLVotes?.map((item) =>
            pullVoteNames(PollEnums.List, item.pollId, item?.votes?.join("&"))
          );

          setListData({ names: lNames, counts: lCounts });

          const allDVotes = getAllVotes(p.data, PollEnums.Dates);
          const dNames = allDVotes?.map((names) => {
            return {
              name: `${format(new Date(names.startDate), "M/d/yy")} - ${format(
                new Date(names.endDate),
                "M/d/yy"
              )}`,
              id: names.pollId,
            };
          });
          let dCounts = dNames
            ?.map((opt) =>
              allDVotes
                .filter(
                  (dCounts) =>
                    `${format(
                      new Date(dCounts.startDate),
                      "M/d/yy"
                    )} - ${format(new Date(dCounts.endDate), "M/d/yy")}` ===
                    opt.name
                )
                .map((data) => data?.votes?.length ?? 0)
            )
            .flat();

          setDateVotes(totalPollVotes(allDVotes));

          allDVotes?.map((item) =>
            pullVoteNames(PollEnums.Dates, item.pollId, item?.votes?.join("&"))
          );
          setDateData({ names: dNames, counts: dCounts });
          setIsLoading(false);
        });
    } catch (err) {
      if (axios.isCancel(err)) {
        return "axios request cancelled";
      }
      return err;
    }
    return () => {
      source.cancel();
    };
  }, []);

  const pullVoteNames = async (type, optionId, names) => {
    switch (type) {
      case PollEnums.Bool:
        return null;
      case PollEnums.Dates:
        try {
          const resp = await axios.get(
            `https://pollroll-api.herokuapp.com/users/names/${names}`
          );

          resp.data &&
            setDateVoteNames((state) => [
              ...state,
              {
                voters: resp.data[0]?.hasOwnProperty("fname")
                  ? resp.data.map((voter) => `${voter.fname} ${voter.lname}`)
                  : null,
                optionId: optionId,
              },
            ]);
        } catch (err) {
          console.error(err);
        }
        break;
      case PollEnums.List:
        try {
          const resp = await axios.get(
            `https://pollroll-api.herokuapp.com/users/names/${names}`
          );
          setListVoteNames((state) => [
            ...state,
            {
              voters: resp.data[0]?.hasOwnProperty("fname")
                ? resp.data.map((voter) => `${voter.fname} ${voter.lname}`)
                : null,
              optionId: optionId,
            },
          ]);
        } catch (err) {
          console.error(err);
        }

        break;
      default:
        return null;
    }
  };

  return (
    <div>
      {isLoading ? (
        <LoadingSkeleton />
      ) : (
        <React.Fragment>
          <div className="flex flex-col">
            <div>
              <h2 className="text-3xl font-bold text-center py-8">Results</h2>
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
                {voteEnd ? (
                  <Alert severity="error">Voting has ended for this poll</Alert>
                ) : (
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
                )}
              </Stack>
            </Container>
            <div className="flex flex-row flex-wrap justify-center gap-2">
              {listData?.counts.reduce((a, b) => a + b, 0) > 0 ? (
                <div className="min-w-xs w-3/5 max-w-lg py-8 px-4 mb-4">
                  {listData.names.map((el) => (
                    <Accordion key={`accrd_${el.id}`}>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography>{el.name}</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <div className="flex flex-row flex-wrap">
                          {listVoteNames
                            .filter((pl) => pl.optionId === el.id)
                            .map((voters) =>
                              voters.voters?.map((v) => (
                                <Chip
                                  key={`chip_${v}`}
                                  variant="outlined"
                                  icon={<FaceIcon />}
                                  label={v}
                                  className="mx-2 mb-2 p-2"
                                />
                              ))
                            )}
                        </div>
                      </AccordionDetails>
                    </Accordion>
                  ))}
                  <Chart
                    type="doughnut"
                    legend={"top"}
                    options={{
                      responsive: true,
                      plugins: {
                        legend: {
                          position: "top",
                        },
                      },
                    }}
                    data={{
                      labels: listData.names.map((v) => v.name),
                      datasets: [
                        {
                          data: listData.counts,
                          backgroundColor: getChartColors(
                            listData.names.length
                          ),
                        },
                      ],
                    }}
                    className="mb-4"
                  />
                </div>
              ) : null}
              {dateData?.counts.reduce((a, b) => a + b, 0) > 0 ? (
                <div className="min-w-xs w-3/5 max-w-lg py-8 px-4 mb-4">
                  {dateData.names.map((el) => (
                    <Accordion key={`dDaccrd_${el.id}`}>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="pane2a-header"
                      >
                        <Typography>{el.name}</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <div className="flex flex-row flex-wrap">
                          {dateVoteNames
                            .filter((pd) => pd.optionId === el.id)
                            .map((voters) =>
                              voters.voters?.map((v) => (
                                <Chip
                                  key={`chp_${v}`}
                                  variant="outlined"
                                  icon={<FaceIcon />}
                                  label={v}
                                  className="mx-2 mb-2 p-2"
                                />
                              ))
                            )}
                        </div>
                      </AccordionDetails>
                    </Accordion>
                  ))}
                  <Chart
                    type="doughnut"
                    legend={"top"}
                    options={{
                      responsive: true,
                      plugins: {
                        legend: {
                          position: "top",
                        },
                      },
                    }}
                    data={{
                      labels: dateData.names.map((d) => d.name),
                      datasets: [
                        {
                          data: dateData.counts,
                          backgroundColor: getChartColors(
                            dateData.names.length
                          ),
                        },
                      ],
                    }}
                  />
                </div>
              ) : null}
            </div>
          </div>
        </React.Fragment>
      )}
    </div>
  );
};
