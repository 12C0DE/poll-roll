import React, { useContext, useEffect } from "react";
import { useParams } from "react-router";
import { GlobalContext } from "../Context/GlobalState";
import axios from "axios";

export const EditPoll = () => {
  const { _id } = useParams();
  const { polls, setPolls } = useContext(GlobalContext);

  useEffect(() => {
    console.log("edit polls setPolls");
    axios.get(`/polls/${_id}`).then((p) => {
      setPolls(p.data);
    });
  }, []);

  return (
    <div>
      <h2>Edit Poll</h2>
    </div>
  );
};
