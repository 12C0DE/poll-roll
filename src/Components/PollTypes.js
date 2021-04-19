import React, { useState } from "react";

export const BoolPoll = ({ ind }) => {
  const [isTrue, setIsTrue] = useState(null);

  return (
    <div>
      <input type="text" placeholder="question" />
      <input
        type="radio"
        name={`radioT${ind}`}
        checked={isTrue}
        onChange={() => setIsTrue(!isTrue)}
      />
      <label style={{ paddingRight: "5px", paddingLeft: "3px" }}>True</label>
      <input
        type="radio"
        name={`radioF${ind}`}
        checked={!isTrue}
        onChange={() => setIsTrue(!isTrue)}
      />
      <label style={{ paddingRight: "5px", paddingLeft: "3px" }}>False</label>
    </div>
  );
};

export const ListPoll = () => {
  return <h1>list poll</h1>;
};
