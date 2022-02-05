import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../Context/GlobalState";
import { AuthContext } from "../Firebase/Auth";
import { useParams, Redirect } from "react-router";

export const VoteAt = ({ history }) => {
  const { pollId } = useParams();
  const { setVoteIdParam } = useContext(GlobalContext);

  useEffect(() => {
    setVoteIdParam(pollId);
  }, []);

  const { currUser } = useContext(AuthContext);

  if (currUser) {
    return <Redirect to={`/voting/${pollId}`} />;
  } else {
    return <Redirect to="/login" />;
  }

  //   return <Redirect to="/home" />;
};
