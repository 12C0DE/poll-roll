import React, { useContext } from "react";
import { GlobalContext } from "../Context/GlobalState";

export const DeletePollOption = ({ id }) => {
  const { delPollOption } = useContext(GlobalContext);

  //   return <button onClick={() => console.log(`pollid ${id}`)}> X </button>;
  return <button onClick={() => delPollOption(id)}> X </button>;
};
