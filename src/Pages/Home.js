import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import axios from "axios";

export const Home = () => {
  const { aid } = useParams();
  const [pollNames, setPollNames] = useState([]);

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
        <ul>
          {pollNames.map((poll) => (
            <li key={`pn${poll._id}`}>
              <Link to={`/editPoll/${poll._id}`}>{poll.pollName}</Link>
              <Link to={`/voting/${poll._id}`}> Go to Voting</Link>
            </li>
          ))}
        </ul>
      </div>
    </React.Fragment>
  );
};
