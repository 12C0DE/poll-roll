import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { GlobalContext } from "../Context/GlobalState";
import axios from "axios";
import { Card, Container, Typography } from "@mui/material";
import { ResultCard } from "../Components/ResultCard";

export const ResultsAll = () => {
  const { aid } = useParams();
  const { user } = useContext(GlobalContext);
  const [pollNames, setPollNames] = useState([{}]);
  const [pollVotingNames, setPollVotingNames] = useState([{}]);

  useEffect(() => {
    let unmounted = false;
    let source = axios.CancelToken.source();

    axios
      .get(`/polls/pollnames/${aid}`, { cancelToken: source.token })
      .then((p) => {
        if (!unmounted) {
          setPollNames(p.data);
        }
      })
      .catch(function (e) {
        if (!unmounted) {
          if (axios.isCancel(e)) {
            console.log(`request cancelled: ${e.message}`);
          } else {
            console.log(`another error happened: ${e.message}`);
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
        .get(`/polls/pollnames/${aid}/${user._id}`, {
          cancelToken: source.token,
        })
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
    }
  }, [user]);

  return (
    <div className="flex flex-col">
      <div>
        <h1 className="text-3xl font-bold text-center py-8">Results</h1>
      </div>
      <Container maxWidth="lg">
        <div>
          <div>
            <h1 className="text-3xl font-bold text-center py-8">My Polls</h1>
          </div>
          <Container maxWidth="lg" className="overflow-auto">
            <ul className="flex flex-row flex-wrap justify-evenly gap-3 pt-2 pb-8">
              {pollNames?.map((poll) => (
                <ResultCard poll={poll} key={`pc_${poll._id}`} />
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
                <ResultCard key={`pcv_${poll._id}`} poll={poll} />
              ))}
            </ul>
          </Container>
        </div>
      </Container>
    </div>
  );
};
