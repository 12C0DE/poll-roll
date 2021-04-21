import React, { useState } from "react";
import { DeletePoll } from "../Components/DeletePoll";

export const BoolPoll = ({ ind }) => {
  // const [isTrue, setIsTrue] = useState(null);

  return (
    <div>
      <input type="text" placeholder="question" />
      <input
        type="radio"
        name={`radioT${ind}`}
        disabled={true}
        // checked={isTrue}
        // onChange={() => setIsTrue(!isTrue)}
      />
      <label style={{ paddingRight: "5px", paddingLeft: "3px" }}>True</label>
      <input
        type="radio"
        name={`radioF${ind}`}
        disabled={true}
        // checked={!isTrue}
        // onChange={() => setIsTrue(!isTrue)}
      />
      <label style={{ paddingRight: "5px", paddingLeft: "3px" }}>False</label>
      <DeletePoll />
    </div>
  );
};

export const ListPoll = () => {
  return (
    <div>
      <label>Add Option</label>
      <input type="text" />
      <DeletePoll />
    </div>
  );
};

export const DatePoll = () => {
  return (
    <div>
      <label>Start Date</label>
      <input type="date" />
      <label>End Date</label>
      <input type="date" />
      <DeletePoll />
    </div>
  );
};
