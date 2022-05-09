import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useParams, Redirect } from "react-router";
import axios from "axios";

import { GlobalContext } from "../Context/GlobalState";
import { PollCard } from "../Components/PollCard";
import { LoadingSkeleton } from "../Components/LoadingSkeleton";
import {
  Container,
  Stack,
  TextField,
  Card,
  CardActions,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

export const Home = () => {
  const { aid } = useParams();
  const { user } = useContext(GlobalContext);
  const [pollNames, setPollNames] = useState([{}]);
  const [pollVotingNames, setPollVotingNames] = useState([{}]);
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const [keyphrase, setKeyphrase] = useState("");
  const [keyphraseError, setKeyphraseError] = useState(false);

  useEffect(() => {
    let unmounted = false;
    let source = axios.CancelToken.source();
    axios
      .get(`https://pollroll-api.herokuapp.com/polls/pollnames/${aid}`, {
        cancelToken: source.token,
      })
      .then((p) => {
        if (!unmounted) {
          setPollNames(p.data);
        }
      })
      .catch(function (e) {
        if (!unmounted) {
          if (axios.isCancel(e)) {
            console.log(`request cancelled:${e.message}`);
          } else {
            console.log("another error happened:" + e.message);
          }
        }
      });

    return function () {
      unmounted = true;
      source.cancel("Cancelling in cleanup");
    };
  }, [aid]);

  useEffect(() => {
    let unmounted = false;
    let source = axios.CancelToken.source();

    if (user) {
      axios
        .get(
          `https://pollroll-api.herokuapp.com/polls/pollnames/${aid}/${user._id}`,
          {
            cancelToken: source.token,
          }
        )
        .then((p) => {
          if (!unmounted) {
            setPollVotingNames(p.data);
          }
        })
        .catch(function (e) {
          if (!unmounted) {
            if (axios.isCancel(e)) {
              console.log(`request cancelled:${e.message}`);
            } else {
              console.log("another error happened:" + e.message);
            }
          }
        });

      setIsLoading(false);
    }
  }, [user]);

  const keyPhraseSearch = () => {
    axios
      .get(`https://pollroll-api.herokuapp.com/polls/pollsearch/${keyphrase}`)
      .then((res) => {
        if (res.data !== null) {
          setKeyphraseError(false);
          history.push(`/voting/${res.data._id}`);
        } else {
          setKeyphraseError(true);
        }
      });
  };

  return (
    <div className="flex flex-col">
      {isLoading ? (
        <LoadingSkeleton />
      ) : (
        <>
          <div>
            <h1 className="text-3xl font-bold text-center py-8">Polls</h1>
          </div>

          <Container maxWidth="lg">
            <Stack
              direction="row"
              spacing={2}
              width="80%"
              maxWidth="800px"
              className="justify-self-center m-auto"
              mb={4}
            >
              <TextField
                name="keyPhrase"
                variant="outlined"
                label="Search for a Poll with a Key Phrase"
                color="secondary"
                value={keyphrase}
                onChange={(e) => setKeyphrase(e.target.value)}
                fullWidth
                inputProps={{
                  inputMode: "text",
                  pattern: "[a-zA-Z0-9_]*",
                }}
                error={keyphraseError}
                helperText={keyphraseError && "Key Phrase does not exist"}
              />
              <IconButton
                aria-label="search"
                color="secondary"
                onClick={keyPhraseSearch}
                disabled={keyphrase.length > 0 ? false : true}
              >
                <SearchIcon />
              </IconButton>
            </Stack>
            <div className="flex flex-row flex-wrap justify-evenly gap-4">
              <Card sx={{ minWidth: 275 }} style={{ backgroundColor: "#eee" }}>
                <CardContent>
                  <Typography variant="h5" component="div">
                    Create Poll
                  </Typography>
                  <Typography
                    sx={{ mt: 1.5 }}
                    component="blockquote"
                    color="text.secondary"
                  >
                    Dates, T/F, Lists.. Create any of these polls!
                  </Typography>
                </CardContent>
                <CardActions className="flex-row-reverse">
                  <div>
                    <Button
                      className="justify-self-end align-bottom"
                      size="small"
                      onClick={() => history.push("/createPoll")}
                    >
                      Create One
                    </Button>
                  </div>
                </CardActions>
              </Card>
              <Card sx={{ width: 400 }} style={{ backgroundColor: "#ece" }}>
                <CardContent>
                  <Typography variant="h5" component="div">
                    View Results
                  </Typography>
                  <Typography
                    sx={{ mt: 1.5 }}
                    component="blockquote"
                    color="text.secondary"
                  >
                    Check who voted for what and what the group decided on!
                  </Typography>
                </CardContent>
                <CardActions className="flex-row-reverse">
                  <div>
                    <Button
                      className="justify-self-end"
                      size="small"
                      onClick={() => history.push(`/results/${aid}`)}
                    >
                      Results
                    </Button>
                  </div>
                </CardActions>
              </Card>
            </div>
          </Container>
          <div>
            <div>
              <h1 className="text-3xl font-bold text-center py-8">
                My Active Polls
              </h1>
            </div>
            <Container maxWidth="lg" className="overflow-auto">
              <ul className="flex flex-row flex-wrap justify-evenly gap-3 pt-2 pb-8">
                {pollNames?.map((poll) => (
                  <PollCard
                    poll={poll}
                    key={`pc_${poll._id}`}
                    justVote={false}
                  />
                ))}
              </ul>
            </Container>
          </div>
          <div>
            <div>
              <h1 className="text-3xl font-bold text-center py-8">
                Polls Invited to
              </h1>
            </div>
            <Container maxWidth="lg">
              <ul className="flex flex-row flex-wrap justify-evenly gap-3 pt-2 pb-8">
                {pollVotingNames?.map((poll) => (
                  <PollCard
                    key={`pcv_${poll._id}`}
                    poll={poll}
                    justVote={true}
                  />
                ))}
              </ul>
            </Container>
          </div>
        </>
      )}
    </div>
  );
};
