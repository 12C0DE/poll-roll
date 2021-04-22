import React from "react";
import { DeletePoll } from "../Components/DeletePoll";

export const BoolPoll = ({ id }) => {
  return (
    <div>
      <input type="text" placeholder="question" />
      <input
        type="radio"
        name={`radioT${id}`}
        disabled={true}
        // checked={isTrue}
        // onChange={() => setIsTrue(!isTrue)}
      />
      <label style={{ paddingRight: "5px", paddingLeft: "3px" }}>True</label>
      <input
        type="radio"
        name={`radioF${id}`}
        disabled={true}
        // checked={!isTrue}
        // onChange={() => setIsTrue(!isTrue)}
      />
      <label style={{ paddingRight: "5px", paddingLeft: "3px" }}>False</label>
      <DeletePoll id={id} />
    </div>
  );
};

export const ListPoll = ({ id }) => {
  return (
    <div>
      <label>Add Option</label>
      <input type="text" />
      <DeletePoll id={id} />
    </div>
  );
};

export const DatePoll = ({ id }) => {
  return (
    <div>
      <label>Start Date</label>
      <input type="date" />
      <label>End Date</label>
      <input type="date" />
      <DeletePoll id={id} />
    </div>
  );
};
