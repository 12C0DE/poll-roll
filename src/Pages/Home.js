import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../Context/GlobalState";

export const Home = () => {
  const { user } = useContext(GlobalContext);

  return (
    <React.Fragment>
      <div>
        <h1>Polls</h1>
        <h3>Hi {user.fname}</h3>
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
