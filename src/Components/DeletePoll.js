import React, { useContext } from "react";
import { GlobalContext } from "../Context/GlobalState";

export const DeletePoll = ({ id }) => {
  const { delPoll } = useContext(GlobalContext);

  return <button onClick={() => delPoll(id)}> X </button>;
};
