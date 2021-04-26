import React from "react";
import { Link } from "react-router-dom";

export const Home = () => {
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
    </React.Fragment>
  );
};
