import React, { useState } from "react";
import { DeletePoll } from "../Components/DeletePoll";

export const BoolPoll = ({ ind, delPoll }) => {
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
      <DeletePoll del={delPoll(ind)} />
    </div>
  );
};

export const ListPoll = ({ ind, delPoll }) => {
  return (
    <div>
      <label>Add Option</label>
      <input type="text" />
      <DeletePoll del={delPoll(ind)} />
    </div>
  );
};

export const DatePoll = ({ ind, delPoll }) => {
  return (
    <div>
      <label>Start Date</label>
      <input type="date" />
      <label>End Date</label>
      <input type="date" />
      <DeletePoll del={() => delPoll(ind)} />
    </div>
  );
};
