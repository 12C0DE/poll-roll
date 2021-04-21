import React from "react";

export const DeletePoll = ({ del }) => {
  return <button onClick={del()}> X </button>;
};
