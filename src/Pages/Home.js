import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import axios from "axios";

import { GlobalContext } from "../Context/GlobalState";

export const Home = () => {
  const { aid } = useParams();
  const { user } = useContext(GlobalContext);
  const [pollNames, setPollNames] = useState([]);
  const [pollVotingNames, setPollVotingNames] = useState([]);

  useEffect(() => {
    let unmounted = false;
    let source = axios.CancelToken.source();

    axios
      .get(`/polls/pollnames/${aid}`, {
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
    <React.Fragment>
      <div>
        <h1>Polls</h1>
      </div>
      <div>
        <Link to="/createPoll">Create Poll</Link>
      </div>
      <div>
        <Link to="/results">View Results</Link>
      </div>
      <div>
        <h2>My Polls</h2>
        <ul>
          {pollNames?.map((poll) => (
            <li key={`pn${poll._id}`}>
              <Link to={`/editPoll/${poll._id}/${aid}`}>{poll.pollName}</Link>
              <Link to={`/voting/${poll._id}`}> Go to Voting</Link>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Polls invited to</h2>
        <ul>
          {pollVotingNames?.map((poll) => (
            <li key={`pvn${poll._id}`}>
              <Link to={`/voting/${poll._id}`}>{poll.pollName}</Link>
            </li>
          ))}
        </ul>
      </div>
    </React.Fragment>
  );
};
