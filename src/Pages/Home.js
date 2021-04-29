import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import axios from "axios";

export const Home = () => {
  const { aid } = useParams();
  const [pollNames, setPollNames] = useState([]);

  useEffect(() => {
    axios.get(`/polls/pollnames/${aid}`).then((name) => {
      setPollNames([name.data, ...pollNames]);
    });
  }, []);

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
        <ol>
          {pollNames.map((poll) => (
            <li key={`pn${poll._id}`}>{poll.pollName}</li>
          ))}
        </ol>
      </div>
    </React.Fragment>
  );
};
