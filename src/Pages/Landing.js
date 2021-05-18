import React, {useContext, useEffect} from "react";
import { Link } from "react-router-dom";
import {GlobalContext} from '../Context/GlobalState';

export const Landing = () => {
  const {polls, setPolls, voteList} = useContext(GlobalContext);

  const newPoll = {
    pollName: "test",
    details: "dt",
    rsvpDate: "04/04/2004",
    pollOptions: [
      { pollType: 2, pollId: "fsfd", option: "1", votes: [1] },
      { pollType: 2, pollId: "fsdssd", option: "2", votes: [2] },
      { pollType: 2, pollId: "qweqwe", option: "3", votes: [3] },
      { pollType: 2, pollId: "yuj", option: "4", votes: [4] },
    ],
    authId: "auth",
  };

  const vote = {
    uid: "testuid",
    pollId: "qweqwe",
    pollType: 2
  };

  useEffect(() => {
    setPolls(newPoll);
  }, [])

  return (
    <div>
      <h2>Create polls with Poll Roll</h2>
      <blockquote>
        Send a poll out to friends for choosing dates, lists of options, True or
        False questions, even multiple polls within one! All your decisions that
        need answers in one place. Take your roll call with Poll Roll.
      </blockquote>
      <div>
        <button>
          <Link to="/login">Log In</Link>
        </button>
        <button>
          <Link to="/signup">Sign Up</Link>
        </button>
      </div>
      <div><button onClick={() => voteList(vote)}>test vote</button></div>
    </div>
  );
};
